const Discord = require("discord.js");
module.exports = {
	name: 'ping',
	description: 'pong!',
	execute(message, args) {
	  let totalSeconds = (message.client.uptime / 1000);
	  let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
let uptime = "`" + `${days} giorni, ${hours} ore, ${minutes} minuti e ${seconds} secondi` + "`";
	  var ping = new Discord.MessageEmbed()
	  .setTitle("Pong!")
	  .setColor("BLACK")
	  .addFields(
	    { name: "`🏓` Latenza", value: `\`${Date.now() - message.createdTimestamp}ms\``},
	    { name: "`🤖` Latenza API", value: `\`${message.client.ws.ping}ms\``},
	    { name: "`📈` Uptime", value: `${uptime}`}
	    )
	  message.channel.send(ping)
	  }
}
