/* ==================================================
   GALERIA DE IMAGENS
================================================== */

/*
    Todas as fotografias da Casa 1.

    Estrutura:
    assets/
        Casa1/
            1.jpg
            2.jpg
            3.jpg
*/

const galleryImages = [
    "assets/Casa1/1.jpg",
    "assets/Casa1/2.jpg",
    "assets/Casa1/3.jpg"
];


/*
    Cada imóvel tem a sua própria imagem atual.

    Como temos dois anúncios iguais neste exemplo:
    galleryIndexes[0] = imagem atual do primeiro
    galleryIndexes[1] = imagem atual do segundo
*/

const galleryIndexes = [];


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

const modalThumbnails = document.getElementById("modal-thumbnails");


/*
    Índice do imóvel que está atualmente aberto
    no modal.
*/

let activeGallery = 0;


/* Número total de imagens */

if (modalTotal) {
    modalTotal.textContent = galleryImages.length;
}


/* ==================================================
   GALERIAS DOS IMÓVEIS
================================================== */

const galleries = document.querySelectorAll(".property-gallery");


galleries.forEach((gallery, galleryIndex) => {

    /*
        Cada galeria começa na primeira imagem.
    */

    galleryIndexes[galleryIndex] = 0;


    const image = gallery.querySelector(".gallery-image");

    const previousButton = gallery.querySelector(".gallery-prev");

    const nextButton = gallery.querySelector(".gallery-next");

    const currentCounter = gallery.querySelector(".gallery-current");

    const totalCounter = gallery.querySelector(".gallery-total");


    /* Número total de imagens */

    if (totalCounter) {
        totalCounter.textContent = galleryImages.length;
    }


    /* ==================================================
       MOSTRAR IMAGEM
    ================================================== */

    function showGalleryImage(index) {

        /*
            Se passar da última imagem,
            volta para a primeira.
        */

        if (index >= galleryImages.length) {
            index = 0;
        }


        /*
            Se estiver antes da primeira,
            vai para a última.
        */

        if (index < 0) {
            index = galleryImages.length - 1;
        }


        galleryIndexes[galleryIndex] = index;


        /* Alterar imagem */

        image.src = galleryImages[index];


        /* Atualizar contador */

        if (currentCounter) {
            currentCounter.textContent = index + 1;
        }

    }


    /* ==================================================
       SETA ESQUERDA
    ================================================== */

    previousButton.addEventListener("click", (event) => {

        event.stopPropagation();

        showGalleryImage(
            galleryIndexes[galleryIndex] - 1
        );

    });


    /* ==================================================
       SETA DIREITA
    ================================================== */

    nextButton.addEventListener("click", (event) => {

        event.stopPropagation();

        showGalleryImage(
            galleryIndexes[galleryIndex] + 1
        );

    });


    /* ==================================================
       CLICAR NA IMAGEM
    ================================================== */

    image.addEventListener("click", () => {

        activeGallery = galleryIndex;

        /*
            O modal abre exatamente na fotografia
            que está a ser mostrada na galeria.
        */

        openModal(
            galleryIndexes[galleryIndex]
        );

    });

});


/* ==================================================
   ABRIR MODAL
================================================== */

function openModal(index) {

    if (!modal) return;


    /*
        Garantir que o índice é válido.
    */

    if (index < 0) {
        index = galleryImages.length - 1;
    }

    if (index >= galleryImages.length) {
        index = 0;
    }


    galleryIndexes[activeGallery] = index;


    modalImage.src = galleryImages[index];

    modalImage.alt =
        `Moradia T2 - imagem ${index + 1}`;


    modalCurrent.textContent = index + 1;


    /*
        Criar as miniaturas.
    */

    createThumbnails();


    /*
        Mostrar modal.
    */

    modal.classList.add("open");


    /*
        Impedir o scroll da página enquanto
        o modal está aberto.
    */

    document.body.style.overflow = "hidden";

}


/* ==================================================
   MINIATURAS
================================================== */

function createThumbnails() {

    if (!modalThumbnails) return;


    modalThumbnails.innerHTML = "";


    const currentIndex =
        galleryIndexes[activeGallery];


    galleryImages.forEach((image, index) => {

        const thumbnail =
            document.createElement("img");


        thumbnail.src = image;


        thumbnail.alt =
            `Miniatura ${index + 1}`;


        thumbnail.classList.add(
            "modal-thumbnail"
        );


        /*
            Destacar a imagem atualmente selecionada.
        */

        if (index === currentIndex) {

            thumbnail.classList.add("active");

        }


        /*
            Clicar numa miniatura.
        */

        thumbnail.addEventListener("click", (event) => {

            event.stopPropagation();

            changeModalImage(index);

        });


        modalThumbnails.appendChild(thumbnail);

    });

}


/* ==================================================
   TROCAR IMAGEM DO MODAL
================================================== */

function changeModalImage(index) {

    if (index >= galleryImages.length) {
        index = 0;
    }


    if (index < 0) {
        index = galleryImages.length - 1;
    }


    /*
        Atualizar imagem atual do imóvel.
    */

    galleryIndexes[activeGallery] = index;


    /*
        Atualizar imagem grande.
    */

    modalImage.src = galleryImages[index];

    modalImage.alt =
        `Moradia T2 - imagem ${index + 1}`;


    /*
        Atualizar contador.
    */

    modalCurrent.textContent = index + 1;


    /*
        Atualizar miniaturas.
    */

    createThumbnails();


    /*
        Atualizar também a imagem da galeria
        que está por trás do modal.
    */

    const galleries =
        document.querySelectorAll(".property-gallery");


    const gallery =
        galleries[activeGallery];


    if (gallery) {

        const galleryImage =
            gallery.querySelector(".gallery-image");

        const galleryCounter =
            gallery.querySelector(".gallery-current");


        if (galleryImage) {
            galleryImage.src =
                galleryImages[index];
        }


        if (galleryCounter) {
            galleryCounter.textContent =
                index + 1;
        }

    }

}


/* ==================================================
   SETA ESQUERDA DO MODAL
================================================== */

if (modalPrev) {

    modalPrev.addEventListener("click", (event) => {

        event.stopPropagation();


        changeModalImage(
            galleryIndexes[activeGallery] - 1
        );

    });

}


/* ==================================================
   SETA DIREITA DO MODAL
================================================== */

if (modalNext) {

    modalNext.addEventListener("click", (event) => {

        event.stopPropagation();


        changeModalImage(
            galleryIndexes[activeGallery] + 1
        );

    });

}


/* ==================================================
   FECHAR MODAL
================================================== */

function closeModal() {

    if (!modal) return;


    modal.classList.remove("open");


    /*
        Voltar a permitir scroll.
    */

    document.body.style.overflow = "";

}


if (modalClose) {

    modalClose.addEventListener("click", (event) => {

        event.stopPropagation();

        closeModal();

    });

}


/*
    Clicar no fundo escuro fecha o modal.

    Clicar na imagem ou nas miniaturas NÃO fecha.
*/

if (modal) {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            closeModal();

        }

    });

}


/* ==================================================
   TECLADO
================================================== */

document.addEventListener("keydown", (event) => {

    /*
        Só funciona se o modal estiver aberto.
    */

    if (!modal || !modal.classList.contains("open")) {
        return;
    }


    /* ESC */

    if (event.key === "Escape") {

        closeModal();

    }


    /* Seta esquerda */

    if (event.key === "ArrowLeft") {

        changeModalImage(
            galleryIndexes[activeGallery] - 1
        );

    }


    /* Seta direita */

    if (event.key === "ArrowRight") {

        changeModalImage(
            galleryIndexes[activeGallery] + 1
        );

    }

});


/* ==================================================
   HEADER
================================================== */

/*
    O teu HTML original não tinha id="header",
    por isso esta parte dava erro.

    Agora o elemento existe, mas também fazemos
    a verificação para o JS nunca parar por causa disso.
*/

const header = document.getElementById("header");


if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* ==================================================
   LOADING
================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});