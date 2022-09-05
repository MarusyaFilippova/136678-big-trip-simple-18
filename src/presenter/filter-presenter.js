import FiltersView from '../view/filters-view';
import { FilterType, UpdateType } from '../const';
import { filterByType } from '../utils/filter';
import {remove, render, RenderPosition, replace} from '../framework/render';

export default class FilterPresenter {
  #container = null;

  #filterModel = null;
  #pointsModel = null;

  #filtersComponent = null;

  constructor(container, filterModel, pointsModel) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const events = this.#pointsModel.events;

    return Object.values(FilterType).map((type) => ({
      type,
      checked: type === this.#filterModel.filter,
      disabled: !filterByType[type](events).length
    }));
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView(filters);
    this.#filtersComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (!prevFilterComponent) {
      render(this.#filtersComponent, this.#container, RenderPosition.BEFOREEND);
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
