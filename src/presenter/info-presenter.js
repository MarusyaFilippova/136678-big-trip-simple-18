import TripInfoView from '../view/trip-info-view';
import { formatTripDates, getStartPoint } from '../utils/trip';
import { remove, render, RenderPosition } from '../framework/render';
import { sortByDate, sortTripByDay } from '../utils/sort';

export default class InfoPresenter {
  #container = null;
  #pointsModel = null;

  #events = [];

  #tripInfoView = null;

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#events = [...this.#pointsModel.events.sort(sortTripByDay)];

    if (!this.#events.length) {
      this.destroy();
      return;
    }

    const startPoint = getStartPoint(this.#events);

    this.#tripInfoView = new TripInfoView(this.#getTitle(), this.#getDates(startPoint), this.#getTotalCost());
    render(this.#tripInfoView, this.#container, RenderPosition.AFTERBEGIN);
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

  #getDates(startPoint) {
    const endDates = this.#events.map((event) => event.dateTo);
    const endDate = endDates.sort(sortByDate)[endDates.length - 1];

    return formatTripDates(startPoint.dateFrom, endDate);
  }

  #getEventPrice({basePrice, offers}) {
    return offers.reduce((price, offer = {}) => price + offer?.price, basePrice);
  }

  #getTotalCost() {
    return this.#events.reduce((cost, event) => (cost + this.#getEventPrice(event)), 0);
  }

  destroy = () => {
    remove(this.#tripInfoView);
  };
}
