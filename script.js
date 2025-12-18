// ===============================
// CARRINHO LATERAL
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartPanel = document.getElementById("cart-panel");
const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

// abrir / fechar
cartToggle.addEventListener("click", () => {
    cartPanel.classList.add("open");
});

cartClose.addEventListener("click", () => {
    cartPanel.classList.remove("open");
});

// ===============================
// RENDERIZAÇÃO
// ===============================
function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.name} x${item.quantity}`;
        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    cartTotal.innerText = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// ADICIONAR PRODUTO
// ===============================
const buyButtons = document.querySelectorAll(".cards a:last-child");

buyButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const card = button.closest(".cards");
        const name = card.querySelector("figcaption p").innerText;
        const priceText = card.querySelector("figcaption p:nth-child(2)").innerText;
        const price = parseFloat(priceText.replace("R$", "").replace(",", "."));

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        renderCart();
        cartPanel.classList.add("open");

        button.innerText = "Adicionado ✓";
        setTimeout(() => button.innerText = "Comprar", 1200);
    });
});

// ===============================
// LIMPAR
// ===============================
clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
});
// ===============================
// FINALIZAR COMPRA
// ===============================
const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let resumo = "Resumo da compra:\n\n";
    let total = 0;

    cart.forEach(item => {
        resumo += `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity)
            .toFixed(2)
            .replace(".", ",")}\n`;
        total += item.price * item.quantity;
    });

    resumo += `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;

    alert(resumo);

    // simula checkout concluído
    cart = [];
    renderCart();
    cartPanel.classList.remove("open");
});

// inicialização
function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("cart-item");

        const text = document.createElement("span");
        text.innerText = `${item.name} x${item.quantity}`;

        const removeBtn = document.createElement("button");
        removeBtn.innerText = "🗑";
        removeBtn.title = "Remover item";

        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        });

        li.appendChild(text);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    cartTotal.innerText = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
    localStorage.setItem("cart", JSON.stringify(cart));
}



// ===============================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ===============================
const cards = document.querySelectorAll(".cards");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s";
    observer.observe(card);
});

// ===============================
// CARROSSEL DE IMAGENS - SOBRE NÓS
// ===============================
const aboutImage = document.querySelector(".texto-imagem img");

if (aboutImage) {
    "/img/gemini.png",
    "/img/classico.png",
    "/img/unnamed.png",
    "/img/gourmet.png",    removeBtn.addEventListener("click", () => {
      const idx = cart.findIndex(c => c.name === item.name);
      if (idx !== -1) cart.splice(idx, 1);
      renderCart();
    });
    "/img/especial.png"
};

let currentIndex = 0;

function changeImage() {
    aboutImage.style.opacity = 0;

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        aboutImage.src = images[currentIndex];
        aboutImage.style.opacity = 1;
    }, 500);
}

// Transição suave
aboutImage.style.transition = "opacity 0.5s";

// Troca a imagem a cada 6 segundos
setInterval(changeImage, 6000);
