
const consumerKey = process.env.SPTRANS_CONSUMER_KEY;
const consumerSecret = process.env.SPTRANS_CONSUMER_SECRET;

let tokenAtual = null;
let expiraEm = 0;

export async function obterToken() {
  // Reutiliza o token enquanto estiver válido
  if (tokenAtual && Date.now() < expiraEm) {
    return tokenAtual;
  }

  if (!consumerKey || !consumerSecret) {
    throw new Error('Credenciais da SPTrans não configuradas.');
  }

  // Converte as credenciais para autenticação Basic
  const credenciais = Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString('base64');

  const resposta = await fetch(
    'https://gateway.apilib.prefeitura.sp.gov.br/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credenciais}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    }
  );

  if (!resposta.ok) {
    throw new Error(
      `Falha ao gerar token. HTTP: ${resposta.status}`
    );
  }

  const dados = await resposta.json();

  if (!dados.access_token) {
    throw new Error('Token não retornado pela API.');
  }

  tokenAtual = dados.access_token;

  // Renova 60 segundos antes do vencimento
  const validade = Number(dados.expires_in ?? 3600);

  expiraEm =
    Date.now() + Math.max(0, validade - 60) * 1000;

  return tokenAtual;
}
