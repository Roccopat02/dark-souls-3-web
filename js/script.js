/* ============================================================
   DARK SOULS 3 - FAN PAGE | script.js
   Interacciones:
   0. Header:   menú hamburguesa en móvil/tablet
   1. Historia: botón para mostrar/ocultar texto extra
   2. Galería:  lightbox al hacer click en una imagen
   3. Mega menu Localidades: lista + panel de preview
   ============================================================ */


/* ===== 3. MEGA MENU LOCALIDADES ===== */

var ZONAS_DS3 = [
    /* ── JUEGO BASE ─────────────────────────────────────── */
    {
        id: 'cementerio',
        nombre: 'Cementerio de Ceniza',
        desc: 'Zona de inicio cubierta de cenizas y muertos en reposo eterno. El Yelmo de Ceniza despierta aquí sin recuerdos, enfrentando su primer reto en un páramo desolado y silencioso.',
        jefe: 'Iudex Gundyr',
        jefe_desc: 'Colosal caballero corrompido que actúa como guardián y primera prueba. En su segunda fase, el parásito que lo consume emerge como una masa oscura devastadora.',
        img_zona: 'imagenes/galeria-1.webp',
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'santuario',
        nombre: 'Santuario de Enlace del Fuego',
        desc: 'El hogar entre batallas. Un antiguo santuario donde la Fire Keeper aguarda, los mercaderes se instalan y las almas de los caídos convergen. Aquí la ceniza descansa y se fortalece.',
        jefe: null,
        jefe_desc: null,
        img_zona: 'imagenes/ashen-one.webp',
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'gran-muro',
        nombre: 'Gran Muro de Lothric',
        desc: 'La imponente muralla del reino de Lothric, primera zona principal del juego. Sus torres en ruinas albergan guardias corruptos y catapultas, mientras un dragón acecha desde las alturas.',
        jefe: 'Vordt del Valle Boreal',
        jefe_desc: 'Bestial caballero de Irithyll cubierto por armadura oscura y cadenas de hielo. Guardián del portal hacia el norte, ataca con fuerza bruta y un devastador aliento helado.',
        img_zona: 'imagenes/galeria-4.jpg',
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'asentamiento',
        nombre: 'Asentamiento de No Muertos',
        desc: 'Un pueblo en llamas poblado de miserables no muertos y fanáticos evangélicos. Sus callejones tortuosos y edificios en ruinas esconden peligros en cada rincón.',
        jefe: 'Árbol Podrido Maldito',
        jefe_desc: 'Un árbol ancestral corrompido por miles de no muertos que lo parasitan. Atrapa almas de los desdichados y ataca con ramas putrefactas y embestidas colosales.',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'camino-sacrificios',
        nombre: 'Camino de los Sacrificios',
        desc: 'Un bosque pantanoso y oscuro que conecta el asentamiento con la Catedral de la Oscuridad. Sus aguas estancadas y sus enemigos sigilosos generan una tensión constante.',
        jefe: 'Sabio de Cristal',
        jefe_desc: 'Hechicero de élite que se teletransporta a velocidad desconcertante y lanza torrentes de magia cristalina. Puede crear clones para confundir al jugador.',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'catedral-oscuridad',
        nombre: 'Catedral de la Oscuridad',
        desc: 'Una catedral colosal en decadencia, hogar de criaturas monstruosas y sacerdotes corruptos. Su arquitectura gótica y sus pasillos inundados evocan grandeza y horror a partes iguales.',
        jefe: 'Diaconos del Profundo',
        jefe_desc: 'Un enjambre de sacerdotes corrompidos que actúan como una sola entidad. El alma verdadera salta entre cuerpos y debe ser destruida antes de que el ritual se complete.',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'torreon-farron',
        nombre: 'Torreón de Farron',
        desc: 'Una fortaleza en ruinas al borde de un pantano tóxico, antigua sede de la Legión de Farron. Sus guardianes lobo y su laberíntica arquitectura rinden homenaje a los guerreros caídos.',
        jefe: 'Vigilantes de Farron',
        jefe_desc: 'Trío de lobos guardianes que custodian la hoguera de los Señores de Ceniza. Atacan en grupo, se curan entre sí y requieren coordinación para ser derrotados.',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'catacumbas-carthus',
        nombre: 'Catacumbas de Carthus',
        desc: 'Laberínticas catacumbas llenas de esqueletos piromantas y guerreros de Carthus. Las trampas abundan y la oscuridad lo consume todo en estos corredores subterráneos.',
        jefe: 'Alto Señor Wolnir',
        jefe_desc: 'Antiguo conquistador cuya vanidad lo perdió en el abismo. Un titán esquelético que emerge de un cáliz dorado y ataca con sus brazos descomunales, portando tres brazaletes sagrados.',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'lago-ardiente',
        nombre: 'Lago Ardiente',
        desc: 'Una zona opcional de lava ardiente y cenizas eternas, hogar de antiguas bestias demoníacas. Los escasos supervivientes que quedan aquí resisten condiciones de calor extremo.',
        jefe: 'Antiguo Rey Demonio',
        jefe_desc: 'El último de los grandes demonios que aún guarda su llama vital. Su cuerpo en llamas y sus golpes de fuego resultan letales, aunque su poder ha menguado con los siglos.',
        img_zona: null,
        img_jefe: null,
        opcional: true,
        dlc: false
    },
    {
        id: 'irithyll',
        nombre: 'Irithyll del Valle Boreal',
        desc: 'Una ciudad helada de sublime belleza que esconde una oscuridad profunda. Sus calles nevadas, canales congelados y arquitectura plateada contrastan con la crueldad de sus habitantes.',
        jefe: 'Pontiff Sulyvahn',
        jefe_desc: 'El tirano que domina Irithyll, un hechicero-espadachín de poder devastador. Lucha con dos espadas —una de fuego y otra de oscuridad— y puede invocar un espectro de sí mismo.',
        img_zona: 'imagenes/galeria-5(2).jpg',
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'anor-londo',
        nombre: 'Anor Londo',
        desc: 'La ciudad de los dioses, ahora silenciosa y en sombras. Sus torres iluminadas por una luz espectral y sus enormes estatuas evocan la gloria pasada de una civilización divina en decadencia.',
        jefe: 'Aldrich, Devorador de Dioses',
        jefe_desc: 'Un antiguo clérigo convertido en masa de carne y huesos que devoró dioses para absorber su poder. Porta los restos del dios solar Gwyndolin y lanza lluvia de flechas espectrales.',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'mazmorra-irithyll',
        nombre: 'Mazmorra de Irithyll',
        desc: 'Las profundidades subterráneas bajo Irithyll, una prisión oscura poblada de bestias gigantes y atormentadores. Sus pasadizos laberínticos conectan con la Capital Profanada.',
        jefe: null,
        jefe_desc: null,
        nota: 'Área de transición sin jefe principal designado',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'capital-profanada',
        nombre: 'Capital Profanada',
        desc: 'Una capital en ruinas corrompida por una llama profana que consume todo a su paso. Fue destruida cuando Yhorm encendió la llama para proteger a su pueblo, convirtiendo la ciudad en cenizas.',
        jefe: 'Yhorm el Gigante',
        jefe_desc: 'Un rey gigante que sacrificó su propio reino al encender la llama profana. A pesar de su colosal hacha devastadora, guarda una debilidad secreta conocida solo por su más viejo amigo.',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'jardin-consumido',
        nombre: 'Jardín del Rey Consumido',
        desc: 'Un jardín putrefacto y lluvioso donde la vegetación podrida cubre cada superficie. Zona opcional que conecta con la Catedral, hogar de enemigos voladores y un rey obsesionado.',
        jefe: 'Oceiros, el Rey Consumido',
        jefe_desc: 'El rey de Lothric consumido por su obsesión con los dragones. En su delirio, cree cargar a su hijo Ocelotte en brazos mientras ataca frenéticamente con magia y garras.',
        img_zona: null,
        img_jefe: null,
        opcional: true,
        dlc: false
    },
    {
        id: 'tumbas-desatendidas',
        nombre: 'Tumbas Desatendidas',
        desc: 'Un espejo oscuro del Cementerio de Ceniza, donde la hoguera ha muerto para siempre. En estas tumbas abandonadas el silencio es absoluto y el tiempo parece detenido en la oscuridad eterna.',
        jefe: 'Campeón Gundyr',
        jefe_desc: 'La versión definitiva de Iudex Gundyr: más rápida, más agresiva y sin misericordia. Lucha con la maestría de siglos y el parásito perfectamente integrado, exigiendo pura habilidad.',
        img_zona: null,
        img_jefe: null,
        opcional: true,
        dlc: false
    },
    {
        id: 'castillo-lothric',
        nombre: 'Castillo de Lothric',
        desc: 'La fortaleza final del reino, enorme y majestuosa incluso en su decadencia. Sus dragones dormidos, caballeros de élite y torres elevadas representan la culminación del viaje por Lothric.',
        jefe: 'Armadura Cazadragones',
        jefe_desc: 'Una armadura colosal animada por un espíritu antiguo, campeona de la caza de dragones. Su hacha aplasta el suelo generando ondas de choque y resiste con tenacidad casi sobrehumana.',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'archivos-grandes',
        nombre: 'Archivos de los Grandes',
        desc: 'Una enorme biblioteca que guarda el conocimiento del mundo, custodiada por escribas zombificados y estatuas animadas. Sus múltiples plantas y ascensores ocultos forman un laberinto vertical único.',
        jefe: 'Príncipes Gemelos: Lorian y Lothric',
        jefe_desc: 'Los herederos del trono de Lothric: Lorian, el guerrero lisiado que teletransporta con llamas, y Lothric, el príncipe mago que lo resucita. Deben ser derrotados juntos en dos fases devastadoras.',
        img_zona: null,
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    {
        id: 'horno-primera-llama',
        nombre: 'Horno de la Primera Llama',
        desc: 'El corazón del ciclo de las almas, donde la Primera Llama agoniza. Un lugar fuera del tiempo y del espacio que es a la vez arena final y respuesta a todas las preguntas de la saga.',
        jefe: 'Alma de Ceniza',
        jefe_desc: 'La manifestación de todos los Elegidos que alguna vez alimentaron la Primera Llama. Representa siglos de ciclos condensados en un ser que combate en dos fases: guerrero y sumo sacerdote.',
        img_zona: 'imagenes/galeria-6.jpg',
        img_jefe: null,
        opcional: false,
        dlc: false
    },
    /* ── DLC ─────────────────────────────────────────────── */
    {
        id: 'ariandel',
        nombre: 'Mundo Pintado de Ariandel',
        desc: 'Un mundo atrapado dentro de una pintura, congelado en un invierno eterno. Sus campos nevados y ruinas eclesiásticas esconden un secreto terrible: la llama que purifica debe arder aquí también.',
        jefe: 'Hermana Friede y Padre Ariandel',
        jefe_desc: 'Friede, la primera Yelmo de Ceniza que eligió la oscuridad, y Ariandel, el anciano que mantiene vivo el mundo con su sangre. El combate se despliega en tres fases progresivamente más brutales.',
        img_zona: 'imagenes/ashes-of-ariandel2.jpg',
        img_jefe: 'imagenes/ashes-of-ariandel.jpg',
        opcional: false,
        dlc: true
    },
    {
        id: 'ciudad-anillada',
        nombre: 'La Ciudad Anillada',
        desc: 'El último bastión de la humanidad al final de los tiempos, sepultado bajo capas de ceniza. Sus calles erosionadas y su atmósfera apocalíptica representan el fin inevitable de todo ciclo.',
        jefe: 'Caballero Esclavo Gael',
        jefe_desc: 'El último caballero esclavo que buscó la oscuridad del alma humana para una pintora. Tras absorber la oscuridad de toda la humanidad, Gael se transforma en el combate más épico de la saga.',
        img_zona: 'imagenes/the-ringed-city2.jpg',
        img_jefe: 'imagenes/the-ringed-city.avif',
        opcional: false,
        dlc: true
    }
];

function construirMegaMenu() {
    var container = document.getElementById('nav-megamenu-localidades');
    if (!container) { return; }

    var html = '<div class="mega-zona-lista">';
    html += '<span class="mega-cat-label">Juego Base</span>';
    ZONAS_DS3.forEach(function (z) {
        if (z.dlc) { return; }
        var etiqueta = z.nombre + (z.opcional ? ' <em class="mega-opcional">(Opc.)</em>' : '');
        html += '<a class="mega-zona-btn" href="localidades.html#' + z.id + '">' + etiqueta + '</a>';
    });
    html += '<span class="mega-cat-label">DLC</span>';
    ZONAS_DS3.forEach(function (z) {
        if (!z.dlc) { return; }
        html += '<a class="mega-zona-btn" href="localidades.html#' + z.id + '">' + z.nombre + '</a>';
    });
    html += '</div>';

    container.innerHTML = html;

    container.querySelectorAll('.mega-zona-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (typeof cerrarDropdowns === 'function') { cerrarDropdowns(); }
        });
    });
}

construirMegaMenu();


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
