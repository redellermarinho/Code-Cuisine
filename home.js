// Selecione os elementos do carrinho e outros elementos relevantes
const cartContainer = document.getElementById("cart-container");
const toggleCartButton = document.getElementById("toggle-cart-button");
const cartItemsList = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const couponInput = document.getElementById("coupon-input");
const applyCouponButton = document.getElementById("apply-coupon-button");
const checkoutQRButton = document.getElementById("checkout-qr");
const checkoutgarcom = document.getElementById("garçom");
const buyAgainButton = document.getElementById("buy-again");
const removeItemButton = document.getElementById("remove-item");

// Outras variáveis globais necessárias
let cartItems = [];
let total = 0;

// Função para atualizar o subtotal
function updateSubtotal() {
    total = cartItems.reduce((acc, item) => acc + item.price, 0);
    subtotalElement.textContent = total.toFixed(2);
}

// Função para adicionar um item ao carrinho
function addItemToCart(item) {
    cartItems.push(item);
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)}`;
    cartItemsList.appendChild(cartItem);
    updateSubtotal();
}

// Função para remover um item do carrinho
function removeItemFromCart() {
    if (cartItems.length > 0) {
        cartItems.pop();
        const lastCartItem = cartItemsList.lastElementChild;
        if (lastCartItem) {
            cartItemsList.removeChild(lastCartItem);
        }
        updateSubtotal();
    }
}

// Evento de clique no botão "Comprar Novamente"
buyAgainButton.addEventListener("click", () => {
    // Lógica para reiniciar o carrinho
    cartItems = []; // Limpar o array de itens do carrinho
    cartItemsList.innerHTML = ""; // Remover os itens da lista no HTML
    updateSubtotal(); // Atualizar o subtotal para zero

    // Limpar mensagens de cupom e mensagens de conclusão
    const couponMessage = document.getElementById("coupon-message");
    const finishMessage = document.getElementById("finish-message");
    couponMessage.textContent = "";
    finishMessage.textContent = "";
});


// Evento de clique no botão "Remover Item"
removeItemButton.addEventListener("click", () => {
    removeItemFromCart();
});

// Evento de clique no botão "Pagar com QR Code ou Chamar Garçom"
checkoutQRButton.addEventListener("click", () => {
    // Lógica para pagamento com QR Code ou chamada de garçom
    // Exemplo: Simulação de tempo estimado para o garçom chegar
    setTimeout(() => {
        const finishMessage = document.getElementById("finish-message");
        finishMessage.textContent = `Pedido pronto! Tempo estimado: 45 minutos.`;
    }, 100); // 1 minuto (1000 ms)
});

checkoutgarcom.addEventListener("click", () => {
    // Exemplo: Simulação de tempo estimado para o pedido ficar pronto
    setTimeout(() => {
        const finishMessage = document.getElementById("finish-message");
        finishMessage.textContent = `O Garçom chegará em tempo estimado de 1 minuto com a máquina de Débito ou Crédito`;
    }, 450); // 45 minutos (45000 ms)
});

// Evento de clique no botão para abrir/fechar o carrinho
toggleCartButton.addEventListener("click", () => {
    if (cartContainer.style.display === "none" || cartContainer.style.display === "") {
        cartContainer.style.display = "block";
    } else {
        cartContainer.style.display = "none";
    }
});


const cupons = [
    { code: "DESCONTO10", discount: 0.1 }, // 10% de desconto
    { code: "DESCONTO25", discount: 0.25 }, 
    { code: "DESCONTO30", discount: 0.30 },
];

// Função para aplicar um cupom de desconto
function applyCoupon(couponCode) {
    const coupon = cupons.find((c) => c.code === couponCode);
    const couponMessage = document.getElementById("coupon-message");

    if (coupon) {
        // Aplicar o desconto ao subtotal
        total *= 1 - coupon.discount;
        subtotalElement.textContent = total.toFixed(2);
        
        // Exibir mensagem de cupom aplicado
        couponMessage.textContent = `Cupom ${couponCode} aplicado com sucesso!`;
        couponMessage.classList.remove("error"); // Remover classe de erro, se houver
        
    } else {
        // Exibir mensagem de cupom inválido
        couponMessage.textContent = "Cupom inválido. Verifique o código e tente novamente.";
        couponMessage.classList.add("error"); // Adicionar classe de erro
    }
}


// Evento de clique no botão "Aplicar Cupom"
applyCouponButton.addEventListener("click", () => {
    const couponCode = couponInput.value;
    // Chame a função applyCoupon com o código do cupom
    applyCoupon(couponCode);
});


// Função para adicionar um item ao carrinho
function addItemToCart(item) {
    cartItems.push(item);
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)}`;
    cartItemsList.appendChild(cartItem);
    updateSubtotal();
}

// Evento de clique no botão "Comprar" na página inicial
const buyButtons = document.querySelectorAll(".buy-button");
buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Coleta os detalhes do item com base na estrutura do seu HTML
        const menuItem = button.parentElement;
        const itemName = menuItem.querySelector("h3").textContent;
        const itemPrice = parseFloat(menuItem.querySelector(".menu-item-price").textContent.replace("R$ ", ""));
        
        // Crie um objeto de item
        const item = {
            name: itemName,
            price: itemPrice,
        };
        
        // Adicione o item ao carrinho
        addItemToCart(item);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // Selecione o elemento de entrada de texto e o botão de pesquisa
    const menuSearchInput = document.getElementById("menu-search-input");
    const menuSearchButton = document.getElementById("menu-search-button");

    // Adicione um ouvinte de evento de clique ao botão de pesquisa
    menuSearchButton.addEventListener("click", () => {
        searchMenuItems(menuSearchInput.value.toLowerCase());
    });

    // Função para realizar a pesquisa
    function searchMenuItems(searchTerm) {
        const menuItems = document.querySelectorAll(".menu-item");

        // Iterar pelos itens do menu
        menuItems.forEach((menuItem) => {
            const itemName = menuItem.querySelector("h3").textContent.toLowerCase();

            // Verificar se o nome do item do menu contém o termo de pesquisa
            if (itemName.includes(searchTerm)) {
                menuItem.style.display = "block"; // Exibir o item se for uma correspondência
            } else {
                menuItem.style.display = "none"; // Ocultar o item se não for uma correspondência
            }
        });
    }
    
 
});
