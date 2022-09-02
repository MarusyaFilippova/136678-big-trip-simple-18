import EventFormView from '../view/event-form-view';
import { UpdateType, UserAction } from '../const';
import { isEscKeyDown } from '../utils/main';
import { remove, render, RenderPosition } from '../framework/render';

export default class TripNewPresenter {
  #container = null;
  #tripsModel = null;
  #changeData = null;

  #formComponent = null;

  #destroyCallback = null;

  constructor(container, changeData, tripsModel) {
    this.#container = container;
    this.#changeData = changeData;
    this.#tripsModel = tripsModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    const destinations = [...this.#tripsModel.destinations];
    const offers = [...this.#tripsModel.offers];

    if (this.#formComponent !== null) {
      return;
    }

    this.#formComponent = new EventFormView(offers, destinations);

    this.#formComponent.setRollUpButtonClick(this.#handleFormClose);
    this.#formComponent.setFormSubmit(this.#handleFormSubmit);
    this.#formComponent.setFormDelete(this.#handleFormClose);

    render(this.#formComponent, this.#container.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (!this.#formComponent) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#formComponent);
    this.#formComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    isEscKeyDown(evt, () => {
      this.destroy();
    });
  };

  #handleFormSubmit = (trip) => {
    this.#changeData(
      UserAction.ADD_TRIP,
      UpdateType.MINOR,
      trip,
    );
    this.destroy();
  };

  #handleFormClose = () => {
    this.destroy();
  };
}
