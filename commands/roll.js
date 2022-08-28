const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('roll').setDescription('Replies with user info!')
    .addIntegerOption(option => option.setName('size').setDescription('Dice size'))    
    .addIntegerOption(option => option.setName('times').setDescription('how many time you would like to roll')),
	async execute(interaction) {
        const times = interaction.options.getInteger('times') ?? 1;
        const size = interaction.options.getInteger('size') ?? 6;
        console.log(size + 'ssssss'+ times);

        let msg = `${interaction.user.username}, you rolled size ${size} dice for ${times} times \r\n`;
        for (let i = 0; i < times;i++) {
            const rollnum = Math.floor(Math.random() * size) + 1
            msg = `${msg} **${rollnum}**`;
        }
		await interaction.reply(msg);
	},
};