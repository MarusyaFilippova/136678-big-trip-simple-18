const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
  EVENT: 'event',
  OFFERS: 'offers',
};

const TripMessage = {
  NO_FUTURE_EVENTS: 'There are no future events now',
  NO_PAST_EVENTS: 'There are no past events now',
  NO_EVENTS: 'Click New Event to create your first point',
  LOADING: 'Loading...',
};

export { TripMessage, FilterType, SortType };
