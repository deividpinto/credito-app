# Estágio de build
FROM node:22-alpine as build

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto dos arquivos do projeto
COPY . .

# Construir a aplicação
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copiar a configuração personalizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar os arquivos buildados para o diretório do nginx
COPY --from=build /app/www /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
