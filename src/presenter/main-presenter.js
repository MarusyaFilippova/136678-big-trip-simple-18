import TripsModel from '../model/trips-model';
import FilterModel from '../model/filter-modal';
import FilterPresenter from './filter-presenter';
import InfoPresenter from './info-presenter';
import SortPresenter from './trip-presenter';
import {render, RenderPosition} from '../framework/render';
import AddEventButtonView from '../view/add-event-button-view';

export default class MainPresenter {
  #headerContainer = null;
  #mainContainer = null;

  #tripsModel = new TripsModel();
  #filterModel = new FilterModel();

  #infoPresenter = null;
  #filterPresenter = null;
  #tripPresenter = null;

  constructor(headerContainer, mainContainer) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;

    this.#infoPresenter = new InfoPresenter(this.#headerContainer, this.#tripsModel);
    this.#filterPresenter = new FilterPresenter(this.#headerContainer, this.#filterModel);
    this.#tripPresenter = new SortPresenter(this.#mainContainer, this.#tripsModel, this.#filterModel);
  }

  init() {
    this.#infoPresenter.init();
    this.#filterPresenter.init();
    this.#tripPresenter.init();
    render(new AddEventButtonView(), this.#headerContainer, RenderPosition.BEFOREEND);
  }
}
