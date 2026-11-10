
import { api } from 'sdk';

export default async function (message, ctx) {
  try {
    const chatId = message?.chat?.id;

    if (!chatId) {
      console.error('Chat ID missing in incoming message');
      return;
    }

    // User ka bheja hua message
    const incomingText =
      message.text || '[Non-text message received]';

    // Telegram par bhejne wala reply
    const reply = [
      'TINY INDIC TTS — MESSAGE TEST',
      '',
      'Received message:',
      incomingText,
      '',
      'Mini App files detected:',
      '1. index.html',
      '2. page2.html',
      '',
      'Handler status: WORKING',
      'SDK status: LOADED',
      'URL: NOT SET'
    ].join('\n');

    // Usi Telegram chat mein reply bhejo
    await api.sendMessage({
      chat_id: chatId,
      text: reply
    });

  } catch (error) {
    console.error('Message handler error:', error);
  }
}
