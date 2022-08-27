import TripFiltersView from '../view/trip-filters-view';
import { render } from '../framework/render';

export default class FilterPresenter {
  #container = null;
  #filterModel = null;
  #filtersComponent = null;

  constructor(container, filterModel) {
    this.#container = container;
    this.#filterModel = filterModel;
  }

  init = () => {
    this.#filtersComponent = new TripFiltersView(this.#filterModel.filters);

    render(this.#filtersComponent, this.#container);
    this.#filtersComponent.setFilterClick(this.#filterChange);
  };

  #filterChange = (type) => {
    this.#filterModel.activeFilter = type;
  };
}
