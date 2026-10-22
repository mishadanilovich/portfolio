export async function deliver(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;

  if (token === undefined || chat === undefined || token === '' || chat === '') {
    if (process.env.NODE_ENV === 'production') return false;

    console.info(`[домофон] сообщение не отправлено, нет TELEGRAM_* в окружении:\n${text}`);
    return true;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
