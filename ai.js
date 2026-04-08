const team = require('./team');

function startAI(bot) {
  setInterval(async () => {
    if (!bot.entity) return;

    const task = team.getNextTask();
    if (task) {
      console.log('Doing task: ' + task.type);
    }
  }, 10000);
}

module.exports = { startAI };
