const { token } = require("./config.json");
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
console.log("1. ❤❤❤");
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
console.log(eventFiles);

for (const eventFile of eventFiles) {
	console.log("2. ❤❤❤", eventFile);
	const event = require(`./events/${eventFile}`);
	console.log("3. ❤❤❤", event);
}
try {
	if (event.once) {
		client.once(event.name, async (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, async (...args) => event.execute(...args, client));
	}
}
catch (error) {
	console.error(error);
}


client.login(token);