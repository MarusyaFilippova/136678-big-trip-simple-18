import TripInfoView from '../view/trip-info-view';
import { formatTripDates, getEndPoint, getStartPoint } from '../utils/trip';
import {render, RenderPosition} from '../framework/render';
import { sortByDate, sortTripByDay } from '../utils/sort';

export default class InfoPresenter {
  #container = null;
  #pointsModel = null;

  #events = [];

  #startPoint = null;
  #endPoint = null;

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#events = [...this.#pointsModel.events.sort(sortTripByDay)];
    this.#startPoint = getStartPoint(this.#events);
    this.#endPoint = getEndPoint(this.#events);

    render(new TripInfoView(this.#getTitle(), this.#getDates(), this.#getTotalCost()), this.#container, RenderPosition.AFTERBEGIN);
  };

  #getTitle() {
    const cities = this.#events
      .map(({destination}) => destination?.name)
      .reduce((items, city) => {
        if (items[items.length - 1] !== city) {
          items.push(city);
        }
        return items;
      }, []);

    if (cities.length < 4) {
      return cities.join(' - ');
    }

    return `${cities[0]} - ... - ${cities[cities.length - 1]}`;
  }

  #getDates() {
    const endDates = this.#events.map((event) => event.dateTo);
    const endDate = endDates.sort(sortByDate)[endDates.length - 1];

    return formatTripDates(this.#startPoint.dateFrom, endDate);
  }

  #getTotalCost() {
    return this.#events.reduce((cost, event) => (cost += event.basePrice), 0);
  }
}
