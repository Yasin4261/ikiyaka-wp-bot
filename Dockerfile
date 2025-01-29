# Node.js imajını kullanarak başlıyoruz
FROM node:14

# Gerekli bağımlılıkları yükleyin
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libxss1 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libpango-1.0-0 \
    libxshmfence1 \
    libnss3-dev \
    libxshmfence-dev \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Uygulama dizinini oluştur
WORKDIR /usr/src/app

# Uygulama bağımlılıklarını yükle
COPY package*.json ./

RUN npm install

# Uygulama kaynak kodunu kopyala
COPY . .

# Uygulamayı başlat
CMD ["node", "src/main.js"]

# İhtiyaç duyulacak portu açın (opsiyonel, botunuzun dışarıyla iletişim kurması için)
EXPOSE 3000
