const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {

var erkek = db.fetch(`erkekKayit_${message.author.id}`)
var bayan = db.fetch(`bayanKayit_${message.author.id}`)
var toplam = db.fetch(`toplamKayit_${message.author.id}`)

const embed = new Discord.RichEmbed()
.setColor("#1955a8")
.setAuthor(`${message.author.username} Adlı Kişinin İstatistiği`, message.author.avatarURL)
.addField(`Toplam Kayıt Edilen Kişi Sayısı;`, db.fetch(`toplamKayit_${message.author.id}`) || 0)
.addField(`Kayıt Edilen Erkek Kişi Sayısı;`, db.fetch(`erkekKayit_${message.author.id}`) || 0)
.addField(`Kayıt Edilen Bayan Kişi Sayısı`, db.fetch(`bayanKayit_${message.author.id}`) || 0)
.setFooter("Matador Kayıt Sistemi");

message.channel.send(embed)  
  
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pp"],
  permLevel: 0
};

module.exports.help = {
  name: 'profil',
  description: '',
  usage: ''
}; //matador