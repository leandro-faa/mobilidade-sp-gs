
import http from 'node:http';
import { obterToken } from './auth.mjs';

const PORTA = 3001;

const API_SPTRANS =
  'https://gateway.apilib.prefeitura.sp.gov.br/sptrans/olhovivo/v2.1';

function responderJSON(res, status, dados) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
  });

  res.end(JSON.stringify(dados));
}

const servidor = http.createServer(async (req, res) => {
    const origensPermitidas = new Set([
  'http://localhost:8081',
  'http://127.0.0.1:8081',
]);

const origem = req.headers.origin;

if (origem && origensPermitidas.has(origem)) {
  res.setHeader('Access-Control-Allow-Origin', origem);
  res.setHeader('Vary', 'Origin');
}
  const url = new URL(req.url, 'http://localhost');

  
if (req.method === 'GET' && url.pathname === '/api/previsoes') {
  const codigoLinha = url.searchParams.get('codigoLinha');

  if (
    !codigoLinha ||
    !/^[1-9]\d*$/.test(codigoLinha) ||
    !Number.isSafeInteger(Number(codigoLinha))
  ) {
    return responderJSON(res, 400, {
      erro: 'Informe um código de linha válido.',
    });
  }

  try {
    const token = await obterToken();

    const endereco =
      `${API_SPTRANS}/Previsao/Linha?codigoLinha=` +
      encodeURIComponent(codigoLinha);

    const resposta = await fetch(endereco, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!resposta.ok) {
      console.error('SPTrans HTTP:', resposta.status);

      return responderJSON(res, 502, {
        erro: 'Falha ao consultar previsões da SPTrans.',
      });
    }

    const previsao = await resposta.json();

    if (!previsao || !Array.isArray(previsao.ps)) {
      throw new Error('Formato de previsão inesperado.');
    }

    return responderJSON(res, 200, {
      hr: previsao.hr,
      ps: previsao.ps,
    });
  } catch (erro) {
    console.error('Erro na previsão:', erro.message);

    return responderJSON(res, 502, {
      erro: 'Não foi possível consultar as previsões.',
    });
  }
}
  
  if (req.method !== 'GET' || url.pathname !== '/api/linhas') {
    return responderJSON(res, 404, {
      erro: 'Endpoint não encontrado.',
    });
  }

  const termo = url.searchParams.get('termo')?.trim();

  if (!termo || termo.length > 100) {
    return responderJSON(res, 400, {
      erro: 'Informe um termo de pesquisa válido.',
    });
  }

  try {
    const token = await obterToken();

    const endereco =
      `${API_SPTRANS}/Linha/Buscar?termosBusca=` +
      encodeURIComponent(termo);

    const resposta = await fetch(endereco, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!resposta.ok) {
      console.error('SPTrans HTTP:', resposta.status);

      return responderJSON(res, 502, {
        erro: 'Falha ao consultar a SPTrans.',
      });
    }

    const dados = await resposta.json();

    if (!Array.isArray(dados)) {
      throw new Error('Resposta inesperada da SPTrans.');
    }

    const linhas = dados.map((linha) => ({
      cl: linha.cl,
      lt: linha.lt,
      tl: linha.tl,
      tp: linha.tp,
      ts: linha.ts,
      sl: linha.sl,
    }));

    responderJSON(res, 200, linhas);
  } catch (erro) {
    console.error('Erro na consulta:', erro.message);

    responderJSON(res, 502, {
      erro: 'Não foi possível consultar as linhas.',
    });
  }
});

servidor.listen(PORTA, '0.0.0.0', () => {
  console.log(
    `Backend disponível em http://localhost:${PORTA}`
  );
});
