module.exports = {
	name: "addrole",
	description: "Test thing for reactions on messages I guess?",
	aliases: ["giverole", "role"],
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
			guildMember = guild.member(message.mentions.users.first()) || guild.member(author);

		try {
			guildMember.roles.add(roleMention);
		}
		catch (error) {
			console.log(error);
			channel.send("I am missing permissions to execute this command.")
				.catch(author.send("I am missing permissions to execute this command.").catch(e => console.log(e)));
		}
		finally {
			channel.send(`${author} gave ${guildMember} the ${roleMention.name} role.`)
				.catch(() => author.send("I am missing permissions to send messages in the channel."));
		}

	},

}