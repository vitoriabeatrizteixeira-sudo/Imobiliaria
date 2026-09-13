const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz0M-oAeEBR2OGqwc9uNkBKyLXgM7pAU_HNff_2N95TpjokSlGFJBohJSsPNTPfTcbk/exec";
const FORM_REQUEST_TIMEOUT_MS = 15000;

const initializeProjectGalleries = () => {
    document.querySelectorAll("[data-project-gallery]").forEach((gallery) => {
        const slides = [...gallery.querySelectorAll(".project-slide")];
        const dots = [...gallery.querySelectorAll(".gallery-dot")];
        const previousButton = gallery.querySelector(".project-gallery-prev");
        const nextButton = gallery.querySelector(".project-gallery-next");
        const currentCounter = gallery.querySelector(".project-current");
        const totalCounter = gallery.querySelector(".project-total");

        if (!slides.length) return;

        let currentIndex = 0;
        if (totalCounter) totalCounter.textContent = slides.length;

        const showSlide = (index) => {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle("active", slideIndex === currentIndex);
            });
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("active", dotIndex === currentIndex);
            });

            if (currentCounter) currentCounter.textContent = currentIndex + 1;
        };

        previousButton?.addEventListener("click", () => showSlide(currentIndex - 1));
        nextButton?.addEventListener("click", () => showSlide(currentIndex + 1));
        dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));
        showSlide(0);
    });
};

const showFeedbackModal = (title, text, isError = false) => {
    document.getElementById("custom-feedback-modal")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "custom-feedback-modal";
    overlay.className = "feedback-modal";

    const content = document.createElement("div");
    content.className = "feedback-modal-content";

    const icon = document.createElement("div");
    icon.className = "feedback-modal-icon";
    icon.innerHTML = isError ? "&#9888;" : "&#10003;";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const description = document.createElement("p");
    description.textContent = text;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "feedback-modal-close";
    closeButton.textContent = "Fechar";

    const closeModal = () => {
        overlay.classList.remove("active");
        window.setTimeout(() => overlay.remove(), 300);
    };

    closeButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", ({ target }) => {
        if (target === overlay) closeModal();
    });

    content.append(icon, heading, description, closeButton);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("active"));
};

const initializeContactForm = () => {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const fields = {
        name: contactForm.querySelector("#name"),
        email: contactForm.querySelector("#email"),
        phone: contactForm.querySelector("#phone"),
        message: contactForm.querySelector("#message"),
        privacyConsent: contactForm.querySelector("#privacy-consent")
    };

    const setFieldError = (input, message) => {
        const group = input.closest(".form-group");
        if (!group || group.querySelector(".field-error-msg")) return;

        group.classList.add("has-error");
        input.setAttribute("aria-invalid", "true");
        const errorText = document.createElement("span");
        errorText.className = "field-error-msg";
        errorText.textContent = message;
        group.appendChild(errorText);
    };

    const clearFieldError = (input) => {
        const group = input.closest(".form-group");
        if (!group) return;

        group.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        group.querySelector(".field-error-msg")?.remove();
    };

    const clearAllFieldErrors = () => {
        contactForm.querySelectorAll(".has-error").forEach((group) => {
            group.classList.remove("has-error");
        });
        contactForm.querySelectorAll(".field-error-msg").forEach((message) => message.remove());
        contactForm.querySelectorAll("[aria-invalid='true']").forEach((input) => {
            input.removeAttribute("aria-invalid");
        });
    };

    const validateForm = () => {
        const { name, email, phone, message, privacyConsent } = fields;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let firstInvalidField;

        const invalidate = (input, errorMessage) => {
            firstInvalidField ??= input;
            setFieldError(input, errorMessage);
        };

        if (!name.value.trim()) {
            invalidate(name, "Por favor, introduza o seu nome.");
        }
        if (!email.value.trim()) {
            invalidate(email, "Por favor, introduza o seu email.");
        } else if (!emailRegex.test(email.value.trim())) {
            invalidate(email, "Por favor, introduza um email válido (ex: nome@dominio.com).");
        }
        if (!phone.value.trim()) {
            invalidate(phone, "Por favor, introduza o seu número de telefone.");
        } else if (phone.value.replace(/\D/g, "").length < 9) {
            invalidate(phone, "Por favor, introduza um número de telefone válido.");
        }
        if (!message.value.trim()) {
            invalidate(message, "Por favor, escreva a sua mensagem.");
        }
        if (!privacyConsent.checked) {
            invalidate(privacyConsent, "Para enviar a mensagem, aceite a Política de Privacidade.");
        }

        return firstInvalidField;
    };

    contactForm.querySelectorAll("input, textarea").forEach((input) => {
        const clearError = () => clearFieldError(input);
        input.addEventListener("input", clearError);
        input.addEventListener("change", clearError);
    });

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearAllFieldErrors();
        const firstInvalidField = validateForm();
        if (firstInvalidField) {
            firstInvalidField.focus();
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonContent = submitButton?.innerHTML ?? "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = "<span>A enviar...</span>";
        }

        let requestTimeout;

        try {
            const formData = new FormData(contactForm);
            const requestController = new AbortController();
            requestTimeout = window.setTimeout(
                () => requestController.abort(),
                FORM_REQUEST_TIMEOUT_MS
            );

            await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
                signal: requestController.signal
            });

            contactForm.reset();
            showFeedbackModal(
                "Mensagem Enviada",
                "Obrigado pelo seu contacto. A nossa equipa responderá o mais brevemente possível."
            );
        } catch (error) {
            const message = error.name === "AbortError"
                ? "O envio demorou demasiado tempo. Verifique a sua ligação e tente novamente."
                : "Ocorreu um erro ao enviar. Por favor, tente mais tarde ou entre em contacto diretamente connosco.";

            console.error("Erro ao enviar mensagem:", error);
            showFeedbackModal(
                "Erro no Envio",
                message,
                true
            );
        } finally {
            window.clearTimeout(requestTimeout);

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonContent;
            }
        }
    });
};

initializeProjectGalleries();
initializeContactForm();
