import Observable from '../framework/observable';
import { generatePoint } from '../mock/point';
import {getDestinations} from '../mock/destinations';
import {getOffers} from '../mock/offers';

const POINT_AMOUNT = 5;

export default class TripsModel extends Observable {
  #points = Array.from({length: POINT_AMOUNT}, generatePoint);
  #destinations = getDestinations();
  #offers = getOffers();
  #trips = this.#points.map((point) => this.#supplementPoint(point));

  get trips() {
    return this.#trips;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updateTrip = (updateType, updatedTrip) => {
    const index = this.#trips.findIndex((trip) => trip.id === updatedTrip.id);

    if (index === -1) {
      throw Error('Can\'t update unexciting trip');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      updatedTrip,
      ...this.#trips.slice(index + 1),
    ];

    this._notify(updateType, updatedTrip);
  };

  addTrip = (updateType, newTrip) => {
    this.#trips = [
      newTrip,
      ...this.#trips,
    ];

    this._notify(updateType, newTrip);
  };

  deleteTrip = (updateType, removedTrip) => {
    const index = this.#trips.findIndex((trip) => trip.id === removedTrip.id);

    if (index === -1) {
      throw Error('Can\'t delete unexciting trip');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      ...this.#trips.slice(index + 1),
    ];

    this._notify(updateType, removedTrip);
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
