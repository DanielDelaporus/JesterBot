const Discord = require('discord.js');
const fs = require('fs');

function SetAlert(title, date, hour, author, channel) {
    const data = fs.readFileSync('Data/Alert.json', 'utf8');
    const Database = JSON.parse(data);
    try {
        const hours = hour.split(":")[0];
        const minutes = hour.split(":")[1];

        const fullTime = 60 * 60 * 1000 * parseInt(hours) + 60 * 1000 * parseInt(minutes);
        const fullDate = Date.parse(date);

        const alertDate = fullDate + fullTime;

        Database.alert_data.push(
            {
                "Title" : title,
                "author": author,
                "when": alertDate,
                "chan" : channel,
                "now" : Date.now(),
                "rang" : false 
            }
        );

        const embeds = new Discord.MessageEmbed()
        .setColor('#a8c6f9')
        .setTitle('The Alert was set for the ' + date + ' at ' + hour)
        channel.send(embeds)
    } catch (error) {
        const embeds = new Discord.MessageEmbed()
        .setColor('#990000')
        .setTitle('Alert Help')
        .setDescription('type \"!alert\" followed by the Title of the Alert and the date and hour (ex: Title MM-DD-YYYY HH:MM)')
        channel.send(embeds)
    }
    fs.writeFileSync("Data/Alert.json", JSON.stringify(Database, null, 2));
}

//module.exports.checkAlert = checkAlert;
module.exports.SetAlert = SetAlert;