const Discord=require('discord.js');
const db=require('quick.db');
const fs=require('fs');
const moment=require('moment');
const ayarlar=require('./ayarlar.json');
const client=new Discord.Client();
const express = require('express')
const http=require("http")
const app = express()
// Pudochu ^-^
app.get('/', (req, res) => res.send('BOT | Aktif!')) // sitenize girdiğinde görebilirsiniz.
app.listen(process.env.PORT, () => console.log('Port ayarlandı: ' + process.env.PORT))
client.commands=new Discord.Collection();for(const a of fs.readdirSync('./komutlar').filter(a=>a.endsWith('.js'))){const b=require(`./komutlar/${a}`);client.commands.set(b.help.name,b)}client.elevation = message => {
  if(!message.guild){if(ayarlar.sahip.includes(message.author.id)){return 4}return 3}
  if(ayarlar.sahip.includes(message.author.id))return 4;
  if (message.member.hasPermission("ADMINISTRATOR"))return 3;
  if (message.member.hasPermission("BAN_MEMBERS"))return 2;
};

client.on("message",message=>{
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  const args=message.content.slice(ayarlar.prefix.length).split(/ +/);
  const command=args.shift().toLowerCase();
  let perms = client.elevation(message);
  let cmd;
  cmd=client.commands.get(command)||client.commands.find(cmd=>cmd.conf.aliases&&cmd.conf.aliases.includes(command));
  if (!cmd)return;
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, args, perms);
  }
});
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.on("ready",()=>{
  client.user.setActivity(`Anje #Klaus`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username}`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.cache.size + ` adet kanala, ` + client.guilds.cache.size + ` adet sunucuya ve ` + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
});


//////////sunucuya biri gelince kayıt mesajı atar.

client.on("guildMemberAdd",a=>{
let yetkili = ("782662489367773184") //kayıt görevlisi rol id
let kayıtsız1 = ("782638442340679710")//kayıtsız rol id
let kullanıcı = client.users.cache.get(a.id)
let kayıt;
const kurulus = new Date().getTime()- kullanıcı.createdAt.getTime();
if (kurulus < 1296000000) kayıt = 'HAYIR Değil'
if (kurulus > 1296000000) kayıt = 'Evet Güvenilir!'
const kayıtembed = new Discord.MessageEmbed()
.setTitle("Yeni Kullanıcı Geldi!")
.setColor("RANDOM")
.setDescription(`${a} Hoşgeldin Seninle Birlikte **${a.guild.memberCount}** Kişi Olduk Yetkili Ekibimiz Sizinle İlgilenecek İlgilenmezlerse Kayıtcıların Rolünü etiketle`)
.addField("Kayıt Görevlisi Rolü",`<@&${yetkili}>`)
.addField("Bu Kişi Güvenilirmi",`**${kayıt}**`)
.setImage("https://cdn.discordapp.com/attachments/740669534637129810/740674885189107823/LEGEND_20171010_224358.gif")
a.roles.add(kayıtsız1)
client.channels.cache.get("780391827370541056").send(kayıtembed)})

client.login(ayarlar.token)