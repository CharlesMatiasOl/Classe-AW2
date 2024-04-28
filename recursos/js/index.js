async function mostrarProdutos() {
    try {
        const resposta = await fetch('http://localhost:3001/productos');
        if (!resposta.ok) {
            throw new Error('Erro ao obter os produtos');
        }
        const dados = await resposta.json();
        const contenedorProdutos = document.getElementById('contenedor-productos');
        let conteudoHTML = '';
        dados.quadros.forEach((quadro, index) => {
            conteudoHTML += `
                <article class="productos">
                    <figure class="productos__fig">
                        <img src="${quadro.imagem}" alt="${quadro.nome}">
                    </figure>
                    <div class="productos__datos">
                        <h3>${quadro.nome}</h3>
                        <div>$ ${quadro.preco.toFixed(2)}</div>
                    </div>
                    <button class="productos__boton" data-btn-carro data-id="${index}">
                        <img src="carrito.ico" alt="Icono carrito compras"/> Agregar al carrito
                    </button>
                </article>
            `;
        });
        contenedorProdutos.innerHTML = conteudoHTML;
    } catch (erro) {
        console.error('Ocorreu um erro:', erro);
    }
}

// Chamar a função para exibir os produtos
mostrarProdutos();

