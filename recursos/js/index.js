// function obterProdutos() {
//     fetch('http://localhost:3001/productos')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Erro ao obter os produtos');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Aqui você pode fazer o que quiser com os dados dos produtos,
//             // como exibir na página ou processar de alguma outra forma
//             console.log('Produtos:', data);
//         })
//         .catch(error => {
//             console.error('Erro ao obter os produtos:', error);
//         });
// }




// Função para buscar e exibir os produtos
async function mostrarProdutos() {
    try {
        const resposta = await fetch('http://localhost:3001/productos');
        if (!resposta.ok) {
            throw new Error('Erro ao obter os produtos');
        }
        const dados = await resposta.json();
        const listaProdutos = document.getElementById('lista-produtos');
        dados.itens.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listaProdutos.appendChild(li);
        });
    } catch (erro) {
        console.error('Erro ao buscar os produtos:', erro);
    }
}

// Chamar a função para buscar e exibir os produtos quando a página carregar
window.addEventListener('DOMContentLoaded', mostrarProdutos);
