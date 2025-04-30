import { inject, Injectable } from '@angular/core';
import { BaseModel } from '@shared/models/bases/base.model';
import { StateContext } from '@ngxs/store';
import { BaseService } from '@shared/services/base/base.service';
import { BaseStateModel } from '@shared/models/bases/basestate-model';
import { tap } from 'rxjs';
import { ApiResCollection, ApiResSingle } from '@shared/models/bases/response.model';
import { SetLoading } from '@shared/states/loading/loading.actions';
import { TYPES } from '@shared/utils/constants';
import { FilterStateModel } from '@shared/models/ui/filter.model';
import { SortService } from '@shared/services/ui/sort.service';
import { Sort } from '@shared/models/ui/sort.model';

@Injectable()
export abstract class BaseState<T extends BaseModel, R>  {
  private sortService = inject(SortService);

  constructor(protected service: BaseService<T, R>) {}

  protected abstract getSortField(): Sort<T>;

  protected getAllBase(ctx: StateContext<BaseStateModel<T>>) {
    if(ctx.getState().loaded) return;

    ctx.patchState({ loading: true });
    return this.service.getAll().pipe(
      tap({
        next: (response: ApiResCollection<T>) => {
          const sortField = this.getSortField();
          const sortedData = sortField
            ? this.sortService.sortByDateField(response.data, sortField)
            : response.data;

          ctx.patchState({
            entities: sortedData,
            filterEntities: sortedData,
            trashes: response.trashes,
          })
        },
        error: () => {
          ctx.patchState({ loading: false, loaded: false });
        },
        finalize: () => {
          ctx.patchState({ loading: false, loaded: true });
        }
      })
    );
  }

  protected getAllTrashBase(ctx: StateContext<BaseStateModel<T>>) {
    if(ctx.getState().loadedTrash) return;

    ctx.patchState({ loading: true });
    return this.service.getAllTrash().pipe(
      tap({
        next: (response: ApiResCollection<T>) => {
          const sortField = this.getSortField();
          const sortedData = sortField
            ? this.sortService.sortByDateField(response.data, sortField)
            : response.data;

          ctx.patchState({
            trashEntities: sortedData,
            filterTrashEntities: sortedData
          })
        },
        error: () => {
          ctx.patchState({ loading: false, loadedTrash: false });
        },
        finalize: () => {
          ctx.patchState({ loading: false, loadedTrash: true });
        }
      })
    );
  }

  protected getOptionsBase(ctx: StateContext<BaseStateModel<T>>) {
    ctx.patchState({ loading: true });
    return this.service.getOptions().pipe(
      tap({
        next: (response: ApiResCollection<T>) => {
          const sortField = this.getSortField();
          const sortedData = sortField
            ? this.sortService.sortByDateField(response.data, sortField)
            : response.data;

          ctx.patchState({
            options: sortedData
          })
        },
        error: () => {
          ctx.patchState({ loading: false });
        },
        finalize: () => {
          ctx.patchState({ loading: false });
        }
      })
    );
  }

  protected getOneBase(ctx: StateContext<BaseStateModel<T>>, id: number, type: string) {
    ctx.dispatch(new SetLoading(type, true));
    return this.service.getOne(id).pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          ctx.patchState({
            selectedEntity: response.data,
          })
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    )
  }

  protected createBase(ctx: StateContext<BaseStateModel<T>>, payload: R, type: string) {
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();
    return this.service.create(payload).pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          const sortField = this.getSortField();
          const data = [...state.entities, ...[response.data]];
          const dataFilter = [...state.filterEntities, ...[response.data]];

          const sortedData = sortField
            ? this.sortService.sortByDateField(data, sortField)
            : data;
          const sortedDataFilter = sortField
            ? this.sortService.sortByDateField(dataFilter, sortField)
            : dataFilter;

          ctx.patchState({
            entities: sortedData,
            filterEntities: sortedDataFilter,
            result: { title: response.title, message: response.message },
          })
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    )
  }

  protected updateBase(ctx: StateContext<BaseStateModel<T>>, payload: Partial<R>, id: number, type: string) {
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();

    return this.service.update(id, payload)
    .pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          const sortField = this.getSortField();
          const updatedEntities = state.entities.map(entity =>
            entity.id === Number(id) ? { ...entity, ...response.data } : entity
          );
          const updatedFilterEntities = state.filterEntities.map(entity =>
            entity.id === Number(id) ? { ...entity, ...response.data } : entity
          );

          const sortedData = sortField
            ? this.sortService.sortByDateField(updatedEntities, sortField)
            : updatedEntities;
          const sortedDataFilter = sortField
            ? this.sortService.sortByDateField(updatedFilterEntities, sortField)
            : updatedFilterEntities;

          ctx.patchState({
            entities: sortedData,
            filterEntities: [...sortedDataFilter],
            result: { title: response.title, message: response.message },
          });
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    )
  }

  protected deleteBase(ctx: StateContext<BaseStateModel<T>>, id: number, type: string) {
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();
    const entities = state.entities.filter(item => item.id !== id);
    const filterEntities = state.filterEntities.filter(item => item.id !== id);

    return this.service.delete(id).pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          ctx.patchState({
            entities,
            filterEntities,
            trashEntities: [...state.trashEntities, ...[response.data]],
            filterTrashEntities: [...state.filterTrashEntities, ...[response.data]],
            result: { title: response.title, message: response.message },
            trashes: response.trashes,
          })
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    )
  }

  protected deleteForceBase(ctx: StateContext<BaseStateModel<T>>, id: number, type: string) {
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();
    const entities = state.trashEntities.filter(item => item.id !== id);

    return this.service.deleteForce(id).pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          ctx.patchState({ trashEntities: entities, filterTrashEntities: entities, result: { title: response.title, message: response.message } })
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    )
  }

  protected deleteAllBase(ctx: StateContext<BaseStateModel<T>>, payload: T[], type: string) {
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();
    return this.service.deleteAll(payload).pipe(
      tap({
        next: (response: ApiResCollection<T>) => {
          const deletedIds = Object.values(response.data).map(item => item.id);
          const entities = state.entities.filter(item => !deletedIds.includes(item.id))
          const filterEntities = state.filterEntities.filter(item => !deletedIds.includes(item.id))

          ctx.patchState({
            entities,
            filterEntities,
            trashEntities: [...state.trashEntities, ...response.data],
            filterTrashEntities: [...state.filterTrashEntities, ...response.data],
            result: { title: response.title, message: response.message },
            trashes: response.trashes,
          })
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          this.toggleAllItem(ctx, false, TYPES.LIST);
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    )
  }

  protected deleteForceAllBase(ctx: StateContext<BaseStateModel<T>>, payload: T[], type: string) {
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();
    return this.service.deleteForceAll(payload).pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          const data = state.trashEntities;
          const entities = data.filter(item => !payload.some(element => element.id === item.id))

          ctx.patchState({ trashEntities: entities, filterTrashEntities: entities, result: { title: response.title, message: response.message } })
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    )
  }

  protected restoreBase(ctx: StateContext<BaseStateModel<T>>, id: number, type: string) {
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();
    return this.service.restore(id).pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          const sortField = this.getSortField();
          const data = [...state.entities, ...[response.data]];
          const dataFilter = [...state.filterEntities, ...[response.data]];
          const trashEntities = state.trashEntities.filter(item => item.id !== id);
          const filterTrashEntities = state.filterTrashEntities.filter(item => item.id !== id);

          const sortedData = sortField
            ? this.sortService.sortByDateField(data, sortField)
            : data;
          const sortedDataFilter = sortField
            ? this.sortService.sortByDateField(dataFilter, sortField)
            : dataFilter;
          const sortedDataTrashed = sortField
            ? this.sortService.sortByDateField(trashEntities, sortField)
            : trashEntities;
          const sortedDataFilterTrashed = sortField
            ? this.sortService.sortByDateField(filterTrashEntities, sortField)
            : filterTrashEntities;


          ctx.patchState({
            entities: sortedData,
            filterEntities: sortedDataFilter,
            trashEntities: sortedDataTrashed,
            filterTrashEntities: sortedDataFilterTrashed,
            result: { title: response.title, message: response.message },
            trashes: trashEntities.length,
          });
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      })
    )
  }

  protected restoreAllBase(ctx: StateContext<BaseStateModel<T>>, payload: T[], type: string) {
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();

    return this.service.restoreAll(payload).pipe(
      tap({
        next: (response: ApiResCollection<T>) => {
          const sortField = this.getSortField();
          const data = [...state.entities, ...response.data];
          const dataFilter = [...state.filterEntities, ...response.data];
          const trashEntities = state.trashEntities.filter(item => !payload.some(element => element.id === item.id));
          const filterTrashEntities = state.filterTrashEntities.filter(item => !payload.some(element => element.id === item.id));

          const sortedData = sortField
            ? this.sortService.sortByDateField(data, sortField)
            : data;
          const sortedDataFilter = sortField
            ? this.sortService.sortByDateField(dataFilter, sortField)
            : dataFilter;
          const sortedDataTrashed = sortField
            ? this.sortService.sortByDateField(trashEntities, sortField)
            : trashEntities;
          const sortedDataFilterTrashed = sortField
            ? this.sortService.sortByDateField(filterTrashEntities, sortField)
            : filterTrashEntities;

          ctx.patchState({
            entities: sortedData,
            filterEntities: sortedDataFilter,
            trashEntities: sortedDataTrashed,
            filterTrashEntities: sortedDataFilterTrashed,
            result: { title: response.title, message: response.message },
            trashes: trashEntities.length,
          });
        },
        error: () => {
          ctx.dispatch(new SetLoading(type, false));
        },
        finalize: () => {
          ctx.dispatch(new SetLoading(type, false));
        }
      }),
    )
  }

  protected toggleSelectionItem(ctx: StateContext<BaseStateModel<T>>, id: number, page?: string) {
    const state = ctx.getState();
    const data = page === TYPES.LIST ? state.entities : state.trashEntities;

    const entities = data.map(entity =>
      entity.id === id
        ? { ...entity, selected: !entity.selected }
        : entity
    );

    page === TYPES.LIST
      ? ctx.patchState({ entities, filterEntities: entities })
      : ctx.patchState({ trashEntities: entities, filterTrashEntities: entities })
  }

  protected toggleAllItem(ctx: StateContext<BaseStateModel<T>>, selected: boolean, page?: string) {
    const state = ctx.getState();
    const data = page === TYPES.LIST ? state.entities : state.trashEntities;

    const entities = data.map(entity => ({
      ...entity,
      selected: selected
    }));
    page === TYPES.LIST
      ? ctx.patchState({ entities, filterEntities: entities })
      : ctx.patchState({ trashEntities: entities, filterTrashEntities: entities })
  }

  protected filterBase(ctx: StateContext<BaseStateModel<T>>, payload: Partial<FilterStateModel>, page: string, columns: (keyof T)[]) {
    ctx.patchState({ loading: true });
    const state = ctx.getState();
    const { search, companyId, customerId, unitId, shiftId, centerId, typeworkerId } = payload;
    const data = page === TYPES.LIST ? state.entities : state.trashEntities;
    const filtered = data.filter((item: any) => {
      const matchDrop = (!companyId || item.company?.id === companyId) &&
                        (!customerId || item.customer?.id === customerId) &&
                        (!unitId || item.unit?.id === unitId) &&
                        (!shiftId || item.shift?.id === shiftId) &&
                        (!centerId || item.center?.id === centerId) &&
                        (!typeworkerId || item.typeworker?.id === typeworkerId);

      if(!search)
        return matchDrop;

      const matchSearch = !columns || columns.some((column) => {
        const value = item[column]?.toString().toLowerCase() || '';
        const normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedSearch = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedValue.includes(normalizedSearch);
      });

      return matchDrop && matchSearch;
    })

    page === TYPES.LIST
      ? ctx.patchState({ filterEntities: filtered })
      : ctx.patchState({ filterTrashEntities: filtered });

      ctx.patchState({ loading: false });
  }
}
