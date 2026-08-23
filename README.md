# VitaForge — tema de Shopify

Tema propio, escrito desde cero en Liquid. No es una modificacion de Dawn ni de
ninguna plantilla oficial: no comparte con ellas ni una linea de codigo.

Esta pensado para una clienta concreta —mujer española de 50 a 60 años— y esa
decision condiciona todo lo demas: tamaño de letra, contraste, tamaño de los
botones, tono de los textos y orden de los argumentos de venta.

---

## 1. Instalar el tema en tu tienda

### Opcion A — Shopify CLI (recomendada)

```bash
npm install -g @shopify/cli@latest

git clone -b claude/vitaforge-shopify-store-66r7fp <URL-DE-ESTE-REPOSITORIO> vitaforge-theme
cd vitaforge-theme

shopify theme push --unpublished --theme "VitaForge"
```

El CLI abrira el navegador para que autorices tu tienda. Al terminar te da un
enlace de vista previa. Cuando lo tengas revisado, publica desde
**Tienda online → Temas** o con `shopify theme publish`.

Para trabajar en vivo con recarga automatica:

```bash
shopify theme dev
```

### Opcion B — Conectar el repositorio desde el admin

**Tienda online → Temas → Agregar tema → Conectar desde GitHub**, y elige la
rama `claude/vitaforge-shopify-store-66r7fp`. Shopify sincronizara los cambios
cada vez que se haga push.

### Comprobar que todo esta correcto antes de subir

```bash
shopify theme check
```

Ahora mismo pasa las 61 comprobaciones sin ninguna advertencia.

---

## 2. Que hay que configurar en el admin despues de subirlo

El tema funciona nada mas instalarlo, pero estos puntos necesitan datos reales
tuyos:

| Que | Donde | Por que |
|---|---|---|
| **Tabla de composicion** | Editor de temas → seccion *Tabla de composicion* | Los ingredientes que trae por defecto son un ejemplo. Sustituyelos por los de la etiqueta real. |
| **Imagenes** | Cada seccion tiene su selector de imagen | Sin foto se muestra la ilustracion de marca correspondiente (ver seccion 6). |
| **Valoraciones y testimonios** | Secciones *Portada* y *Testimonios* | Solo se pueden publicar opiniones reales y verificables. |
| **Telefono, correo y WhatsApp** | Seccion *Contacto* | Ahora hay datos de ejemplo. |
| **Menus** | Tienda online → Navegacion | El tema usa `main-menu` y `footer`. |
| **Paginas** | Paginas → crear `contacto` y `preguntas-frecuentes` | Tienen plantilla propia ya preparada. |

---

## 3. Estructura

```
assets/     vitaforge.css (sistema de diseño)  ·  vitaforge.js (sin dependencias)
config/     ajustes del tema: color, tipografia, logotipo, redes
layout/     theme.liquid  ·  password.liquid
locales/    es.default.json
sections/   19 secciones, todas con presets en español
snippets/   iconos SVG propios, medios, precio, tarjeta de producto
templates/  index, product, collection, cart, page, blog, article, search,
            404, gift_card, password, page.contacto, page.preguntas-frecuentes
```

### Secciones disponibles

`Portada (hero)` · `Barra de confianza` · `Puntos de dolor` ·
`Producto destacado` · `Beneficios` · `Tabla de composicion` · `Como se toma` ·
`Testimonios` · `Comparativa` · `Texto con imagen` · `Garantia` ·
`Preguntas frecuentes` · `Boletin` · `Contacto` · `Texto enriquecido`

Todas son reordenables y editables desde el editor visual de Shopify, con los
textos y las etiquetas en español.

---

## 4. Decisiones de diseño

**Color.** Crema `#faf6f0`, arena `#efe7db`, tinta `#241f1b`, acento terracota
`#8f5533` y verde profundo `#33403a`. Nada de rosa ni de pasteles: el publico
objetivo lo asocia a producto infantilizado. La terracota sobre crema supera el
contraste AA de la WCAG.

**Tipografia.** Titulares en serif (Playfair Display) para la parte editorial y
elegante; texto en sans (Assistant) para la legibilidad. Cuerpo a 18 px con
interlineado 1,7 y ajustable hasta 22 px desde los ajustes del tema. A los 55
años la vista ya no es la de los 30, y una tienda que obliga a acercarse a la
pantalla no vende.

**Interaccion.** Botones de 56 px de alto y areas de pulsacion de 48 px minimo.
Foco siempre visible. Animaciones que se desactivan solas si el sistema pide
movimiento reducido.

**Estructura de la pagina de inicio.** Sigue el recorrido mental de la clienta:
reconocer el problema → entender la causa → ver la prueba (composicion) →
comprobar que otras como ella lo usan → resolver objeciones → comprar sin riesgo.

---

## 5. Aviso importante sobre los textos

Los complementos alimenticios estan regulados en España y en la UE:

- Las declaraciones de la columna *Para que sirve* de la tabla usan formulas
  autorizadas por el **Reglamento (UE) 432/2012**. Si cambias un ingrediente,
  cambia tambien la frase por la autorizada para ese nutriente.
- **No se puede** afirmar que un complemento previene, trata o cura ninguna
  enfermedad (Reglamento CE 1924/2006).
- El aviso legal obligatorio ya esta en el pie de pagina; no lo borres.
- Publicar reseñas inventadas o marcarlas como verificadas sin serlo es una
  infraccion (Directiva UE 2019/2161).

Antes de publicar, revisa los textos con quien lleve el registro sanitario del
producto.


---

## 6. Imagenes

El tema incluye tres ilustraciones originales en SVG, hechas para esta marca y
sin ninguna restriccion de licencia:

| Fichero | Donde aparece | Que muestra |
|---|---|---|
| `assets/vf-art-portrait.svg` | Portada (hero) | Busto de perfil de una mujer de mediana edad, enmarcado en arco |
| `assets/vf-art-still-life.svg` | Producto destacado | Bodegon con el bote, un vaso de agua y una rama |
| `assets/vf-art-duo.svg` | Texto con imagen | Dos mujeres juntas, una detras de otra |

Son **imagenes por defecto**: en cuanto subas una foto real desde el selector de
imagen de la seccion, la foto sustituye a la ilustracion. No hay que borrar nada.

### Como subir una foto

1. **Tienda online → Temas → Personalizar**.
2. Pincha la seccion **Portada (hero)** y usa **Imagen principal → Seleccionar imagen**.
3. Sube el archivo y guarda. La foto sustituye a la ilustracion automaticamente.

Shopify se encarga del resto: sirve la imagen desde su CDN, la convierte a WebP
y genera los siete tamaños que el tema pide segun la pantalla. Por eso conviene
subirla por aqui y no meterla en `assets/`.

**Si al recortarla se corta la cara:** las fotos apaisadas pierden los lados al
encajar en el formato vertical. Tienes dos salidas, y el tema respeta ambas:

- **Contenido → Archivos → la imagen → Editar → punto focal.** Marca la cara y
  el tema centra ahi el recorte en todos los tamaños.
- **Portada (hero) → Formato de la imagen.** Cambia de «Vertical 4:5» a
  «Cuadrada 1:1» o «Apaisada 16:10» para recortar menos.

### Que fotografia funciona con este publico

Cuando hagas la sesion, o si compras banco de imagenes, busca esto:

- **Mujeres de 50 a 65 reales**, con canas, arrugas de expresion y gafas si las
  llevan. Una modelo de 35 retocada para parecer mayor se detecta al instante y
  destruye la confianza.
- **Luz natural de mañana**, en cocina, salon o terraza. Nada de fondo blanco de
  estudio ni de bata blanca.
- **Gestos tranquilos**: leer la etiqueta, tomarse el vaso de agua, hablar con
  una amiga. Evita el salto en la playa y los brazos en alto.
- **Formato vertical 4:5** para la portada y **cuadrado 1:1** para el resto.
- Al menos 1600 px de ancho.

Bancos con licencia comercial gratuita: Unsplash, Pexels y Nappy. Para fotos de
mujeres españolas concretas suele compensar una sesion propia de medio dia:
sale barata y las imagenes no las tiene ningun competidor.

---

## 7. Movimiento

La pagina lleva una capa liquida de fondo: tres manchas de color de la marca que
se desplazan muy despacio detras del contenido, y un brillo organico dentro de
cada seccion de color. Al pasar el raton, botones, tarjetas, titulares, enlaces,
filas de tabla y preguntas responden con un impulso corto; los botones ademas
tienen un relleno que nace en el punto exacto donde esta el cursor.

Se puede apagar entero en **Ajustes del tema → Movimiento**. Y se desactiva solo,
sin tocar nada, si el visitante tiene activado el ahorro de movimiento en su
sistema operativo.

---

## 8. Idioma

Todo el texto que escribe el tema esta en español. Pero hay cadenas que **no
las genera el tema, sino Shopify**, y esas siguen al idioma configurado en la
tienda, no al tema:

- El boton de pago rapido (*Buy it now* / *Comprar ahora*).
- Todo el proceso de pago (checkout).
- Los mensajes de error de los formularios.
- El titulo de la coleccion automatica (*All products*) y el de la pagina de
  colecciones (*Collections*).
- Los nombres de mes en las fechas.

Lo que ya resuelve el tema por su cuenta:

| Antes | Ahora |
|---|---|
| *All products* | «Todos los productos» (editable en la seccion Coleccion) |
| *Collections* | «Nuestros productos» (editable en la seccion Lista de colecciones) |
| *23 de August de 2026* | «23 de agosto de 2026», via `snippets/vf-fecha.liquid` |
| *Fulfilled* / *Partial* | «Enviado» / «Enviado en parte» / «En preparacion» |

Lo que hay que hacer **una vez en el admin**, porque desde el tema no se puede:

1. **Configuracion → Idiomas de la tienda**: añade español y ponlo como idioma
   predeterminado. Con esto el checkout, los errores y el boton de pago rapido
   pasan a español.
2. **Tienda online → Temas → ... → Editar contenido predeterminado**: revisa las
   cadenas que Shopify usa fuera del tema.
3. Si el boton de pago rapido sigue sin convencerte, se puede quitar desde
   **Ficha de producto → Compra → Mostrar pago rapido**.

Y recuerda que el titulo, la descripcion y los nombres de variante de cada
producto son contenido tuyo del admin: si estan en ingles, hay que cambiarlos
alli.
