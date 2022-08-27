import TripInfoView from '../view/trip-info-view';
import { formatTripDates, getEndPoint, getStartPoint } from '../utils/trip';
import { render } from '../framework/render';
import { sortByDate, sortTripByDay } from '../utils/sort';

export default class InfoPresenter {
  #container = null;
  #tripsModel = null;

  #trips = [];

  #startPoint = null;
  #endPoint = null;

  constructor(container, tripsModel) {
    this.#container = container;
    this.#tripsModel = tripsModel;
  }

  init = () => {
    this.#trips = [...this.#tripsModel.trips.sort(sortTripByDay)];
    this.#startPoint = getStartPoint(this.#trips);
    this.#endPoint = getEndPoint(this.#trips);

    render(new TripInfoView(this.#getTitle(), this.#getDates(), this.#getTotalCost()), this.#container);
  };

  #getTitle() {
    const cities = this.#trips
      .map(({destination}) => destination.name)
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
    const endDates = this.#trips.map((trip) => trip.dateTo);
    const endDate = endDates.sort(sortByDate)[endDates.length - 1];

    return formatTripDates(this.#startPoint.dateFrom, endDate);
  }

  #getTotalCost() {
    return this.#trips.reduce((cost, trip) => (cost += trip.basePrice), 0);
  }
}
