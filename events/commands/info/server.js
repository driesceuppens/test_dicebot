module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	args: false,
	usage: "",
	guildOnly: true,
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer's ID: ${message.guild.id}`)
			.catch(msg => message.author.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer's ID: ${message.guild.id}`));
	},
};