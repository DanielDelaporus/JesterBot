const Discord = require('discord.js');
const fs = require('fs');

function Resto(Name, Cheap, Healthy, Location) {
    this.Name = Name;
    this.Cheap = Cheap;
    this.Healthy = Healthy;
    this.Location = Location;
  }

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getResto(type) 
{
    const data = fs.readFileSync('Data/Resto.json', 'utf8');
    const Database = JSON.parse(data);
    var rng = getRandomInt(Database.length);
    const embeds = new Discord.MessageEmbed()
    .setColor('#990000');
    switch (type) {
      case "cheap":
        while (Database[rng].Cheap !== true) {
          rng = getRandomInt(Database.length);
        }
        embeds.setTitle(Database[rng].Name).setColor('#000099')
        .setDescription(Database[rng].Location);
        break;
      case "pricey":
        while (Database[rng].Cheap !== false) {
          rng = getRandomInt(Database.length);
        }
        embeds.setTitle(Database[rng].Name).setColor('#FFFF00')
        .setDescription(Database[rng].Location);
        break;
      case "healthy":
        while (Database[rng].Healthy !== true) {
          rng = getRandomInt(Database.length);
        }
        embeds.setTitle(Database[rng].Name).setColor('#009900')
        .setDescription(Database[rng].Location);
        break;
      case "fat":
        while (Database[rng].Healthy !== false) {
          rng = getRandomInt(Database.length);
        }
        embeds.setTitle(Database[rng].Name).setColor('#990000')
        .setDescription(Database[rng].Location);
        break;
      case "random":
        embeds.setTitle(Database[rng].Name).setColor('#990000')
        .setDescription(Database[rng].Location);
        break;
      default:
        embeds.setTitle('Whatchu wanna eat ?')
        .setDescription('\tcheap\n\tpricey\n\thealthy\n\tfat\n\trandom\n\n\tType "!resto" followed by your answer\n\t ex: !resto cheap');
        break;
    }
    return embeds;
}

module.exports.getResto = getResto;