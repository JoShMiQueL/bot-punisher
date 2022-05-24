## This script bans users suspected of being bots from a Twitch channel you own or moderate.
### The list of suspicious users is collected from the following websites.
- [Twitch Insights](https://twitchinsights.net/bots)
- [Streams Charts](https://streamscharts.com/tools/bots)

# Getting Started
**Requirements:**
  - ***Node: >=18.0.0***
---
1. Execute the following command to install the dependencies:
```
npm install
```
2. Configure config.json with your Twitch credentials.
```
{
  "twitch_username": "example_user", // Your Twitch username.
  "twitch_oauth_token": "oauth:******", // Your Twitch OAuth token.
  "twitch_channel": "example_channel" // This is the channel you want to ban the users from.
}
```
*To get your oauth token go to the following [website](https://twitchapps.com/tmi/) and log in with your Twitch account.*

3. Execute the following command to run the application:
```
npm start
```
