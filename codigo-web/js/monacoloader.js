//@format
/*globals require, monaco*/
require.config({paths: {vs: '../bloques-web/lib/vs'}});

require.config({
  'vs/nls': {
    availableLanguages: {
      '*': 'es'
    }
  }
});

const defaultHTMLCode = `<!doctype html>
<html>
  <head>
    <title>Titulo de Pagina</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>
  <body>
    <h1>Mi Pagina</h1>
  </body>
</html>`;
require(['vs/editor/editor.main'], function () {
  const modelHTML = monaco.editor.createModel(defaultHTMLCode, 'html'),
    modelCSS = monaco.editor.createModel('html,body{height:100%}', 'css'),
    models = {html: modelHTML, css: modelCSS},
    node = document.getElementById('editor'),
    editor = monaco.editor.create(node, {
      model: null
    });

  editor.setModel(modelHTML);
  window.appOnEditorLoaded(editor, node, models);
});
