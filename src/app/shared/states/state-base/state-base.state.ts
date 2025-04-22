import { Injectable } from '@angular/core';
import { BaseModel } from '@shared/models/bases/base.model';
import { StateContext } from '@ngxs/store';
import { BaseService } from '@shared/services/base/base.service';
import { BaseStateModel } from '@shared/models/bases/basestate-model';
import { tap } from 'rxjs';
import { ApiResCollection, ApiResSingle } from '@shared/models/bases/response.model';
import { SetLoading } from '@shared/states/loading/loading.actions';
import { TYPES } from '@shared/utils/constants';
import { FilterOptions, FilterStateModel } from '@shared/models/ui/filter.model';

@Injectable()
export abstract class BaseState<T extends BaseModel, R>  {
  constructor(protected service: BaseService<T, R>) {}

  protected getAllBase(ctx: StateContext<BaseStateModel<T>>) {
    ctx.patchState({ loading: true });
    return this.service.getAll().pipe(
      tap({
        next: (response: ApiResCollection<T>) => {
          ctx.patchState({
            entities: response.data,
            filterEntities: response.data,
            trashes: response.trashes,
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

  protected getAllTrashBase(ctx: StateContext<BaseStateModel<T>>) {
    ctx.patchState({ loading: true });
    return this.service.getAllTrash().pipe(
      tap({
        next: (response: ApiResCollection<T>) => {
          ctx.patchState({
            trashEntities: response.data,
            filterTrashEntities: response.data
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
    return this.service.create(payload).pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          ctx.patchState({
            entities: [...ctx.getState().entities, response.data],
            filterEntities: [...ctx.getState().filterEntities, response.data],
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
          const updatedEntities = state.entities.map(entity =>
            entity.id === Number(id) ? { ...entity, ...response.data } : entity
          );
          ctx.patchState({
            entities: updatedEntities,
            filterEntities: updatedEntities,
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

    return this.service.delete(id).pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          ctx.patchState({
            entities,
            filterEntities: entities,
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
        next: (response: ApiResSingle<T>) => {
          const data = state.entities;
          const entities = data.filter(item => !payload.some(element => element.id === item.id))

          ctx.patchState({
            entities,
            filterEntities: entities,
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
          const entities = state.trashEntities.filter(item => item.id !== id);
          ctx.patchState({
            trashEntities: entities,
            filterTrashEntities: entities,
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

  protected restoreAllBase(ctx: StateContext<BaseStateModel<T>>, payload: T[], type: string) {
    ctx.dispatch(new SetLoading(type, true));
    const state = ctx.getState();
    const entities = state.trashEntities.filter(item =>
      !payload.some(element => element.id === item.id)
    );
    return this.service.restoreAll(payload).pipe(
      tap({
        next: (response: ApiResSingle<T>) => {
          ctx.patchState({
            trashEntities: entities,
            filterTrashEntities: entities,
            result: { title: response.title, message: response.message },
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
    const { search, categoryId } = payload;
    console.log('Busqueda', search);
    const data = page === TYPES.LIST ? state.entities : state.trashEntities;

    const filtered = data.filter((item: any) => {
      const matchDrop = !categoryId || item.category.id === categoryId;

      if(!search)
        return matchDrop;

      const matchSearch = !columns || columns.some((column) => {
        const value = item[column]?.toString().toLowerCase() || '';
        return value.includes(search.toLowerCase());
      });

      return matchDrop && matchSearch;
    })

    page === TYPES.LIST
      ? ctx.patchState({ filterEntities: filtered })
      : ctx.patchState({ filterTrashEntities: filtered });

      ctx.patchState({ loading: false });
  }
}
