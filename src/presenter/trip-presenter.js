import EventFormView from '../view/event-form-view';
import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripView from '../view/trip-view';

import {render} from '../render';

export default class TripPresenter {
  tripListComponent = new TripListView();

  init = (tripContainer, pointsModal) => {
    this.tripContainer = tripContainer;
    this.pointsModal = pointsModal;
    this.trips = [...this.pointsModal.trips];
    this.destinations = [...this.pointsModal.destinations];
    this.offers = [...this.pointsModal.offers];

    render(new TripSortView(), this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(new EventFormView(this.offers, this.destinations, this.trips[0]), this.tripListComponent.element);

    for (let i = 0; i < this.trips.length; i++) {
      render(new TripView(this.trips[i]), this.tripListComponent.element);
    }
  };
}
