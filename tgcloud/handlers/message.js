import { api } from 'sdk';

export default async function (message, ctx) {
  try {
    const chatId = message?.chat?.id;

    if (!chatId) {
      console.error('Chat ID missing in incoming message');
      return;
    }

    // User ka bheja hua message (lowercase mein convert kar rahe hain taaki command match karna asaan ho)
    const incomingText = (message.text || '').trim().toLowerCase();

    let replyText = '';

    // Commands ke hisaab se alag-alag response set karna
    if (incomingText === '/index' || incomingText === '/page1') {
      replyText = [
        'TINY INDIC TTS — PAGE 1',
        '',
        'Selected Page: index.html',
        'Status: Loaded successfully',
        '',
        'Yahan aapka index.html ka content ya mini app link aayega.'
      ].join('\n');
    } else if (incomingText === '/page2') {
      replyText = [
        'TINY INDIC TTS — PAGE 2',
        '',
        'Selected Page: page2.html',
        'Status: Loaded successfully',
        '',
        'Yahan aapka page2.html ka content ya mini app link aayega.'
      ].join('\n');
    } else {
      // Agar koi aur message ya /start bheje
      replyText = [
        'TINY INDIC TTS — MENU',
        '',
        'Available Commands:',
        '• /index (ya /page1) - Index page ke liye',
        '• /page2 - Page 2 ke liye',
        '',
        'Received: ' + (message.text || '[Non-text message]')
      ].join('\n');
    }

    // Telegram par message bhejo
    await api.sendMessage({
      chat_id: chatId,
      text: replyText
    });

  } catch (error) {
    console.error('Message handler error:', error);
  }
}
