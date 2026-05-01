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

// Seleção de elementos do HTML
const lista = document.getElementById("product-list");
const detalhesArea = document.getElementById("product-details");
const botaoRender = document.getElementById("btnRender"); 
const buscaInput = document.querySelector("#search");
const categoriaSelect = document.querySelector("#category");

// Formatação de moeda
function formatPrice(valor) {
    return "R$ " + valor.toFixed(2);
}

// Exibe as informações detalhadas do vinho selecionado
function showProductDetails(produto) {
    detalhesArea.innerHTML = `
        <h3>${produto.nome}</h3>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Tipo:</strong> ${produto.categoria}</p>
        <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

// Cria a estrutura visual de cada card de produto
function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    card.style.padding = "12px";

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;
    nome.classList.add("card-title");

    const img = document.createElement("img");
    img.src = produto.imagem;
    img.alt = produto.nome;

    const preco = document.createElement("p");
    preco.textContent = formatPrice(produto.preco);

    const cat = document.createElement("p");
    cat.textContent = "Categoria: " + produto.categoria;

    const btnDetalhes = document.createElement("button");
    btnDetalhes.textContent = "Ver detalhes";
    btnDetalhes.addEventListener("click", function() {
        showProductDetails(produto);
    });

    const btnDestacar = document.createElement("button");
    btnDestacar.textContent = "Destacar";
    btnDestacar.addEventListener("click", function() {
        card.classList.toggle("destaque");
    });

    card.appendChild(nome);
    card.appendChild(img);
    card.appendChild(preco);
    card.appendChild(cat);
    card.appendChild(btnDetalhes);
    card.appendChild(btnDestacar);

    return card;
}

// Renderiza a lista de produtos na tela
function renderProducts(listaFiltrada) {
    lista.innerHTML = ""; 

    listaFiltrada.forEach(function(p) {
        const cardPronto = createProductCard(p);
        lista.appendChild(cardPronto);
    });

    const cardsCriados = document.querySelectorAll(".card");
    cardsCriados.forEach(function(c) {
        console.log("Card renderizado - ID:", c.getAttribute("data-id"));
    });
}

// Gera categorias
function renderCategories() {
    categoriaSelect.innerHTML = "<option value='todas'>Todas</option>";
    
    let nomesCategorias = [];
    data.produtos.forEach(function(p) {
        if (!nomesCategorias.includes(p.categoria)) {
            nomesCategorias.push(p.categoria);
        }
    });

    nomesCategorias.forEach(function(cat) {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categoriaSelect.appendChild(opt);
    });
}

// 🔴 CORREÇÃO AQUI (mínima, sem mudar lógica)
function filterProducts() {
    const texto = buscaInput.value.toLowerCase().trim();
    const filtroCat = categoriaSelect.value.toLowerCase().trim();

    const filtrados = data.produtos.filter(function(p) {
        const nomeOk = p.nome.toLowerCase().includes(texto);
        const catOk = (filtroCat === "todas" || p.categoria.toLowerCase() === filtroCat);
        return nomeOk && catOk;
    });

    renderProducts(filtrados);
}

// Eventos
botaoRender.addEventListener("click", function() {
    renderProducts(data.produtos);
});

buscaInput.addEventListener("input", filterProducts);
categoriaSelect.addEventListener("change", filterProducts);

// Inicialização
renderCategories();
renderProducts(data.produtos);