module.exports = {
	name: "purge",
	description: "Purge a user input amount of messages in the channel the command was send.",
	args: true,
	usage: "<amount>",
	cooldown: 5,
	execute(message, args) {
		const author = message.author,
			channel = message.channel,
			guild = message.guild;
		function amount_maker(amount, message) {
			var amount = parseInt(amount);
			if (isNaN(amount)) {
				return message.reply(`Please enter a number for the ${prefix}purge command.`);
			}
			return amount + 1;
		}

		const amount = amount_maker(args[0], message);

		if (amount < 2 || amount > 100) {
			return message.reply(`${amount} is either too large to too small, enter a number between 2 and 100.`)
		}
		channel.bulkDelete(amount, true).catch(err => {
			console.log(err);
			author.send(err);
			channel.send("There was an error with the command!");
		});
	},
};