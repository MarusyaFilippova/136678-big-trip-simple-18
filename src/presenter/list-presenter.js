import TripListView from '../view/trip-list-view';
import TripMessageView from '../view/trip-message-view';
import TripPresenter from './trip-presenter';
import TripSortView from '../view/trip-sort-view';
import { filterByType } from '../utils/filter';
import { render } from '../framework/render';
import { TripMessage } from '../const';
import {updateItem} from '../utils/main';

export default class ListPresenter {
  #container = null;
  #tripsModel = null;
  #filterModel = null;

  #tripListComponent = new TripListView();

  #trips = [];
  #filteredTrips = [];
  #tripPresenter = new Map();

  constructor(container, tripsModel, filterModel) {
    this.#container = container;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
  }

  init = () => {
    this.#trips = [...this.#tripsModel.trips];
    this.#filteredTrips = filterByType[this.#filterModel.activeFilter]([...this.#trips]);

    if (!this.#trips.length){
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
  };

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleTripChange = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);
    this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
  };

  #clearTripList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#container);

    this.#filteredTrips.forEach((trip) => this.#renderTrip(trip));
  };

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(
      this.#tripListComponent,
      this.#tripsModel,
      this.#handleTripChange,
      this.#handleModeChange
    );
    tripPresenter.init(trip);
    this.#tripPresenter.set(trip.id, tripPresenter);
  };

  #renderSort = () => {
    render(new TripSortView(), this.#container);
  };

  #renderNoEvents = () => {
    render(new TripMessageView(TripMessage.NO_EVENTS), this.#container);
  };
}
