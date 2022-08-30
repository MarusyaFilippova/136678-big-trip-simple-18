import AbstractView from '../framework/view/abstract-view';

const createFilterTemplate = ({type, checked, disabled}) => (`
  <div class="trip-filters__filter">
    <input
      id="filter-${type}"
      class="trip-filters__filter-input visually-hidden"
      type="radio" name="trip-filter"
      value="${type}"
      ${checked ? 'checked' : ''}
      ${disabled ? 'disabled' : ''}
    >
    <label data-type="${type}" class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>
`);

const createTripFiltersTemplate = (filters) => {
  const filtersTemplate = filters.map(createFilterTemplate).join('');
  return (`
    <div class="trip-main__trip-controls trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${filtersTemplate}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>
  `);
};

export default class TripFiltersView extends AbstractView {
  #filters = [];

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTripFiltersTemplate(this.#filters);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
