import {getRandomElement, getRandomInteger, shuffleElements} from '../utils';
import {DESTINATIONS, OFFER_TYPES, OFFERS} from '../const';

const getOfferIds = (type) => {
  const offers = OFFERS.find((offer) => offer.type === type).offers;

  return shuffleElements(offers).slice(0, getRandomInteger(0, offers.length)).map((offer) => offer.id);
};

export const generatePoint = () => {
  const type = getRandomElement(OFFER_TYPES);
  const offers = getOfferIds(type);

  return ({
    id: getRandomInteger(0, 1000),
    basePrice: getRandomInteger(500, 1500),
    dateFrom: `2022-01-0${getRandomInteger(1, 4)}T11:55:56`,
    dateTo: `2022-01-0${getRandomInteger(4, 9)}T15:55:13`,
    destination: getRandomElement(DESTINATIONS).id,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers,
    type,
  });
};
