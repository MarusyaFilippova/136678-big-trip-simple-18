import AbstractView from '../framework/view/abstract-view';

const createTripMessageTemplate = (message) => (`<p class="trip-events__msg">${message}</p>`);

export default class TripMessageView extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createTripMessageTemplate(this.#message);
  }
}
