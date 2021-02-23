module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged in a ${client.user.tag}`);
		client.user.setPresence({ activity: {name: "/help", type: "LISTENING"}, status: "online", });
	},
};