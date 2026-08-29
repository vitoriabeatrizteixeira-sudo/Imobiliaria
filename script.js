/* ==================================================
   GALERIAS DE IMAGENS
================================================== */

const images = [
    "assets/Casa1/1.jpg",
    "assets/Casa1/2.jpg",
    "assets/Casa1/3.jpg"
];


/* ==================================================
   MODAL
================================================== */

const modal = document.getElementById("image-modal");

const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");

const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

const modalCurrent = document.getElementById("modal-current");
const modalTotal = document.getElementById("modal-total");

const modalThumbnails =
    document.getElementById("modal-thumbnails");


/* ==================================================
   ESTADO DA GALERIA
================================================== */

let currentImage = 0;


/* ==================================================
   INICIALIZAÇÃO DO MODAL
================================================== */

modalTotal.textContent = images.length;


/* ==================================================
   ATUALIZAR GALERIA PRINCIPAL
================================================== */

function updateGallery(gallery, index) {

    const image =
        gallery.querySelector(".gallery-image");

    const current =
        gallery.querySelector(".gallery-current");

    const total =
        gallery.querySelector(".gallery-total");


    image.src = images[index];

    image.alt =
        `Moradia T2 - imagem ${index + 1}`;


    if (current) {
        current.textContent = index + 1;
    }


    if (total) {
        total.textContent = images.length;
    }

}


/* ==================================================
   ABRIR MODAL
================================================== */

function openModal(index) {

    currentImage = index;

    updateModal();

    modal.classList.add("open");

    document.body.style.overflow = "hidden";

}


/* ==================================================
   ATUALIZAR MODAL
================================================== */

function updateModal() {

    modalImage.src =
        images[currentImage];

    modalImage.alt =
        `Moradia T2 - imagem ${currentImage + 1}`;


    modalCurrent.textContent =
        currentImage + 1;


    updateThumbnails();

}


/* ==================================================
   MINIATURAS
================================================== */

function updateThumbnails() {

    modalThumbnails.innerHTML = "";


    images.forEach((image, index) => {

        const thumbnail =
            document.createElement("img");


        thumbnail.src = image;

        thumbnail.alt =
            `Miniatura ${index + 1}`;


        thumbnail.classList.add(
            "modal-thumbnail"
        );


        if (index === currentImage) {

            thumbnail.classList.add(
                "active"
            );

        }


        thumbnail.addEventListener(
            "click",
            () => {

                currentImage = index;

                updateModal();

            }
        );


        modalThumbnails.appendChild(
            thumbnail
        );

    });

}


/* ==================================================
   MUDAR IMAGEM
================================================== */

function changeImage(direction) {

    currentImage += direction;


    if (currentImage < 0) {

        currentImage =
            images.length - 1;

    }


    if (currentImage >= images.length) {

        currentImage = 0;

    }


    updateModal();


    /*
       Atualiza também a galeria
       visível na página.
    */

    const galleries =
        document.querySelectorAll(
            ".property-gallery"
        );


    galleries.forEach(gallery => {

        updateGallery(
            gallery,
            currentImage
        );

    });

}


/* ==================================================
   CONFIGURAR TODAS AS GALERIAS
================================================== */

const galleries =
    document.querySelectorAll(
        ".property-gallery"
    );


galleries.forEach((gallery) => {

    const image =
        gallery.querySelector(
            ".gallery-image"
        );


    const previous =
        gallery.querySelector(
            ".gallery-prev"
        );


    const next =
        gallery.querySelector(
            ".gallery-next"
        );


    let galleryIndex = 0;


    /*
       Inicializar
    */

    updateGallery(
        gallery,
        galleryIndex
    );


    /*
       Seta esquerda
    */

    previous.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            galleryIndex--;

            if (galleryIndex < 0) {

                galleryIndex =
                    images.length - 1;

            }


            updateGallery(
                gallery,
                galleryIndex
            );

        }
    );


    /*
       Seta direita
    */

    next.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            galleryIndex++;

            if (
                galleryIndex >=
                images.length
            ) {

                galleryIndex = 0;

            }


            updateGallery(
                gallery,
                galleryIndex
            );

        }
    );


    /*
       Clicar na imagem
    */

    image.addEventListener(
        "click",
        () => {

            /*
               O modal abre na imagem
               que está atualmente visível.
            */

            const imageNumber =
                images.indexOf(
                    image.getAttribute("src")
                );


            currentImage =
                imageNumber >= 0
                    ? imageNumber
                    : galleryIndex;


            openModal(currentImage);

        }
    );

});


/* ==================================================
   SETAS DO MODAL
================================================== */

modalPrev.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        changeImage(-1);

    }
);


modalNext.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        changeImage(1);

    }
);


/* ==================================================
   FECHAR MODAL
================================================== */

function closeModal() {

    modal.classList.remove("open");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


/*
   Clicar no fundo fecha.
*/

modal.addEventListener(
    "click",
    (event) => {

        if (event.target === modal) {

            closeModal();

        }

    }
);


/* ==================================================
   TECLADO
================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !modal.classList.contains(
                "open"
            )
        ) {

            return;

        }


        if (event.key === "ArrowLeft") {

            changeImage(-1);

        }


        if (event.key === "ArrowRight") {

            changeImage(1);

        }


        if (event.key === "Escape") {

            closeModal();

        }

    }
);


/* ==================================================
   FORMULÁRIO
================================================== */

/*
   Atualmente é apenas visual.
   Não envia realmente os dados.
*/

const form =
    document.getElementById(
        "contact-form"
    );


if (form) {

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            alert(
                "Mensagem enviada com sucesso!"
            );

            form.reset();

        }
    );

}
