const Discord = require('discord.js');
const Resto = require('./Struct/Restaurants')
const Jdr = require('./Struct/AffinityJdr')
const Genshin = require('./Struct/Genshin')
const Alert = require('./Struct/Alert')
const fs = require('fs');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Hi, I'm ${client.user.username}!`);
  client.user.setActivity('Baking Cupcakes...');
  client.user.setStatus('dnd');
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

client.setInterval( async () => {
  const time = Date.now()
  const data = fs.readFileSync('Data/Alert.json', 'utf8');
  const Database = JSON.parse(data);
  Database.alert_data.forEach(async alert => {
      if ((Math.floor(alert.when / 1000) < Math.floor(time / 1000)) && !alert.rang) {
          alert.rang = true;
          fs.writeFileSync("Data/Alert.json", JSON.stringify(Database, null, 2));
          console.log("Alerte !")
          const embeds = new Discord.MessageEmbed()
          .setColor('#ff1a1a')
          .setTitle('DING DING DING ! \"' + alert.Title + '\" !')
          const chan = await client.channels.fetch(alert.chan.id)
          const author = await client.users.fetch(alert.author.id)
          chan.send("@everyone", embeds)
          return embeds
      }
  });
}, 1000)

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
    .setDescription('!ping\n!jester\n!info\n!hide\n!show\n!help\n!resto\n!affinity\n!rocbane\n!genshin');
    msg.channel.send(embeds);
  }

  if (msg.content.includes("!resto")) {
    const type = msg.content.split(" ")[1];
    msg.channel.send(Resto.getResto(type))
  }
  if (msg.content.includes("!resine")) {
    const action = msg.content.split(" ")[1];
    const number = msg.content.split(" ")[2];
    if (!action || action === "set" && !number) {
      const embeds = new Discord.MessageEmbed()
      .setColor('#a8c6f9')
      .setTitle('Genshin Resine Help')
      .setDescription('type \"!resine\" followed by the action you want to do (get or set)...\nIf you want to set, specify at which number you want to set it...\n(exemple: \"!resine set 160\")')
      msg.channel.send(embeds)
    }
    else {
      Genshin.ManageResine(action, number, msg.author, msg.channel);
    }
  }
  if (msg.content.includes("!genshin")) {
    const type = msg.content.split(" ")[1];
    if (!type) {
      const embeds = new Discord.MessageEmbed()
      .setColor('#990000')
      .setTitle('Genshin Builds Help')
      .setDescription('type \"!genshin\" followed by the name of the character to access their build...\n(exemple: \"!genshin albedo\")')
      msg.channel.send(embeds)
    }
    else
      Genshin.DisplayBuild(type, msg.channel);
  }
  if (msg.content.includes("!alert empty")) {
    const data = fs.readFileSync('Data/Alert.json', 'utf8');
    const Database = JSON.parse(data);
    Database.alert_data.clear();
    fs.writeFileSync("Data/Alert.json", JSON.stringify(Database, null, 2));
  }
  if (msg.content.includes("!alert")) {
    const date = msg.content.split(" ")[1];
    const hour = msg.content.split(" ")[2];
    var title = "";

    for (let i = 3; i < msg.content.split(" ").length; i++)
      title += msg.content.split(" ")[i] + " "; 

    if (!title || !date || !hour) {
      const embeds = new Discord.MessageEmbed()
      .setColor('#990000')
      .setTitle('Alert Help')
      .setDescription('type \"!alert\" followed by the Title of the Alert and the date and hour (ex: Title MM-DD-YYYY HH:MM)')
      msg.channel.send(embeds)
    }
    else
      Alert.SetAlert(title, date, hour, msg.author, msg.channel);
  }
 
});

client.login(fs.readFileSync('../token.txt', 'utf8'));