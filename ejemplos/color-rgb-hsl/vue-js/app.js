/*globals Vue*/
function main() {
  new Vue({
    el: '#app',
    data: {
      red: 128,
      green: 128,
      blue: 128,

      hue: 180,
      saturation: 75,
      lightness: 50,
    },
    computed: {
      colorRGB: function() {
        return 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
      },
      colorHSL: function() {
        return 'hsl(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness+ '%)';
      }
    }
  });

}

window.addEventListener('load', main);
