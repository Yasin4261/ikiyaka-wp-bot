const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Yeni bir WhatsApp istemcisi oluştur
const client = new Client({
    authStrategy: new LocalAuth(), // Kimlik bilgilerini yerel olarak saklar
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// QR kodunu terminalde görüntüle
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR kodu yukarıda, WhatsApp uygulamanızla tarayın.');
});

// Başarılı bağlantıyı bildir
client.on('ready', () => {
    console.log('Bot başarıyla bağlandı!');
});

// Gelen mesajları dinleyin
client.on('message', async (message) => {
    console.log(`Mesaj alındı: ${message.body}`);

    // Gelen mesajlara yanıt gönderme
    if (message.body.toLowerCase() === 'merhaba') {
        await message.reply('Merhaba! Size nasıl yardımcı olabilirim?');
    } else if (message.body.toLowerCase() === 'nasılsın') {
        await message.reply('Ben bir botum, hep iyiyim! Peki ya siz?');
    } else {
        await message.reply('Üzgünüm, bu mesajı anlayamadım.');
    }
});

// Botu başlat
client.initialize();
