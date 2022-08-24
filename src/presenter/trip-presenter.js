import EventFormView from '../view/event-form-view';
import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripView from '../view/trip-view';

import {render, replace, remove} from '../framework/render';
import {isEscKeyDown} from '../utils/main';
import TripMessageView from '../view/trip-message-view';
import {TripMessage} from '../const';
import {filterByType} from '../utils/filter';

export default class TripPresenter {
  #container = null;
  #tripsModel = null;
  #filterModel = null;

  #tripListComponent = new TripListView();
  #tripFormComponent = null;
  #openedTripComponent = null;

  #trips = [];
  #destinations = [];
  #offers = [];
  #filteredTrips = [];

  constructor(container, tripsModel, filterModel) {
    this.#container = container;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
  }

  init = () => {
    this.#trips = [...this.#tripsModel.trips];
    this.#destinations = [...this.#tripsModel.destinations];
    this.#offers = [...this.#tripsModel.offers];
    this.#filteredTrips = filterByType[this.#filterModel.activeFilter]([...this.#trips]);

    if (!this.#trips.length){
      render(new TripMessageView(TripMessage.NO_EVENTS), this.#container);
      return;
    }

    render(new TripSortView(), this.#container);
    render(this.#tripListComponent, this.#container);

    this.#filteredTrips.forEach(this.#renderTrip);
  };

  #renderTrip = (trip) => {
    const tripComponent = new TripView(trip);

    tripComponent.setRollUpButtonClick(this.#replaceCardToForm);

    render(tripComponent, this.#tripListComponent.element);
  };

  #replaceFormToCard = () => {
    replace(this.#openedTripComponent, this.#tripFormComponent);
    remove(this.#tripFormComponent);
    this.#openedTripComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceCardToForm = (trip, tripComponent) => {
    if (this.#openedTripComponent) {
      this.#replaceFormToCard();
    }

    this.#openedTripComponent = tripComponent;
    this.#tripFormComponent = new EventFormView(this.#offers, this.#destinations, trip);

    replace(this.#tripFormComponent, tripComponent);

    this.#tripFormComponent.setRollUpButtonClick(this.#replaceFormToCard);
    this.#tripFormComponent.setFormSubmit(this.#replaceFormToCard);
    this.#tripFormComponent.setFormReset(this.#replaceFormToCard);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    isEscKeyDown(evt, this.#replaceFormToCard);
  };
}
