function byId(id) {
  return document.getElementById(id);
}

function onInput(tag, fn) {
  tag.addEventListener('input', fn);
}

function main() {
  let red = byId('red'),
    green = byId('green'),
    blue = byId('blue'),
    outputRGB = byId('example-rgb'),
    colorRGB = byId('color-rgb'),
    hue = byId('hue'),
    saturation = byId('saturation'),
    lightness = byId('lightness'),
    outputHSL = byId('example-hsl'),
    colorHSL = byId('color-hsl');

  function onRGBChange(_event) {
    let color =
      'rgb(' + red.value + ', ' + green.value + ', ' + blue.value + ')';
    colorRGB.innerText = color;
    outputRGB.style.backgroundColor = color;
  }

  function onHSLChange(_event) {
    let color =
      'hsl(' + hue.value + ', ' + saturation.value + '%, ' + lightness.value + '%)';
    colorHSL.innerText = color;
    outputHSL.style.backgroundColor = color;
  }

  onInput(red, onRGBChange);
  onInput(green, onRGBChange);
  onInput(blue, onRGBChange);

  onInput(hue, onHSLChange);
  onInput(saturation, onHSLChange);
  onInput(lightness, onHSLChange);

  onRGBChange();
  onHSLChange();
}

window.addEventListener('load', main);
