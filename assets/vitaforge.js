/* VitaForge — comportamiento del tema. Vanilla JS, sin dependencias. */
(function () {
  'use strict';

  /* ------------------------------------------------ Menu movil */
  function initMenu(root) {
    root.querySelectorAll('[data-vf-menu-toggle]').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        panel.setAttribute('data-open', String(!open));
      });
    });
  }

  /* ------------------------------------------------ Acordeon FAQ */
  function initFaq(root) {
    root.querySelectorAll('[data-vf-faq]').forEach(function (group) {
      var single = group.getAttribute('data-vf-faq') === 'single';
      var buttons = group.querySelectorAll('.vf-faq__q');

      buttons.forEach(function (btn) {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (!panel) return;

        btn.addEventListener('click', function () {
          var open = btn.getAttribute('aria-expanded') === 'true';

          if (single && !open) {
            buttons.forEach(function (other) {
              if (other === btn) return;
              var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
              other.setAttribute('aria-expanded', 'false');
              if (otherPanel) otherPanel.setAttribute('data-open', 'false');
            });
          }

          btn.setAttribute('aria-expanded', String(!open));
          panel.setAttribute('data-open', String(!open));
        });
      });
    });
  }

  /* ------------------------------------------------ Selector de cantidad */
  function initQty(root) {
    root.querySelectorAll('[data-vf-qty]').forEach(function (widget) {
      var input = widget.querySelector('input');
      if (!input) return;
      widget.querySelectorAll('button[data-step]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var step = parseInt(btn.getAttribute('data-step'), 10) || 1;
          var min = parseInt(input.getAttribute('min'), 10) || 1;
          var next = (parseInt(input.value, 10) || min) + step;
          input.value = String(Math.max(min, next));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  }

  /* ------------------------------------------------ Galeria de producto */
  function initGallery(root) {
    root.querySelectorAll('[data-vf-gallery]').forEach(function (gallery) {
      var main = gallery.querySelector('[data-vf-gallery-main]');
      if (!main) return;
      gallery.querySelectorAll('[data-vf-gallery-thumb]').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          var src = thumb.getAttribute('data-src');
          var srcset = thumb.getAttribute('data-srcset');
          var alt = thumb.getAttribute('data-alt') || '';
          if (src) main.setAttribute('src', src);
          if (srcset) main.setAttribute('srcset', srcset);
          main.setAttribute('alt', alt);
          gallery.querySelectorAll('[data-vf-gallery-thumb]').forEach(function (t) {
            t.setAttribute('aria-current', String(t === thumb));
          });
        });
      });
    });
  }

  /* ------------------------------------------------ Variantes de producto */
  function initVariants(root) {
    root.querySelectorAll('[data-vf-variants]').forEach(function (form) {
      var select = form.querySelector('[data-vf-variant-select]');
      var idField = form.querySelector('[data-vf-variant-id]');
      var priceEl = form.querySelector('[data-vf-variant-price]');
      var submit = form.querySelector('[data-vf-submit]');
      var dataEl = form.querySelector('[data-vf-variant-data]');
      if (!select || !idField || !dataEl) return;

      var variants;
      try {
        variants = JSON.parse(dataEl.textContent);
      } catch (e) {
        return;
      }

      function sync() {
        var id = select.value;
        var match = variants.filter(function (v) { return String(v.id) === String(id); })[0];
        if (!match) return;
        idField.value = match.id;
        if (priceEl && match.price_html) priceEl.innerHTML = match.price_html;
        if (submit) {
          submit.disabled = !match.available;
          submit.textContent = match.available
            ? submit.getAttribute('data-label-available')
            : submit.getAttribute('data-label-sold-out');
        }
      }

      select.addEventListener('change', sync);
      sync();
    });
  }

  /* ------------------------------------------------ Aparicion al hacer scroll */
  function initReveal(root) {
    var items = root.querySelectorAll('.vf-reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  function boot(root) {
    initMenu(root);
    initFaq(root);
    initQty(root);
    initGallery(root);
    initVariants(root);
    initReveal(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { boot(document); });
  } else {
    boot(document);
  }

  /* El editor de temas recarga secciones sueltas: re-inicializamos solo esa. */
  document.addEventListener('shopify:section:load', function (event) {
    boot(event.target);
  });
})();
