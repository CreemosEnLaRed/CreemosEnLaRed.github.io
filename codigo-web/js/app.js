//@format
import {lintHTML, DEFAULT_RULES} from './linter.js';
/*globals monaco*/

function main(editor, models) {
  const tabHTML = byId('tabHTML'),
    tabCSS = byId('tabCSS'),
    tabHTMLLink = byId('tabHTMLLink'),
    tabCSSLink = byId('tabCSSLink');

  models.html.updateOptions({tabSize: 2});
  models.css.updateOptions({tabSize: 2});

  tabCSS.addEventListener('click', _e => {
    setModelAndSetActiveTab(editor, models.css, tabCSSLink);
  });
  tabHTML.addEventListener('click', _e => {
    setModelAndSetActiveTab(editor, models.html, tabHTMLLink);
  });

  loadModelsCode(models);
  editor.onDidChangeModelContent(_e => updateResult(editor, models, true));
  updateResult(editor, models, false);
  window.setInterval(() => lint(models.html), 1000);
}

function byId(id) {
  return document.getElementById(id);
}

function setModelAndSetActiveTab(editor, model, tabNode) {
  document
    .querySelectorAll('.editor-tabs .nav-link')
    .forEach(node => node.classList.remove('active'));
  editor.setModel(model);
  tabNode.classList.add('active');
}

function lintTypeToSeverity(_type) {
  // https://microsoft.github.io/monaco-editor/api/enums/monaco.markerseverity.html#error
  return 8;
}

function msgToModelMarker({col, raw, line, type, message}) {
  // TODO: use rule to tranlsate to spanish
  // https://github.com/microsoft/monaco-editor/blob/f6505d22f2af05e1a5f8f7fbd06bccf39bf3a83f/monaco.d.ts#L1207
  return {
    severity: lintTypeToSeverity(type),
    message,
    startLineNumber: line,
    endLineNumber: line,
    startColumn: col,
    endColumn: col + raw.length
  };
}

function lint(htmlModel) {
  const msgs = lintHTML(htmlModel.getValue(), DEFAULT_RULES),
    modelMarkers = msgs.map((msg, _i, _it) => msgToModelMarker(msg)),
    owner = 'No Owner O.o';

  monaco.editor.setModelMarkers(htmlModel, owner, modelMarkers);
}

function updateResult(_editor, models, persistCode) {
  const iframe = byId('result'),
    cssContent = models.css.getValue(),
    htmlContent = models.html.getValue(),
    iframeDoc = iframe.contentDocument;

  iframeDoc.body.parentElement.innerHTML = htmlContent;

  const styleDom = iframeDoc.createElement('style'),
    styleText = iframeDoc.createTextNode(cssContent);

  styleDom.appendChild(styleText);
  iframeDoc.head.appendChild(styleDom);
  const iframeTitleTag = iframeDoc.head.getElementsByTagName('title')[0],
    newTitle = iframeTitleTag ? iframeTitleTag.innerText : 'Codigo Web';

  document.title = newTitle;

  if (persistCode) {
    persistModelsCode(models);
  }
}

function persistModelsCode(models) {
  const modelCode = {};
  for (let key in models) {
    const model = models[key],
      code = model.getValue();

    modelCode[key] = {code};
  }

  window.localStorage.codigoWebCode = JSON.stringify(modelCode);
}

function loadModelsCode(models) {
  const rawCode = window.localStorage.codigoWebCode;

  if (rawCode === undefined) {
    return;
  }

  const modelCode = JSON.parse(rawCode);
  for (let key in models) {
    const model = models[key],
      modelData = modelCode[key];

    if (modelData !== undefined && modelData.code !== undefined) {
      model.setValue(modelData.code);
    }
  }
}

window.appOnEditorLoaded = function (editor, _node, models) {
  main(editor, models);
};
