// handlers/message.js — runs on each `message` update.
import { api } from 'sdk';

export default async function ( message,ctx) {
  try {
    // message और ctx दोनों को मिलाकर JSON फॉर्मेट बना लिया
    const debugPayload = {
      message: message || null,
      ctx: ctx || null
    };

    const debugText = JSON.stringify(debugPayload, null, 2);

    // Telegram पर सीधे भेजने के लिए SDK का वही तरीका
    await api.sendMessage({
      chat_id: message.chat.id, // या अपनी फिक्स चैट आईडी यहाँ डाल सकता है
      text: `<pre>${debugText}</pre>`,
      parse_mode: 'HTML',
    });

  } catch (error) {
    console.error('Error during debugging:', error);

    await api.sendMessage({
      chat_id: message.chat.id,
      text: '⚠️ Error reflecting message and ctx data.',
    });
  }
}
