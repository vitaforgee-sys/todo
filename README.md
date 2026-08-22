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
| **Imagenes** | Cada seccion tiene su selector de imagen | Sin imagen se muestra un marcador en color arena, nunca un hueco roto. |
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
