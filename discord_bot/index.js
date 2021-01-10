const Discord = require('discord.js');
const Resto = require('./Struct/Restaurants')
const Jdr = require('./Struct/AffinityJdr')

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Hi, I'm ${client.user.username}!`);
  client.user.setActivity('Baking Cupcakes...');
  client.user.setStatus('dnd');
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

client.on('message', msg => {
  if (msg.content === '!kiri') {
    msg.reply('Very cute !');
  }
  if (msg.content === '!ping') {
    msg.reply('pong');
  }

  if (msg.content.includes("!1d"))
  {
    if (parseInt(msg.content.split('d')[1]) <= 1)
    {
      const embeds = new Discord.MessageEmbed()
      .setTitle('The size of the dice is wrong')
      .setDescription(`Fix your shit`);
      msg.channel.send(embeds);
    }
    else 
    {
      let number = parseInt(msg.content.split('d')[1]);
      let result = getRandomInt(number) + 1;
      const embeds = new Discord.MessageEmbed()
      .setTitle('Result of your ' + number.toString() + ' sided dice :')
      .setDescription(`${result}`);

      if (result <= number / 4)
        embeds.setColor('#990000');
      else if (result >= (number / 4) * 3)
        embeds.setColor('#009900');
      else
        embeds.setColor('#ffa500');

      msg.channel.send(embeds);
    }
  }

  if (msg.content === '!jester') {
    client.user.setUsername('Jester');
    const embeds = new Discord.MessageEmbed()
    .setDescription('Hi, Im Jester !');
    msg.channel.send(embeds);
  }
  if (msg.content === '!rocbane') {
    msg.channel.send(Jdr.getRocbane())
  }
  if (msg.content.includes("!affinity")) {
    const type = msg.content.split(" ")[1];
    msg.channel.send(Jdr.getAffinity(type))
  }
  if (msg.content === '!info') {
    const embeds = new Discord.MessageEmbed()
    .setDescription(`You are ${msg.author.username} !\nYour number of identification is #${msg.author.discriminator} !\n You joined Discord ${msg.author.createdAt}`);

    if (msg.author.id === "218349584852713472")
      embeds.setDescription(`Oh creator ! Why have you forsaken me ?`);
    msg.channel.send(embeds);

  }
  if (msg.content === '!hide') {
    const embeds = new Discord.MessageEmbed()
    .setTitle('')
    .setDescription('Ill go hide...');
    client.user.setStatus('invisible');
    msg.channel.send(embeds);

  }
  if (msg.content === '!show') {
    const embeds = new Discord.MessageEmbed()
    .setTitle('')
    .setDescription('You found me !');
    client.user.setStatus('dnd');
    msg.channel.send(embeds);
  }
  if (msg.content === '!help') {
    const embeds = new Discord.MessageEmbed()
    .setColor('#990000')
    .setTitle('All available commands')
    .setDescription('!ping\n!jester\n!info\n!hide\n!show\n!help\n!resto\n!affinity\n!rocbane');
    msg.channel.send(embeds);
  }

  if (msg.content.includes("!resto")) {
    const type = msg.content.split(" ")[1];
    msg.channel.send(Resto.getResto(type))
  }
});

client.login('NzE1OTA1NTM5OTIxNjc0Mjcx.XtEHSA.39zEkEfzdpHeTegrnrwRJ8GWHVw');