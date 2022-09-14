import AddEventButtonView from '../view/add-event-button-view';
import ApiService from '../api-service';
import FilterModel from '../model/filter-model';
import FilterPresenter from './filter-presenter';
import InfoPresenter from './info-presenter';
import ListPresenter from './list-presenter';
import PointsModel from '../model/points-model';
import { render, RenderPosition } from '../framework/render';

const AUTHORIZATION = 'Basic hS2sfS44wcl1ma2i';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

export default class MainPresenter {
  #headerContainer = null;
  #mainContainer = null;

  #pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
  #filterModel = new FilterModel();

  #infoPresenter = null;
  #filterPresenter = null;
  #listPresenter = null;

  #newEventButtonComponent = new AddEventButtonView();

  constructor(headerContainer, mainContainer) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;

    this.#infoPresenter = new InfoPresenter(this.#headerContainer, this.#pointsModel);
    this.#filterPresenter = new FilterPresenter(this.#headerContainer, this.#filterModel, this.#pointsModel);
    this.#listPresenter = new ListPresenter(this.#mainContainer, this.#pointsModel, this.#filterModel);

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#pointsModel.init().then(() => {
      this.#newEventButtonComponent.element.disabled = false;
    });

    this.#filterPresenter.init();
    this.#listPresenter.init();

    render(this.#newEventButtonComponent, this.#headerContainer, RenderPosition.BEFOREEND);

    this.#newEventButtonComponent.element.disabled = true;
    this.#newEventButtonComponent.setClickHandler(this.#handleNewEventButtonClick);
  }

  #handleModelEvent = () => {
    this.#infoPresenter.destroy();
    this.#infoPresenter.init();
  };

  #handleNewEventFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };

  #handleNewEventButtonClick = () => {
    this.#listPresenter.createEvent(this.#handleNewEventFormClose);
    this.#newEventButtonComponent.element.disabled = true;
  };
}
