export default async function (message) {
  const chatId = message.chat.id;

  const reply = [
    "TINY INDIC TTS — MINI APP FILE TEST",
    "",
    "Files shown in Mini App Files:",
    "1. index.html",
    "2. page2.html",
    "",
    "Handler reply: WORKING",
    "HTML URL: NOT SET",
    "Next test: Check both HTML pages."
  ].join("\n");

  await api.sendMessage({
    chat_id: chatId,
    text: reply
  });
}
