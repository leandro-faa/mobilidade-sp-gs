
import { obterToken } from './auth.mjs';

async function testarAcesso() {
  try {
    const token = await obterToken();

    console.log('Token OAuth obtido:', Boolean(token));

    const url =
      'https://gateway.apilib.prefeitura.sp.gov.br' +
      '/sptrans/olhovivo/v2.1/Linha/Buscar?termosBusca=8000';

    const resposta = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('HTTP:', resposta.status);

    if (!resposta.ok) {
      throw new Error('Consulta à SPTrans não autorizada.');
    }

    const linhas = await resposta.json();

    console.log('Quantidade de linhas:', linhas.length);
    console.log('Primeiras linhas:');

    console.log(linhas.slice(0, 3).map((linha) => ({
      cl: linha.cl,
      lt: linha.lt,
      tl: linha.tl,
      sl: linha.sl,
    })));
  } catch (erro) {
    console.error('Erro:', erro.message);
    process.exitCode = 1;
  }
}

testarAcesso();
