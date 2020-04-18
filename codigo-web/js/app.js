//@format

function main() {
	console.log('main');
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

function updateResult(models) {
	const iframe = byId('result'),
		cssContent = models.css.getValue(),
		htmlContent = models.html.getValue(),
		iframeDoc = iframe.contentDocument;

	console.log('set', htmlContent, cssContent, iframe);
	iframeDoc.body.parentElement.innerHTML = htmlContent;

	const styleDom = iframeDoc.createElement('style'),
		styleText = iframeDoc.createTextNode(cssContent);

	styleDom.appendChild(styleText);
	iframeDoc.head.appendChild(styleDom);
	const iframeTitleTag = iframeDoc.head.getElementsByTagName('title')[0],
		newTitle = iframeTitleTag ? iframeTitleTag.innerText : 'Codigo Web';

	document.title = newTitle;
	console.log(iframeDoc);
}

window.appOnEditorLoaded = function (editor, _node, models) {
	const tabHTML = byId('tabHTML'),
		tabCSS = byId('tabCSS'),
		tabHTMLLink = byId('tabHTML'),
		tabCSSLink = byId('tabCSSLink');

	tabCSS.addEventListener('click', _e => {
		setModelAndSetActiveTab(editor, models.css, tabCSSLink);
	});
	tabHTML.addEventListener('click', _e => {
		setModelAndSetActiveTab(editor, models.html, tabHTMLLink);
	});

	editor.onDidChangeModelContent(_e => updateResult(models));
	updateResult(models);
};

main();
