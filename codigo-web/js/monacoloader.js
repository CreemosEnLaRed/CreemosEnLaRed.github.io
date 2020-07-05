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
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
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
