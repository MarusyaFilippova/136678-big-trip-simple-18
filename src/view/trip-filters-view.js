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
  const filtersTemplate = Object.values(filters).map(createFilterTemplate).join('');
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
  #filters = {};

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTripFiltersTemplate(this.#filters);
  }

  #getFilterByType(type) {
    return this.#filters[type];
  }

  setFilterClick = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#filterHandler);
  };

  #filterHandler = (evt) => {
    evt.preventDefault();
    const type = evt.target.getAttribute('data-type');
    const filter = type ? this.#getFilterByType(type) : null;

    if (!this.#checkTargetClass(evt.target) || !type || filter.disabled || filter.checked) {
      return;
    }
    this._callback.click(type);
  };

  #checkTargetClass = (target) => target.classList.contains('trip-filters__filter-label');
}
