const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./comandi');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./comandi/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./comandi/${folder}/${file}`);
		client.commands.set(command.name, command);
		console.log("[CMD]", file)
	}
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
let comandonoesiste = new Discord.MessageEmbed()
.setTitle(":x: | Comando non esistente")
.setDescription("Questo comando non esiste")
.setColor("RED")
.setTimestamp()
	if (!client.commands.has(command)) return message.channel.send(comandonoesiste)
	try { //ok? si
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply(':x: errore: qualcosa non ha funzionato!\nquesto errore significa che qualcosa è andato storto. ', error);
	}
});
