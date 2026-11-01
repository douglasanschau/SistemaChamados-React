# Sistema de Gerenciamento de Chamados

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-9.12-FFCA28?logo=firebase&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)


Aplicação web para gerenciamento de chamados de atendimento, desenvolvida com **React.js e Firebase**. O sistema permite registrar solicitações, acompanhar seus status, consultar informações dos atendimentos e administrar clientes e dados do perfil do usuário.

O projeto foi desenvolvido com foco na aplicação prática de conceitos de desenvolvimento frontend, componentes reutilizáveis, gerenciamento de estado, autenticação e integração com serviços em nuvem.

## Visão geral

O sistema oferece um ambiente autenticado no qual usuários podem acompanhar chamados e registrar novas solicitações de atendimento.

A aplicação utiliza o Firebase como infraestrutura de backend, integrando autenticação, banco de dados NoSQL e armazenamento de arquivos.

## Funcionalidades

### 1. Autenticação de usuários

- Cadastro de usuários com nome, e-mail e senha.
- Login com e-mail e senha.
- Autenticação utilizando Firebase Authentication.
- Contexto global de autenticação com React Context API.
- Persistência local das informações básicas da sessão.
- Encerramento de sessão (logout).
- Proteção de rotas que exigem autenticação.

### 2. Dashboard de chamados

- Listagem dos chamados cadastrados.
- Exibição de cliente, assunto, status e data de cadastro.
- Ordenação dos registros por data de criação.
- Paginação com carregamento incremental de resultados.
- Consulta dos detalhes de um chamado por meio de modal.
- Acesso à edição dos chamados existentes.

### 3. Cadastro e edição de chamados

- Registro de novos chamados.
- Associação do chamado a um cliente cadastrado.
- Seleção do assunto:
  - Suporte.
  - Visita técnica.
  - Financeiro.
- Definição do status:
  - Aberto.
  - Progresso.
  - Atendido.
- Campo complementar para descrição da solicitação.
- Edição de chamados previamente cadastrados.

### 4. Gestão de clientes

- Cadastro de clientes.
- Registro de nome fantasia.
- Armazenamento de CNPJ.
- Registro de endereço.
- Associação de clientes aos chamados.

### 5. Perfil do usuário

- Visualização das informações pessoais.
- Atualização do nome.
- Exibição do e-mail cadastrado.
- Upload de imagem de perfil.
- Armazenamento de imagens no Firebase Storage.
- Atualização dos dados do perfil no Firestore.

### 6. Interface e experiência do usuário

- Navegação entre os módulos da aplicação.
- Componentes reutilizáveis para cabeçalho, títulos e modais.
- Feedback visual para operações realizadas.
- Notificações de sucesso e erro.
- Layout adaptável a diferentes tamanhos de tela.

## Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| React 18 | Construção da interface |
| JavaScript ES6+ | Lógica e interatividade |
| React Hooks | Gerenciamento de estado e efeitos |
| React Context API | Compartilhamento do estado de autenticação |
| React Router DOM 6 | Navegação e proteção de rotas |
| Firebase Authentication | Autenticação de usuários |
| Cloud Firestore | Persistência dos dados |
| Firebase Storage | Armazenamento de imagens |
| React Icons | Ícones da interface |
| React Toastify | Notificações e feedback |
| date-fns | Formatação de datas |
| CSS3 | Estilização e responsividade |

## Arquitetura e organização

O projeto utiliza uma estrutura baseada em componentes e páginas, separando responsabilidades da interface, autenticação, navegação e comunicação com o Firebase.

```text
SistemaChamados-React/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Header/
│   │   ├── Modal/
│   │   └── Title/
│   │
│   ├── contexts/
│   │   └── auth.js
│   │
│   ├── pages/
│   │   ├── Customers/
│   │   ├── Dashboard/
│   │   ├── New/
│   │   ├── Profile/
│   │   ├── SignIn/
│   │   └── SignUp/
│   │
│   ├── routes/
│   │   ├── Route.js
│   │   └── index.js
│   │
│   ├── services/
│   │   └── firebaseConnection.js
│   │
│   ├── App.js
│   └── index.js
│
├── package.json
└── README.md
```

### Separação de responsabilidades

- **Components:** componentes reutilizáveis da interface.
- **Contexts:** gerenciamento de informações compartilhadas, especialmente autenticação.
- **Pages:** telas e funcionalidades principais da aplicação.
- **Routes:** definição das rotas públicas e privadas.
- **Services:** inicialização e configuração dos serviços Firebase.
- **Assets:** imagens e recursos visuais.

## Integração com Firebase

O Firebase é utilizado como backend da aplicação, evitando a necessidade de desenvolver uma API própria para os fluxos implementados.

Os principais serviços utilizados são:

- **Firebase Authentication:** gerenciamento de cadastro, login e logout.
- **Cloud Firestore:** armazenamento e consulta de usuários, clientes e chamados.
- **Firebase Storage:** armazenamento das imagens de perfil.

### Estrutura conceitual dos dados

A aplicação trabalha principalmente com as seguintes coleções:

| Coleção | Finalidade |
|---|---|
| `users` | Informações dos usuários cadastrados |
| `customers` | Dados dos clientes |
| `chamados` | Registro das solicitações de atendimento |

Os chamados armazenam informações como cliente associado, assunto, status, descrição complementar, data de criação e identificador do usuário responsável pelo cadastro.

## Executando o projeto

### Pré-requisitos

- Node.js.
- npm.
- Projeto configurado no Firebase.
- Serviços Firebase Authentication, Cloud Firestore e Storage habilitados.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/douglasanschau/SistemaChamados-React.git
```

Acesse a pasta:

```bash
cd SistemaChamados-React
```

Instale as dependências:

```bash
npm install
```

Configure as credenciais do seu próprio projeto Firebase e ajuste a inicialização dos serviços conforme a configuração utilizada.

Inicie a aplicação:

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

### Build de produção

Para gerar a versão otimizada:

```bash
npm run build
```

## Aprendizados e conhecimentos aplicados

O desenvolvimento deste projeto permitiu trabalhar na prática com:

- Desenvolvimento de aplicações SPA utilizando React.
- Componentização e reutilização de interfaces.
- Gerenciamento de estado com Hooks.
- Compartilhamento de estado utilizando Context API.
- Navegação e controle de acesso com React Router.
- Integração com serviços Firebase.
- Autenticação e gerenciamento de sessões.
- Operações CRUD com Cloud Firestore.
- Upload e gerenciamento
