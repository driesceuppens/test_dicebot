module.exports = {
	name: "user-info",
	description: "Display the users info.",
	args: false,
	usage: "[@user]...",
	execute(message, args) {
		var author = message.author,
			channel = message.channel;
		
		// Okay now we have a list of the users. Let's roll
		if (message.mentions.users.size) {
			author = message.mentions.users.map(users => users)[0];
		}
		return channel.send(`Your user info is:\nName: ${author.username}\nID: ${author.id}\nAre you a bot?: ${author.bot}\nYour tag: ${author.tag}`);
	},
};