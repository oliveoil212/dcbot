const googleAPI  = require('googleapis');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qr')
        .setDescription('Generates QR code for the url provided')
        .addStringOption(option => option.setName('data').setDescription('data to be encoded'))
        .addStringOption(option => option.setName('height').setDescription('height of QR in pixels'))
        .addStringOption(option => option.setName('width').setDescription('width of QR in pixels'))
        .addStringOption(option => option.setName('color').setDescription('color of QR'))
        ,
    async execute(interaction){
        const data = interaction.options.getString('data');
        const height = interaction.options.getString('height')?? 177
        const width = interaction.options.getString('width')?? 177
        const color = interaction.options.getString('color') ?? '0xffffff'
	const url = `https://chart.googleapis.com/chart?cht=qr&chs=${width}x${height}&chl=${data}`
        await interaction.reply(url);
        //await interaction.reply("My Bot's message", {files: [`${url}]});
}
    
};
