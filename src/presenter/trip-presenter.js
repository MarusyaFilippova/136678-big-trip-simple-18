import EventFormView from '../view/event-form-view';
import TripView from '../view/trip-view';
import { isEscKeyDown } from '../utils/main';
import { remove, render, replace } from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPresenter {
  #container = null;
  #tripsModel = null;
  #changeData = null;
  #changeMode = null;

  #tripComponent = null;
  #tripFormComponent = null;

  #trip = null;
  #mode = Mode.DEFAULT;

  #destinations = null;
  #offers = null;

  constructor(container, tripsModel, changeData, changeMode) {
    this.#container = container;
    this.#tripsModel = tripsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#destinations = [...this.#tripsModel.destinations];
    this.#offers = [...this.#tripsModel.offers];
  }

  init = (trip) => {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevTripFormComponent = this.#tripFormComponent;

    this.#tripComponent = new TripView(trip);
    this.#tripFormComponent = new EventFormView(this.#offers, this.#destinations, this.#trip);

    this.#tripComponent.setRollUpButtonClick(this.#handleEditClick);
    this.#tripComponent.setFavoriteClick(this.#handleFavoriteClick);
    this.#tripFormComponent.setRollUpButtonClick(this.#handleFormClose);
    this.#tripFormComponent.setFormSubmit(this.#handleFormSubmit);
    this.#tripFormComponent.setFormReset(this.#handleFormReset);

    if (prevTripComponent === null) {
      render(this.#tripComponent, this.#container.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripFormComponent, prevTripFormComponent);
    }

    remove(prevTripComponent);
    remove(prevTripFormComponent);
  };

  destroy = () => {
    remove(this.#tripComponent);
    remove(this.#tripFormComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  #replaceFormToCard = () => {
    replace(this.#tripComponent, this.#tripFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #replaceCardToForm = () => {
    replace(this.#tripFormComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #escKeyDownHandler = (evt) => {
    isEscKeyDown(evt, this.#replaceFormToCard);
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (trip) => {
    this.#changeData(trip);
    this.#replaceFormToCard();
  };

  #handleFormReset = () => {
    this.#replaceFormToCard();
  };

  #handleFormClose = () => {
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#trip, isFavorite: !this.#trip.isFavorite});
  };
}
