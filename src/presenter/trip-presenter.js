import EventFormView from '../view/event-form-view';
import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripView from '../view/trip-view';

import {render} from '../render';

export default class TripPresenter {
  tripListComponent = new TripListView();

  init = (tripContainer) => {
    this.tripContainer = tripContainer;

    render(new TripSortView(), this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(new EventFormView(), this.tripListComponent.element);

    for (let i = 0; i < 3; i++) {
      render(new TripView(), this.tripListComponent.element);
    }
  };
}
