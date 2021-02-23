const fs = require('fs');
const Discord = require('discord.js');
console.log(__dirname);
const { defaultPrefix, token, avrae_prefix, bot_id, avraeChannel } = require("../config.json");
var prefix = defaultPrefix;
console.log(defaultPrefix, token);
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// debug, testversions
const testVersion = true;
var debug = ["This is the debug"];

// making the client and setting up the commands.
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Setting up the cooldowns for commands.
const cooldowns = new Discord.Collection();

/*// getting the command files loaded in.
const commandFolders = fs.readdirSync(`./events/commands`);

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./events/commands/${folder}`).filter(fFile => fFile.endsWith(".js"));
	for (const file of commandFiles) {
		// const test = require("./event/commands/info/args-info.js");
		// console.log(test);
		const command = require(`./events/commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		console.log("6. ❤❤");
	}
}*/

// getting the command files loaded in.
const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}).filter(fFile => fFile.endsWith(".js")`);
    for (const file of commandFiles) {
        // const test = require("./event/commands/info/args-info.js");
        // console.log(test);
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        console.log("6. :heart::heart:");
    }
}

module.exports = {
	name: 'message',
	once: false,
	execute(message) {
		// Checking if the message send contains the prefix and is not sent my the bot, now with more @ mention prefix support.
		const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
		if (!prefixRegex.test(message.content)) return;

		// Setting the constants for the arguments and the commandName.
		const [, matchedPrefix] = message.content.match(prefixRegex);
		const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		// Getting the command set up.
		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			debug.push(`The command ${commandName} does not exist.`);
			if (testVersion) {console.log(debug)}
			return;
		}

		// cooldown handeling.
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 1) * 1000;

		// Checking for guildOnly commands.
		if (command.guildOnly && message.channel.type === "dm") {
			
			message.reply("I can't execute that command in Dm's.")
				.catch(e => console.error(e, "guildOnly"));
			debug.push("The command was guild only and channel.type === dm");
			if (testVersion) {console.log(debug)}
			return;
		}

		// Checking for permissions.
		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				message.reply(`You can not do this!\nYou need the ${command.permissions} permission to be able to do this.`)
					.catch(e => console.error(e));
				debug.push("Problem in permissions");
				if (testVersion) {console.log(debug)}
				return;
			}
		}

		// checking if there are args needed and if there are none given and args needed return which( if the info exists) and that you need args.
		if (command.args && !args.length) {
			// return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
			let reply = `You didn't provide any arguments, ${message.author}!`;

			// If there is a proper usage sending back what it is.
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\`.`;
			}
			
			try {
				message.channel.send(reply);
			}
			catch (error) {
				message.author.send(reply)
					.catch(e => console.error(e));
				debug.push(error);
			}
			if (testVersion) {console.log(debug)}
			return;
		}

		// if the timestamps object has the author ID then it will return and tell you how much longer to wait.
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				try {
					message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
				}
				catch (error) {
					message.author.send(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
						.catch(e => console.error(e));
					debug.push(error);
				}
				if (testVersion) {console.log(debug)}
				return;
			}
		}

		// Deleting the users timestamp after the cooldown has expired.
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		if (command.name === "prefix") {
			prefix = command
		}


		// This is where we execute the commands given.
		try {// Execute the code inside the command file.
			if (testVersion) {console.log("try", debug)}
			debug.push(message.content);
			command.execute(message, args);
		}
		catch (error) {
			if (testVersion) {console.log("Error", debug)}
			// If it errors catch the error and log it in the console, then let the user know an error occurred.
			console.error(error);
			message.reply('there was an error trying to execute that command!')
				.catch(e => {
					console.error(e);
					debug.push(e);
				});
		}

		finally {
			message.delete()
				.catch(e => {
					console.error(e);
					debug.push(e, message.content);
				});

			console.log("\n\nThere was a command executed, this is a break message.\n\n");
		}
		if (testVersion) {console.log(debug)};
	},
};