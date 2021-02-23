module.exports = {
	name: "removerole",
	description: "Test thing for reactions on messages I guess?",
	aliases: ["takerole", "norole"],
	args: true,
	usage: "",
	cooldown: 0,
	testVersion: true,
	guildOnly: true,
	delete: true,
	permissions: "",
	execute(message, args) {
		var author = message.author,
			guild = message.guild,
			channel = message.channel;

		var roleMention = message.mentions.roles.first(),
			guildMember = guild.member(message.mentions.users.first()) || guild.member(message.author);

		try {
			guildMember.roles.remove(roleMention);
		}
		catch (error) {
			console.log(error);
			channel.send("I am missing permissions to execute this command.")
				.catch(author.send("I am missing permissions to execute this command.").catch(e => console.log(e)));
		}
		finally {
			channel.send(`${author} took the ${roleMention.name} role from ${guildMember}.`)
				.catch(() => author.send("I am missing permissions to send messages in the channel."));
		}

	},

}