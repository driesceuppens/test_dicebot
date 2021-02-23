module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false,
	usage: "",
	execute(message, args) {
		const author = message.author,
			channel = message.channel,
			guild = message.guild;
		message.channel.send('Pong.')
			.catch(msg => author.send("I am missing permissions to execute this command").catch(error => console.log(error)));
	},
};