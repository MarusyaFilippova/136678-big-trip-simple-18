function isEscKeyDown(evt, callback) {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    evt.preventDefault();
    callback();
  }
}

export {isEscKeyDown};
