import FrameworkApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ApiService extends FrameworkApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  addPoint = async (point) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deletePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (point) => {
    const {
      destination,
      basePrice,
      dateFrom,
      dateTo,
      isFavorite,
      offers,
    } = point;

    const adaptedPoint = {...point,
      'base_price': basePrice,
      'date_from': dateFrom instanceof Date ? dateFrom.toISOString() : dateFrom,
      'date_to': dateTo instanceof Date ? dateTo.toISOString() : dateTo,
      'is_favorite': isFavorite,
      offers: offers.map(({ id }) => id),
    };

    if (typeof destination === 'object') {
      adaptedPoint.destination = destination.id;
    }

    if (offers && typeof offers[0] === 'object') {
      adaptedPoint.offers = offers.map(({ id }) => id);
    }

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  };
}
