const Discord = require('discord.js');
const fs = require('fs');

function Batiment(Name)
{
    this.Name = Name
    this.level = 0
}

function Rocbane()
{
    this.Popularité = 6
    this.Puissance = 1
    this.Argent = 0
    this.Stabilité = 0
    this.Connaissance = 0
    this.Population = 2
    this.Batiments = [
        new Batiment("Murs"),
        new Batiment("Port"),
        new Batiment("Hotel De Ville"),
        new Batiment("Bibliothèque")
    ]
}

function GroupAffinity(CharacterAffinity, FactionAffinity)
{
  this.CharacterAffinity = CharacterAffinity
  this.FactionAffinity = FactionAffinity
}

function Affinity(Name, Value, Reveal)
{
  this.Name = Name;
  this.Value = Value;
  this.Reveal = Reveal;
}

function progressBar(val)
{
    let i = 0
    let str = ""
    for (; i < 10; i++) {
        if (i != val + 10)
            str += ":red_square:"
        else
            str += ":white_medium_small_square:"
    }
    for (; i < 20; i++) {
        if (i != val + 10)
            str += ":green_square:"
        else
            str += ":white_medium_small_square:"
    }
    return str
}

function getAffinity(type)
{
    const data = fs.readFileSync('Data/Affinity.json', 'utf8');
    const Database = JSON.parse(data);
    const embeds = new Discord.MessageEmbed()
    switch (type) {
        case "characters":
            embeds.setDescription('Vos affinités avec certains personnages')
            .setColor('#009999').setTitle('Characters :')
            Database.CharacterAffinity.forEach(Character => {
                if (Character.Reveal)
                    embeds.addField(Character.Name, progressBar(Character.Value), false)
            });
            break;
        case "factions":
            embeds.setDescription('Vos affinités avec les différents factions')
            .setColor('#009999').setTitle('Factions :')
            Database.FactionAffinity.forEach(Faction => {
                if (Faction.Reveal)
                    embeds.addField(Faction.Name, progressBar(Faction.Value), false)
            });
            break;
        default:
            embeds.setTitle('Affinity Help :')
            .setColor('#009999').setDescription('!affinity factions\n!affinity characters')
            break;
    }
    return embeds
}

function getRocbane() 
{
    const data = fs.readFileSync('Data/Rocbane.json', 'utf8');
    const Database = JSON.parse(data);
    const embeds = new Discord.MessageEmbed()
    .setTitle('La Cité de Rocbane')
    .setColor('#0099ff')
    .addField('\u200b', "Statistics :")
    .addFields(
        { name: ":two_hearts:  Popularité", value: Database.Popularité, inline: true },
        { name: ":crossed_swords:  Puissance", value: Database.Puissance, inline: true },
        { name: ":moneybag:  Argent", value: Database.Argent, inline: true },
        { name: ":spy:   Stabilité", value: Database.Stabilité, inline: true },
        { name: ":book:   Connaissance", value: Database.Connaissance, inline: true },
        { name: ":busts_in_silhouette:   Population", value: Database.Population, inline: true },
    )
    .addField('\u200b', '\u200b')
    .addField('\u200b', "Bâtiments :")
    .addFields(
        { name:  ":european_castle:  " + Database.Batiments[0].Name, value: Database.Batiments[0].level, inline: true },
        { name: '\u200b', value: '\u200b', inline: true },
        { name: ":sailboat:  " + Database.Batiments[1].Name, value: Database.Batiments[1].level, inline: true },
        { name: ":bank:  " + Database.Batiments[2].Name, value: Database.Batiments[2].level, inline: true },
        { name: '\u200b', value: '\u200b', inline: true },
        { name:  ":books:  " + Database.Batiments[3].Name, value: Database.Batiments[3].level, inline: true },
    )
    .setDescription("L'état actuel de la ville");

    return embeds
}

module.exports.getRocbane = getRocbane;
module.exports.getAffinity = getAffinity;