
import EventFormView from '../view/event-form-view';
import TripListView from '../view/trip-list-view';
import TripSortView from '../view/trip-sort-view';
import TripView from '../view/trip-view';

import {render} from '../render';

export default class TripPresenter {
  tripListElement = new TripListView();

  init = (tripContainer) => {
    this.tripContainer = tripContainer;

    render(new TripSortView(), this.tripContainer);
    render(this.tripListElement, this.tripContainer);
    render(new EventFormView(), this.tripListElement.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripView(), this.tripListElement.getElement());
    }
  };
}
