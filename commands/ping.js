const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addStringOption(option => option.setName('input').setDescription('Enter a string'))
		.addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
		.addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
		.addUserOption(option => option.setName('target').setDescription('Select a user'))
		.addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
		.addRoleOption(option => option.setName('muted').setDescription('Select a role'))
		.addNumberOption(option => option.setName('num').setDescription('Enter a number'))
		.addMentionableOption(option => option.setName('mentionable').setDescription('Mention something'))
		.addAttachmentOption(option => option.setName('attachment').setDescription('Attach something')),
	async execute(interaction) {
		const string = interaction.options.getString('input');
		await interaction.reply('Pong!'+string);
	},
};