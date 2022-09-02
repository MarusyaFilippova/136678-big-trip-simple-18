import EventFormView from '../view/event-form-view';
import TripView from '../view/trip-view';
import { UpdateType, UserAction } from '../const';
import { isDatesEqual } from '../utils/date';
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

  constructor(container, changeData, changeMode) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (trip, tripsModel) => {
    this.#trip = trip;
    this.#tripsModel = tripsModel;
    this.#destinations = [...this.#tripsModel.destinations];
    this.#offers = [...this.#tripsModel.offers];

    const prevTripComponent = this.#tripComponent;
    const prevTripFormComponent = this.#tripFormComponent;

    this.#tripComponent = new TripView(trip);
    this.#tripFormComponent = new EventFormView(this.#offers, this.#destinations, this.#trip);

    this.#tripComponent.setRollUpButtonClick(this.#handleEditClick);
    this.#tripComponent.setFavoriteClick(this.#handleFavoriteClick);
    this.#tripFormComponent.setRollUpButtonClick(this.#handleFormClose);
    this.#tripFormComponent.setFormSubmit(this.#handleFormSubmit);
    this.#tripFormComponent.setFormDelete(this.#handleFormDelete);

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
      this.#tripFormComponent.reset(this.#trip);
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
    isEscKeyDown(evt, () => {
      this.#tripFormComponent.reset(this.#trip);
      this.#replaceFormToCard();
    });
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (trip) => {
    const isMinorUpdate = !isDatesEqual(this.#trip.dateFrom, trip.dateFrom);

    this.#changeData(
      UserAction.UPDATE_TRIP,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      trip,
    );
    this.#replaceFormToCard();
  };

  #handleFormDelete = (trip) => {
    this.#changeData(
      UserAction.DELETE_TRIP,
      UpdateType.MINOR,
      trip,
    );
  };

  #handleFormClose = () => {
    this.#tripFormComponent.reset(this.#trip);
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_TRIP,
      UpdateType.MINOR,
      {...this.#trip, isFavorite: !this.#trip.isFavorite},
    );
  };
}
