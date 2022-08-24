import { FilterType } from '../const';

export default class FilterModel {
  #activeFilter = FilterType.EVERYTHING;
  #disabledFilters = [];

  get filters() {
    return Object.values(FilterType).reduce((filters, type) => {
      filters[type] = {
        type,
        checked: type === this.#activeFilter,
        disabled: this.disabledFilters.includes(type),
      };
      return filters;
    }, {});
  }

  get activeFilter() {
    return this.#activeFilter;
  }

  set activeFilter(type) {
    this.#activeFilter = type;
  }

  get disabledFilters() {
    return this.#disabledFilters;
  }

  set disabledFilters(filters) {
    this.#disabledFilters = filters;
  }
}
