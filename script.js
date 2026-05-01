
const data = {
    produtos: [
        {
            id: 1,
            nome: "Vinho Tinto Suave",
            preco: 39.90,
            categoria: "Tinto",
            imagem: "imagens/tintosuave.png",
            descricao: "Leve e fácil de beber",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Vinho Tinto Seco",
            preco: 59.90,
            categoria: "Tinto",
            imagem: "imagens/tintoseco.png",
            descricao: "Mais encorpado e intenso",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Vinho Branco Suave",
            preco: 45.00,
            categoria: "Branco",
            imagem: "imagens/brancosuave.png",
            descricao: "Refrescante e leve",
            emEstoque: true
        },
        {
            id: 4,
            nome: "Vinho Branco Seco",
            preco: 52.00,
            categoria: "Branco",
            imagem: "imagens/brancoseco.png",
            descricao: "Seco e equilibrado",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Vinho Rosé",
            preco: 48.90,
            categoria: "Rosé",
            imagem: "imagens/rosesuave.png",
            descricao: "Leve e aromático",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Vinho Rosé Seco",
            preco: 55.90,
            categoria: "Rosé",
            imagem: "imagens/roseseco.png",
            descricao: "Sabor mais intenso",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Espumante Brut",
            preco: 69.90,
            categoria: "Espumante",
            imagem: "imagens/espumantebrut.png",
            descricao: "Ideal para festas",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Espumante Moscatel",
            preco: 64.90,
            categoria: "Espumante",
            imagem: "imagens/espumantemoscatel.png",
            descricao: "Mais doce e suave",
            emEstoque: false
        }
    ]
};

// ELEMENTOS DO DOM
const lista = document.getElementById("product-list");
const detalhes = document.getElementById("product-details");
const busca = document.querySelector("#search");
const categoria = document.querySelector("#category");
const botao = document.querySelector("#btnRender");

// FORMATAR PREÇO
function formatPrice(valor) {
    return "R$ " + valor.toFixed(2);
}

// CRIAR CARD
function createProductCard(produto) {

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    // STYLE (OBRIGATÓRIO)
    card.style.padding = "10px";
    card.style.border = "1px solid #ccc";
    card.style.backgroundColor = "#fff";

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const img = document.createElement("img");
    img.src = produto.imagem;
    img.style.width = "120px";

    const preco = document.createElement("p");
    preco.textContent = formatPrice(produto.preco);

    const cat = document.createElement("p");
    cat.textContent = "Categoria: " + produto.categoria;

    const estoque = document.createElement("p");
    estoque.textContent = produto.emEstoque ? "Disponível" : "Indisponível";

    const btnDetalhes = document.createElement("button");
    btnDetalhes.textContent = "Ver detalhes";

    btnDetalhes.addEventListener("click", function () {
        detalhes.innerHTML =
            "<h3>" + produto.nome + "</h3>" +
            "<p>" + formatPrice(produto.preco) + "</p>" +
            "<p>" + produto.descricao + "</p>";
    });

    const btnDestacar = document.createElement("button");
    btnDestacar.textContent = "Destacar";

    btnDestacar.addEventListener("click", function () {
        card.classList.toggle("destaque");
    });

    card.appendChild(nome);
    card.appendChild(img);
    card.appendChild(preco);
    card.appendChild(cat);
    card.appendChild(estoque);
    card.appendChild(btnDetalhes);
    card.appendChild(btnDestacar);

    return card;
}

// RENDER PRODUTOS
function renderProducts(listaProdutos) {

    lista.innerHTML = "";

    listaProdutos.forEach(function (p) {
        const card = createProductCard(p);
        lista.appendChild(card);
    });

    // ✔ querySelectorAll (AGORA NO LUGAR CERTO)
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (c) {
        console.log("ID do card:", c.getAttribute("data-id"));
    });
}

// CATEGORIAS
function renderCategories() {

    categoria.innerHTML = "<option value='todas'>Todas</option>";

    const listaCats = [];

    data.produtos.forEach(function (p) {
        if (!listaCats.includes(p.categoria)) {
            listaCats.push(p.categoria);
        }
    });

    listaCats.forEach(function (c) {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        categoria.appendChild(opt);
    });
}

// FILTRO
function filterProducts() {

    const texto = busca.value.toLowerCase();
    const cat = categoria.value;

    const filtrados = data.produtos.filter(function (p) {

        const nomeOk = p.nome.toLowerCase().includes(texto);
        const catOk = (cat === "todas" || p.categoria === cat);

        return nomeOk && catOk;
    });

    renderProducts(filtrados);
}

// EVENTOS
botao.addEventListener("click", function () {
    renderProducts(data.produtos);
});

busca.addEventListener("input", filterProducts);
categoria.addEventListener("change", filterProducts);

// INICIALIZAÇÃO
renderCategories();
renderProducts(data.produtos);