const tmi = require('tmi.js');
const fs = require('fs/promises');
const bots_list = require('./bots_list.js');

(async () => {
  const twitch_username = JSON.parse(await fs.readFile('./config.json')).twitch_username
  const twitch_oauth_token = JSON.parse(await fs.readFile('./config.json')).twitch_oauth_token
  const twitch_channel = JSON.parse(await fs.readFile('./config.json')).twitch_channel
  const client = new tmi.Client({
    identity: {
      username: twitch_username,
      password: twitch_oauth_token
    }
  });
  
  const date = () => `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

  const ban = async (username, reason = "Banned by BotPunisher") => {
    await client.say(twitch_channel, `/ban ${username} ${reason}`);
    console.log(`[${date()}] ${username} was banned.`);
  }

  const unban = async (username) => {
    await client.say(twitch_channel, `/unban ${username}`);
    console.log(`[${date()}] ${username} was unbanned.`);
  }

  const start = async () => {
    await bots_list();
    await client.connect();
    JSON.parse(await fs.readFile('./bots_list.json')).forEach(async (bot) => await ban(bot))
    await client.disconnect();
    process.exit();
  }

  await start();
})()