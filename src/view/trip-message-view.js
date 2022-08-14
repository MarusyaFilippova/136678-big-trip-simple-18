import {createElement} from '../render';

const createTripMessageTemplate = (message) => (`<p class="trip-events__msg">${message}</p>`);

export default class TripMessageView {
  #element = null;
  #message = null;

  constructor(message) {
    this.#message = message;
  }

  get template() {
    return createTripMessageTemplate(this.#message);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
