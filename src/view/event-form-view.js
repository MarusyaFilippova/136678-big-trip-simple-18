import { createElement } from '../render';
import {getFormattedDate} from '../utils';

const createTypeTemplate = (type, checked) => (`
  <div class="event__type-item">
    <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${type}</label>
  </div>
`);

const createEventTypeTemplate = (types, type) => {
  const typesTemplate = types.map((item) => createTypeTemplate(item, item === type)).join('');
  const icon = type ? `<img className="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">` : '';

  return (`
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle">
        <span class="visually-hidden">Choose event type</span>
        ${icon}
      </label>
      <input class="event__type-toggle visually-hidden" id="event-type-toggle" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${typesTemplate}
        </fieldset>
      </div>
    </div>
  `);
};

const createEventDestinationTemplate = (type, eventDestination, destinations) => {
  const optionsTemplate = destinations.map(({name}) => `<option value="${name}"></option>`).join('');
  const destination = destinations.find((item) => eventDestination?.id === item.id);

  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination">
        ${type || ''}
      </label>
      <input class="event__input  event__input--destination" id="event-destination" type="text" name="event-destination" value="${destination?.name || ''}" list="destination-list">
      <datalist id="destination-list">
        ${optionsTemplate}
      </datalist>
    </div>
  `);
};

const createOfferTemplate = ({id, title, price}, checked) => (`
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${checked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`);

const createDestinationSection = (eventDestination, destinations) => {
  const destination = destinations.find((item) => item.id === eventDestination?.id);

  if (!destination) {
    return '';
  }

  const picturesTemplate = destination?.pictures?.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('') || '';

  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination?.description || ''}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${picturesTemplate}
        </div>
      </div>
    </section>
  `);
};

const createOffersSection = (eventOffers, offers) => {
  if (!eventOffers?.length) {
    return '';
  }

  const offerIds = eventOffers.map(({id}) => id);

  const offersTemplate = offers.map((offer) => createOfferTemplate(offer, offerIds.includes(offer.id))).join('');

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>
  `);
};

const createEventFormTemplate = (event, destinations, offers) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination: eventDestination,
    offers: eventOffers,
    type,
  } = event;

  const types = offers.map((offer) => offer.type);
  const offerByType = offers.find((item) => item.type === type);

  const eventTypeTemplate = createEventTypeTemplate(types, type);
  const destinationTemplate = createEventDestinationTemplate(type, eventDestination, destinations);
  const offersSection = createOffersSection(eventOffers, offerByType?.offers);
  const destinationSection = createDestinationSection(eventDestination, destinations);

  const startDate = getFormattedDate(dateFrom, 'DD/MM/YY HH:mm');
  const endDate = getFormattedDate(dateTo, 'DD/MM/YY HH:mm');

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${eventTypeTemplate}
          ${destinationTemplate}

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time">From</label>
            <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${startDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time">To</label>
            <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${endDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value="${basePrice || ''}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Close event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersSection}
          ${destinationSection}
        </section>
      </form>
    </li>
  `);
};

export default class EventFormView {
  #element = null;
  #destinations = null;
  #offers = null;
  #event = null;

  constructor(offers, destinations, point) {
    this.#destinations = destinations;
    this.#offers = offers;

    this.#event = point ? point : this.#getNewEvent();
  }

  get template() {
    return createEventFormTemplate(this.#event, this.#destinations, this.#offers);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  set element(value) {
    this.#element = value;
  }

  removeElement() {
    this.#element = null;
  }

  #getNewEvent() {
    return ({
      basePrice: null,
      dateFrom: null,
      dateTo: null,
      destinationId: null,
      isFavorite: false,
      offers: [],
      type: null,
    });
  }
}
