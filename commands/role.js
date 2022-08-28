const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('role').setDescription('Replies with user info!'),
	async execute(interaction) {
	const message = await interaction.reply({ content: 'Awaiting emojis...', fetchReply: true });
		message.react('👍').then(() => message.react('👎'));

		const filter = (reaction, user) => {
			return ['👍', '👎'].includes(reaction.emoji.name) && user.id === interaction.user.id;
		};

		message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '👍') {
					interaction.followUp('You reacted with a thumbs up.');
				} else {
					interaction.followUp('You reacted with a thumbs down.');
				}
			})
			.catch(collected => {
				console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
				interaction.followUp('You didn\'t react with neither a thumbs up, nor a thumbs down.');
			});
	}
};
