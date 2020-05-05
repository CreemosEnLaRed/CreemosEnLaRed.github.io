//@format
/*globals HTMLHint*/

function lintHTML(code, rules) {
  return HTMLHint.default.verify(code, rules);
}

const DEFAULT_RULES = {
    'tagname-lowercase': true,
    'attr-lowercase': true,
    'attr-value-double-quotes': true,
    'attr-value-not-empty': false,
    'attr-no-duplication': true,
    'doctype-first': true,
    'tag-pair': true,
    'tag-self-close': false,
    'spec-char-escape': true,
    'id-unique': true,
    'src-not-empty': true,
    'title-require': true,
    'alt-require': true,
    'doctype-html5': true,
    'id-class-value': 'dash',
    'style-disabled': false,
    'inline-style-disabled': false,
    'inline-script-disabled': false,
    //"space-tab-mixed-disabled": "space",
    'id-class-ad-disabled': false,
    'href-abs-or-rel': false,
    'attr-unsafe-chars': true,
    'head-script-disabled': false
  },
  RULE_TRANSLATIONS = {
    'alt-require': 'El atributo alt del tag <img> debe estar presente',
    'attr-lowercase': 'Los atributos deben estar en minuscula',
    'attr-no-duplication': 'No puede haber atributos duplicados',
    'attr-unsafe-chars':
      'Valores de atributos no pueden tener caracteres inseguros',
    'attr-value-double-quotes':
      'Valores de atributos deben estar rodeados por "comillas dobles"',
    'attr-value-not-empty': 'Todos los atributos deben tener valores',
    'doctype-first': 'Doctype debe ser declarado primero',
    'doctype-html5': 'Doctype invalido. Usa: "<!DOCTYPE html>"',
    'head-script-disabled':
      'El tag <script> no puede ser usado dentro del tag <head>',
    'href-abs-or-rel':
      'El atributo href debe tener un valor absoluto o relativo',
    'id-class-ad-disabled':
      'Los atributos id y class no pueden usar la palabra "ad", pueden ser bloqueados por extensiones que bloqueen publicidades',
    'id-class-value':
      'Los atributos id y class deben cumplir con las reglas especificadas',
    'id-unique': 'El valor del atributo id debe ser unico en el documento',
    'inline-script-disabled':
      'No se puede incluir codigo en el tag script directamente',
    'inline-style-disabled':
      'No se puede incluir codigo en el tag style directamente',
    'space-tab-mixed-disabled': 'No mezclar espacios y tabs para indentacion',
    'spec-char-escape':
      'Caracteres especiales deben ser escapados ("<" -> "&lt;", ">" -> "&gt;" etc)',
    'src-not-empty':
      'El atributo src de los tags img, script y link deben tener un valor',
    'style-disabled': 'No se pueden usar tags <style>',
    'tag-pair': 'Tag debe tener su cierre correspondiente',
    'tag-self-close':
      'Tags vacios deben cerrarse en el tag de apertura (<hr/> etc)',
    'tagname-lowercase': 'Todos los tags deben tener nombres en minuscula',
    'title-require':
      'La pagina debe tener un titulo (<title>) dentro del tag <head>'
  },
  OVERRIDES = {
    'alt-require': {
      warn1: 'El tag <img> debe tener el atributo alt',
      warn2: function (values) {
        return 'El atributo alt de ' + values.selector + ' debe tener un valor';
      }
    },
    'attr-lowercase': {
      error1: function (values) {
        return (
          'El nombre de atributo ' +
          values.attrName +
          ' debe estar en minuscula'
        );
      }
    },
    'attr-no-duplication': {
      error1: function (values) {
        return 'Atributo duplicado: ' + values.attr.name + '';
      }
    },
    'attr-value-double-quotes': {
      error1: function (values) {
        return (
          'El valor del atibuto ' +
          values.attr.name +
          ' debe estar entre "comillas dobles"'
        );
      }
    },
    'attr-value-not-empty': {
      warn1: function (values) {
        return 'El atributo ' + values.attr.name + ' debe tener un valor';
      }
    },
    'attr-whitespace': {
      error1: function (values) {
        return (
          'los atributos de ' +
          values.attrName +
          ' no deben tener espacios al final'
        );
      },
      error2: function (values) {
        return (
          'Los atributos de ' +
          values.attrName +
          ' deben estar separados por un solo espacio'
        );
      }
    },
    'doctype-first': {
      error1: 'Doctype debe ser declarado al principio del documento HTML'
    },
    'doctype-html5': {
      warn1: 'Doctype invalido. Usar: "<!DOCTYPE html>"'
    },
    'id-unique': {
      error1: function (values) {
        return 'El id ' + values.id + ' debe ser unico en toda la pagina';
      }
    },
    'spec-char-escape': {
      error1: function (values) {
        return (
          'Caracteres especiales deben ser escapados: ' + values.match + ''
        );
      }
    },
    'tag-pair': {
      error1: function (values) {
        return (
          'Los tags deben tener un tag de apertura y cierre correspondiente, falta: ' +
          values.arrTags.join('') +
          ', tag de apertura ' +
          values.lastEvent.raw +
          ' en linea ' +
          values.lastEvent.line +
          ''
        );
      },
      error2: function (values) {
        return (
          'Los tags deben tener un tag de apertura y cierre correspondientes, falta tag de apertura: ' +
          values.event.raw +
          ''
        );
      },
      error3: function (values) {
        return (
          'Los tags deben tener un tag de apertura y cierre correspondientes, falta: [ ' +
          values.arrTags.join('') +
          ', tag de apertura faltante ' +
          values.lastEvent.raw +
          ' en linea' +
          values.lastEvent.line +
          ''
        );
      }
    },
    'tag-self-close': {
      warn1: function (values) {
        return (
          'El tag: ' + values.tagName + ' debe cerrarse en el tag de apertura'
        );
      }
    },
    'tagname-lowercase': {
      error1: function (values) {
        return (
          'El nombre del tag ' + values.tagName + ' debe estar en minuscula'
        );
      }
    },
    'tagname-specialchars': {
      error1: function (values) {
        return (
          'El nombre del tag ' +
          values.tagName +
          ' contiene caracteres especiales'
        );
      }
    },
    'title-require': {
      error1: '<title></title> no puede estar vacio',
      error2: '<title> debe estar presente dentro del tag <head>'
    }
  };

function translateMsgs() {
  const rules = HTMLHint.default.rules;
  for (let id in rules) {
    const translation = RULE_TRANSLATIONS[id],
      msgOverride = OVERRIDES[id],
      rule = rules[id],
      msgs = rule.msgs;

    if (translation) {
      rule.description = translation;
    }

    if (msgOverride) {
      if (msgs) {
        for (let key in msgOverride) {
          msgs[key] = msgOverride[key];
        }
      } else {
        console.log(id, 'overrides and no msgs?', rule);
      }
    }
  }
}

export {lintHTML, DEFAULT_RULES, translateMsgs};
