const Discord = require('discord.js');
const db = require('quick.db')
  
exports.run = async (client, message, args) => {
let kayityetkili = '782662489367773184' //Yetkili
let codeariusver = '782663296938672148' //Verilecek
let codeariusal = '782638442340679710' //Alınacak
let isimön = '↯' //İsmin önüne gelecek simge,tag   

  if(!message.member.roles.cache.has(kayityetkili))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  if (!member) return message.channel.send('Lütfen bir kullanıcı etiketle.')  
  if (!isim) return message.channel.send('Bir isim yazmalısın.')
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.') 
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.')
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await db.fetch(`kayıtlıisim_${member}`)  
  let toplamaisim = `${isimön} ${isim} ${yaş}`
    
  setTimeout(function(){
  member.setNickname(`${isimön} ${isim} | ${yaş}`)
  },1000)
    setTimeout(function(){
  member.roles.add(codeariusver)  
  },2000)
  setTimeout(function(){
  member.roles.remove(codeariusal)
  },3000)
 
let toplam = await db.fetch(`kayıttoplam_${message.author.id}`) + 1 || '0'
const emoji = client.emojis.cache.find(emoji => emoji.name === "5_");

  if(kayıtlımı !== 'evet') {
  db.add(`kayıtk_${message.author.id}`, 1) 
  db.add(`kayıttoplam_${message.author.id}` , 1)
  db.set(`kayıtlıkişi_${member}`, 'evet')
  db.set(`kayıtlıisim_${member}`, toplamaisim)  
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)
  let embed = new Discord.MessageEmbed()
  .setColor('f5f5f5')
  .setDescription(`${member} kişisinden <@&${codeariusal}> rolü alınıp <@&${codeariusver}> rolü verildi.

<@!${message.author.id}>   Kişisinin toplam ${toplam} adet teyiti oldu.
`)
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setFooter('Klaus Registery ')
  .setThumbnail("https://cdn.discordapp.com/attachments/583680695293968404/601813274090274836/giphy.gif")
message.channel.send(embed)
  }
  if(kayıtlımı === 'evet'){
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.MessageEmbed()
  .setColor('f5f5f5')
  .setDescription(` **Bu kişi daha önceden de kayıt edilmiş!**

**Kullanıcı daha önce bu isimle kayıt edilmiş!** \`${eskiismi}\``)
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setFooter('Klaus ')  
  .setThumbnail("https://cdn.discordapp.com/attachments/583680695293968404/601813274090274836/giphy.gif")
message.channel.send(embed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kadın','girl','kız'],
  permLevel: 0
}
exports.help = {
  name: 'k',
  description: "Kadın kullanıcıları kayıt etme komutu.",
  usage: 'kadın @kişi isim yaş'
}