import AbstractView from '../framework/view/abstract-view';

const createSortItemTemplate = ({type, checked = false, disabled = false}) => (`
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input
      id="sort-${type}"
      class="trip-sort__input visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${type}"
      ${checked ? 'checked' : ''}
      ${disabled ? 'disabled' : ''}
    >
    <label class="trip-sort__btn" for="sort-day" data-sort-type="${type}" data-disabled="${disabled}">${type}</label>
  </div>
`);

const createTripSortTemplate = (items) => {
  const sortItemsTemplate = items.map(createSortItemTemplate).join('');
  return (`
    <form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>
  `);
};

export default class TripSortView extends AbstractView {
  #sortColumns = [];

  constructor(sortColumns) {
    super();
    this.#sortColumns = sortColumns;
  }

  get template() {
    return createTripSortTemplate(this.#sortColumns);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();

    if (evt.target.dataset.disabled === 'true') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
