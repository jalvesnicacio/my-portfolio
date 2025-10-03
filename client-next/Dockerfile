# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependência primeiro
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar o app
CMD ["npm", "run", "dev"]