//@format

function throttle(func, wait, options) {
  let context,
    args,
    result,
    timeout = null,
    previous = 0;

  if (!options) {
    options = {};
  }

  let later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) {
      context = args = null;
    }
  };

  return function() {
    const now = Date.now();

    if (!previous && options.leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);

    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = func.apply(context, args);

      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = window.setTimeout(later, remaining);
    }

    return result;
  };
}

export {throttle};
