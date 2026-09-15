/* =========================================================
   GALERIA DO EMPREENDIMENTO
========================================================= */

const galleryImages = [

    {
        src: "assets/Extrema/FachadaPrincipal.jpg",
        title: "Fachada Principal",
        description: "Vista da Fachada Principal."
    },

    {
        src: "assets/Extrema/FachadaTraseiras.jpg",
        title: "Fachada Traseira",
        description: "Vista da Fachada Traseira."
    },

    {
        src: "assets/Extrema/VistaNordeste.jpg",
        title: "Fachada Nordeste",
        description: "Vista da Fachada Nordeste."
    },

    {
        src: "assets/Extrema/VistaNoroeste.jpg",
        title: "Fachada Noroeste",
        description: "Vista da Fachada Noroeste."
    },

    {
        src: "assets/Extrema/FachadaPrincipalNoite.jpg",
        title: "Fachada Principal à Noite",
        description: "Vista da Fachada Principal \u00e0 Noite."
    },

    {
        src: "assets/Extrema/FachadaTraseirasNoite.jpg",
        title: "Fachada Traseira à Noite",
        description: "Vista da Fachada Traseira \u00e0 Noite."
    },

    {
        src: "assets/Extrema/VistaNoroesteNoite.jpg",
        title: "Fachada Noroeste à Noite",
        description: "Vista da Fachada Noroeste \u00e0 noite."
    },

    {
        src: "assets/Extrema/FachadaNorteNoite.jpg",
        title: "Fachada Norte à Noite",
        description: "Vista da Fachada Norte \u00e0 noite."
    },

    {
        src: "assets/Extrema/QuadroSinotico.png",
        title: "Quadro Sinótico",
        description: "Quadro Sin\u00f3tico da Opera\u00e7\u00e3o Urban\u00edstica."
    },

    {
        src: "assets/Extrema/QuadroSinoticoFracoes.png",
        title: "Quadro Sinótico de Frações",
        description: "Quadro Sin\u00f3tico das Fra\u00e7\u00f5es Aut\u00f3nomas."
    },

    {
        src: "assets/Extrema/NovaLinha.png",
        title: "Nova Linha",
        description: "Nova Esta\u00e7\u00e3o de Metro do Souto."
    },

    {
        src: "assets/Extrema/Localizacao.png",
        title: "Localização Empreendimento",
        description: "Localiza\u00e7\u00e3o Empreendimento."
    }
];


let currentIndex = 0;


/* =========================================================
   ELEMENTOS DA GALERIA
========================================================= */

const modal =
    document.getElementById("image-modal");

const modalImage =
    document.getElementById("modal-image");

const modalCurrent =
    document.getElementById("modal-current");

const modalTotal =
    document.getElementById("modal-total");

const modalDescription =
    document.getElementById("modal-image-description");

const modalThumbnails =
    document.getElementById("modal-thumbnails");

const modalClose =
    document.getElementById("modal-close");

const modalPrevious =
    document.getElementById("modal-prev");

const modalNext =
    document.getElementById("modal-next");


/* =========================================================
   ATUALIZAR GALERIA
========================================================= */

function updateModal() {

    if (
        !modalImage ||
        !galleryImages.length
    ) {
        return;
    }


    const currentImage =
        galleryImages[currentIndex];


    modalImage.src =
        currentImage.src;

    modalImage.alt =
        currentImage.title;


    if (modalCurrent) {

        modalCurrent.textContent =
            currentIndex + 1;

    }


    if (modalTotal) {

        modalTotal.textContent =
            galleryImages.length;

    }


    if (modalDescription) {

        modalDescription.textContent =
            currentImage.description;

    }


    const thumbnails = document.querySelectorAll(".modal-thumbnail");

    thumbnails.forEach(function (thumbnail, index) {

        const isActive = index === currentIndex;

        thumbnail.classList.toggle("active", isActive);

        if (isActive) {
            thumbnail.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });
        }

    });

}


/* =========================================================
   MINIATURAS
========================================================= */

function createThumbnails() {

    if (!modalThumbnails) {
        return;
    }


    modalThumbnails.innerHTML = "";


    galleryImages.forEach(
        function (image, index) {

            const thumbnail =
                document.createElement("button");


            thumbnail.type = "button";

            thumbnail.className =
                "modal-thumbnail";


            thumbnail.setAttribute(
                "aria-label",
                "Ver imagem " + (index + 1)
            );


            const thumbnailImage =
                document.createElement("img");


            thumbnailImage.src =
                image.src;

            thumbnailImage.alt =
                image.title;


            thumbnail.appendChild(
                thumbnailImage
            );


            thumbnail.addEventListener(
                "click",
                function () {

                    currentIndex =
                        index;

                    updateModal();

                }
            );


            modalThumbnails.appendChild(
                thumbnail
            );

        }
    );

}


/* =========================================================
   ABRIR GALERIA
========================================================= */

function openModal(index) {

    if (
        !modal ||
        !galleryImages.length
    ) {
        return;
    }


    currentIndex =
        Math.max(
            0,
            Math.min(
                index,
                galleryImages.length - 1
            )
        );


    createThumbnails();
    updateModal();


    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    setTimeout(function () {
        const activeThumb = document.querySelector(".modal-thumbnail.active");
        if (activeThumb) {
            activeThumb.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });
        }
    }, 100);

}


/* =========================================================
   FECHAR GALERIA
========================================================= */

function closeModal() {

    if (!modal) {
        return;
    }


    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   IMAGEM ANTERIOR
========================================================= */

function previousImage() {

    currentIndex =
        (
            currentIndex -
            1 +
            galleryImages.length
        ) %
        galleryImages.length;


    updateModal();

}


/* =========================================================
   IMAGEM SEGUINTE
========================================================= */

function nextImage() {

    currentIndex =
        (
            currentIndex +
            1
        ) %
        galleryImages.length;


    updateModal();

}


/* =========================================================
   BOTÕES DA GALERIA
========================================================= */

document
    .querySelectorAll(".gallery-trigger")
    .forEach(function (trigger) {

        trigger.addEventListener(
            "click",
            function () {

                openModal(
                    Number(
                        trigger.dataset.galleryIndex
                    )
                );

            }
        );

    });


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


if (modalPrevious) {

    modalPrevious.addEventListener(
        "click",
        previousImage
    );

}


if (modalNext) {

    modalNext.addEventListener(
        "click",
        nextImage
    );

}


/* =========================================================
   FECHAR AO CLICAR FORA
========================================================= */

if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !modal ||
            !modal.classList.contains("active")
        ) {
            return;
        }


        if (event.key === "Escape") {
            closeModal();
        }


        if (event.key === "ArrowLeft") {
            previousImage();
        }


        if (event.key === "ArrowRight") {
            nextImage();
        }

    }
);


/* =========================================================
   MAPA
========================================================= */

const projectMapElement =
    document.getElementById("project-map");

const mapExpandButton =
    document.getElementById("map-expand-button");


const projectLocation = [
    41.137385645420295,
    -8.54660927116361
];


if (
    projectMapElement &&
    typeof L !== "undefined"
) {

    const map =
        L.map(
            projectMapElement,
            {
                scrollWheelZoom: false,
                zoomControl: true
            }
        )
            .setView(
                projectLocation,
                14
            );


    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    /* =====================================================
        PIN PRINCIPAL
    ====================================================== */

    const projectIcon =
        L.divIcon({

            className:
                "project-map-marker",

            html: `
                <div class="project-pin">
                    <div class="project-pin-dot"></div>
                </div>
            `,

            iconSize: [
                34,
                42
            ],

            iconAnchor: [
                17,
                42
            ]

        });


    L.marker(
        projectLocation,
        {
            icon: projectIcon
        }
    )
        .addTo(map)
        .bindPopup(
            "<strong>Edif\u00edcio Residences Extrema</strong><br>" +
            "Localiza\u00e7\u00e3o do empreendimento."
        );


    /* =====================================================
        PINS DOS PONTOS DE INTERESSE
    ====================================================== */

    const pointIcon =
        L.divIcon({

            className:
                "location-map-marker",

            html: `
                <div class="location-pin">
                    <div class="location-pin-dot"></div>
                </div>
            `,

            iconSize: [
                24,
                30
            ],

            iconAnchor: [
                12,
                30
            ]

        });


    const pointsOfInterest = [

        {
            coordinates: [
                41.14339128132767,
                -8.544098345604548
            ],
            title: "Hospital Trofa Sa\u00fade"
        },

        {
            coordinates: [
                41.14561077583566,
                -8.542229522140127
            ],
            title: "Edif\u00edcio de Investiga\u00e7\u00e3o Metyis"
        },

        {
            coordinates: [
                41.13558341096225,
                -8.538863764469141
            ],
            title: "Multiusos de Gondomar"
        },

        {
            coordinates: [
                41.13677392555357,
                -8.535397462665795
            ],
            title: "Parque Urbano de Gondomar"
        },

        {
            coordinates: [
                41.16191536166652,
                -8.583591003276426
            ],
            title: "Est\u00e0dio do Drag\u00e3o"
        },

        {
            coordinates: [
                41.14395599009484,
                -8.541692953961705
            ],
            title: "Mercadona Gondomar"
        },

        {
            coordinates: [
                41.13745241905433,
                -8.53648148931758
            ],
            title: "Lidl S\u00e3o Cosme Gondomar"
        },

        {
            coordinates: [
                41.14036966547226,
                -8.55297363743445
            ],
            title: "Nova Esta\u00e7\u00e3o Metro"
        }

    ];


    pointsOfInterest.forEach(
        function (point) {

            L.marker(
                point.coordinates,
                {
                    icon: pointIcon
                }
            )
                .addTo(map)
                .bindPopup(
                    "<strong>" +
                    point.title +
                    "</strong>"
                );

        }
    );


    /* =====================================================
        MAPA EM GRANDE
    ====================================================== */

    if (mapExpandButton) {

        mapExpandButton.addEventListener(
            "click",
            function () {

                const detailMap =
                    projectMapElement.closest(
                        ".detail-map"
                    );


                if (!detailMap) {
                    return;
                }


                const expanded =
                    detailMap.classList.toggle(
                        "map-expanded"
                    );


                document.body.classList.toggle(
                    "map-open",
                    expanded
                );


                const buttonText =
                    mapExpandButton.querySelector(
                        "span"
                    );


                const buttonIcon =
                    mapExpandButton.querySelector(
                        "i"
                    );


                if (buttonText) {

                    buttonText.textContent =
                        expanded
                            ? "Fechar mapa"
                            : "Abrir mapa";

                }


                if (buttonIcon) {

                    buttonIcon.className =
                        expanded
                            ? "bi bi-fullscreen-exit"
                            : "bi bi-arrows-fullscreen";

                }


                setTimeout(
                    function () {

                        map.invalidateSize();

                    },
                    250
                );

            }
        );

    }


    setTimeout(
        function () {

            map.invalidateSize();

        },
        300
    );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

createThumbnails();

updateModal();
