# Projeto Crédito App

## Pré-requisitos

- Node.js (22)
- npm (10)
- Docker
- Docker Compose

## Tecnologias Principais

- Angular 20.0.0
- TypeScript 5.8.0
- Ionic Angular 8.0.0
- Capacitor 7.4.2

## Configuração do Ambiente

### 1. Instalação de Dependências

`npm install`

### 2. Configuração da Rede Docker

> ℹ️ **Nota:**
 A rede 'credito-network' deve ser criada antes de iniciar os containers 

⚡ Essa rede serve para conectar com a rede da api de credito, caso já tenha sido criado pela api, não é necessário criar novamente. ⚡

Antes de iniciar a aplicação, é necessário criar a rede Docker externa:

`docker network create credito-network`

### 3. Execução do Projeto

#### Desenvolvimento Local

Para executar o projeto em ambiente de desenvolvimento:

`ng serve`

A aplicação estará disponível em `http://localhost:4200`

#### Usando Docker

Para executar usando Docker:

`docker-compose up -d`

## Estrutura do Projeto

O projeto é uma aplicação Angular com Ionic, utilizando as seguintes bibliotecas principais:

- @angular/core: 20.0.0
- @ionic/angular: 8.0.0
- @capacitor/core: 7.4.2
- RxJS: 7.8.0

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm test`: Executa os testes unitários via Karma
- `npm run build`: Compila o projeto para produção

## Configuração do Docker

O projeto inclui uma configuração Docker com as seguintes características:
- Porta exposta: 80
- Nome do container: credito-app
- Rede: credito-network (externa)
- Configuração de host extra para desenvolvimento

## Testes

O projeto utiliza:
- Jasmine como framework de testes
- Karma como test runner
- karma-coverage para relatórios de cobertura de código

Para executar os testes:

`npm test`

## ESLint

O projeto utiliza ESLint para garantir a qualidade do código. Configurações incluem:
- @angular-eslint
- @typescript-eslint
- Plugins adicionais para documentação (jsdoc) e boas práticas

Para executar a verificação de lint:

`npm run lint`
