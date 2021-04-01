const Discord = require('discord.js');
const db = require('quick.db')
 
exports.run = async (client, message, args) => {
  let kayityetkili = '782662489367773184' //Kayıt yetkilisi İD
  if(!message.member.roles.cache.has(kayityetkili)) 
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);
   
  let kişi = message.mentions.users.first();
  if(!kişi) {
    let erkek = await db.fetch(`kayıte_${message.author.id}`) || '0'
    let kız = await db.fetch(`kayıtk_${message.author.id}`) || '0'
    let toplam = await db.fetch(`kayıttoplam_${message.author.id}`) || '0'
 
    let kayıtlılar = new Discord.MessageEmbed()
      .setColor('f5f5f5')
      .setDescription(`Kayıt bilginiz\n\n`)
      .addField('__Erkek__', erkek, true) 
      .addField('__Kız__', kız, true)
      .addField('__Toplam__', toplam)
    message.channel.send(kayıtlılar)
  }
    if(kişi) { 
    let erkek = await db.fetch(`kayıte_${kişi.id}`) || '0'
    let kız = await db.fetch(`kayıtk_${kişi.id}`) || '0'
    let toplam = await db.fetch(`kayıttoplam_${kişi.id}`) || '0'
    let kayıtlılar = new Discord.MessageEmbed()
      .setColor('f5f5f5') 
      .setDescription(`**${kişi.username} kişisinin kayıt bilgisi**\n\n`)
      .addField('__Erkek__', erkek, true) 
      .addField('__Kız__', kız, true)
      .addField('__Toplam__', toplam)
    message.channel.send(kayıtlılar)
  } 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ks','teyit','kayıt-bilgi'],
  permLevel: 0
}
exports.help = {
  name: 'kayıtsay',
  description: "Teyit sayısını gösterir",
  usage: 'kayıtsay <nick>'
}