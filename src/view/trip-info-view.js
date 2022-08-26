import AbstractView from '../framework/view/abstract-view';

const createTripInfoTemplate = (title, dates, total) => (`
  <section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>
  </section>
`);

export default class TripInfoView extends AbstractView {
  #title = null;
  #dates = null;
  #total = null;

  constructor(title, dates, total) {
    super();
    this.#title = title;
    this.#dates = dates;
    this.#total = total;
  }

  get template() {
    return createTripInfoTemplate(this.#title, this.#dates, this.#total);
  }
}
