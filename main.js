
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits , Partials } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}
client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	console.log(reaction.message)
	if(reaction.message.channel.id !='1007032702874169386') return
	if(reaction.emoji.name === '🉑') {
		console.log('🉑');
	
		await reaction.message.guild.members.cache.get(user.id).roles.add("1010069985101631549")
	}
	console.log(user.username)
	reaction.message.channel.send(`${user.username} react ${reaction.emoji.name}`);
});
client.on('messageReactionRemove', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	console.log(reaction.message.channel.id);
	if(reaction.message.channel.id !='1007032702874169386') return
	if(reaction.emoji.name === '🉑') {
		console.log('🉑');
	
		await reaction.message.guild.members.cache.get(user.id).roles.remove("1010069985101631549")
	}
	console.log(user.username)
	reaction.message.channel.send(`${user.username} remove reaction ${reaction.emoji.name}`);
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);

