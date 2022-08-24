import AbstractView from '../framework/view/abstract-view';
import {ColumnByType} from '../const';

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
    <label class="trip-sort__btn" for="sort-day">${type}</label>
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
  #items = Object.values(ColumnByType);

  get template() {
    return createTripSortTemplate(this.#items);
  }
}
