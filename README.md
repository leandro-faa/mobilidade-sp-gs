# Mobilidade SP

**Global Solution 2026.2**

**Disciplina:** Cross-Platform Application Development — FIAP

## Integrantes

| Nome completo | RM |
|---|---|
| Ernandes da Silva Jesus | 566611 |
| Leandro Filippini Aguiar Alves | 568157 |
| Raul Bridi Albano | 567772 |

## Sobre o projeto

O **Mobilidade SP** é um aplicativo desenvolvido em React Native com Expo para auxiliar cidadãos na consulta de linhas de ônibus da cidade de São Paulo.

O aplicativo utiliza a API Olho Vivo da SPTrans para consultar informações das linhas e previsões de chegada dos ônibus aos pontos de parada. Também permite salvar linhas favoritas localmente utilizando AsyncStorage.

## Funcionalidades

- **Pesquisa de linhas:** consulta de linhas de ônibus utilizando dados da SPTrans.
- **Detalhes das linhas:** apresentação do código da linha, terminais e sentido de operação.
- **Previsões de chegada:** exibição de horários estimados de chegada dos ônibus, organizados por ponto de parada.
- **Favoritos:** possibilidade de adicionar, consultar e remover linhas favoritas.
- **Persistência local:** armazenamento dos favoritos no dispositivo, mesmo após o encerramento do aplicativo.
- **Navegação:** interface com telas de início, pesquisa, detalhes e favoritos.

## Demonstração do aplicativo

O vídeo abaixo apresenta o funcionamento do Mobilidade SP, incluindo a pesquisa de linhas de ônibus, a consulta de detalhes e previsões de chegada, além da utilização dos favoritos com persistência local.

**Link para assistir à demonstração:** https://youtube.com/shorts/yd6P2ivWXZs?feature=share

## Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| React Native e Expo | Desenvolvimento do aplicativo |
| TypeScript | Tipagem e organização do código |
| Expo Router | Navegação entre telas |
| AsyncStorage | Persistência local dos favoritos |
| Node.js | Backend de integração |
| API Olho Vivo — SPTrans | Dados de linhas e previsões |
| OAuth 2.0 | Autenticação do backend no gateway da API |

## Arquitetura

O aplicativo utiliza um backend Node.js para realizar as consultas à SPTrans.

**Aplicativo React Native → Backend Node.js → Gateway da API Olho Vivo**

O backend é responsável por obter e renovar os tokens OAuth necessários para acessar a API.

As credenciais são mantidas no servidor e não são incluídas no código público do aplicativo.

Os favoritos são armazenados diretamente no dispositivo utilizando AsyncStorage.

## Como executar o projeto

### 1. Pré-requisitos

- Node.js e npm instalados (ambiente testado com Node.js 24).
- Expo Go instalado no celular.
- Computador e celular conectados à mesma rede local.
- Credenciais válidas para a API Olho Vivo no gateway da Prefeitura de São Paulo.

### 2. Clonar o repositório

```bash
git clone https://github.com/leandro-faa/mobilidade-sp-gs
cd mobilidade-sp-gs
```

### 3. Instalar as dependências

```bash
npm ci
```

### 4. Configurar o ambiente

Crie um arquivo `.env` na raiz do projeto:

```dotenv
SPTRANS_CONSUMER_KEY=SUA_CONSUMER_KEY
SPTRANS_CONSUMER_SECRET=SUA_CONSUMER_SECRET
EXPO_PUBLIC_API_URL=http://IP_DO_COMPUTADOR:3001
```

Substitua os valores pelas suas configurações.

No Windows, é possível identificar o IPv4 do computador com:

```powershell
ipconfig
```

A variável `EXPO_PUBLIC_API_URL` deve apontar para o endereço do computador que executa o backend.

### 5. Iniciar o backend

Em um terminal, na pasta do projeto:

```bash
node --env-file=.env backend/server.mjs
```

O servidor utilizará a porta `3001`.

### 6. Iniciar o aplicativo

Em outro terminal:

```bash
npx expo start
```

Abra o Expo Go no celular e utilize o QR Code exibido no terminal.

Para verificar a tipagem TypeScript, após iniciar o Expo:

```bash
npx tsc --noEmit
```

### 7. Utilizar o aplicativo

Na tela Pesquisa, informe o número ou parte do número de uma linha de ônibus.

Selecione um resultado para visualizar seus detalhes e consultar previsões de chegada.

Na tela Detalhes, utilize o botão de favoritos para salvar ou remover a linha. As linhas salvas poderão ser acessadas posteriormente na aba Favoritos.

**Observação:** as previsões dependem da disponibilidade dos dados fornecidos pela SPTrans. Algumas linhas podem não apresentar previsões em determinados momentos.