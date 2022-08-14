import TripFiltersView from './view/trip-filters-view';
import TripPresenter from './presenter/trip-presenter';
import { render } from './render';
import TripsModel from './model/trips-model';
const tripsModel = new TripsModel();

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');

const filtersElement = pageHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter();

render(new TripFiltersView(), filtersElement);
tripPresenter.init(tripEventsElement, tripsModel);
