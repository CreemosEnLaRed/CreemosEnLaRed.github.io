//@format
/*globals HTMLHint*/

function lintHTML(code, rules) {
  return HTMLHint.verify(code, rules);
}

const DEFAULT_RULES = {
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "attr-value-double-quotes": true,
    "attr-value-not-empty": false,
    "attr-no-duplication": true,
    "doctype-first": true,
    "tag-pair": true,
    "tag-self-close": false,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "title-require": true,
    "alt-require": true,
    "doctype-html5": true,
    "id-class-value": "dash",
    "style-disabled": false,
    "inline-style-disabled": false,
    "inline-script-disabled": false,
    //"space-tab-mixed-disabled": "space",
    "id-class-ad-disabled": false,
    "href-abs-or-rel": false,
    "attr-unsafe-chars": true
};

export {lintHTML, DEFAULT_RULES};
