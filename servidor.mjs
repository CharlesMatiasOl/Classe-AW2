import http from 'node:http';
import path from 'node:path';
import fsp from 'node:fs/promises';

// Configuração
const PORTA = 3001;
const raizDoSite = 'recursos';
const raizDosProdutos = 'productos';

// Função para servir arquivos
const servirArquivo = async (resposta, caminho) => {
    try {
        const dados = await fsp.readFile(caminho);
        resposta.writeHead(200);
        resposta.end(dados);
    } catch (erro) {
        console.error("Erro ao servir arquivo:", erro);
        resposta.writeHead(500);
        resposta.end('Erro interno do servidor');
    }
};

// Função para lidar com as requisições
const servidor = http.createServer(async (requisicao, resposta) => {
    try {
        let caminhoArquivo;

        // Rota raiz ou index.html
        if (requisicao.url === '/' || requisicao.url === '/index.html') {
            caminhoArquivo = path.join(raizDoSite, 'index.html');
        }
        // Rota para servir o archivo productos.json
        else if (requisicao.url === '/productos') {
            caminhoArquivo = path.join(raizDosProdutos, 'productos.json');
        }
        // Outras rotas
        else {
            caminhoArquivo = path.join(raizDoSite, requisicao.url);
        }

        // Servir o arquivo
        await servirArquivo(resposta, caminhoArquivo);
    } catch (erro) {
        console.error("Erro na gestão de requisições:", erro);
        resposta.writeHead(500);
        resposta.end('Erro interno do servidor');
    }
});

// Iniciar o servidor
servidor.listen(PORTA, () => {
    console.log(`Servidor em execução em http://localhost:${PORTA}`);
});

