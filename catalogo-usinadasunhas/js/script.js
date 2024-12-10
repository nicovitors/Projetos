// Selecionando elementos principais
let cartIcon = document.getElementById("cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.getElementById("close-cart");

// Abrir carrinho
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

// Fechar carrinho
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Início da lógica do carrinho
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // Remover item do carrinho
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // Alterar quantidade
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Adicionar ao carrinho
    let addCartButtons = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCartButtons.length; i++) {
        let button = addCartButtons[i];
        button.addEventListener("click", addCartClicked);
    }

    // Botão "Comprar agora"
    document.querySelector(".btn-buy").addEventListener("click", buyButtonClicked);
}

// Função de clique no botão "Comprar agora"
function buyButtonClicked() {
    alert("Obrigado pela sua compra!");
    let cartContent = document.querySelector(".cart-content");
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// Função para remover item do carrinho
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Função para alterar a quantidade
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Função ao clicar em "Adicionar ao carrinho"
function addCartClicked(event) {
    let button = event.target;
    let shopProduct = button.parentElement;
    let title = shopProduct.querySelector(".product-title").innerText;
    let price = shopProduct.querySelector(".price").innerText;
    let productImg = shopProduct.querySelector(".product-img").src;

    addProductToCart(title, price, productImg);
    updateTotal();
}

// Adicionar produto ao carrinho
function addProductToCart(title, price, productImg) {
    let cartContent = document.querySelector(".cart-content");
    let cartItemNames = cartContent.getElementsByClassName("cart-product-title");

    // Verificar se o item já está no carrinho
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert("Este item já está no carrinho.");
            return;
        }
    }

    // Adicionar novo item ao carrinho
    let cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity" min="1">
        </div>
        <!-- Remove cart -->
        <i class="fa-solid fa-trash cart-remove"></i>
    `;
    cartContent.appendChild(cartBox);

    // Adicionar eventos de remoção e alteração de quantidade ao novo item
    cartBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
    cartBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
}

// Atualizar o total do carrinho
function updateTotal() {
    let cartContent = document.querySelector(".cart-content");
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.querySelector(".cart-price");
        let quantityElement = cartBox.querySelector(".cart-quantity");

        let price = parseFloat(priceElement.innerText.replace("R$", "").replace(",", "."));
        let quantity = quantityElement.value;

        console.log(`Preço: ${price}, Quantidade: ${quantity}`); // Depuração
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100; // Arredondar para 2 casas decimais
    document.querySelector(".total-price").innerText = "R$" + total.toFixed(2).replace(".", ",");
}