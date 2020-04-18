//@format

function main(editor, models) {
  const tabHTML = byId('tabHTML'),
    tabCSS = byId('tabCSS'),
    tabHTMLLink = byId('tabHTMLLink'),
    tabCSSLink = byId('tabCSSLink');

  tabCSS.addEventListener('click', _e => {
    setModelAndSetActiveTab(editor, models.css, tabCSSLink);
  });
  tabHTML.addEventListener('click', _e => {
    setModelAndSetActiveTab(editor, models.html, tabHTMLLink);
  });

  loadModelsCode(models);
  editor.onDidChangeModelContent(_e => updateResult(models, true));
  updateResult(models, false);
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

function updateResult(models, persistCode) {
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
