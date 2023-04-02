import fs from 'fs';
import chalk from 'chalk';

// \[[^[\]]*?\]
// \(https?:\/\/[^\s?#.].[^\s]*\)
// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo';
}

function trataErro(erro) {
   throw new Error(chalk.red(erro.code, 'Arquivo não encontrado'));
   //console.log('erro na segunda chamada');
}

// async / await

async function pegaArquivo(caminhoDoArquivo) {
    try{
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto); 
    } catch (erro) {
        trataErro(erro);
    }
}


// promise com then()
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro)
// }

// síncrono
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if (erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     });
// }

// pegaArquivo('./arquivos/texto.md');
// setInterval(() => pegaArquivo('./arquivos/'), 3000);

export default pegaArquivo;