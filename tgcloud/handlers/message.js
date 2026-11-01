// handlers/message.js — runs on each `message` update.
import { api } from 'sdk';

export default async function (message, ctx) {
  const text = message.text;

  // Handling cases where message has no text (e.g., photo, sticker)
  if (!text) {
    await api.sendMessage({
      chat_id: message.chat.id,
      text: '(No text received in message)',
    });
    return;
  }

  try {
    // 1. Dynamic import of the formatter module
    const { formatEcho, formatUppercase } = await import('../lib/formatter.js');
    
    // 2. Dynamic import of the stats module
    const { getStats } = await import('../lib/stats.js');

    let replyText = '';

    // Logic based on input command
    if (text.startsWith('/upper')) {
      const cleanText = text.replace('/upper', '').trim();
      replyText = formatUppercase(cleanText || 'empty');
    } else {
      const formatted = formatEcho(text);
      const analytics = getStats(text);
      
      replyText = `${formatted}\n\n${analytics}`;
    }

    // Send response back via SDK
    await api.sendMessage({
      chat_id: message.chat.id,
      text: replyText,
      parse_mode: 'Markdown',
    });

  } catch (error) {
    console.error('Error during dynamic module loading:', error);

    await api.sendMessage({
      chat_id: message.chat.id,
      text: '⚠️ Internal error loading dynamic modules.',
    });
  }
}
