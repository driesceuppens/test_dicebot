const { prefix } = require('../../config.json');

module.exports = {
	name: "kick",
	description: "For when you need to kick someone from the server!",
	args: true,
	usage: "[@user]",
	guildOnly: true,
	permissions: "KICK_MEMBERS",
	execute(message, args) {
		const client = message.client;

		const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

		const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

		console.log(prefixRegex);
	},
};