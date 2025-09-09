# Innovation Brindes - E-commerce Front-end

<img width="2560" height="1392" alt="image" src="https://github.com/user-attachments/assets/3bc59a59-c9be-40b9-b858-a0044fd29d09" />

Este repositório contém o front-end do projeto de e-commerce para a Innovation Brindes. A aplicação foi desenvolvida com **Next.js**, **TypeScript** e **Tailwind CSS**, visando uma plataforma robusta e intuitiva para visualização de produtos e solicitação de cotações.

## Repositório

  * **URL:** `https://github.com/lucaasvicent/innovation-test`

## Funcionalidades Implementadas

  * **Autenticação**: O sistema exige que o usuário realize login para acessar a área de produtos, garantindo a segurança.
  * **Listagem de Produtos**: Exibição dos produtos em uma grade com informações essenciais como nome, código e preço. O layout foi ajustado para um visual mais limpo e alinhado com o design da marca.
  * **Detalhe Rápido (Modal)**: Ao clicar em "CONFIRA", um modal é exibido com os detalhes completos do produto, incluindo imagem em alta qualidade e descrição.
  * **Favoritos**: O usuário pode favoritar produtos, e essa informação é persistida localmente.
  * **Filtros Dinâmicos**: A listagem de produtos pode ser filtrada por:
      * **Busca com Debounce**: Otimiza a pesquisa por nome ou código.
      * **Filtro de Favoritos**: Permite visualizar apenas os produtos favoritados.
      * **Ordenação**: Ordena os produtos por preço (crescente/decrescente) e nome (A-Z/Z-A).

## Tecnologias Utilizadas

  * **Next.js 14**: Framework de React para renderização otimizada e desempenho.
  * **TypeScript**: Adiciona tipagem estática para um código mais seguro e escalável.
  * **Tailwind CSS**: Framework utilitário de CSS para um desenvolvimento rápido e flexível.
  * **Zustand**: Biblioteca de gerenciamento de estado leve.
  * **SWR**: Hook de React para busca de dados de forma eficiente.
  * **Axios**: Cliente HTTP para as requisições à API.
  * **Lucide React**: Conjunto de ícones personalizáveis.

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

  * Node.js (versão 18.x ou superior)
  * npm

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/lucaasvicent/innovation-test.git
    cd innovation-test
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

### Executando o Servidor de Desenvolvimento

1.  Inicie o servidor local:

    ```bash
    npm run dev
    ```

2.  Abra seu navegador e acesse `http://localhost:3000`.

## Estrutura do Projeto

O projeto segue uma estrutura de pastas organizada para facilitar a navegação:

```
/
├── app/                  # Páginas e rotas da aplicação
├── components/           # Componentes reutilizáveis (Header, Card, Modal, etc.)
├── hooks/                # Hooks personalizados
├── lib/                  # Bibliotecas e utilitários (API, stores, formatação)
├── public/               # Arquivos estáticos
└── styles/               # Estilos globais
```
