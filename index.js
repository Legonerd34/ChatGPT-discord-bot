const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const port = process.env.PORT || "PORT";

const post_url = "https://dh0wkzi4.run.nodescript.dev/chatgpt-bot";

// Basic route to respond to UptimeRobot pings
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ],
});


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
});

client.on('messageCreate', async (message) => {
    
    let input = message.content;

    console.log(input);

    if (input.includes('!chatgpt')) {
        try {
            const response = await fetch(post_url, {
                method : "POST",
                headers : {
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body : JSON.stringify({message : input})
            })
    
            let output = await response.text();
    
            return message.reply(output);
        }
        catch(error) {
            console.log(error);
        }
        
    }
});

client.login('YOUR_BOT_TOKEN');
