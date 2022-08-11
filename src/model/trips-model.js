import { generatePoint } from '../mock/point';
import {DESTINATIONS, OFFERS} from '../const';

const POINT_AMOUNT = 5;

export default class TripsModel {
  #points = Array.from({length: POINT_AMOUNT}, generatePoint);
  #destinations = DESTINATIONS;
  #offers = OFFERS;
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
