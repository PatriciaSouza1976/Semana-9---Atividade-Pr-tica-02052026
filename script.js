// 1. DADOS (JSON)
const data = {
    produtos: [
        {
            id: 1,
            nome: "Vinho Tinto Suave",
            preco: 39.90,
            categoria: "Tinto",
            imagem: "https://via.placeholder.com/150",
            descricao: "Vinho tinto leve e fácil de beber.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Vinho Tinto Seco",
            preco: 59.90,
            categoria: "Tinto",
            imagem: "https://via.placeholder.com/150",
            descricao: "Vinho tinto mais encorpado.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Vinho Branco Suave",
            preco: 45.00,
            categoria: "Branco",
            imagem: "https://via.placeholder.com/150",
            descricao: "Vinho branco leve e refrescante.",
            emEstoque: true
        },
        {
            id: 4,
            nome: "Vinho Branco Seco",
            preco: 52.00,
            categoria: "Branco",
            imagem: "https://via.placeholder.com/150",
            descricao: "Vinho branco seco.",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Vinho Rosé",
            preco: 48.90,
            categoria: "Rosé",
            imagem: "https://via.placeholder.com/150",
            descricao: "Vinho rosé leve e delicado.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Vinho Rosé Seco",
            preco: 55.90,
            categoria: "Rosé",
            imagem: "https://via.placeholder.com/150",
            descricao: "Rosé com sabor marcante.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Espumante Brut",
            preco: 69.90,
            categoria: "Espumante",
            imagem: "https://via.placeholder.com/150",
            descricao: "Espumante ideal para festas.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Espumante Doce",
            preco: 64.90,
            categoria: "Espumante",
            imagem: "https://via.placeholder.com/150",
            descricao: "Espumante mais doce.",
            emEstoque: false
        }
    ]
};

// 2. SELEÇÃO DO DOM
const lista = document.getElementById("product-list");
const detalhes = document.getElementById("product-details");

const busca = document.querySelector("#search");
const categoria = document.querySelector("#category");
const botao = document.querySelector("#btnRender");


function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}