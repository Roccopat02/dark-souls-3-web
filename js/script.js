/* ============================================================
   DARK SOULS 3 - FAN PAGE | script.js
   Interacciones:
   0. Header:   menú hamburguesa en móvil/tablet
   1. Historia: botón para mostrar/ocultar texto extra
   2. Galería:  lightbox al hacer click en una imagen
   ============================================================ */


/* ===== 0. HAMBURGUESA ===== */

const navToggle = document.querySelector('.nav-toggle');
const navLista  = document.querySelector('.nav-lista');
const navDropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
const contactTrigger = document.querySelector('.nav-contact-trigger');
const contactModal = document.querySelector('#contacto-modal');
const contactCloseControls = contactModal ? contactModal.querySelectorAll('[data-contact-close]') : [];
const contactForm = document.querySelector('.contacto-form');
const contactStatus = document.querySelector('.contacto-status');
let lastFocusedElement = null;

function cerrarDropdowns() {
    navDropdownToggles.forEach(function (toggle) {
        const dropdown = toggle.closest('.nav-item--dropdown');

        if (dropdown) {
            dropdown.classList.remove('abierta');
        }

        toggle.setAttribute('aria-expanded', 'false');
    });
}

function limpiarEstadoContacto() {
    if (!contactStatus) {
        return;
    }

    contactStatus.textContent = '';
    contactStatus.classList.remove('is-visible', 'is-success', 'is-error');
}

function cerrarContacto() {
    if (!contactModal) {
        return;
    }

    limpiarEstadoContacto();
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (contactTrigger) {
        contactTrigger.setAttribute('aria-expanded', 'false');
    }

    if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
    }
}

function abrirContacto() {
    if (!contactModal) {
        return;
    }

    lastFocusedElement = document.activeElement;
    limpiarEstadoContacto();
    contactModal.classList.add('is-open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    if (contactTrigger) {
        contactTrigger.setAttribute('aria-expanded', 'true');
    }

    const primerCampo = contactModal.querySelector('#nombre');

    if (primerCampo instanceof HTMLElement) {
        primerCampo.focus();
    }
}

if (navToggle && navLista) {
    navToggle.addEventListener('click', function () {
        const estaAbierto = navLista.classList.contains('abierta');
        navLista.classList.toggle('abierta');
        navToggle.classList.toggle('abierto');
        navToggle.setAttribute('aria-expanded', String(!estaAbierto));
    });

    // Cierra el menú al hacer click en cualquier link real
    navLista.querySelectorAll('a.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            navLista.classList.remove('abierta');
            navToggle.classList.remove('abierto');
            navToggle.setAttribute('aria-expanded', 'false');
            cerrarDropdowns();
        });
    });
}

navDropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
        const dropdown = toggle.closest('.nav-item--dropdown');
        const estaAbierto = dropdown && dropdown.classList.contains('abierta');

        cerrarDropdowns();

        if (dropdown && !estaAbierto) {
            dropdown.classList.add('abierta');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });
});

if (contactTrigger) {
    contactTrigger.addEventListener('click', function () {
        cerrarDropdowns();

        if (contactModal && contactModal.classList.contains('is-open')) {
            cerrarContacto();
        } else {
            abrirContacto();
        }
    });
}

contactCloseControls.forEach(function (control) {
    control.addEventListener('click', cerrarContacto);
});

document.addEventListener('click', function (event) {
    const clickDentroDropdown = event.target.closest('.nav-item--dropdown');
    const clickEnContacto = event.target.closest('.nav-contact-trigger');

    if (!clickDentroDropdown) {
        cerrarDropdowns();
    }

    if (!clickEnContacto && contactModal && contactModal.classList.contains('is-open')) {
        const clickDentroDialogo = event.target.closest('.contacto-modal-dialog');

        if (!clickDentroDialogo) {
            cerrarContacto();
        }
    }
});


/* ===== 1. HISTORIA: MOSTRAR / OCULTAR TEXTO EXTRA ===== */

const btnHistoria   = document.getElementById('btn-historia');
const historiaExtra = document.getElementById('historia-extra');

if (btnHistoria && historiaExtra) {
    btnHistoria.addEventListener('click', function () {
        const estaOculto = historiaExtra.classList.contains('oculto');

        historiaExtra.classList.toggle('oculto');
        btnHistoria.textContent = estaOculto ? 'Leer menos' : 'Leer más';
    });
}


/* ===== 2. GALERÍA: LIGHTBOX ===== */

const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightbox-img');
const lightboxCerrar = document.getElementById('lightbox-cerrar');
const lightboxPrev   = document.getElementById('lightbox-prev');
const lightboxNext   = document.getElementById('lightbox-next');
const galeriaItems   = document.querySelectorAll('.galeria-item');
let indiceActualGaleria = 0;

if (typeof GLightbox === 'function') {
    GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        slideEffect: 'fade',
        openEffect: 'zoom',
        closeEffect: 'fade'
    });
}

function mostrarImagenGaleria(indice) {
    if (!galeriaItems.length || !lightboxImg) {
        return;
    }

    const total = galeriaItems.length;
    indiceActualGaleria = (indice + total) % total;
    const item = galeriaItems[indiceActualGaleria];
    const img = item ? item.querySelector('.galeria-img') : null;

    if (img && img.src) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    }
}

function abrirLightboxGaleria(indiceInicial) {
    if (!lightbox) {
        return;
    }

    mostrarImagenGaleria(indiceInicial);
    lightbox.classList.remove('oculto');
    document.body.style.overflow = 'hidden';
}

function irImagenSiguiente() {
    mostrarImagenGaleria(indiceActualGaleria + 1);
}

function irImagenAnterior() {
    mostrarImagenGaleria(indiceActualGaleria - 1);
}

// Abre el lightbox con la imagen clickeada
galeriaItems.forEach(function (item, indice) {
    item.addEventListener('click', function () {
        abrirLightboxGaleria(indice);
    });
});

if (lightboxNext) {
    lightboxNext.addEventListener('click', function (event) {
        event.stopPropagation();
        irImagenSiguiente();
    });
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function (event) {
        event.stopPropagation();
        irImagenAnterior();
    });
}

// Cierra el lightbox con el botón ×
if (lightboxCerrar) {
    lightboxCerrar.addEventListener('click', cerrarLightbox);
}

// Cierra el lightbox haciendo click fuera de la imagen
if (lightbox) {
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            cerrarLightbox();
        }
    });
}

// Cierra el lightbox con la tecla Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        cerrarContacto();
        cerrarLightbox();
    } else if (lightbox && !lightbox.classList.contains('oculto') && e.key === 'ArrowRight') {
        irImagenSiguiente();
    } else if (lightbox && !lightbox.classList.contains('oculto') && e.key === 'ArrowLeft') {
        irImagenAnterior();
    }
});

if (contactForm && contactStatus) {
    const contactSubmitButton = contactForm.querySelector('.contacto-submit');

    function mostrarEstadoContacto(message, type) {
        contactStatus.textContent = message;
        contactStatus.classList.add('is-visible');
        contactStatus.classList.toggle('is-success', type === 'success');
        contactStatus.classList.toggle('is-error', type === 'error');
    }

    contactForm.addEventListener('input', function () {
        if (contactStatus.classList.contains('is-visible')) {
            limpiarEstadoContacto();
        }
    });

    contactForm.addEventListener('invalid', function () {
        mostrarEstadoContacto('No se pudo enviar el mensaje. Revisa los campos obligatorios e inténtalo de nuevo.', 'error');
    }, true);

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        try {
            if (contactSubmitButton) {
                contactSubmitButton.disabled = true;
            }

            mostrarEstadoContacto('Mensaje enviado correctamente.', 'success');
            contactForm.reset();
        } catch (error) {
            mostrarEstadoContacto('No se pudo enviar el mensaje. Inténtalo nuevamente.', 'error');
        } finally {
            if (contactSubmitButton) {
                contactSubmitButton.disabled = false;
            }
        }
    });
}

function cerrarLightbox() {
    if (!lightbox || !lightboxImg) {
        return;
    }

    lightbox.classList.add('oculto');
    lightboxImg.src = '';
    document.body.style.overflow = ''; // restaura el scroll
}
