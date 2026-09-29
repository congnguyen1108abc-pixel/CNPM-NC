const header = document.getElementById("header");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 40);
    });
}

const searchButton = document.getElementById("searchButton");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

if (searchButton && searchOverlay && searchInput) {
    searchButton.addEventListener("click", () => {
        searchOverlay.classList.add("active");

        setTimeout(() => {
            searchInput.focus();
        }, 100);
    });
}

if (closeSearch && searchOverlay) {
    closeSearch.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
    });
}

if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove("active");
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay) {
        searchOverlay.classList.remove("active");
    }
});

const cartCount = document.querySelector(".cart-count");
const addButtons = document.querySelectorAll(".add-cart");

let cart = 0;

addButtons.forEach((button) => {
    button.addEventListener("click", () => {
        cart++;

        if (cartCount) {
            cartCount.textContent = cart;
        }

        const originalText = button.textContent.trim();
        button.textContent = "✓";

        setTimeout(() => {
            button.textContent = originalText;
        }, 1000);
    });
});

const hearts = document.querySelectorAll(".heart-button");

hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
        heart.textContent = heart.textContent === "♡" ? "♥" : "♡";
    });
});

const revealElements = document.querySelectorAll(".product-card, .category-card, .service");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity .7s ease, transform .7s ease";
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
    });
}
