import EventFormView from '../view/event-form-view';
import EventView from '../view/event-view';
import { UpdateType, UserAction } from '../const';
import { isDatesEqual } from '../utils/date';
import { isEscKeyDown } from '../utils/main';
import { remove, render, replace } from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #container = null;
  #pointsModel = null;
  #changeData = null;
  #changeMode = null;

  #eventComponent = null;
  #eventFormComponent = null;

  #event = null;
  #mode = Mode.DEFAULT;

  #destinations = null;
  #offers = null;

  constructor(container, changeData, changeMode) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (event, pointsModel) => {
    this.#event = event;
    this.#pointsModel = pointsModel;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    const prevEventComponent = this.#eventComponent;
    const prevEventFormComponent = this.#eventFormComponent;

    this.#eventComponent = new EventView(event);
    this.#eventFormComponent = new EventFormView(this.#offers, this.#destinations, this.#event);

    this.#eventComponent.setRollUpButtonClick(this.#handleEditClick);
    this.#eventComponent.setFavoriteClick(this.#handleFavoriteClick);
    this.#eventFormComponent.setRollUpButtonClick(this.#handleFormClose);
    this.#eventFormComponent.setFormSubmit(this.#handleFormSubmit);
    this.#eventFormComponent.setFormDelete(this.#handleFormDelete);

    if (prevEventComponent === null) {
      render(this.#eventComponent, this.#container.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventComponent, prevEventFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventFormComponent);
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventFormComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventFormComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#eventFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#eventFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };


  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#eventFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventFormComponent.shake(resetFormState);
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #replaceCardToForm = () => {
    replace(this.#eventFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #escKeyDownHandler = (evt) => {
    isEscKeyDown(evt, () => {
      this.#eventFormComponent.reset(this.#event);
      this.#replaceFormToCard();
    });
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (event) => {
    const isMinorUpdate = !isDatesEqual(this.#event.dateFrom, event.dateFrom);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      event,
    );
  };

  #handleFormDelete = (event) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      event,
    );
  };

  #handleFormClose = () => {
    this.#eventFormComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#event, isFavorite: !this.#event.isFavorite},
    );
  };
}
