import MainPresenter from './presenter/main-presenter';

const headerContainerElement = document.querySelector('.trip-main');
const mainContainerElement = document.querySelector('.trip-events');

const mainPresenter = new MainPresenter(headerContainerElement, mainContainerElement);

mainPresenter.init();
