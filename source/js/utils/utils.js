function debounce(context, callback, timeoutDelay = 300) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(context, rest), timeoutDelay);
  };
}

export {debounce};
