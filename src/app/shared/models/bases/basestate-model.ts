import { BaseModel } from "@shared/models/bases/base.model";

export interface BaseStateModel<T extends BaseModel> {
  entities: T[];
  filterEntities: T[];
  trashEntities: T[];
  filterTrashEntities: T[];
  options?: T[];
  selectedEntity: T | null;
  trashes: number;
  loading: boolean;
  loaded: boolean;
  loadedTrash: boolean;
  result: {
    title?: string,
    message?: string,
  } | null
}

export const INITIAL_VALUES_BASE = {
  entities: [],
  filterEntities: [],
  trashEntities: [],
  filterTrashEntities: [],
  selectedEntity: null,
  trashes: 0,
  loading: false,
  loaded: false,
  loadedTrash: false,
  result: null
};
