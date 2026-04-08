const team = require('./team');

async function handleChat(bot, username, message) {
  const msg = message.toLowerCase();

  if (msg.includes('collect')) {
    team.addTask({ type: 'collect', player: username });
    bot.chat('Collecting...');
  }

  else if (msg.includes('build')) {
    team.addTask({ type: 'build', player: username });
    bot.chat('Building...');
  }

  else if (msg.includes('follow')) {
    team.addTask({ type: 'follow', player: username });
    bot.chat('Coming!');
  }

  else if (msg.includes('stop')) {
    team.clearTasks();
    bot.chat('Stopped!');
  }
}

module.exports = { handleChat };
