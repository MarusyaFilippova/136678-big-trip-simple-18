import TripListView from '../view/trip-list-view';
import TripMessageView from '../view/trip-message-view';
import TripPresenter from './trip-presenter';
import TripSortView from '../view/trip-sort-view';
import SortModel from '../model/sort-model';
import { filterByType } from '../utils/filter';
import { remove, render } from '../framework/render';
import { SortType, NoEventsMessage, UpdateType, UserAction } from '../const';

export default class ListPresenter {
  #container = null;
  #tripsModel = null;
  #filterModel = null;
  #sortModel = new SortModel();

  #tripListComponent = new TripListView();
  #sortComponent = null;
  #noEventComponent = null;

  #tripPresenter = new Map();

  constructor(container, tripsModel, filterModel) {
    this.#container = container;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    const trips = this.#tripsModel.trips;
    const filterType = this.#filterModel.filter;
    const filteredTrips = filterByType[filterType](trips);

    filteredTrips.sort(this.#sortModel.sort);

    return filteredTrips;
  }

  init = () => {
    this.#renderTripSection();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this.#tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this.#tripsModel.deleteTrip(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenter.get(data.id).init(data, this.#tripsModel);
        break;
      case UpdateType.MINOR:
        this.#clearTripSection();
        this.#renderTripSection();
        break;
      case UpdateType.MAJOR:
        this.#clearTripSection({resetSortType: true});
        this.#renderTripSection();
        break;
    }
  };

  #handleModeChange = () => {
    this.#tripPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#sortModel.type === sortType) {
      return;
    }

    this.#sortModel.type = sortType;
    this.#clearTripSection();
    this.#renderTripSection();
  };

  #clearTripSection = (resetSortType = false) => {
    this.#tripPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPresenter.clear();
    remove(this.#sortComponent);
    remove(this.#noEventComponent);

    if (resetSortType) {
      this.#sortModel.type = SortType.DAY;
    }
  };

  #renderTripSection = () => {
    const trips = this.trips;
    const tripCount = trips.length;

    if (!tripCount){
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#container);

    this.trips.forEach((trip) => this.#renderTrip(trip));
  };

  #renderTrip = (trip) => {
    const tripPresenter = new TripPresenter(
      this.#tripListComponent,
      this.#handleViewAction,
      this.#handleModeChange,
    );
    tripPresenter.init(trip, this.#tripsModel);
    this.#tripPresenter.set(trip.id, tripPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new TripSortView(this.#sortModel.sortColumns);
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoEvents = () => {
    this.#noEventComponent = new TripMessageView(NoEventsMessage[this.#filterModel.filter]);
    render(this.#noEventComponent, this.#container);
  };
}
