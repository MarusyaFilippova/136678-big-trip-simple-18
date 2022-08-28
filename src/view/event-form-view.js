import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const BLANK_EVENT = {
  basePrice: null,
  dateFrom: null,
  dateTo: null,
  destinationId: null,
  isFavorite: false,
  offers: [],
  type: null,
};

const createTypeTemplate = (type, checked) => (`
  <div class="event__type-item">
    <input
      id="event-type-${type}"
      class="event__type-input visually-hidden"
      type="radio"
      name="event-type"
      value="${type}"
      ${checked ? 'checked' : ''}
    >
    <label class="event__type-label event__type-label--${type}" for="event-type-${type}">${type}</label>
  </div>
`);

const createEventTypeTemplate = (types, type) => {
  const typesTemplate = types.map((item) => createTypeTemplate(item, item === type)).join('');
  const icon = type
    ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">`
    : '';

  return (`
    <div class="event__type-wrapper">
      <label class="event__type event__type-btn" for="event-type-toggle">
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
    <div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination">
        ${type || ''}
      </label>
      <input
        class="event__input event__input--destination"
        id="event-destination"
        type="text"
        name="event-destination"
        value="${destination?.name || ''}"
        list="destination-list"
        required
      >
      <datalist id="destination-list">
        ${optionsTemplate}
      </datalist>
    </div>
  `);
};

const createOfferTemplate = ({id, title, price}, checked) => (`
  <div class="event__offer-selector">
    <input
      class="event__offer-checkbox visually-hidden"
      id="event-offer-${id}"
      type="checkbox"
      name="event-offer-${id}"
      ${checked ? 'checked' : ''}
      required
    >
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
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
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
  if (!offers?.length) {
    return '';
  }

  const offerIds = eventOffers.map(({id}) => id);

  const offersTemplate = offers.map((offer) => createOfferTemplate(offer, offerIds.includes(offer.id))).join('');

  return (`
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
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

  const isSubmitDisabled = !dateFrom | !dateTo | !type | !eventDestination;

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${eventTypeTemplate}
          ${destinationTemplate}

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time">From</label>
            <input
              class="event__input event__input--time"
              id="event-start-time"
              type="text"
              name="event-start-time"
              required
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time">To</label>
            <input
              class="event__input event__input--time"
              id="event-end-time"
              type="text"
              name="event-end-time"
              required
            >
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input event__input--price"
              id="event-price"
              type="number"
              min="1"
              name="event-price"
              value="${basePrice || ''}"
              required
            >
          </div>
          <button class="event__save-btn btn btn--blue" type="submit" ${isSubmitDisabled ? 'disabled' : ''}>Save</button>
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

export default class EventFormView extends AbstractStatefulView {
  #datepicker = null;

  #destinations = null;
  #offers = null;

  constructor(offers, destinations, event = BLANK_EVENT) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;

    this._state = {...event};
    this.#setInnerHandlers();
  }

  get template() {
    return createEventFormTemplate(this._state, this.#destinations, this.#offers);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (event) => {
    this.updateElement({...event});
  };

  setRollUpButtonClick = (callback) => {
    this._callback.rollUpButtonClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpButtonHandler);
  };

  setFormSubmit = (callback) => {
    this._callback.submit = callback;
    this.#getFormElement().addEventListener('submit', this.#submitHandler);
  };

  setFormReset = (callback) => {
    this._callback.reset = callback;
    this.#getFormElement().addEventListener('reset', this.#resetHandler);
  };

  #getFormElement() {
    return this.element.querySelector('.event--edit');
  }

  #startTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate?.toISOString(),
    });
  };

  #endTimeChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate?.toISOString(),
    });
  };


  #setDatepicker = () => {
    const { dateFrom, dateTo } = this._state;
    const startDate = dateFrom && new Date(dateFrom);
    const endDate = dateTo && new Date(dateTo);

    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        defaultDate: startDate,
        enableTime: true,
        maxDate: endDate,
        dateFormat: 'd/m/y H:i',
        onChange: this.#startTimeChangeHandler,
      },
    );

    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time'),
      {
        defaultDate: endDate,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: startDate,
        onChange: this.#endTimeChangeHandler,
      },
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((input) => input.addEventListener('click', this.#offerClickHandler));
    this.#setDatepicker();
  };

  #rollUpButtonHandler = (evt) => {
    evt.preventDefault();

    this._callback.rollUpButtonClick();
  };

  #submitHandler = (evt) => {
    evt.preventDefault();

    this._callback.submit({...this._state});
  };

  #resetHandler = (evt) => {
    evt.preventDefault();

    this._callback.reset();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === evt.target.value),
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      basePrice: Number(evt.target.value),
    });
  };

  #offerClickHandler = (evt) => {
    evt.preventDefault();
    let offers = [...this._state.offers];

    const offerId = Number(evt.target.id.replace('event-offer-', ''));

    if (evt.target.checked) {
      const offersByType = this.#offers.find((item) => item.type === this._state.type).offers;
      const offer = offersByType.find(({id}) => offerId === id);
      offers.push(offer);
    }
    else {
      offers = this._state.offers.filter(({id}) => id !== offerId);
    }

    this.updateElement({
      offers,
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmit(this._callback.submit);
    this.setFormReset(this._callback.reset);
    this.setRollUpButtonClick(this._callback.rollUpButtonClick);
  };
}
