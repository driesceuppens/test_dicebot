const { prefix } = require('../../config.json');

module.exports = {
	name: "spam",
	description: "Spams a channel with a user input amount of a user input message.",
	args: true,
	usage: "<amount>",
	cooldown: 10,
	execute(message, args) {
		const author = message.author,
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

		if (args.length) {
			spam_message = args.toString();
		}

		for (var i = 0; i < amount; i++) {
			spam_message = spam_message.replace(/,/g, " ");
			channel.send(spam_message);
		}
	},
}