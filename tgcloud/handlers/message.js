import { api } from 'sdk';

export default async function (message, ctx) {
  try {
    const chatId = message?.chat?.id;

    if (!chatId) {
      console.error('Chat ID missing in incoming message');
      return;
    }

    const incomingText = (message.text || '').trim().toLowerCase();

    let cardText = '';
    let inlineKeyboard = [];

    // Commands ke hisaab se card ka content aur buttons set karna
    if (incomingText === '/index' || incomingText === '/page1') {
      cardText = 
        `╔═══════════════════════╗\n` +
        `   🌟 **TINY INDIC TTS** 🌟   \n` +
        `╚═══════════════════════╝\n\n` +
        `📂 **Selected Page:** \`index.html\`\n` +
        `🟢 **Status:** Loaded successfully\n\n` +
        `_Description: Yeh aapka main Home/Index page card hai._`;

      inlineKeyboard = [
        [
          { text: '📄 View Page 2', callback_data: '/page2' },
          { text: '🌐 Open Mini App', url: 'https://your-mini-app-url.com' }
        ]
      ];

    } else if (incomingText === '/page2') {
      cardText = 
        `╔═══════════════════════╗\n` +
        `   🌟 **TINY INDIC TTS** 🌟   \n` +
        `╚═══════════════════════╝\n\n` +
        `📂 **Selected Page:** \`page2.html\`\n` +
        `🟢 **Status:** Loaded successfully\n\n` +
        `_Description: Yeh aapka secondary Page 2 card hai._`;

      inlineKeyboard = [
        [
          { text: '🏠 Back to Index', callback_data: '/index' },
          { text: '🌐 Open Mini App', url: 'https://your-mini-app-url.com' }
        ]
      ];

    } else {
      cardText = 
        `╔═══════════════════════╗\n` +
        `   🌟 **TINY INDIC TTS** 🌟   \n` +
        `╚═══════════════════════╝\n\n` +
        `🤖 **Welcome to TTS Bot!**\n` +
        `Kripya niche diye gaye buttons ya commands ka upyog karein:\n\n` +
        `• /index - Index page card\n` +
        `• /page2 - Page 2 card`;

      inlineKeyboard = [
        [
          { text: '📂 Open Index', callback_data: '/index' },
          { text: '📄 Open Page 2', callback_data: '/page2' }
        ]
      ];
    }

    // Telegram par Card format (Markdown + Inline Keyboard) ke sath message bhejo
    await api.sendMessage({
      chat_id: chatId,
      text: cardText,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: inlineKeyboard
      }
    });

  } catch (error) {
    console.error('Message handler error:', error);
  }
}
