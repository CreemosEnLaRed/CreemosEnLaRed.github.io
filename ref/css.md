# Referencia CSS

## Comentarios

Cualquier cosa entre `/*` y `*/` es un comentario y es ignorado por CSS, es
igual a `<!--` y `-->` en HTML.

## Selectores

### Tag

Selecciona todos los tags del tipo `tag`, ejemplos:

```css
p{margin:1em}
```

### Class

Selecciona todos los tags que tienen la clase del selector en su atributo `class`, ejemplos:

```css
.importante{color:red}
```

### Id

Selecciona el **unico** tag que tiene el id del selector en su atributo `id`, ejemplos:

```css
#titulo-principal{font-size:20pt}
```

### Selectores Combinados

Selecciona los tags que aplican a todos los selectores a la vez, es importante
no dejar espacio entre las distintas partes, ejemplo:

```css
/*solo aplica a los tags p que tengan la clase "grande" y "peligro" y el id "principal"*/
p.grande.peligro#principal {}
```

### Selectores Alternativos

Selecciona los tags que aplican a uno o mas de los selectores separados por
comas, puede haber espacios antes y despues de la coma, no tiene efecto,
ejemplos:

```css
p, .importante, #titulo-principal{margin:1em}
```

### Descendiente directo

Selecciona los tags que cumplen con el selector a la derecha del `>` cuyos tags
"ascendentes" cumplen con el selector del lado izquierdo, puede haber espacios
antes y
despues del `>`, no tiene efecto, ejemplos:

```css
.titulo > p{ /* todos los parrafos (tag p) cuyo padre tiene la clase titulo aplican */ }
```

### Descendiente a cualquier nivel

Selecciona los tags que cumplen con el selector a la derecha del espacio que
tienen un tag que aplica el lado izquierdo a cualquier nivel, en este caso
el espacio es importante, ejemplos:

```css
.titulo p{ /* todos los parrafos (tag p) que estan dentro de un tag con clase titulo a cualquier nivel de profundidad aplican */ }
```

## Reglas

Las reglas son las que van entre el `{` y el `}` luego del selector, cada regla
consiste de una "llave", que nos indica que propiedad del tag queremos cambiar
y un valor, que indica el nuevo valor de esa propiedad, ambos separados por
`:`.

Si queremos especificas mas de una regla las podemos separar con `;`, ejemplo:

```css
h1{color:red;font-size:20pt;}
```

El codigo CSS arriba define el selector `h1`, es decir que aplica a todos los
tags `h1` y define que esos tags van a tener color rojo y tamanio de fuente de
20 puntos.

## Unidades de Tamanio

### pt

pt es una abreviacion de "points", es la unidad de tamanio que se usa en los
editores de texto para definir el tamanio del texto, normalmente solo lo usamos
con la propierdad `font-size`, pero se puede usar en cualquier otra propiedad
que requiera un tamanio.

### em

em es una unidad relativa al tamanio del texto en el elemento actual, es decir
que si se agranda el tamanio del texto de la pagina esta unidad se va a adaptar
al cambio y va a mantener en proporcion, 1em es igual al tamanio de fuente del
elemento actual. Suena un poco abstracto pero suele hacer lo que queremos y
adaptarse bien.

## %

podemos especificar tamanios en porcentaje, el porcentaje es relativo al ancho
del padre, si decimos que algo tiene tamanio de 10%, va a ser el 10% del ancho
del tag que lo contiene.

### px

px es una abreviacion de "pixeles", es la unidad de tamanio mas basica y es
relativa a la resolucion de pantalla, es decir, la cantidad de pixeles que tiene
la pantalla, si decimos que un tag tiene 20 pixeles de margen, cuanto espacio
va a tener va a depender de cuantos pixeles tiene la pantalla.

Al haber gran variedad de resoluciones no se recomienda usar pixeles como unidad
de espacio sino otras que se adaptan a la resolucion de la pantalla.

## Formatos de Color

### RGB

[Articulo de Wikipedia](https://es.wikipedia.org/wiki/RGB)

Formato `#RRGGBB` donde `R`, `G` y `B` son un caracter en minuscula o mayuscula
del `0` al `9` y de la `a` a la `f`, esta es la [notacion hexadecimal](https://es.wikipedia.org/wiki/Sistema\_hexadecimal) que nos
permite contar del 0 al 15 con un solo caracter:

* 0: 0
* 1: 1
* ...
* 9: 9
* a: 10
* b: 11
* c: 12
* d: 13
* e: 14
* f: 15

Como tenemos dos caracteres por color, podemos expresar 255 niveles de intensidad
por color:

* 00: 0
* ...
* 0f: 15
* 10: 16
* 11: 17
* 1f: 31
* ff: 255

Ejemplos:

* Negro: #000000
* Blanco: #ffffff
* Gris: #888888
* Rojo: #ff0000
* Verde: #00ff00
* Azul: #0000ff

### HSL

[Articulo de Wikipedia](https://es.wikipedia.org/wiki/Modelo\_de\_color\_HSL)

Herramienta para ver valores de ejemplo: https://mothereffinghsl.com/

### Propiedades mas usadas

* color
* background-color
* margin: margin-top margin-right margin-bottom margin-left
* padding: padding-top padding-right padding-bottom padding-left
* border: border-width border-style border-color
* width
* font: font-style font-variant font-weight font-stretch font-size line-height font-family
* text-decoration
* text-align
* border-radius
* box-shadow
* text-shadow
