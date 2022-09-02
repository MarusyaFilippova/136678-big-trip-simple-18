import TripFiltersView from '../view/trip-filters-view';
import { FilterType, UpdateType } from '../const';
import { filterByType } from '../utils/filter';
import { remove, render, replace } from '../framework/render';

export default class FilterPresenter {
  #container = null;

  #filterModel = null;
  #tripsModel = null;

  #filtersComponent = null;

  constructor(container, filterModel, tripsModel) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#tripsModel = tripsModel;

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const trips = this.#tripsModel.trips;

    return Object.values(FilterType).map((type) => ({
      type,
      checked: type === this.#filterModel.filter,
      disabled: !filterByType[type](trips).length
    }));
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filtersComponent;

    this.#filtersComponent = new TripFiltersView(filters);
    this.#filtersComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (!prevFilterComponent) {
      render(this.#filtersComponent, this.#container);
      return;
    }

    replace(this.#filtersComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
