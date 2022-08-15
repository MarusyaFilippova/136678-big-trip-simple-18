import EventFormView from '../view/event-form-view';
import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripView from '../view/trip-view';

import {render} from '../render';
import {isEscKeyDown} from '../utils';

export default class TripPresenter {
  #tripContainer = null;
  #tripsModel = null;

  #tripListComponent = new TripListView();
  #tripFormComponent = null;
  #openedTripComponent = null;

  #trips = [];
  #destinations = [];
  #offers = [];

  init = (tripContainer, tripsModel) => {
    this.#tripContainer = tripContainer;
    this.#tripsModel = tripsModel;
    this.#trips = [...this.#tripsModel.trips];
    this.#destinations = [...this.#tripsModel.destinations];
    this.#offers = [...this.#tripsModel.offers];

    render(new TripSortView(), this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);

    this.#trips.forEach(this.#renderTrip);
  };

  #renderTrip = (trip) => {
    const tripComponent = new TripView(trip);
    const rollupButtonElement = tripComponent.element.querySelector('.event__rollup-btn');

    const replaceFormToCard = () => {
      this.#openedTripComponent = null;
      this.#tripListComponent.element.replaceChild(tripComponent.element, this.#tripFormComponent.element);
      this.#tripFormComponent.removeElement();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    function onEscKeyDown(evt) {
      isEscKeyDown(evt, replaceFormToCard);
    }

    const formSubmitHandler = (evt) => {
      evt.preventDefault();
      replaceFormToCard();
    };

    const formResetHandler = () => {
      replaceFormToCard();
    };

    const replaceCardToForm = () => {
      if (this.#openedTripComponent) {
        this.#tripListComponent.element.replaceChild(this.#openedTripComponent.element, this.#tripFormComponent.element);
        this.#tripFormComponent.removeElement();
        document.removeEventListener('keydown', onEscKeyDown);
      }

      this.#openedTripComponent = tripComponent;
      this.#tripFormComponent = new EventFormView(this.#offers, this.#destinations, trip);
      this.#tripListComponent.element.replaceChild(this.#tripFormComponent.element, tripComponent.element);
      const expandButtonElement = this.#tripFormComponent.element.querySelector('.event__rollup-btn');
      const editFormElement = this.#tripFormComponent.element.querySelector('.event--edit');

      expandButtonElement.addEventListener('click', replaceFormToCard);
      editFormElement.addEventListener('submit', formSubmitHandler);
      editFormElement.addEventListener('reset', formResetHandler);

      document.addEventListener('keydown', onEscKeyDown);
    };

    rollupButtonElement.addEventListener('click', () => replaceCardToForm());

    render(tripComponent, this.#tripListComponent.element);
  };
}
