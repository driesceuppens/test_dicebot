const { prefix } = require('../../config.json');

module.exports = {
	name: "dm-spam",
	description: "Spams a dm channel with a user input amount of a user input message.",
	aliases: ["spamdm", "dm_spam", "dmdpam"],
	args: true,
	usage: "<amount>",
	cooldown: 10,
	testVersion: true,
	execute(message, args) {
		var author = message.author,
			channel = message.channel,
			guild = message.guild;

		function amount_maker(amount, message) {
			var amount = parseInt(amount);
			if (isNaN(amount)) {
				return message.reply(`Please enter a number for the ${prefix}spam command.`);
			}
			return amount;
		}

		const amount = amount_maker(args.shift(), message);

		var spam_message = "This is spam.";

		if (message.mentions.users.size) {
			channel = message.mentions.users.first();
		}

		args.shift();
		
		if (args.length) {
			spam_message = args.toString();
		}

		for (var i = 0; i < amount; i++) {
			spam_message = spam_message.replace(/,/g, " ");
			channel.send(spam_message);
		}
		return;
	},
}