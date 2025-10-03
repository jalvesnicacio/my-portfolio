# Usa uma imagem oficial do Node.js como base
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências, incluindo o nodemon como dependência de desenvolvimento
RUN npm install

# Instala o nodemon globalmente (opcional, mas pode ajudar)
RUN npm install -g nodemon

# Copia o restante do código
COPY . .

# Comando para iniciar o app com nodemon
CMD ["nodemon", "index.js"]