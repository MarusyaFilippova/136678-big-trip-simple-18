import AddEventButtonView from '../view/add-event-button-view';
import FilterModel from '../model/filter-model';
import FilterPresenter from './filter-presenter';
import InfoPresenter from './info-presenter';
import ListPresenter from './list-presenter';
import TripsModel from '../model/trips-model';
import { render, RenderPosition } from '../framework/render';

export default class MainPresenter {
  #headerContainer = null;
  #mainContainer = null;

  #tripsModel = new TripsModel();
  #filterModel = new FilterModel();

  #infoPresenter = null;
  #filterPresenter = null;
  #tripPresenter = null;

  #newTripButtonComponent = new AddEventButtonView();

  constructor(headerContainer, mainContainer) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;

    this.#infoPresenter = new InfoPresenter(this.#headerContainer, this.#tripsModel);
    this.#filterPresenter = new FilterPresenter(this.#headerContainer, this.#filterModel, this.#tripsModel);
    this.#tripPresenter = new ListPresenter(this.#mainContainer, this.#tripsModel, this.#filterModel);
  }

  init() {
    this.#infoPresenter.init();
    this.#filterPresenter.init();
    this.#tripPresenter.init();

    render(this.#newTripButtonComponent, this.#headerContainer, RenderPosition.BEFOREEND);
    this.#newTripButtonComponent.setClickHandler(this.#handleNewTripButtonClick);
  }

  #handleNewTripFormClose = () => {
    this.#newTripButtonComponent.element.disabled = false;
  };

  #handleNewTripButtonClick = () => {
    this.#tripPresenter.createTrip(this.#handleNewTripFormClose);
    this.#newTripButtonComponent.element.disabled = true;
  };
}
