import TripListView from '../view/trip-list-view';
import TripMessageView from '../view/trip-message-view';
import TripPresenter from './trip-presenter';
import TripSortView from '../view/trip-sort-view';
import SortModel from '../model/sort-model';
import { filterByType } from '../utils/filter';
import { remove, render } from '../framework/render';
import { TripMessage } from '../const';
import { updateItem } from '../utils/main';

export default class ListPresenter {
  #container = null;
  #tripsModel = null;
  #filterModel = null;
  #sortModel = new SortModel();

  #tripListComponent = new TripListView();
  #sortComponent = null;

  #trips = [];
  #tripPresenter = new Map();

  constructor(container, tripsModel, filterModel) {
    this.#container = container;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
  }

  init = () => {
    this.#trips = [...this.#tripsModel.trips];

    if (!this.#trips.length){
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
  };

  get #filteredTrips() {
    const filteredTrips = filterByType[this.#filterModel.activeFilter]([...this.#trips]);

    filteredTrips.sort(this.#sortModel.sort);

    return filteredTrips;
  }

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleTripChange = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);
    this.#tripPresenter.get(updatedTrip.id).init(updatedTrip);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#sortModel.type === sortType) {
      return;
    }

    this.#sortModel.type = sortType;
    this.#clearTripList();
    this.#renderSort();
    this.#renderTripList();
  };

  #clearTripList = () => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
    remove(this.#sortComponent);
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
    this.#sortComponent = new TripSortView(this.#sortModel.sortColumns);
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoEvents = () => {
    render(new TripMessageView(TripMessage.NO_EVENTS), this.#container);
  };
}
