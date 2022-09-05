import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class PointsModel extends Observable {
  #apiService = null;
  #points = [];
  #events = [];
  #destinations = [];
  #offers = [];

  constructor(tasksApiService) {
    super();
    this.#apiService = tasksApiService;
  }

  init = async () => {
    try {
      const points = await this.#apiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.#apiService.offers;
      this.#destinations = await this.#apiService.destinations;

      this.#events = this.#points.map((point) => this.#supplementPoint(point));
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  };

  get points() {
    return this.#points;
  }

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updatePoint = async (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw Error('Can\'t update unexciting point');
    }

    try {
      const response = await this.#apiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedPoint,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  };

  addPoint = (updateType, newPoint) => {
    this.#events = [
      newPoint,
      ...this.#events,
    ];

    this._notify(updateType, newPoint);
  };

  deletePoint = (updateType, removedPoint) => {
    const index = this.#events.findIndex((event) => event.id === removedPoint.id);

    if (index === -1) {
      throw Error('Can\'t delete unexciting point');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, removedPoint);
  };

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };

  #supplementPoint(point) {
    const {
      destination: destinationId,
      offers: offerIds
    } = point;
    const destination = this.destinations.find((({id}) => id === destinationId));
    const offerByType = this.offers.find(({type}) => type === point.type);
    const offers = offerByType.offers.filter(({id}) => offerIds.includes(id));

    return {
      ...point,
      destination,
      offers,
    };
  }
}
