require('dotenv').config();
const express = require('express');
const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');

const app = express();
app.get('/', (req, res) => res.send('Bot is running'));
app.listen(5000, () => console.log('Keep-alive server on port 5000'));

let isRunning = false;
let reconnectTimer = null;

function scheduleReconnect(delay) {
  if (reconnectTimer) return;
  console.log(`Reconnecting in ${delay / 1000}s...`);
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    isRunning = false;
    startBot();
  }, delay);
}

function startBot() {
  if (isRunning) return;
  isRunning = true;

  console.log('Starting bot...');

  const bot = mineflayer.createBot({
    host: process.env.MC_HOST || 'MCstreak.aternos.me',
    port: parseInt(process.env.MC_PORT || '47960'),
    username: process.env.MC_USERNAME || 'ClaudeBot',
    version: '1.21.9',
    auth: 'offline'
  });

  bot.loadPlugin(pathfinder);
  require('./loader')(bot);

  let loggedIn = false;
  const password = process.env.BOT_PASSWORD || 'ClaudeBot1234';

  bot.on('messagestr', (msg) => {
    if (loggedIn) return;
    const lower = msg.toLowerCase();
    if (lower.includes('/register')) {
      console.log('Registering...');
      setTimeout(() => bot.chat(`/register ${password} ${password}`), 2000);
      loggedIn = true;
    } else if (lower.includes('/login')) {
      console.log('Logging in...');
      setTimeout(() => bot.chat(`/login ${password}`), 2000);
      loggedIn = true;
    }
  });

  bot.once('spawn', () => {
    console.log('Bot is online on the server!');
  });

  let kickedAlreadyOnline = false;

  bot.on('kicked', (reason) => {
    const msg = JSON.stringify(reason);
    console.log('Kicked:', msg);
    if (msg.includes('already online')) {
      kickedAlreadyOnline = true;
    }
  });

  bot.on('end', () => {
    loggedIn = false;
    isRunning = false;
    const delay = kickedAlreadyOnline ? 60000 : 15000;
    kickedAlreadyOnline = false;
    scheduleReconnect(delay);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
    isRunning = false;
    scheduleReconnect(15000);
  });
}

startBot();
