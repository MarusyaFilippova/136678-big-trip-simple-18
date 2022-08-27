import { SortColumn } from '../utils/sort';
import { SortType } from '../const';

export default class SortModel {
  #type = SortType.DAY;

  set type(sortType) {
    this.#type = sortType;
  }

  get type() {
    return this.#type;
  }

  get sortColumns() {
    return Object.values(SortColumn).map((item) => ({
      ...item,
      checked: item.type === this.#type,
    }));
  }

  get sort() {
    return SortColumn[this.type].sort;
  }
}
