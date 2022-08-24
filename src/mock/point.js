import {getRandomElement, getRandomInteger, shuffleElements} from '../utils/mock';
import {getDestinations} from './destinations';
import {getOffers} from './offers';

const initialDestinations = getDestinations();
const initialOffers = getOffers();
const offerTypes = initialOffers.map((offer) => offer.type);

const getOfferIds = (type) => {
  const offers = initialOffers.find((offer) => offer.type === type).offers;

  return shuffleElements(offers).slice(0, getRandomInteger(0, offers.length)).map((offer) => offer.id);
};

export const generatePoint = () => {
  const type = getRandomElement(offerTypes);
  const offers = getOfferIds(type);

  return ({
    id: getRandomInteger(0, 1000),
    basePrice: getRandomInteger(500, 1500),
    dateFrom: `2022-01-0${getRandomInteger(1, 4)}T11:55:56`,
    dateTo: `2022-01-0${getRandomInteger(4, 9)}T15:55:13`,
    destination: getRandomElement(initialDestinations).id,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers,
    type,
  });
};
