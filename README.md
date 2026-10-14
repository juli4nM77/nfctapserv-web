# NFC TAP SERV — Página de presentación y pedidos por WhatsApp

La web conserva el diseño negro y dorado. Incluye catálogo, filtros, carrito y personalización. El cliente arma su pedido, abre WhatsApp y toca Enviar. La venta, el pago y la entrega se coordinan personalmente.

WhatsApp configurado: **59892656978** (092 656 978). No requiere instalar programas para abrirla, chatbot, servidor ni cobros automáticos.

## Probar en tu computadora
1. Extraé el ZIP con la opción Extraer todo de Windows.
2. Abrí `index.html` con Chrome o Edge.
3. Agregá una placa, indicá el diseño y probá el botón del pedido. Antes de enviar, revisá que el chat corresponda a tu número.

## Precios
Se conservaron los importes de referencia del archivo original: WhatsApp $890, Instagram $890, Google $990 y personalizada $1190 UYU. La página y el mensaje indican que son orientativos y que se confirma el precio final. Para cambiarlos, editá los campos `price` de `config.js`.

## Publicar en GitHub Pages
1. En tu cuenta de GitHub creá un repositorio público llamado `nfctapserv-web`.
2. Extraé el ZIP y subí los archivos a la raíz del repositorio, incluyendo la carpeta `assets`. No subas el ZIP como único archivo ni una carpeta que encierre todos los archivos.
3. En el repositorio abrí Settings → Pages.
4. En Build and deployment elegí Deploy from a branch, rama main y carpeta /(root). Guardá con Save.
5. Usá la dirección que muestre GitHub Pages y probá el catálogo y el pedido desde tu celular. La publicación puede tardar algunos minutos.

Documentación: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Usar nfctapserv.com sin cambiar los enlaces de las placas
Primero publicá y comprobá la web en GitHub Pages. **Conservá los DNS actuales y todos los enlaces numerados de Short.io.**

La opción más sencilla es que quien entre a `nfctapserv.com` sea enviado a la dirección publicada de GitHub Pages:
1. En Short.io seleccioná el dominio `nfctapserv.com`.
2. Entrá a Domain settings → Redirects.
3. En Main page redirect pegá la dirección HTTPS publicada de GitHub Pages. Guardá.
4. Probá la raíz del dominio y varios enlaces numerados, además de una placa por QR y NFC.

Esta opción redirige la página principal; al llegar a la web se verá la dirección de GitHub Pages en el navegador. No requiere configurar www, cambiar DNS ni comprar otro dominio. No modifiques los destinos de las placas para este paso.

Documentación: https://docs.short.io/articles/managing-your-account-and-domains/manage-your-domain/how-can-i-forward-my-short-domain-to-another-website

## Qué se corrigió en esta revisión
- El carrito ahora aparece al abrirlo y después de agregar un producto.
- Cierre con botón, fondo o tecla Escape; navegación de teclado dentro de las ventanas.
- Validación de enlaces HTTP/HTTPS y recuperación de datos guardados del carrito.
- Cantidad de 1 a 20 por selección y total de referencia en el pedido.
- Guía actualizada con el número real y publicación sin cambios de DNS.
- Las imágenes se identifican como ilustraciones de referencia.

Se verificó la lógica del carrito y la generación del enlace y mensaje de WhatsApp. Queda pendiente probar visualmente en navegador y verificar una publicación real. No se envió ningún mensaje ni se cambió Short.io.
