import EventListView from '../view/event-list-view';
import MessageView from '../view/message-view';
import EventPresenter from './event-presenter';
import EventNewPresenter from './event-new-presenter';
import SortView from '../view/sort-view';
import SortModel from '../model/sort-model';
import { filterByType } from '../utils/filter';
import { remove, render } from '../framework/render';
import {SortType, NoEventsMessage, UpdateType, UserAction, FilterType, LOADING_MESSAGE} from '../const';

export default class ListPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #sortModel = new SortModel();

  #eventListComponent = new EventListView();
  #sortComponent = null;
  #noEventComponent = null;

  #eventPresenter = new Map();
  #eventNewPresenter = null;

  #isLoading = true;

  constructor(container, pointsModel, filterModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#eventNewPresenter = new EventNewPresenter(this.#eventListComponent, this.#handleViewAction, this.#pointsModel);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    const events = this.#pointsModel.events;
    const filterType = this.#filterModel.filter;
    const filteredEvents = filterByType[filterType](events);

    filteredEvents.sort(this.#sortModel.sort);

    return filteredEvents;
  }

  init = () => {
    this.#renderEventSection();
  };

  createEvent = (callback) => {
    this.#sortModel.type = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#eventNewPresenter.init(callback);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data, this.#pointsModel, this.#filterModel);
        break;
      case UpdateType.MINOR:
        this.#clearEventSection();
        this.#renderEventSection();
        break;
      case UpdateType.MAJOR:
        this.#clearEventSection({resetSortType: true});
        this.#renderEventSection();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#noEventComponent);
        this.#renderEventSection();
        break;
    }
  };

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#sortModel.type === sortType) {
      return;
    }

    this.#sortModel.type = sortType;
    this.#clearEventSection();
    this.#renderEventSection();
  };

  #clearEventSection = (resetSortType = false) => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
    remove(this.#sortComponent);
    remove(this.#noEventComponent);

    if (resetSortType) {
      this.#sortModel.type = SortType.DAY;
    }
  };

  #renderEventSection = () => {
    const events = this.events;
    const eventCount = events.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!eventCount){
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEventList();
  };

  #renderEventList = () => {
    render(this.#eventListComponent, this.#container);

    this.events.forEach((event) => this.#renderEvent(event));
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(
      this.#eventListComponent,
      this.#handleViewAction,
      this.#handleModeChange,
    );
    eventPresenter.init(event, this.#pointsModel);
    this.#eventPresenter.set(event.id, eventPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#sortModel.sortColumns);
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoEvents = () => {
    this.#noEventComponent = new MessageView(NoEventsMessage[this.#filterModel.filter]);
    render(this.#noEventComponent, this.#container);
  };

  #renderLoading = () => {
    this.#noEventComponent = new MessageView(LOADING_MESSAGE);
    render(this.#noEventComponent, this.#container);
  };
}
