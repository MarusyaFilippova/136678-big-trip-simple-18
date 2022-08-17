import EventFormView from '../view/event-form-view';
import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripView from '../view/trip-view';

import {render, replace, remove} from '../framework/render';
import {isEscKeyDown} from '../utils';
import TripMessageView from '../view/trip-message-view';
import {TripMessage} from '../const';

export default class TripPresenter {
  #tripContainer = null;
  #tripsModel = null;

  #tripListComponent = new TripListView();
  #tripFormComponent = null;
  #openedTripComponent = null;

  #trips = [];
  #destinations = [];
  #offers = [];

  init = (tripContainer, tripsModel) => {
    this.#tripContainer = tripContainer;
    this.#tripsModel = tripsModel;
    this.#trips = [...this.#tripsModel.trips];
    this.#destinations = [...this.#tripsModel.destinations];
    this.#offers = [...this.#tripsModel.offers];

    if (!this.#trips.length){
      render(new TripMessageView(TripMessage.EMPTY_LIST), this.#tripContainer);
      return;
    }

    render(new TripSortView(), this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);

    this.#trips.forEach(this.#renderTrip);
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
