const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	ownerOnly: true,
	execute (message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		console.log(commandName, command.name, command);

		if (!command) {
			message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`)
				.catch(e => console.error(e));
		}

		const commandFolders = fs.readdirSync('./commands');
		console.log(commandFolders);
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`);
		}
		catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};