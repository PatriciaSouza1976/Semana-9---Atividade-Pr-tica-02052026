// 1. DADOS (JSON)
const data = {
    produtos: [
        {
            id: 1,
            nome: "Vinho Tinto Suave",
            preco: 39.90,
            categoria: "Tinto",
            imagem: "imagens/tintosuave.png",
            descricao: "Vinho tinto leve e fácil de beber.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Vinho Tinto Seco",
            preco: 59.90,
            categoria: "Tinto",
            imagem: "imagens/tintoseco.png",
            descricao: "Vinho tinto mais encorpado.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Vinho Branco Suave",
            preco: 45.00,
            categoria: "Branco",
            imagem: "imagens/brancosuave.png",
            descricao: "Vinho branco leve e refrescante.",
            emEstoque: true
        },
        {
            id: 4,
            nome: "Vinho Branco Seco",
            preco: 52.00,
            categoria: "Branco",
            imagem: "imagens/brancoseco.png",
            descricao: "Vinho branco seco.",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Vinho Rosé",
            preco: 48.90,
            categoria: "Rosé",
            imagem: "imagens/rosesuave.png",
            descricao: "Vinho rosé leve e delicado.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Vinho Rosé Seco",
            preco: 55.90,
            categoria: "Rosé",
            imagem: "imagens/roseseco.png",
            descricao: "Rosé com sabor marcante.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Espumante Brut",
            preco: 69.90,
            categoria: "Espumante",
            imagem: "imagens/espumantebrut.png",
            descricao: "Espumante ideal para festas.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Espumante moscatel",
            preco: 64.90,
            categoria: "Espumante",
            imagem: "imagens/espumantemoscatel.png",
            descricao: "Espumante mais doce.",
            emEstoque: false
        }
    ]
};

// 2. DOM
const lista = document.getElementById("product-list");
const detalhes = document.getElementById("product-details");
const busca = document.querySelector("#search");
const categoria = document.querySelector("#category");
const botao = document.querySelector("#btnRender");

// 3. FORMATAR PREÇO
function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

// 4. CRIAR CARD
function createProductCard(produto) {

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    card.style.border = "1px solid #000";
    card.style.padding = "10px";
    card.style.margin = "10px";

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
        showProductDetails(produto);
    });

    const btnDestaque = document.createElement("button");
    btnDestaque.textContent = "Destacar";

    btnDestaque.addEventListener("click", function () {
        card.classList.toggle("destaque");
    });

    card.appendChild(nome);
    card.appendChild(img);
    card.appendChild(preco);
    card.appendChild(cat);
    card.appendChild(estoque);
    card.appendChild(btnDetalhes);
    card.appendChild(btnDestaque);

    return card;
}

// 5. RENDER PRODUTOS
function renderProducts(produtos) {

    lista.innerHTML = "";

    produtos.forEach(function (produto) {
        const card = createProductCard(produto);
        lista.appendChild(card);
    });
}

// 6. CATEGORIAS
function renderCategories() {

    categoria.innerHTML = '<option value="todas">Todas</option>';

    const cats = [];

    data.produtos.forEach(function (p) {
        if (!cats.includes(p.categoria)) {
            cats.push(p.categoria);
        }
    });

    cats.forEach(function (c) {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        categoria.appendChild(option);
    });
}

// 7. DETALHES
function showProductDetails(produto) {

    detalhes.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>Preço: ${formatPrice(produto.preco)}</p>
        <p>Categoria: ${produto.categoria}</p>
        <p>Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p>${produto.descricao}</p>
    `;
}

// 8. FILTRO
function filterProducts() {

    const texto = busca.value.toLowerCase();
    const cat = categoria.value;

    const filtrados = data.produtos.filter(function (produto) {

        const nomeOk = produto.nome.toLowerCase().includes(texto);
        const catOk = (cat === "todas" || produto.categoria === cat);

        return nomeOk && catOk;
    });

    renderProducts(filtrados);
}

// 9. EVENTOS
botao.addEventListener("click", function () {
    renderProducts(data.produtos);
});

busca.addEventListener("input", filterProducts);
categoria.addEventListener("change", filterProducts);

// 10. INICIALIZAÇÃO
renderCategories();
renderProducts(data.produtos);

console.log("JS rodando");