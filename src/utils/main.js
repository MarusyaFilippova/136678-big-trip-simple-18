function isEscKeyDown(evt, callback) {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    evt.preventDefault();
    callback();
  }
}

const updateItem = (items, newItem) => {
  const index = items.findIndex((item) => item.id === newItem.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    newItem,
    ...items.slice(index + 1)
  ];
};

export { isEscKeyDown, updateItem };
