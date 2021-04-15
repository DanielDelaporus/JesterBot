const Discord = require('discord.js');
const fs = require('fs');

function formatTime(seconds, number) {
    if (number == 160)
        return "FULL !"
    let time = (480 - (seconds % 480))
    let hour = Math.floor(time / (60 * 60))
    let minute = Math.floor((time % 3600) / (60))
    let sec = time % 60
    let res = ""
    res += hour < 10 ? "0" + hour : hour
    res += ":"
    res += minute < 10 ? "0" + minute : minute
    res += ":"
    res += sec < 10 ? "0" + sec : sec
    return res
}
function formatTimeFull(seconds, number) {
    if (number == 160)
        return "FULL !"
    let time = 480 * (160 - number) - (seconds % 480)
    let hour = Math.floor(time / (60 * 60))
    let minute = Math.floor((time % 3600) / (60))
    let sec = time % 60
    let res = ""
    res += hour < 10 ? "0" + hour : hour
    res += ":"
    res += minute < 10 ? "0" + minute : minute
    res += ":"
    res += sec < 10 ? "0" + sec : sec
    return res
}

function ManageResine(action, number, you, chan) {
    const data = fs.readFileSync('Data/Genshin.json', 'utf8');
    const Database = JSON.parse(data);
    if (number != "max" && (Number(number) > 160 || Number(number) < 0)) {
        const embeds = new Discord.MessageEmbed()
        .setColor('#a8c6f9')
        .setTitle('Genshin Resine Help - HERE ?')
        .setDescription('type \"!resine\" followed by the action you want to do (get or set)...\nIf you want to set, specify at which number you want to set it...\n(exemple: \"!resine set 160\")')
        chan.send(embeds)
    }
    else if (action === "get") {
        let found = false
        Database.resine_data.forEach(user => {
            if (you.id == user.id) {
                found = true
                let spent_time_since = Date.now() - user.at
                let seconds_spent_since = Math.floor(spent_time_since / (1000))
                let final_num = Number(user.number) + Math.floor(spent_time_since / (60 * 1000 * 8))
                let previous = user.number
                user.number = final_num > 160 ? 160 : final_num
                if (previous != user.number)
                    user.at = Date.now()

                const embeds = new Discord.MessageEmbed()
                .setColor('#a8c6f9')
                .setTitle(you.username + "\'s Resine :  " + user.number)
                .setDescription("Next recovery : " + formatTime(seconds_spent_since, user.number)  + "\n" + "Total recovery : " + formatTimeFull(seconds_spent_since, user.number))
                chan.send(embeds)
            }
        });
        if (!found) {
            const embeds = new Discord.MessageEmbed()
            .setColor('#a8c6f9')
            .setTitle('Genshin Resine Help')
            .setDescription('This is the first time you\'re using this service ! Please start by setting your current amount of resine... (exemple: \"!resine set 160)\"')
            chan.send(embeds)
        }
    }
    else if (action === "set") {
        let found = false
        Database.resine_data.forEach(user => {
            if (you.id == user.id) {
                found = true
                let previous = user.number
                user.number = number
                if (previous != user.number)
                    user.at = Date.now()

                const embeds = new Discord.MessageEmbed()
                .setColor('#a8c6f9')
                .setTitle(you.username + '\'s amount of Resine was set at  ' + user.number)
                .setDescription("")
                chan.send(embeds)
            }
        });
        if (!found) {
            Database.resine_data.push({
                "Name" : you.username,
                "id": you.id,
                "number": Number(number),
                "at": Date.now()
            })
            const embeds = new Discord.MessageEmbed()
            .setColor('#a8c6f9')
            .setTitle(you.username + '\'s amount of Resine was set at :')
            .setDescription(Number(number))
            chan.send(embeds)
        }
    }
    else {
        const embeds = new Discord.MessageEmbed()
        .setColor('#a8c6f9')
        .setTitle('Genshin Resine Help')
        .setDescription('type \"!resine\" followed by the action you want to do (get or set)...\nIf you want to set, specify at which number you want to set it...\n(exemple: \"!resine set 160\")')
        chan.send(embeds)
    }
    fs.writeFileSync("Data/Genshin.json", JSON.stringify(Database, null, 2)); 
}

function DisplayBuild(Name, chan) {
    let fileName = "../discord_bot/Images/GenshinBuild/"
    let commentary = ``
    switch (Name.toLowerCase()) {
        case "albedo" :
            fileName += "albedo.png"
            break;
        case "amber":
            fileName += "amber.png"
            break;
        case "barbara":
            fileName += "barbara.jpg"
            break;
        case "beidou":
            fileName += "beidou.png"
            break;
        case "bennett":
            fileName += "bennett.png"
            break;
        case "chongyun":
            fileName += "chongyun.png"
            break;
        case "diluc":
            fileName += "diluc.png"
            break;
        case "diona":
            fileName += "diona.png"
            break;
        case "fischl":
            fileName += "fischl.png"
            break;
        case "ganyu":
            fileName += "ganyu.png"
            break;
        case "hutao":
            fileName += "hu_tao.png"
            break;
        case "jean":
            fileName += "jean.png"
            break;
        case "kaeya":
            fileName += "kaeya.png"
            break;
        case "keqing":
            fileName += "keqing.png"
            break;
        case "klee":
            fileName += "klee.png"
            break;
        case "lisa":
            fileName += "lisa.png"
            break;
        case "main-anemo":
            fileName += "MC-Anemo.png"
            break;
        case "mona":
            fileName += "mona.png"
            break;
        case "ningguang":
            fileName += "ningguang.png"
            break;
        case "noelle":
            fileName += "noelle.jpg"
            break;
        case "qiqi":
            fileName += "qiqi.png"
            break;
        case "razor":
            fileName += "razor.png"
            break;
        case "sucrose":
            fileName += "sucrose.png"
            break;
        case "tartaglia":
            fileName += "tartaglia.png"
            break;
        case "venti":
            fileName += "venti.png"
            break;
        case "xiangling":
            fileName += "xiangling.png"
            break;
        case "xiao":
            fileName += "xiao.jpg"
            break;
        case "xingqiu":
            fileName += "xingqiu.png"
            break;
        case "xinyan":
            fileName += "xinyan.jpg"
            break;
        case "zhongli":
            fileName += "zhongli.png"
            break;
        default:
            fileName += "paimon.jpg"
            commentary = `The name you used isn't in the database`
            break;
    }

	chan.send(commentary,  {
        files: [fileName]
    });
}

module.exports.DisplayBuild = DisplayBuild;
module.exports.ManageResine = ManageResine;