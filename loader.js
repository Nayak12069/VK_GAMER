const { handleChat } = require('./chat');
const { startAI } = require('./ai');

module.exports = (bot) => {

  bot.on('chat', async (u, m) => {
    if (u === bot.username) return;
    await handleChat(bot, u, m);
  });

  bot.once('spawn', () => {
    console.log('Bot spawned and joined the server');
    startAI(bot);
  });
};
