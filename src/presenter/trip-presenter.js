import EventFormView from '../view/event-form-view';
import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripView from '../view/trip-view';

import {render} from '../render';

export default class TripPresenter {
  #tripContainer = null;
  #tripsModel = null;

  #tripListComponent = new TripListView();

  #trips = [];
  #destinations = [];
  #offers = [];

  init = (tripContainer, tripsModel) => {
    this.#tripContainer = tripContainer;
    this.#tripsModel = tripsModel;
    this.#trips = [...this.#tripsModel.trips];
    this.#destinations = [...this.#tripsModel.destinations];
    this.#offers = [...this.#tripsModel.offers];

    render(new TripSortView(), this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);
    render(new EventFormView(this.#offers, this.#destinations, this.#trips[0]), this.#tripListComponent.element);

    this.#trips.forEach(this.#renderTrip);
  };

  #renderTrip = (trip) => {
    const tripComponent = new TripView(trip);

    render(tripComponent, this.#tripListComponent.element);
  };
}
