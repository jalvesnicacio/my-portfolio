# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependência primeiro (aproveita cache do Docker)
COPY package*.json ./

# Instala as dependências do React
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta 3000 (usada pelo React)
EXPOSE 5173

# Comando para iniciar o app
CMD ["npm", "run", "dev"]