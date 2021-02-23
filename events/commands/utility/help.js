const { prefix } = require('../../config.json');

module.exports = {
	name: "help",
	description: "Display the help for a command.",
	usage: "[command name]",
	args: false,
	guildOnly: false,
	cooldown: 0,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		var channel = message.channel,
			author = message.author;

		if (args.includes("here")) {
			here = true
			args.indexOf("here") > -1 ? args.splice(args.indexOf("here"), 1) : false;
		}
		else {
			here = false
			channel = author;
		}

		if (!args.length) {
			// If there is no command given give the general help.
			data.push('Here\'s a list of all my commands:');
			data.push(commands.filter(command => !command.ownerOnly).map(command => command.name).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			// Then starting to return all the right things, making sure to catch errors.
			return channel.send(data, { split: true } )
				.then( () => {
					if (message.channel.type === "dm") return;
					if (!here) {
						message.reply("I have send help to your PMs.").catch(e => console.error(e));
					}
				})
				.catch( error => {
					console.error(`Could not send help to ${message.author.tag}, (${message.author.id})\n`, error);
					message.reply('it seems like I can\'t PM you! Do you have PMs disabled?').catch(e => console.error(e));
				});
		}

		// Getting the command they want a help for.
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		// trying to allow for the help to be send in the channel too.
		if (!command) {
			return message.reply(`${name} is not a valid command.`).catch(() => author.send("I am missing permissions to run that command."));
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		if (command.cooldown) data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		return channel.send(data, { split: true })
			.then( () => {
				if (message.channel.type === "dm" || channel.type === "text") return;
				if (!here) {
					message.reply("I have send help to your PMs.")
						.catch(e => console.error(e));
				}
			})
			.catch( error => {
				console.error(`Could not send help to ${message.author.tag}, (${message.author.id})\n`, error);
				message.reply('it seems like I can\'t PM you! Do you have PMs disabled?')
					.catch(e => console.log(error));
			});

	}
};