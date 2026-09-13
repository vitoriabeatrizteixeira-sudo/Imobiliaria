/* =========================================================
   GALERIAS DA HOMEPAGE
========================================================= */

document
    .querySelectorAll("[data-project-gallery]")
    .forEach(function (gallery) {

        const slides =
            gallery.querySelectorAll(".project-slide");

        const previousButton =
            gallery.querySelector(".project-gallery-prev");

        const nextButton =
            gallery.querySelector(".project-gallery-next");

        const dots =
            gallery.querySelectorAll(".gallery-dot");

        const currentCounter =
            gallery.querySelector(".project-current");

        const totalCounter =
            gallery.querySelector(".project-total");

        let currentIndex = 0;


        if (!slides.length) {
            return;
        }


        if (totalCounter) {
            totalCounter.textContent =
                slides.length;
        }


        function showSlide(index) {

            currentIndex =
                (index + slides.length) % slides.length;


            slides.forEach(function (slide, slideIndex) {

                slide.classList.toggle(
                    "active",
                    slideIndex === currentIndex
                );

            });


            dots.forEach(function (dot, dotIndex) {

                dot.classList.toggle(
                    "active",
                    dotIndex === currentIndex
                );

            });


            if (currentCounter) {

                currentCounter.textContent =
                    currentIndex + 1;

            }

        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    showSlide(currentIndex - 1);

                }
            );

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    showSlide(currentIndex + 1);

                }
            );

        }


        dots.forEach(function (dot, dotIndex) {

            dot.addEventListener(
                "click",
                function () {

                    showSlide(dotIndex);

                }
            );

        });


        showSlide(0);

    });



/* =========================================================
   FORMULÁRIO DE CONTACTO & POPUP DE FEEDBACK
========================================================= */

const contactForm =
    document.getElementById("contact-form");

const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz0M-oAeEBR2OGqwc9uNkBKyLXgM7pAU_HNff_2N95TpjokSlGFJBohJSsPNTPfTcbk/exec";


// Função para criar e exibir o Popup elegante
function showFeedbackModal(title, text, isError = false) {
    // Remove modal anterior se existir
    const existingModal = document.getElementById("custom-feedback-modal");
    if (existingModal) {
        existingModal.remove();
    }

    // Overlay (Fundo escuro transparente)
    const overlay = document.createElement("div");
    overlay.id = "custom-feedback-modal";
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Caixote do Popup com a estética da marca Umbau
    const modalContent = document.createElement("div");
    modalContent.style.cssText = `
        background-color: #1a1a1a;
        color: #ffffff;
        padding: 40px 32px;
        border-radius: 4px;
        max-width: 440px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transform: translateY(20px);
        transition: transform 0.3s ease;
        position: relative;
        font-family: inherit;
    `;

    // Ícone subtil
    const iconSpan = document.createElement("div");
    iconSpan.style.cssText = "font-size: 28px; margin-bottom: 16px;";
    iconSpan.innerHTML = isError ? "&#9888;" : "&#10003;";

    // Título Serifado
    const modalTitle = document.createElement("h3");
    modalTitle.style.cssText = `
        font-family: 'Playfair Display', serif, Georgia;
        font-size: 26px;
        font-weight: 400;
        margin: 0 0 12px 0;
        color: #ffffff;
        letter-spacing: -0.5px;
    `;
    modalTitle.textContent = title;

    // Texto descritivo
    const modalText = document.createElement("p");
    modalText.style.cssText = `
        font-size: 14px;
        color: #cccccc;
        margin: 0 0 28px 0;
        line-height: 1.6;
        font-weight: 300;
    `;
    modalText.textContent = text;

    // Botão de fechar minimalista
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Fechar";
    closeBtn.style.cssText = `
        background-color: #ffffff;
        color: #1a1a1a;
        border: none;
        padding: 12px 36px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.2s ease, color 0.2s ease;
        border-radius: 2px;
    `;

    closeBtn.onmouseover = function () {
        closeBtn.style.backgroundColor = "#e0e0e0";
    };
    closeBtn.onmouseout = function () {
        closeBtn.style.backgroundColor = "#ffffff";
    };

    function closeModal() {
        overlay.style.opacity = "0";
        modalContent.style.transform = "translateY(20px)";
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            closeModal();
        }
    });

    modalContent.appendChild(iconSpan);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText);
    modalContent.appendChild(closeBtn);
    overlay.appendChild(modalContent);
    document.body.appendChild(overlay);

    // Animação de entrada
    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        modalContent.style.transform = "translateY(0)";
    });
}


if (contactForm) {

    function setFieldError(input, message) {

        const group =
            input.closest(".form-group");


        if (!group) {
            return;
        }


        group.classList.add("has-error");


        if (
            !group.querySelector(".field-error-msg")
        ) {

            const errorText =
                document.createElement("span");

            errorText.className =
                "field-error-msg";

            errorText.textContent =
                message;

            group.appendChild(errorText);

        }

    }


    function clearFieldError(input) {

        const group =
            input.closest(".form-group");


        if (!group) {
            return;
        }


        group.classList.remove("has-error");


        const errorMessage =
            group.querySelector(".field-error-msg");


        if (errorMessage) {
            errorMessage.remove();
        }

    }


    contactForm
        .querySelectorAll("input, textarea")
        .forEach(function (input) {

            input.addEventListener(
                "input",
                function () {

                    clearFieldError(this);

                }
            );

        });


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let isValid = true;


            contactForm
                .querySelectorAll(".has-error")
                .forEach(function (group) {

                    group.classList.remove(
                        "has-error"
                    );

                });


            contactForm
                .querySelectorAll(".field-error-msg")
                .forEach(function (message) {

                    message.remove();

                });


            const nameInput =
                contactForm.querySelector("#name");

            const emailInput =
                contactForm.querySelector("#email");

            const phoneInput =
                contactForm.querySelector("#phone");

            const messageInput =
                contactForm.querySelector("#message");


            /* =================================================
               NOME
            ================================================== */

            if (!nameInput.value.trim()) {

                isValid = false;

                setFieldError(
                    nameInput,
                    "Por favor, introduza o seu nome."
                );

            }


            /* =================================================
               EMAIL
            ================================================== */

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailInput.value.trim()) {

                isValid = false;

                setFieldError(
                    emailInput,
                    "Por favor, introduza o seu email."
                );

            } else if (
                !emailRegex.test(
                    emailInput.value.trim()
                )
            ) {

                isValid = false;

                setFieldError(
                    emailInput,
                    "Por favor, introduza um email v\u00e0lido (ex: nome@dominio.com)."
                );

            }


            /* =================================================
               TELEFONE
            ================================================== */

            const phoneDigits =
                phoneInput.value.replace(/\D/g, "");


            if (!phoneInput.value.trim()) {

                isValid = false;

                setFieldError(
                    phoneInput,
                    "Por favor, introduza o seu n\u00famero de telefone."
                );

            } else if (
                phoneDigits.length < 9
            ) {

                isValid = false;

                setFieldError(
                    phoneInput,
                    "Por favor, introduza um n\u00famero de telefone v\u00e0lido."
                );

            }


            /* =================================================
               MENSAGEM
            ================================================== */

            if (!messageInput.value.trim()) {

                isValid = false;

                setFieldError(
                    messageInput,
                    "Por favor, escreva a sua mensagem."
                );

            }


            if (!isValid) {
                return;
            }


            /* =================================================
               ENVIO
            ================================================== */

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const originalButtonContent =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "<span>A enviar...</span>";

            }


            const formData =
                new FormData(contactForm);


            const searchParams =
                new URLSearchParams(formData);


            fetch(
                APPS_SCRIPT_URL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },

                    body:
                        searchParams.toString()
                }
            )
                .then(function () {

                    contactForm.reset();

                    // Dispara Popup de Sucesso com estilo Umbau
                    showFeedbackModal(
                        "Mensagem Enviada",
                        "Obrigado pelo seu contacto. A nossa equipa responder\u00e1 o mais brevemente poss\u00edvel.",
                        false
                    );

                })
                .catch(function (error) {

                    console.error(
                        "Erro ao enviar mensagem:",
                        error
                    );

                    // Dispara Popup de Erro com estilo Umbau
                    showFeedbackModal(
                        "Erro no Envio",
                        "Ocorreu um erro ao enviar. Por favor, tente mais tarde ou entre em contacto diretamente connosco.",
                        true
                    );

                })
                .finally(function () {

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            originalButtonContent;

                    }

                });

        }
    );

}