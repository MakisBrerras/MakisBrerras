const { Client, Type, ShowModal , setAuthor , GatewayIntentBits, Partials, EmbedBuilder, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent , GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions],
partials: [Partials.Message, Partials.Channel, Partials.Reaction]});
const { Permissions } = require('discord.js');
const { ActionRowBuilder, showModalBuilder, ModalBuilder, Modal, TextInputValue, TextInputComponent, TextInputBuilder, TextInputStyle, SelectMenuBuilder, InteractionType, ChannelType, PermissionsBitField, ButtonBuilder, ButtonStyle, AuditLogEvent, AttachmentBuilder, SlashCommandBuilder  } = require('discord.js');
const moment = require('moment')
const ms = require('ms')
const db = require('quick.db')
const puppeteer = require('puppeteer')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10');
const info = require('./info.json')
const prefix = '!'
const axios = require('axios')
const gSchema = require('./gSchema')
const { mongoose } = require('mongoose')
const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 20; // Increase the default max listeners
const ip = `162.19.95.237:30120` //Bazeis thn ip tou server (gia to !status kai to connect)
client.on('ready', () => {
    console.log('Bot Is Up!')
    client.user.setStatus('dnd')
    client.user.setActivity('Makaros') // Edw bazeis sto status poy thes na exei to bot soy



    setInterval(async() => {
      
      const guild = client.guilds.cache.get('1218189863216742444') // Bazeis to guild Id
      if (guild) {
        const channel = client.channels.cache.get('1235545537709740064') //Bazeis to channel id tou auto connect | PROSOXH TO CHANNEL AYTO THA PREPEI NA MHN XEI KANENA ALLO MSG EKTOS APO AYTO POY THA STEILEI TO BOT AYTOAMTA
        if (channel) {
          const messages = await channel.messages.fetch()
          const firstMessage = messages.first()
  
          
          
  
          if (firstMessage) {
              try {

                

                  const { data } = await axios.get(`http://${ip}/dynamic.json`);
                  const regex = /\[([0-9]+)\]/;
                  const queue = data.hostname.match(regex);
                  if (queue) {
                    const embed = new EmbedBuilder()
                    .setAuthor({name: guild.name, iconURL: uild.iconURL({dynamic: true })})
                    .setDescription(`**Για να συνδεθείτε στον server μας πατήστε \`F8\` και γράψτε \`connect ${ip}\`**`)
                    .setColor('#40f58e')
                    .addFields(
                      {name: "**Server Status**", value: "**<a:online:1232315927455076392>   Online**", inline:true},
                      {name: "**Players**", value: `**${data.clients}/${data.sv_maxclients}**`, inline: true},
                        {name: "**Queue**", value: `**${queue[1]}**`, inline: true}
                    )
                    .setFooter({text: `Ενημερώθηκε στις ${new Date().getHours()}:${new Date().getMinutes()}`})
                    return firstMessage.edit({embeds: [embed]}).then(async () => {
                      console.log('Refresh')
                    })
                  } else {
                    const embed = new EmbedBuilder()
                    .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true })})
                    .setDescription(`**Για να συνδεθείτε στον server μας πατήστε \`F8\` και γράψτε \`connect ${ip}\`**`)
                    .setColor('#40f58e')
                    .addFields(
                      {name: "**Server Status**", value: "**<a:online:1232315927455076392>   Online**", inline:true},
                      {name: "**Players**", value: `**${data.clients}/${data.sv_maxclients}**`, inline: true},
                        {name: "**Queue**", value: `**0**`, inline: true}
                    )
                    .setFooter({text: `Ενημερώθηκε στις ${new Date().getHours()}:${new Date().getMinutes()}`})
                    return firstMessage.edit({embeds: [embed]}).then(async () => {
                      console.log('Refresh')
                    })
                    console.log('AXAXAX')
                  }
                } catch (e) {
                  console.log(e)
                  const embed = new EmbedBuilder()
                  .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true })})
                  .setDescription(`**Για να συνδεθείτε στον server μας πατήστε \`F8\` και γράψτε \`connect ${ip}\`**`)
                  .setColor('#ff0000')
                  .addFields(
                    {name: "**Server Status**", value: "**<a:DoNotDisturb:1232315941447270421>    Offline**", inline:true},
                    {name: "**Players**", value: `**Offline**`, inline: true},
                      {name: "**Queue**", value: `**Offline**`, inline: true}
                  )
                  .setFooter({text: `Ενημερώθηκε στις ${new Date().getHours()}:${new Date().getMinutes()}`})
                
                  return firstMessage.edit({embeds: [embed]}).then(async () => {
                    console.log('Refresh')
                  })
                }
          } else {
            const embed = new EmbedBuilder()
                  .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true })})
                  .setDescription(`**Για να συνδεθείτε στον server μας πατήστε \`F8\` και γράψτε \`connect ${ip}\`**`)
                  .setColor('#ff0000')
                  .addFields(
                    {name: "**Server Status**", value: "**<a:DoNotDisturb:1232315941447270421>    Offline**", inline:true},
                    {name: "**Players**", value: `**Offline**`, inline: true},
                      {name: "**Queue**", value: `**Offline**`, inline: true}
                  )
                  .setFooter({text: `Ενημερώθηκε στις ${new Date().getHours()}:${new Date().getMinutes()}`})
                  channel.send({embeds: [embed]})
          }
        }
      }
  
  }, 60000);


  

})
    
const InvitesTracker = require('@androz2091/discord-invites-tracker');
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true
});

tracker.on('guildMemberAdd', (member, type, invite) => {



  if(type === 'normal'){
      let hmeres = ms('5 days')
      let createdAt = new Date(member.user.createdAt).getTime()
      let diff = Date.now() - createdAt
      let diarkeia = ''
      if(diff === 0) diarkeia = 'λίγων ωρών/λεπτών'
      if(diff === 1) diarkeia = '1 ημέρας'
      if(diff > 2) diarkeia = `${diff} ημερών`
      if(diff === 2) diarkeia = `2 ημερών`


      if(hmeres > diff) {
        
          if(db.get(`inviter_${member.id}`) === invite.inviter.id){
              db.add(`invites_${member.guild.id}_leave_${invite.inviter.id}`, -1)
              db.add(`invites_${member.guild.id}_fake_${invite.inviter.id}`, 1)
              db.set(`inviter_${member.id}`, invite.inviter.id)
              db.set(`joinbyinviter_${member.id}`, `yes`)
              db.set(`faker_${member.id}`, `yes`)
              console.log('1')
          }

          else{
              db.add(`invites_${member.guild.id}_fake_${invite.inviter.id}`, 1)
              db.add(`invites_${member.guild.id}_all_${invite.inviter.id}`, 1)
              db.set(`inviter_${member.id}`, invite.inviter.id)
              db.set(`joinbyinviter_${member.id}`, `yes`)
              db.set(`faker_${member.id}`, `yes`)
              console.log('2')
          }
     
  }else{
   
     if(db.get(`inviter_${member.id}`) === invite.inviter.id){
      db.add(`invites_${member.guild.id}_leave_${invite.inviter.id}`, -1)
      db.add(`invites_${member.guild.id}_real_${invite.inviter.id}`, 1)
      db.set(`inviter_${member.id}`, invite.inviter.id)
      db.set(`joinbyinviter_${member.id}`, `yes`)
      db.set(`faker_${member.id}`, `no`)
      console.log('3')
     }else{
      
      db.add(`invites_${member.guild.id}_real_${invite.inviter.id}`, 1)
      db.add(`invites_${member.guild.id}_all_${invite.inviter.id}`, 1)
      db.set(`inviter_${member.id}`, invite.inviter.id)
      db.set(`joinbyinviter_${member.id}`, `yes`)
      db.set(`faker_${member.id}`, `no`)
      console.log('4')
      }

  }
  }
  else if(type === 'vanity'){
   console.log('server')
  }

  else if(type === 'permissions'){
   console.log('problem')
  }

  else if(type === 'unknown'){
    console.log('error')
  }

});


client.on('guildMemberAdd',async member => {
 

    let createdAt = new Date(member.user.createdAt).getTime()
    const createdate = moment.utc(member.user.createdAt).format("DD/MM/YYYY")
    const createdate1 = moment.utc(member.user.createdAt).format("MM/DD/YYYY")
    const t = parseInt((new Date(`${createdate1}`).getTime() / 1000).toFixed(0)) 
    const xr = `<t:${t}:R>`
    const embed = new EmbedBuilder()
    .setColor('#40f58e')
    .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })

   .setDescription(`> \`Name:\` ${member.user.username}\n\n> \`Mention:\` <@${member.user.id}>\n\n> \`Δημιουργία λογαριασμού:\` ${xr}`)
   client.channels.cache.get("1235545512204304476").send({embeds: [embed]}) // Member Logs Channel Id
    member.roles.add('1235546157493649408') //Auto role id
})

client.on('guildMemberRemove', async member => {
    try{
    let createdAt = new Date(member.user.createdAt).getTime()
    const createdate = moment.utc(member.user.createdAt).format("DD/MM/YYYY")
    const createdate1 = moment.utc(member.user.createdAt).format("MM/DD/YYYY")
    const t = parseInt((new Date(`${createdate1}`).getTime() / 1000).toFixed(0)) 
    const xr = `<t:${t}:R>`

   const embed = new EmbedBuilder()
   .setColor('#ff0000')
   .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })

  .setDescription(`> \`Name:\` ${member.user.username}\n\n> \`Mention:\` <@${member.user.id}>\n\n> \`Δημιουργία λογαριασμού:\` ${xr}`)


  client.channels.cache.get("1235545512204304476").send({embeds: [embed]}) // Member Logs Channel Id

    }catch(e){
        console.log(e.message)
    }
 })

 client.on('voiceStateUpdate', (oldMember, newMember, newState) => {
    let newUserChannel = newMember.channel;
    let oldUserChannel = oldMember.channel;
    
    if (oldUserChannel === null) { 
      try {
      const embed = new EmbedBuilder()
     .setAuthor({name: newMember.guild.name, iconURL: newMember.guild.iconURL({ dynamic: true })})
      .setDescription(`> \`Χρήστης:\` ${newMember.member}\n\n> \`Μπήκε στο:\` ${newUserChannel} • \`${newUserChannel.name}\``)
      .setColor('#40f58e')
      newUserChannel.guild.channels.cache.get('1235545513466531911').send({embeds: [embed]}) // Voice logs channel id
      } catch(e) {
      
      }
    } else if (newUserChannel === null) { 
      try {
      let color = oldMember.member.displayHexColor;
        if (color == '#36393F') color = oldMember.member.hoistRole.hexColor
      
      const embed2 = new EmbedBuilder()
      .setAuthor({ name: oldMember.guild.name, iconURL: oldMember.guild.iconURL( { dynamic: true })})
      .setDescription(`> \`Χρήστης:\` ${oldMember.member}\n\n> \`Βγήκε από το:\` ${oldUserChannel} • \`${oldUserChannel.name}\``)
      .setColor('#ff0000')
      if(oldUserChannel.id === '1235545513466531911' || oldUserChannel.id === '1235545513466531911') return;
      oldUserChannel.guild.channels.cache.get('1235545513466531911').send({embeds: [embed2]}) // voice logs channel id
      } catch(e) {
        
      }
    } 
    });			


    client.on('messageDelete', async message => {
        try{
          if (!message.guild) return;
        
          const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MessageDelete,
          });
          
          const deletionLog = fetchedLogs.entries.first();
        
          
          if (!deletionLog) return 
        
          const { executor, target} = deletionLog;
        if(message.member.user.bot) return;
          if (target.id === message.author.id) {
            const embed = new EmbedBuilder()
           .setColor('#ff0000')
           .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dyanamic: true })})
           .setDescription(`> \`Μήνυμα:\` ${message}\n\n> \`Μήνυμα από:\` ${message.author}\n\n> \`Διαγράφτηκε από:\` ${executor}\n\n> \`Κανάλι:\` ${message.channel}`)
          if(message.member.roles.cache.has('1235543078371332149')) return; //Bot Role Id

           const discordlogs = message.guild.channels.cache.get('1235545516499144777'); // Chat Logs Id
        
           discordlogs.send({embeds: [embed]})  
          } else {
            const embed = new EmbedBuilder()
           .setColor('#ff0000')
           .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dyanamic: true })})
           .setDescription(`> \`Μήνυμα:\` ${message}\n\n> \`Μήνυμα από:\` ${message.author}\n\n> \`Διαγράφτηκε από:\` ${message.author}\n\n> \`Κανάλι:\` ${message.channel}`)
           if(message.member.roles.cache.has('1235543078371332149')) return; // Bot Role Id
          
           const discordlogs = message.guild.channels.cache.get('1235545516499144777'); // Chat Logs Id
        
           discordlogs.send({embeds: [embed]})  
          
          } 
      }catch(e){
          console.log(e.message)
      }
        });
        client.on('messageUpdate', (oldMessage, newMessage) => { 
            try{
          if(!newMessage.author) return;
          if(newMessage.author.bot) return;
         if(oldMessage.author.bot) return;
        const embed = new EmbedBuilder()
        .setAuthor({ name: oldMessage.guild.name, iconURL: oldMessage.guild.iconURL({ dynamic: true })})
        .setColor('#40f58e')
        .setDescription(`> \`Μήνυμα από:\` ${newMessage.author}\n\n> \`Κανάλι:\` ${newMessage.channel}\n\n> \`Παλιό μήνυμα:\` \`\`\`${oldMessage}\`\`\`\n\n> [\`Νέο μήνυμα:\`](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id}) \`\`\`${newMessage}\`\`\``)
        newMessage.guild.channels.cache.get('1235545516499144777').send({embeds: [embed]}) //Chat Logs Id
            }catch(e){
                console.log(e.message)
            }
        })
        client.on('guildMemberUpdate', async (oldMember, newMember) => {
            try{
                if (newMember.roles.cache.size > oldMember.roles.cache.size) {
                    let entry = await oldMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate}).then(audit => audit.entries.first());
                    let logUser = entry.executor.id;
                    let fad = oldMember.guild.members.cache.get(entry.executor.id) || newMember.guild.members.cache.get(entry.executor.id);
              
              
                    const roleRemovedEmbed = new EmbedBuilder()
                    .setColor('#40f58e')
                    .setAuthor({ name: oldMember.guild.name, iconURL: oldMember.guild.iconURL({ dynamic: true })})
                    
                        newMember.roles.cache.forEach(role => {
                        if (!oldMember.roles.cache.has(role.id)) {
                          roleRemovedEmbed.setDescription(`> \`Χρήστης:\` <@${oldMember.user.id}>\n\n> \`Πήρε τον ρόλο:\` ${role}\n\n> \`Από τον/την:\` <@${logUser}>`)
              
                        }
                    });
              
                    const discordlogs = newMember.guild.channels.cache.get('1235545520051585074'); //Role Channel Id
                    discordlogs.send({embeds: [roleRemovedEmbed]})
                  }
                if (oldMember.roles.cache.size > newMember.roles.cache.size) {
                    let entry = await newMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate}).then(audit => audit.entries.first());
                    let logUser = entry.executor.id;
                    let fad = oldMember.guild.members.cache.get(entry.executor.id) || newMember.guild.members.cache.get(entry.executor.id);
              
              
                    const roleRemovedEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setAuthor({name: newMember.guild.name, iconURL: newMember.guild.iconURL({ dynamic: true })})
                    
                    oldMember.roles.cache.forEach(role => {
                        if (!newMember.roles.cache.has(role.id)) {
              
                          roleRemovedEmbed.setDescription(`> \`Χρήστης:\` <@${newMember.user.id}>\n\n> \`Αφαιρέθηκε ο ρόλος:\` ${role}\n\n> \`Από τον/την:\` <@${logUser}>`)
              
                        }
                    });
              
                    const discordlogs = oldMember.guild.channels.cache.get('1235545520051585074'); //Role Channel Id
              
                    discordlogs.send({embeds: [roleRemovedEmbed]})
                }
            }catch(e){
                console.log(e.message)
            }
              });

              client.on('guildBanAdd', async (ban) => {
     
                const fetchedLogs = await ban.guild.fetchAuditLogs({
                  limit: 1,
                  type: AuditLogEvent.MemberBanAdd,
                });
              
              
              
                const createdate = moment.utc(ban.user.createdAt).format("DD/MM/YY")
                const banLog = fetchedLogs.entries.first();
              
              
                if (!banLog) return;
             
                const { executor, target, reason } = banLog;
                  if(executor.bot) return;
               
                if (target.id === ban.user.id) {
                  console.log(reason)
                const embed = new EmbedBuilder()
                .setAuthor({name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true})})
                 .setColor('#ff0000')
                 if(reason) {
                   embed.setDescription(`> \`Χρήστης:\` ${ban.user}\n\n> \`Από τον/την:\` ${executor}\n\n> \`Αιτία:\` ${reason}\n\n> \`Δημιουργία λογαριασμού:\` ${createdate}`)
                   console.log('RR1')
                 } else if(!reason) {
                   embed.setDescription(`> \`Χρήστης:\` ${ban.user}\n\n> \`Από τον/την:\` ${executor}\n\n> \`Δημιουργία λογαριασμού:\` ${createdate}`)
                   console.log('RR')
                 }
                 client.channels.cache.get("1235545522715103352").send({embeds: [embed] }) //Ban Logs CHannel Id
                } else {
                   
                }
              });
              
              client.on('guildBanRemove', async (ban) => {
               
                const fetchedLogs = await ban.guild.fetchAuditLogs({
                  limit: 1,
                  type: AuditLogEvent.MemberBanRemove,
                });
              
              
                const createdate = moment.utc(ban.user.createdAt).format("DD/MM/YY")
                const banLog = fetchedLogs.entries.first();
              
               
                if (!banLog) return;
              
                const { executor, target } = banLog;
              
             
                if (target.id === ban.user.id) {
                
                const embed = new EmbedBuilder()
                .setAuthor({name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true})})
                 .setColor('#40f58e')
                
                  .setDescription(`> \`Χρήστης:\` ${ban.user}\n\n> \`Από τον/την:\` ${executor}\n\n> \`Δημιουργία λογαριασμού:\` ${createdate}`)
                
                
                 client.channels.cache.get("1235545523617009715").send({embeds: [embed] }) //Ban Logs Channel Id
                } else {
                   
                }
              });
              
              client.on('messageCreate', message => {
                if(message.author.bot) return;
                  if (!message.guild) return;
                  if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) ||message.channel.name.includes('ticket')) return;
                  
                  if(message.channel.name.includes("ticket-")) return;
                  if(message.content.includes('https://') || message.content.includes('http://')) {
                    message.delete()
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                    .setColor('#252dc2')
                    .setDescription(`> \`Χρήστης:\` ${message.author}\n\n> \`Μήνυμα:\` ${message.content}`)
                    client.channels.cache.get("1235545525189611541").send({embeds: [embed]}) //Anti Link Logs Id
                    if(message.content.includes('discord.gg') || message.content.includes('dsc.gg')){
                      message.member.timeout(1 * 3600000, `Anti Link`)
                    }
                  }
                })


                const inviteLogsChannelId = '1240758850072871034';

                client.on('inviteCreate', async invite => {
                    try {
                        const channel = await invite.guild.channels.cache.get(inviteLogsChannelId);
                
                        if (!channel) {
                            console.error(`Channel with ID ${inviteLogsChannelId} not found`);
                            return;
                        }
                
                        const embed = new EmbedBuilder()
                            .setDescription(`**Action: ✉️ Invite Created\nMention: ${invite.inviter}**`)
                            .addFields(
                                { name: `🔗 Channel`, value: `||${invite.channel}||`, inline: true },
                                { name: `🆔 Invite Code`, value: `\`\`discord.gg/${invite.code}\`\``, inline: true }
                            )
                            .setFooter({ text: 'Invite Logs' })
                            .setColor('#252dc2');
                
                        await channel.send({ embeds: [embed] });
                    } catch (error) {
                        console.error('Error sending invite log:', error);
                    }
                });

                client.on('messageCreate', async message => {
                  if( message.content === '!apps' || message.content === '!APP' || message.content === '!app' || message.content === '!applications' || message.content === '!APPLICATIONS' || message.content === '!application' || message.content === '!APPLICATION'){
                    const embed = new EmbedBuilder()
                    .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                    .setColor('#252dc2')
                    .setDescription("**Παρακάτω θα βρείτε τις αιτήσεις, όπου μπορείτε να ενταχθείτε σε ένα άπο τα σώματα του Makaros ώστε να βοηθήσετε εκεί που επιθυμείτε!**")
                    const row = new ActionRowBuilder()
                    .addComponents(
                  new ButtonBuilder()
                   .setStyle(ButtonStyle.Link)
                   .setEmoji(`<:Makis:1232316052659241092>`)
                   .setLabel('Staff™')
                   .setDisabled(true)
                   .setURL('https://docs.google.com/forms/d/e/1FAIpQLSc4z4nyTF_qwOaCmrzTa9o5EzbHmLSvpMT5Zfh64ulkCP3gcw/viewform'),
                   
                   new ButtonBuilder()
                  .setStyle(ButtonStyle.Link)
                  .setEmoji(`<:elas:1230580999344230400>`)
                  .setLabel('ΕΛ.ΑΣ')
                  .setDisabled(true)
                  .setURL('https://docs.google.com/forms/d/e/1FAIpQLSeN59B6TECkw8NekT2hF1QddM4thcby9RJNFu3WMQ6v592hAw/viewform'),
                 
                  new ButtonBuilder()
                 .setStyle(ButtonStyle.Link)
                   .setEmoji(`<:ekav:1230581027139883178>`)
                   .setLabel('Ε.Κ.Α.Β')
                   .setDisabled(true)
                   .setURL('https://docs.google.com/forms/d/e/1FAIpQLSfK_jNBlRWAbJ2ImTOzBnEAYiV58DDH4MPwcmMJyzNly3n2jg/viewform?pli=1'),
            
                  );
               message.channel.send({ embeds: [embed], components: [row]})


                  }
                 })

              

                client.on('messageCreate', message => {
                  if(message.content === '!ticket-setup2'){
                      if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                          const embed = new EmbedBuilder()
                          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                          .setDescription("**Για να ανοίξετε κάποιο ticket πατήστε το κουμπί <:Makis:1232316052659241092> και θα σας εξυπηρετήσουμε άμεσα.**")
                          .setColor('#252dc2')
                          .setThumbnail(message.guild.iconURL({ dynamic: true }))
                          const row = new ActionRowBuilder()
                         .addComponents(
                       new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji(`<:Makis:1232316052659241092>`)
                        .setCustomId(`openticket`)
              
                    );
                 message.channel.send({embeds: [embed], components: [row]})
              
                      }
                  }
              })
            client.on('interactionCreate',async interaction => {
                if (!interaction.isButton()) return;
                if(interaction.customId === "openticket") {
                 const embed = new EmbedBuilder()
                 .setDescription("**Επιλέξτε το θέμα που παρουσιάζει το ticket σας.**")
                 .setColor('#252dc2')
                 .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                 .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                 const row = new ActionRowBuilder()
                 .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Επιλέξτε.')
                        .addOptions([{
                                label: 'Ακύρωση',
                                description: 'Για ακύρωση του ticket.',
                                  emoji: '🛑',
                                value: 'cancel',
                            },
                {
                                label: 'Support',
                                description: 'Βοήθεια.',
                  emoji: '📞',
                                value: 'support',
                            },
                            {
                                label: 'Donate',
                                description: 'Ερώτηση για δωρεά.',
                  emoji: '💵',
                                value: 'donate',
                            },
                            {
                              label: 'Bugs',
                              description: 'Αναφορά Bugs.',
                emoji: '🐛',
                              value: 'bugs',
                          },
                            {
                              label: 'Free Job',
                              description: 'Αίτηση για free job.',
                emoji: '💼',
                              value: 'job',
                          },
                            {
                                label: 'Ban Appeal',
                                description: 'Αίτηση για unban.',
                  emoji: '🛑',
                                value: 'bappeal',
                            },
                            {
                                label: 'Staff Report',
                                description: 'Κάντε αναφορά κάποιου staff.',
                  emoji: '📛',
                                value: 'sreport',
                            },
                            {
                                label: 'Other',
                                description: 'Άλλο.',
                  emoji: '❓',
                                value: 'other',
                            },
                        ]),
                        
            
                  
                );
                interaction.reply({embeds: [embed], components: [row], ephemeral: true})
                }  if(interaction.customId === "close") {
                
                    await interaction.deferUpdate();
                    let thema = ''
                    if(interaction.channel.name.startsWith("📞ticket-")) thema = '📞 Support'
                    if(interaction.channel.name.startsWith("💵ticket-")) thema = '💵 Donate'
                    if(interaction.channel.name.startsWith("🛑ticket-")) thema = '🛑 Ban Appeal'
                    if(interaction.channel.name.startsWith("📛ticket-")) thema = '📛 Staff Report'
                    if(interaction.channel.name.startsWith("❓ticket-")) thema = '❓ Other'
                    if(interaction.channel.name.startsWith("💼ticket-")) thema = '💼 Free Job'
                    if(interaction.channel.name.startsWith("🐛ticket-")) thema = '🐛Bugs'
                    interaction.channel.delete()
                    const closelogs = new EmbedBuilder()
                   .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **\`${interaction.channel.name}\` • \`${thema}\`**`)
                .setColor('#252dc2')
                    client.channels.cache.get("1235545529337905164").send({embeds: [closelogs]}) //Ticket Logs Id
                    db.set(`${interaction.member.user.id}`, { anoixto: 'no' })
                
                }
            })
            
            client.on('interactionCreate',async interaction => {
                if (!interaction.isSelectMenu()) return;
            
            
                  if(interaction.values[0] === 'cancel') {
                  await interaction.deferUpdate();
                  const embed3 = new EmbedBuilder()
                  
                 .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                  .setDescription(`<a:online:1232315927455076392>   **Το ticket ακυρώθηκε!**`)
                  .setColor('#252dc2')
                  interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                  }
                  if(interaction.values[0] === 'job') {
                    await interaction.deferUpdate();
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                    .setColor('#ff0000')
                    .setDescription(`<a:info:947426133434068994> **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                    if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                    const kanali = await interaction.guild.channels.create({
                        name: `💼ticket-${interaction.member.user.username}`,
                        type: ChannelType.GuildText,
                        parent: '1235545509570154579',
                        
                            permissionOverwrites: [
                               {
                               id: interaction.guild.roles.everyone, 
                               deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                               },
                               {
                                id: '1235546157493649408',
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                             },
                              {
                                id: interaction.member.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                             },
                            
                               
                            ],
                            }) 
                            db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                            const embed3 = new EmbedBuilder()
                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                           .setDescription(`<a:online:1232315927455076392>   **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                            .setColor('#ff0000')
                            interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                            const embed2 = new EmbedBuilder()
                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                            .setColor('#252dc2')
                            .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                            const row = new ActionRowBuilder()
                            .addComponents(
                          new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`🔒`)
                           .setCustomId(`close`) 
                           );
                          kanali.send({content: `<@&1235546157493649408>`,embeds: [embed2], components: [row]})
                          const embed4 = new EmbedBuilder()
                         .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#40f58e')
                          .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`💼 Job\`**`)
                        
                     client.channels.cache.get("1235545529337905164").send({embeds: [embed4]}) //Ticket Logs Id
                        }    if(interaction.values[0] === 'bugs') {
                
                          await interaction.deferUpdate();
                          const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                          .setColor('#ff0000')
                          .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                          if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                          const kanali = await interaction.guild.channels.create({
                              name: `🐛ticket-${interaction.member.user.username}`,
                              type: ChannelType.GuildText,
                              parent: '1235545509570154579',
                              
                                  permissionOverwrites: [
                                     {
                                     id: interaction.guild.roles.everyone, 
                                     deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                     },
                                     {
                                      id: '1235546157493649408',
                                      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                   },
                                   
                                    {
                                      id: interaction.member.user.id,
                                      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                   },
                                  
                                     
                                  ],
                                  }) 
                                  db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                  const embed3 = new EmbedBuilder()
                                 .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                  .setDescription(`<a:online:1232315927455076392>   **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                  .setColor('#252dc2')
                                  interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                  const embed2 = new EmbedBuilder()
                                 .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                  .setColor('#252dc2')
                                  .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                  const row = new ActionRowBuilder()
                                  .addComponents(
                                new ButtonBuilder()
                                 .setStyle(ButtonStyle.Secondary)
                                 .setEmoji(`🔒`)
                                 .setCustomId(`close`) 
                                 );
                                 kanali.send({content: `<@&1235546157493649408>`,embeds: [embed2], components: [row]})
                                 const embed4 = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                .setColor('#40f58e')
                                .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`🐛 Bugs\`**`)
                              
                           client.channels.cache.get("1235545529337905164").send({embeds: [embed4]}) //Ticket Logs Id
                              }
                  if(interaction.values[0] === 'support') {
                
                    await interaction.deferUpdate();
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                    .setColor('#ff0000')
                    .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                    if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                    const kanali = await interaction.guild.channels.create({
                        name: `📞ticket-${interaction.member.user.username}`,
                        type: ChannelType.GuildText,
                        parent: '1235545509570154579',
                        
                            permissionOverwrites: [
                               {
                               id: interaction.guild.roles.everyone, 
                               deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                               },
                               {
                                id: '1235546157493649408',
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                             },
                            
                             
                              {
                                id: interaction.member.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                             },
                            
                               
                            ],
                            }) 
                            db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                            const embed3 = new EmbedBuilder()
                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                            .setDescription(`<a:online:1232315927455076392>   **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                            .setColor('#ff0000')
                            interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                            const embed2 = new EmbedBuilder()
                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                            .setColor('#ff0000')
                            .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                            const row = new ActionRowBuilder()
                            .addComponents(
                          new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`🔒`)
                           .setCustomId(`close`) 
                           );
                           kanali.send({content: `<@&1235546157493649408>`,embeds: [embed2], components: [row]})
                           const embed4 = new EmbedBuilder()
                         .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#40f58e')
                          .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`📞 Support\`**`)
                        
                     client.channels.cache.get("1235545529337905164").send({embeds: [embed4]}) //tICKET Logs Id
                        } if(interaction.values[0] === 'donate') {
                
                            await interaction.deferUpdate();
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                            .setColor('#ff0000')
                            .setDescription(`<a:info:947426133434068994>   **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                            if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                            const kanali = await interaction.guild.channels.create({
                                 name: `💵ticket-${interaction.member.user.username}`, 
                                type: ChannelType.GuildText, 
                                parent: '1235545509570154579',
                                
                                    permissionOverwrites: [
                                     {
                                      id: interaction.guild.roles.everyone, 
                                     deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                       },
                                    {
                                       id: '1232316890521538560',
                                       allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                    },
                                    
                                  
                                      {
                                        id: interaction.member.user.id,
                                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                     },
                                    
                                       
                                    ],
                                    }) 
                                    db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                    const embed3 = new EmbedBuilder()
                                   .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                    .setDescription(`<a:online:1232315927455076392>   **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                    .setColor('#252dc2')
                                    interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                    const embed2 = new EmbedBuilder()
                                   .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                    .setColor('#252dc2')
                                    .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                    const row = new ActionRowBuilder()
                                    .addComponents(
                                  new ButtonBuilder()
                                   .setStyle(ButtonStyle.Secondary)
                                   .setEmoji(`🔒`)
                                   .setCustomId(`close`) 
                                   );
                                   kanali.send({content: `<@&1232316890521538560>`,embeds: [embed2], components: [row]})
                                   const embed4 = new EmbedBuilder()
                                 .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                  .setColor('#40f58e')
                                  .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`💵 Donate\`**`)
                                 
                             client.channels.cache.get("1235545529337905164").send({embeds: [embed4]}) //Tickets Logs Id
                                }if(interaction.values[0] === 'bappeal') {
                
                                    await interaction.deferUpdate();
                                    const embed = new EmbedBuilder()
                                    .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                                    .setColor('#252dc2')
                                    .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                                    if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                                    const kanali = await interaction.guild.channels.create({
                                        name: `🛑ticket-${interaction.member.user.username}`,
                                        type: ChannelType.GuildText, 
                                        parent: '1235545509570154579',
                                        
                                            permissionOverwrites: [
                                               {
                                               id: interaction.guild.roles.everyone, 
                                               deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                               },
                                               {
                                                id: '1235546157493649408',
                                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                             },
                                             {
                                              id: '1235546157493649408',
                                              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                           },

                                              {
                                                id: interaction.member.user.id,
                                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                             },
                                            
                                               
                                            ],
                                            }) 
                                            db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                            const embed3 = new EmbedBuilder()
                                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                            .setDescription(`<a:online:1232315927455076392>   **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                            .setColor('#252dc2')
                                            interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                            const embed2 = new EmbedBuilder()
                                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                            .setColor('#252dc2')
                                            .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                            const row = new ActionRowBuilder()
                                            .addComponents(
                                          new ButtonBuilder()
                                           .setStyle(ButtonStyle.Secondary)
                                           .setEmoji(`🔒`)
                                           .setCustomId(`close`) 
                                           );
                                           kanali.send({content: `<@&1235546157493649408>`,embeds: [embed2], components: [row]})
                                           const embed4 = new EmbedBuilder()
                                         .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                          .setColor('#40f58e')
                                          .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`🛑 Ban Appeal\`**`)
                                       
                                     client.channels.cache.get("1235545529337905164").send({embeds: [embed4]})//Tickets Logs Id
                                        }
                                        if(interaction.values[0] === 'sreport') {
                
                                            await interaction.deferUpdate();
                                            const embed = new EmbedBuilder()
                                            .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                                            .setColor('#ff0000')
                                            .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                                            if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                                            const kanali = await interaction.guild.channels.create({
                                                name: `📛ticket-${interaction.member.user.username}`,  
                                                type: ChannelType.GuildText, 
                                                parent: '1235545509570154579',
                                                
                                                    permissionOverwrites: [
                                                       {
                                                       id: interaction.guild.roles.everyone, 
                                                       deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                                       },
                                                       {
                                                        id: '1175124953805357097',
                                                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                     },
                                              
        
                                                      {
                                                        id: interaction.member.user.id,
                                                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                     },
                                                    
                                                       
                                                    ],
                                                    }) 
                                                    db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                                    const embed3 = new EmbedBuilder()
                                                   .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                                    .setDescription(`<a:online:1232315927455076392>   **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                                    .setColor('#252dc2')
                                                    interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                                    const embed2 = new EmbedBuilder()
                                                   .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                                    .setColor('#252dc2')
                                                    .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                                    const row = new ActionRowBuilder()
                                                    .addComponents(
                                                  new ButtonBuilder()
                                                   .setStyle(ButtonStyle.Secondary)
                                                   .setEmoji(`🔒`)
                                                   .setCustomId(`close`) 
                                                   );
                                                   kanali.send({content: `<@&1175124953805357097>`,embeds: [embed2], components: [row]})
                                                   const embed4 = new EmbedBuilder()
                                                 .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                                  .setColor('#40f58e')
                                                  .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`📛 Staff Report\`**`)
                                                 
                                             client.channels.cache.get("1235545529337905164").send({embeds: [embed4]})//Tickets Logs Id
                                                }  if(interaction.values[0] === 'other') {
                
                                                    await interaction.deferUpdate();
                                                    const embed = new EmbedBuilder()
                                                    .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                                                    .setColor('#ff0000')
                                                    .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                                                    if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                                                    const kanali = await interaction.guild.channels.create({
                                                        name: `❓ticket-${interaction.member.user.username}`,
                                                        type: ChannelType.GuildText, 
                                                        parent: '1235545509570154579',
                                                        
                                                            permissionOverwrites: [
                                                               {
                                                               id: interaction.guild.roles.everyone, 
                                                               deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                                               },
                                                               {
                                                                id: '1235546157493649408',
                                                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                             },
                                                             {
                                                              id: '1235546157493649408',
                                                              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                           },
                
                                                             
                                                              {
                                                                id: interaction.member.user.id,
                                                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                             },
                                                            
                                                               
                                                            ],
                                                            }) 
                                                            db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                                            const embed3 = new EmbedBuilder()
                                                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                                            .setDescription(`<a:online:1232315927455076392>   **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                                            .setColor('#252dc2')
                                                            interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                                            const embed2 = new EmbedBuilder()
                                                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                                            .setColor('#252dc2')
                                                            .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                                            const row = new ActionRowBuilder()
                                                            .addComponents(
                                                          new ButtonBuilder()
                                                           .setStyle(ButtonStyle.Secondary)
                                                           .setEmoji(`🔒`)
                                                           .setCustomId(`close`) 
                                                           );
                                                           kanali.send({content: `<@&1235546157493649408>`,embeds: [embed2], components: [row]})
                                                           const embed4 = new EmbedBuilder()
                                                         .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                                          .setColor('#40f58e')
                                                          .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`❓ Other\`**`)
                                                         
                                                     client.channels.cache.get("1235545529337905164").send({embeds: [embed4]})//Tickets Logs Id
                                                        } 
                })
                  client.on('messageCreate', message => {
                    if(message.content === '!onduty'){
                    if(message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)){
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                        .setColor('#252dc2')
                        .setDescription("> **Για να πας `On Duty` πάτα το κουμπί <a:online:1232315927455076392>   .**\n\n > **Για να πας `Off Duty` πάτα το κουμπί <a:DoNotDisturb:1232315941447270421>   .**\n\n > **Για να δεις πόσες `ώρες` έχεις πάτα το κουμπί <a:yellow:1232315966583603282> .**\n\n > **Για να δεις το `Leaderboard` των ωρών πάτα το κουμπί <a:purple:1232315982140407838>.**")
                        const row = new ActionRowBuilder()
                        .addComponents(
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:online:1232315927455076392>`)
                          .setCustomId('onduty'),
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:DoNotDisturb:1232315941447270421>`)
                          .setCustomId('offduty'),
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:yellow:1232315966583603282>`)
                          .setCustomId('hours'),
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:purple:1232315982140407838>`)
                          .setCustomId('lb')
                
                   );
                   message.channel.send({embeds: [embed], components: [row] })
                    }
                }
                })
                
                client.on('interactionCreate', async interaction => {
                  if (!interaction.isButton()) return;
                  if(interaction.customId === "onduty") {
                    const embed = new EmbedBuilder()
                      if(db.get(`energos_${interaction.guild.id}_${interaction.member.user.id}`) === `yes`){
                        const embed = new EmbedBuilder()
                         .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                         .setColor('#252dc2')
                        .setDescription("<a:red:1232315954231250944> **Είσαι ήδη On Duty.**")
                        interaction.reply({embeds: [embed], ephemeral: true})
                       } else{
                       const date = new Date().getTime();
                       console.log(date)
                      await db.set(`${interaction.guild.id}.${interaction.member.user.id}`, {di: date})
                      await db.set(`energos_${interaction.guild.id}_${interaction.member.user.id}`, `yes`)
                      const embed = new EmbedBuilder()
                       .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                       .setColor('#252dc2')
                      .setDescription("<a:online:1232315927455076392>    **Μπήκες με επιτυχία On Duty.**")
                      interaction.reply({ embeds: [embed], ephemeral: true })    
                    }
                 
                  
                  }   if(interaction.customId === "offduty") {
                    if(db.get(`energos_${interaction.guild.id}_${interaction.member.user.id}`) === `no` || !db.get(`energos_${interaction.guild.id}_${interaction.member.user.id}`)){
                      const embed = new EmbedBuilder()
                       .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                       .setColor('#252dc2')
                      .setDescription("<a:red:1232315954231250944> **Είσαι ήδη Off Duty.**")
                      interaction.reply({embeds: [embed], ephemeral: true})
                    }else{
            
                     const date2 = db.get(`${interaction.guild.id}.${interaction.member.user.id}.di`)
                     const date3 = new Date().getTime();
                     const date4 = date3 - date2
                     const deyterolepta = Math.floor( (date4/1000) % 60 );
                    const lepta = Math.floor( (date4/1000/60) % 60)
                    const wres = Math.floor( (date4/(1000*60*60)) %24 )
                    if(wres > 1 || wres === 1){
                      db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, wres)
                    }
                    if(lepta > 1 || lepta === 1){
                      db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, lepta)
      
                    }
                  
                    await db.set(`energos_${interaction.guild.id}_${interaction.member.user.id}`, `no`)
                    await db.set(`energostime_${interaction.guild.id}_${interaction.member.user.id}`, `<t:${parseInt((new Date().getTime() / 1000).toFixed(0))}:R>`)
                    const embed = new EmbedBuilder()
                     .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                     .setColor('#252dc2')
                    .setDescription("<a:online:1232315927455076392>    **Μπήκες με επιτυχία Off Duty.**")
                    interaction.reply({ embeds: [embed], ephemeral: true })
                   if(db.get(`akoma_${interaction.guild.id}_${interaction.member.user.id}`) === `idk`){
                    db.set(`akoma_${interaction.guild.id}_${interaction.member.user.id}`, `yes`)
      
                    const date = new Date()
                    const wra = date.getHours()
                    const lepta = date.getMinutes()
                    let leptaaa = ``
                    if(lepta === 0) leptaaa = `00`
                    if(lepta === 1) leptaaa = `01`
                    if(lepta === 2) leptaaa = `02`
                    if(lepta === 3) leptaaa = `03`
                    if(lepta === 4) leptaaa = `04`
                    if(lepta === 5) leptaaa = `05`
                    if(lepta === 6) leptaaa = `06`
                    if(lepta === 7) leptaaa = `07`
                    if(lepta === 8) leptaaa = `08`
                    if(lepta === 9) leptaaa = `09`
                    if(lepta === 10 || lepta > 10) leptaaa = `${lepta}`
                    db.set(`wakoma_${interaction.guild.id}_${interaction.member.user.id}`, `${wra}:${leptaaa}`)
                   }
                  }
                    }  if(interaction.customId === "hours") {
                   const wres2 = db.get(`wress_${interaction.guild.id}_${interaction.member.user.id}`)
                   const lepta2 = db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`)
                   let lepta = '';
                   let wres = '';
                   if(lepta2) lepta = lepta2
                   if(wres2) wres = wres2
                   if(!lepta2) lepta = '0'
                   if(!wres2) wres = '0'
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 60 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 120) { // 1 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, 60 - 120)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 1)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 120 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 180) { //2 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -120)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 2)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 180 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 240) { //3 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -180)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 3)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 240 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 300) { //4 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -240)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 4)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 300 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 360) { //5 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -300)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 5)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 360 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 420) { //6 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -360)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 6)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 420 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 480) { //7 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -420)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 7)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 480 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 540) { //8 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -480)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 8)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 540 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 600) { //9 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -540)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 9)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 600 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 660) { //10 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -600)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 10)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 660 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 720) { //11 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -660)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 11)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 720 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 780) { //12 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -720)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 12)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 780 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 840) { //13 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -780)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 13)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 840 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 900) { //14 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -840)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 14)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 900 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 960) { //15 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -900)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 15)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 960 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1020) { //16 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -960)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 16)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1020 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1080) { //17 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1020)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 17)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1080 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1140) { //18 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1080)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 18)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1140 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1200) { //19 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1140)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 19)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1200 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1260) { //20 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1200)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 20)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1260 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1320) { //21 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1260)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 21)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1320 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1380) { //22 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1320)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 22)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1380 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1440) { //23 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1380)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 23)
                  }
                  if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1440 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1500) { //24 hour
                    db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1440)
                    db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 24)
                  }
                     const embed = new EmbedBuilder()
                      .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                      .setColor('#ff0000')
                     .setDescription(`**Έχεις ${wres} ώρες και ${lepta} λεπτά.**`)
                     interaction.reply({ embeds: [embed], ephemeral: true})
                     }  if(interaction.customId === "lb") {
                  
                 
                        let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 60 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 120) { // 1 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, 60 - 120)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 1)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 120 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 180) { //2 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -120)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 2)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 180 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 240) { //3 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -180)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 3)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 240 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 300) { //4 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -240)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 4)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 300 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 360) { //5 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -300)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 5)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 360 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 420) { //6 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -360)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 6)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 420 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 480) { //7 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -420)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 7)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 480 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 540) { //8 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -480)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 8)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 540 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 600) { //9 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -540)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 9)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 600 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 660) { //10 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -600)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 10)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 660 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 720) { //11 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -660)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 11)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 720 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 780) { //12 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -720)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 12)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 780 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 840) { //13 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -780)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 13)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 840 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 900) { //14 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -840)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 14)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 900 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 960) { //15 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -900)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 15)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 960 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1020) { //16 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -960)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 16)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1020 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1080) { //17 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1020)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 17)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1080 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1140) { //18 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1080)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 18)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1140 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1200) { //19 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1140)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 19)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1200 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1260) { //20 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1200)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 20)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1260 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1320) { //21 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1260)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 21)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1320 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1380) { //22 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1320)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 22)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1380 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1440) { //23 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1380)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 23)
                        }
                        if(db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) > 1440 && db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) < 1500) { //24 hour
                          db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, -1440)
                          db.add(`wress_${interaction.guild.id}_${interaction.member.user.id}`, 24)
                        }
                        const embed92 = new EmbedBuilder()
                        .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true })})
                        .setColor('#ff0000')
                        .setDescription(`<a:red:1232315954231250944>  **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                        if(data.length === 0) return interaction.reply({ embeds: [embed92], ephemeral: true })
                        let selida = ''
                        if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                        if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                        if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                        if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                        if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                        if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                        if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                        if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                        if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                        if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                        if(data.length > 100) selida = `10a`
                        console.log(data.length)
                     
                        if(data.length > 10){
                          console.log(data)
                          console.log('test')
                          let content = "";
                          for(let i = 0; i < 10; i++){
                           let user = client.users.cache.get(data[i].ID.split('_')[2])
                           if(user){
                            let wres = data[i].data;
                            let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                            content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`
                           }
                        
                           // ${db.get(`lepta_${interaction.guild.id}_${user.id}`)}
                          }
                          const embed = new EmbedBuilder()
                            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                            .setColor('#252dc2')
                          .setDescription(content)
                          .setFooter({text: `Σελίδα 1/${selida}`})
                          const row = new ActionRowBuilder()
                          .addComponents(
                        new ButtonBuilder()
                         .setStyle(ButtonStyle.Secondary)
                         .setEmoji(`⬅`)
                         .setCustomId(`lb`)
                         .setDisabled(),
        
                         new ButtonBuilder()
                         .setStyle(ButtonStyle.Secondary)
                         .setEmoji(`➡`)
                         .setCustomId(`sto2`)
        
               
                     );
                          interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                        }else{
                          const embed92 = new EmbedBuilder()
                          .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true })})
                          .setColor('#ff0000')
                          .setDescription(`<a:red:1232315954231250944>  **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                          if(data.length === 0) return interaction.reply({ embeds: [embed92], ephemeral: true });
                          console.log('test')
                          console.log(data)
                       let content = "";
                       for(let i = 0; i < data.length; i++){
                        let user = client.users.cache.get(data[i].ID.split('_')[2])
                        if(user){
                          let wres = data[i].data;
                          let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                          content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                        }

                        
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 1/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                          new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`⬅`)
                           .setCustomId(`lb`)
                           .setDisabled(),
        
                           new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`➡`)
                           .setCustomId(`sto2`)
                           .setDisabled()
                 
                       );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                      }
                             
                      if(interaction.customId === "sto2") {
                      console.log('TEst')
                      let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10a`
                      
                      if(data.length > 20){
           
                        let content = "";
                        for(let i = 10; i < 20; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[2])
                         if(user){
                          let wres = data[i].data;
                          let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                          content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`
                         }
                      
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 2/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`⬅`)
                       .setCustomId(`lb`),
        
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`➡`)
                       .setCustomId(`sto3`)
        
             
                   );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                      }else{
                    
                   
                     let content = "";
                     for(let i = 10; i < data.length; i++){
                      let user = client.users.cache.get(data[i].ID.split('_')[2])
                      if(user){
                        let wres = data[i].data;
                        let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                        content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                      }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 2/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                    new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`⬅`)
                     .setCustomId(`lb`),
        
                     new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`➡`)
                     .setCustomId(`sto3`)
                     .setDisabled()
        
           
                 );
                      interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                    }
                    }  if(interaction.customId === "sto3") {
                      let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10a`
                      
                      if(data.length > 30){
           
                        let content = "";
                        for(let i = 20; i < 30; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[2])
                         if(user){
                          let wres = data[i].data;
                          let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                          content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`
                         }
                      
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 3/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`⬅`)
                       .setCustomId(`sto2`),
        
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`➡`)
                       .setCustomId(`sto4`)
        
             
                   );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                      }else{
                    
                   
                     let content = "";
                     for(let i = 20; i < data.length; i++){
                      let user = client.users.cache.get(data[i].ID.split('_')[2])
                      if(user){
                        let wres = data[i].data;
                        let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                        content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                      }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 3/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                    new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`⬅`)
                     .setCustomId(`sto2`),
        
                     new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`➡`)
                     .setCustomId(`sto4`)
                     .setDisabled()
        
           
                 );
                      interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                    }
                    } if(interaction.customId === "sto4") {
                      let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10a`
                      
                      if(data.length > 40){
           
                        let content = "";
                        for(let i = 30; i < 40; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[2])
                         if(user){
                          let wres = data[i].data;
                          let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                          content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`
                         }
                      
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 4/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`⬅`)
                       .setCustomId(`sto3`),
        
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`➡`)
                       .setCustomId(`sto5`)
        
             
                   );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                      }else{
                    
                   
                     let content = "";
                     for(let i = 30; i < data.length; i++){
                      let user = client.users.cache.get(data[i].ID.split('_')[2])
                      if(user){
                        let wres = data[i].data;
                        let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                        content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                      }
                      }
                    console.log(data)
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 4/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                    new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`⬅`)
                     .setCustomId(`sto3`),
        
                     new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`➡`)
                     .setCustomId(`sto5`)
                     .setDisabled()
        
           
                 );
                      interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                    }
                    }  if(interaction.customId === "sto5") {
                      let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10a`
                      
                      if(data.length > 50){
           
                        let content = "";
                        for(let i = 40; i < 50; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[2])
                         if(user){
                          let wres = data[i].data;
                          let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                          content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`
                         }
                      
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 5/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`⬅`)
                       .setCustomId(`sto4`),
        
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`➡`)
                       .setCustomId(`sto6`)
        
             
                   );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                      }else{
                    
                   
                     let content = "";
                     for(let i = 40; i < data.length; i++){
                      let user = client.users.cache.get(data[i].ID.split('_')[2])
                      if(user){
                        let wres = data[i].data;
                        let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                        content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                      }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 5/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                    new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`⬅`)
                     .setCustomId(`sto4`),
        
                     new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`➡`)
                     .setCustomId(`sto6`)
                     .setDisabled()
        
           
                 );
                      interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                    }
                    } if(interaction.customId === "sto6") {
                      let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10a`
                      
                      if(data.length > 60){
           
                        let content = "";
                        for(let i = 50; i < 60; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[2])
                         if(user){
                          let wres = data[i].data;
                          let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                          content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`
                         }
                      
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 6/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`⬅`)
                       .setCustomId(`sto5`),
        
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`➡`)
                       .setCustomId(`sto7`)
        
             
                   );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                      }else{
                    
                   
                     let content = "";
                     for(let i = 60; i < data.length; i++){
                      let user = client.users.cache.get(data[i].ID.split('_')[2])
                      if(user){
                        let wres = data[i].data;
                        let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                        content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                      }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 6/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                    new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`⬅`)
                     .setCustomId(`sto5`),
        
                     new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`➡`)
                     .setCustomId(`sto7`)
                     .setDisabled()
        
           
                 );
                      interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                    }
                    } if(interaction.customId === "sto7") {
                      let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10a`
                      
                      if(data.length > 70){
           
                        let content = "";
                        for(let i = 60; i < 70; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[2])
                         if(user){
                          let wres = data[i].data;
                          let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                          content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`
                         }
                      
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 7/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`⬅`)
                       .setCustomId(`sto6`),
        
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`➡`)
                       .setCustomId(`sto8`)
        
             
                   );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                      }else{
                    
                   
                     let content = "";
                     for(let i = 70; i < data.length; i++){
                      let user = client.users.cache.get(data[i].ID.split('_')[2])
                      if(user){
                        let wres = data[i].data;
                        let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                        content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                      }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 7/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                    new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`⬅`)
                     .setCustomId(`sto6`),
        
                     new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`➡`)
                     .setCustomId(`sto8`)
                     .setDisabled()
        
           
                 );
                      interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                    }
                    } if(interaction.customId === "sto8") {
                      let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10a`
                      
                      if(data.length > 80){
           
                        let content = "";
                        for(let i = 70; i < 80; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[2])
                         if(user){
                          let wres = data[i].data;
                          let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                          content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`
                         }
                      
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 8/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`⬅`)
                       .setCustomId(`sto7`),
        
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`➡`)
                       .setCustomId(`sto9`)
        
             
                   );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                      }else{
                    
                   
                     let content = "";
                     for(let i = 80; i < data.length; i++){
                      let user = client.users.cache.get(data[i].ID.split('_')[2])
                      if(user){
                        let wres = data[i].data;
                        let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                        content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                      }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 8/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                    new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`⬅`)
                     .setCustomId(`sto7`),
        
                     new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`➡`)
                     .setCustomId(`sto9`)
                     .setDisabled()
        
           
                 );
                      interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                    }
                    } if(interaction.customId === "sto9") {
                      let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10a`
                      
                      if(data.length > 90){
           
                        let content = "";
                        for(let i = 80; i < 90; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[2])
                         if(user){
                            let wres = data[i].data;
                            let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                            content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`
                           }
                        
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 9/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`⬅`)
                       .setCustomId(`sto8`),
        
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`➡`)
                       .setCustomId(`sto10`)
        
             
                   );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                      }else{
                    
                   
                     let content = "";
                     for(let i = 90; i < data.length; i++){
                      let user = client.users.cache.get(data[i].ID.split('_')[2])
                      if(user){
                        let wres = data[i].data;
                        let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                        content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                      }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 9/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                    new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`⬅`)
                     .setCustomId(`sto9`),
        
                     new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`➡`)
                     .setCustomId(`sto10`)
                     .setDisabled()
        
           
                 );
                      interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                    }
                    }  if(interaction.customId === "sto10") {
                      let data = db.all().filter(data => data.ID.startsWith(`wress_${interaction.guild.id}`)).sort((a, b) => b.data - a.data)
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10a`
                      
                      if(data.length > 100){
           
                        let content = "";
                        for(let i = 90; i < 100; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[2])
                         if(user){
                          let wres = data[i].data;
                          let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                          content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                        }
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 10/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`⬅`)
                       .setCustomId(`sto9`),
        
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`➡`)
                       .setCustomId(`sto10`)
                       .setDisabled()
        
             
                   );
                        interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
        
                      }else{
                    
                   
                     let content = "";
                     for(let i = 100; i < data.length; i++){
                      let user = client.users.cache.get(data[i].ID.split('_')[2])
                      if(user){
                        let wres = data[i].data;
                        let time = db.get(`energostime_${interaction.guild.id}_${data[i].ID.split('_')[2]}`)

                        content += `**\`${i+1}\`. ${user} ➡${wres} Ώρες | ${db.get(`lepta_${interaction.guild.id}_${user.id}`)} Λεπτά** | **Τελευταία στιγμή ενεργός:** ${time}\n`

                      }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 10/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                    new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`⬅`)
                     .setCustomId(`sto9`),
        
                     new ButtonBuilder()
                     .setStyle(ButtonStyle.Secondary)
                     .setEmoji(`➡`)
                     .setCustomId(`sto10`)
                     .setDisabled()
        
           
                 );
                      interaction.reply({embeds: [embed], ephemeral: true, components: [row]})
                    }
                     
                      }else{

                      }
                      
                      
                   
                    
               
                
                    
                     
                    }
                  
                })

                client.on('messageCreate', message => {
                  if(message.channel.id === '1235545543086837812'){ //Suggestion Channel Id
                      message.react('<:1_:1232321447423119428>') //Id apo to +1 emoji
                      message.react('<:1_:1232321460140507227>') //Id apo to -1 emoji
                  }
              })
              
              client.on('voiceStateUpdate',async (oldMember, newMember, newState) => {
                let newUserChannel = newMember.channel;
                let oldUserChannel = oldMember.channel;
                
                if (newUserChannel && newUserChannel.id === '1235545544282083399') {  //Support Channel Id
                  try {
                    const kanali = await oldMember.guild.channels.create({
                      name: `📞Support`,
                      type: ChannelType.GuildVoice,
                      parent: '1235545509570154579', //Kathgoria Poy tha kanei to new support channel
                      
                          permissionOverwrites: [
                             {
                             id: oldMember.guild.roles.everyone, 
                             deny: [PermissionsBitField.Flags.ViewChannel] 
                             },
                             {
                              id: '1235546157493649408',
                              allow: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                              id: oldMember.member.user.id,
                              allow: [PermissionsBitField.Flags.ViewChannel]
                           },
                          
                             
                          ],
                          }) 
                          oldMember.member.voice.setChannel(kanali)

                          const embed = new EmbedBuilder()
                          .setColor('#40f58e')
                          .setAuthor({name: oldMember.guild.name, iconURL: oldMember.guild.iconURL({ dyanamic: true })})
                          .setDescription(`> \`Χρήστης:\` ${oldMember.member}\n\n> \`Support:\` ${kanali}`)
                          client.channels.cache.get('1235545534454956052').send({embeds: [embed], content: '<@&1235546157493649408>'}) //Nottifications Channel Id
                  } catch(e) {
                  console.log(e)
                  }
                } else if (oldUserChannel && oldUserChannel.name === `📞Support` && oldUserChannel.members.size === 0) { 
                  try{
              
                   oldUserChannel.delete()
                  }catch(e){
                    console.log(e)
                  }
                }  if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel.name === `📞Support` && newUserChannel.id === '1235545544282083399' && oldUserChannel.members.size === 0) { //sSupport Channel Id
          
                  try{
                  
                 oldUserChannel.delete()
                   }catch(e){
                     console.log(e)
                   }
                }
                });			
                
          
              
                client.on('voiceStateUpdate',async (oldMember, newMember, newState) => {
                  let newUserChannel = newMember.channel;
                  let oldUserChannel = oldMember.channel;
                  
                  if (newUserChannel && newUserChannel.id === '1228311132230520873') { //Donate Channel Id
                    try {
                      const kanali = await oldMember.guild.channels.create({
                        name: `💸Donate`,
                        type: ChannelType.GuildVoice,
                        parent: '1228310356343128075', //Category poy tha kanei to donat channel
                        
                            permissionOverwrites: [
                               {
                               id: oldMember.guild.roles.everyone, 
                               deny: [PermissionsBitField.Flags.ViewChannel] 
                               },
                               {
                                id: '1228312598425112616',
                                allow: [PermissionsBitField.Flags.ViewChannel]
                             },
                             

                              {
                                id: oldMember.member.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel]
                             },
                            
                               
                            ],
                            }) 
                            oldMember.member.voice.setChannel(kanali)
                            const embed = new EmbedBuilder()
                            .setColor('#40f58e')
                            .setAuthor({name: oldMember.guild.name, iconURL: oldMember.guild.iconURL({ dyanamic: true })})
                            .setDescription(`> \`Χρήστης:\` ${oldMember.member}\n\n> \`Donate:\` ${kanali}`)
                            client.channels.cache.get('1229852393399648348').send({embeds: [embed], content: '<@&1228312598425112616>'}) //Notifications Channel Id
                    } catch(e) {
                    console.log(e)
                    }
                  } else if (oldUserChannel && oldUserChannel.name === `💸Donate` && oldUserChannel.members.size === 0 ) { 
                    try{
                     oldUserChannel.delete()
                    }catch(e){
                      console.log(e)
                    }
                  } if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel.name === `💸Donate` && newUserChannel.id === '1228311132230520873' && oldUserChannel.members.size === 0) { //Donate ChANNEL iD
          
                    try{
                    
                   oldUserChannel.delete()
                     }catch(e){
                       console.log(e)
                     }
                  }
                  });		
                  


                 


                  client.on('messageCreate', message => {
                    if(message.content === "!lock" || message.content === "!LOCK"){
                        if(message.member.permissions.has(PermissionsBitField.Flags.Administrator) || message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)){
                            message.delete()
                            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                            .setDescription("**Το κανάλι κλειδώθηκε από την ομάδα διαχείρησης.**")
                            .setColor('#ff0000') 
                            message.channel.send({embeds: [embed]})
                        }
                    }
                })
                client.on('messageCreate', message => {
                    if(message.content === "!unlock" || message.content === "!UNLOCK"){
                        if(message.member.permissions.has(PermissionsBitField.Flags.Administrator) || message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)){
                            message.delete()
                            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                            .setDescription("**Το κανάλι ξεκλειδώθηκε από την ομάδα διαχείρησης.**")
                            .setColor('#40f58e')
                            message.channel.send({embeds: [embed]})
                        }
                    }
                })
                client.on('messageCreate', message => {
  
                  const args = message.content.slice(prefix.length).trim().split(' ');
                    const command = args.shift().toLowerCase();
                    if (command === 'say') {
                      if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                      if (!message.content.startsWith(prefix) || message.author.bot) return;
                      
                      const user = message.author;
                      
                     
                
                      const say = args.join(" ");
                      if(!say) return;
                      const embed = new EmbedBuilder()
                      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                      .setColor('#252dc2')
                      .setDescription(say)
                      message.channel.send({embeds: [embed]})
                      message.delete()
                      }
                    }
                   
                 })
            
                 client.on('messageCreate', message => {
    
                  const args = message.content.slice(prefix.length).trim().split(' ');
                    const command = args.shift().toLowerCase();
                    if (command === 'say3') {
                      if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                      if (!message.content.startsWith(prefix) || message.author.bot) return;
                      
                      const user = message.author;
                      
                     
                
                      const say = args.join(" ");
                      if(!say) return;
                      const embed = new EmbedBuilder()
                      
                      .setColor('#252dc2')
                      .setDescription(say)
                      message.channel.send({embeds: [embed]})
                      message.delete()
                      }
                    }
                   
                 })
                 client.on('messageCreate', message => {
  
                  const args = message.content.slice(prefix.length).trim().split(' ');
                    const command = args.shift().toLowerCase();
                    if (command === 'say2') {
                      if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                      if (!message.content.startsWith(prefix) || message.author.bot) return;
                      
                      const user = message.author;
                      
                     
                
                      const say = args.join(" ");
                      if(!say) return;
                   
                      message.channel.send({content: say})
                      message.delete()
                      }
                    }
                   
                 })
                 client.on('messageCreate',async message => {
                  if(message.content === '!invites' || message.content === '!INVITES' || message.content === '!Invites'){
                  
                      let all = await db.get(`invites_${message.guild.id}_all_${message.member.user.id}`)
                      let real = await db.get(`invites_${message.guild.id}_real_${message.member.user.id}`)
                      let leave = await db.get(`invites_${message.guild.id}_leave_${message.member.user.id}`)
                      let fake = await db.get(`invites_${message.guild.id}_fake_${message.member.user.id}`)
                      if(!all) all = `0`
                      if(!real) real = `0`
                      if(!leave) leave = `0`
                      if(!fake) fake = `0`
                      const embed = new EmbedBuilder()
                      .setAuthor({name: message.member.user.username, iconURL: message.member.user.avatarURL({dynamic: true })})
                      .setColor('#252dc2')
                      .setDescription(`Έχεις **${real}** Invites. (**${all}** συνολικά, **${leave}** έχουν αποχωρήσει, **${fake}** ψεύτικα)`)
                      message.channel.send({embeds: [embed]})
                    
                  }
              })
              
              client.on('messageCreate',async message => {
                  if(message.content === '!lb' || message.content === '!LB' || message.content === '!Lb' || message.content === '!leaderboard' || message.content === '!LEADERBOARD' || message.content === '!Leaderboard'){
                 


                    let data = db.all().filter(data => data.ID.startsWith(`invites_${message.guild.id}_real`)).sort((a, b) => b.data - a.data)
                      const embed92 = new EmbedBuilder()
                      .setAuthor({ name: message.member.user.username, iconURL: message.member.user.avatarURL({ dynamic: true })})
                      .setColor('#252dc2')
                      .setDescription(`<a:red:1232315954231250944>   **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                      if(data.length === 0) return message.channel.send({ embeds: [embed92]})
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10`
                      console.log(data.length)
                   
                      if(data.length > 10){
                        console.log(data)
                        console.log('test')
                        let content = "";
                        for(let i = 0; i < 10; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[3])
                         if(user){
               
                       
                        
                         let wres = data[i].data;
                         let synolikamm = '0'
                       let alhthinamm = '0'
                       let apoxorisei = '0'
                       let pseftikamm = '0'
                      if(db.get(`invites_${message.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${message.guild.id}_all_${user.id}`)
                      if(db.get(`invites_${message.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${message.guild.id}_real_${user.id}`)
                       if(db.get(`invites_${message.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${message.guild.id}_leave_${user.id}`)
                       if(db.get(`invites_${message.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${message.guild.id}_fake_${user.id}`)
                        
                        
                    
                         content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                       }
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 1/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                       .setCustomId(`igoto1`)
                       .setDisabled(),
              
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`<a:RightArrow:1069363674579468328>`)
                       .setCustomId(`igoto2`)
              
              
                   );
                   message.channel.send({embeds: [embed], components: [row]})
              
                      }else{
                        const embed92 = new EmbedBuilder()
                        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.avatarURL({ dynamic: true })})
                        .setColor('#252dc2')
                        .setDescription(`<a:red:1232315954231250944>   **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                        if(data.length === 0) return message.channel.send({ embeds: [embed92], ephemeral: true });
                        console.log('test')
                        console.log(data)
                     let content = "";
                     for(let i = 0; i < data.length; i++){
                       let user = client.users.cache.get(data[i].ID.split('_')[3])
                       if(user){
              
                     
                      
                       let wres = data[i].data;
                       let synolikamm = '0'
                     let alhthinamm = '0'
                     let apoxorisei = '0'
                     let pseftikamm = '0'
                    if(db.get(`invites_${message.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${message.guild.id}_all_${user.id}`)
                    if(db.get(`invites_${message.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${message.guild.id}_real_${user.id}`)
                     if(db.get(`invites_${message.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${message.guild.id}_leave_${user.id}`)
                     if(db.get(`invites_${message.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${message.guild.id}_fake_${user.id}`)
                      
                      
                  
                       content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                     }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 1/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                        new ButtonBuilder()
                         .setStyle(ButtonStyle.Secondary)
                         .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                         .setCustomId(`igoto1`)
                         .setDisabled(),
              
                         new ButtonBuilder()
                         .setStyle(ButtonStyle.Secondary)
                         .setEmoji(`<a:RightArrow:1069363674579468328>`)
                         .setCustomId(`igoto2`)
                         .setDisabled()
               
                     );
                     message.channel.send({embeds: [embed], components: [row]})
                    }
                   
                  }
                
              })
              
              
              client.on('interactionCreate',async interaction => {
                  if (!interaction.isButton()) return;
              
                      if(interaction.customId === "igoto1") {
                          await interaction.deferUpdate();
                          let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                          const embed92 = new EmbedBuilder()
                          .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true })})
                          .setColor('#252dc2')
                          .setDescription(`<a:red:1232315954231250944>   **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                          if(data.length === 0) return interaction.reply({ embeds: [embed92], ephemeral: true })
                          let selida = ''
                          if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                          if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                          if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                          if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                          if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                          if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                          if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                          if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                          if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                          if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                          if(data.length > 100) selida = `10`
                          console.log(data.length)
                       
                          if(data.length > 10){
                            console.log(data)
                            console.log('test')
                            let content = "";
                            for(let i = 0; i < 10; i++){
                             let user = client.users.cache.get(data[i].ID.split('_')[3])
                             if(user){
                    
                           
                            
                             let wres = data[i].data;
                             let synolikamm = '0'
                           let alhthinamm = '0'
                           let apoxorisei = '0'
                           let pseftikamm = '0'
                          if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                            
                            
                        
                             content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                           }
                            }
                            const embed = new EmbedBuilder()
                              .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                              .setColor('#252dc2')
                            .setDescription(content)
                            .setFooter({text: `Σελίδα 1/${selida}`})
                            const row = new ActionRowBuilder()
                            .addComponents(
                          new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                           .setCustomId(`igoto1`)
                           .setDisabled(),
                    
                           new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`<a:RightArrow:1069363674579468328>`)
                           .setCustomId(`igoto2`)
                    
                    
                       );
                       interaction.message.edit({embeds: [embed], components: [row]})
                    
                          }else{
                            const embed92 = new EmbedBuilder()
                            .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true })})
                            .setColor('#252dc2')
                            .setDescription(`<a:red:1232315954231250944>   **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                            if(data.length === 0) return interaction.reply({ embeds: [embed92], ephemeral: true });
                            console.log('test')
                            console.log(data)
                         let content = "";
                         for(let i = 0; i < data.length; i++){
                           let user = client.users.cache.get(data[i].ID.split('_')[3])
                           if(user){
                    
                         
                          
                           let wres = data[i].data;
                           let synolikamm = '0'
                         let alhthinamm = '0'
                         let apoxorisei = '0'
                         let pseftikamm = '0'
                        if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                        if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                          
                          
                      
                           content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                         }
                          }
                          const embed = new EmbedBuilder()
                            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                            .setColor('#252dc2')
                          .setDescription(content)
                          .setFooter({text: `Σελίδα 1/${selida}`})
                          const row = new ActionRowBuilder()
                          .addComponents(
                            new ButtonBuilder()
                             .setStyle(ButtonStyle.Secondary)
                             .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                             .setCustomId(`igoto1`)
                             .setDisabled(),
                    
                             new ButtonBuilder()
                             .setStyle(ButtonStyle.Secondary)
                             .setEmoji(`<a:RightArrow:1069363674579468328>`)
                             .setCustomId(`igoto2`)
                             .setDisabled()
                    
                         );
                         interaction.message.edit({embeds: [embed], components: [row]})
                        }
                       
                         }   if(interaction.customId === "igoto2") {
                          console.log('BLACK')
                           await interaction.deferUpdate();
                          let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 20){
                    
                             let content = "";
                             for(let i = 10; i < 20; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 2/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto1`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto3`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 10; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                            if(user){
                    
                          
                           
                            let wres = data[i].data;
                            let synolikamm = '0'
                          let alhthinamm = '0'
                          let apoxorisei = '0'
                          let pseftikamm = '0'
                         if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                           
                           
                       
                            content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                          }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 2/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto1`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto3`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         }  if(interaction.customId === "igoto3") {
                          await interaction.deferUpdate();
                          let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 30){
                    
                             let content = "";
                             for(let i = 20; i < 30; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 3/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto2`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto4`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 20; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 3/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto2`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto4`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto4") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 40){
                    
                             let content = "";
                             for(let i = 30; i < 40; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 4/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto3`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto5`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 30; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                            if(user){
                    
                          
                           
                            let wres = data[i].data;
                            let synolikamm = '0'
                          let alhthinamm = '0'
                          let apoxorisei = '0'
                          let pseftikamm = '0'
                         if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                           
                           
                       
                            content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                          }
                           }
                         console.log(data)
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 4/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto3`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto5`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         }  if(interaction.customId === "igoto5") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 50){
                    
                             let content = "";
                             for(let i = 40; i < 50; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 5/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto4`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto6`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 40; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                            if(user){
                    
                          
                           
                            let wres = data[i].data;
                            let synolikamm = '0'
                          let alhthinamm = '0'
                          let apoxorisei = '0'
                          let pseftikamm = '0'
                         if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                           
                           
                       
                            content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                          }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 5/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto4`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto6`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto6") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 60){
                    
                             let content = "";
                             for(let i = 50; i < 60; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 6/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto5`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto7`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 60; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 6/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto5`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto7`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto7") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 70){
                    
                             let content = "";
                             for(let i = 60; i < 70; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 7/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto6`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto8`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 70; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 7/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto6`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto8`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto8") {
                          interaction.update()
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 80){
                    
                             let content = "";
                             for(let i = 70; i < 80; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 8/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto7`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto9`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                           
                        
                          let content = "";
                          for(let i = 80; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 8/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto7`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto9`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto9") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 90){
                    
                             let content = "";
                             for(let i = 80; i < 90; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 9/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto8`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto10`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 90; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 9/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto9`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto10`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         }  if(interaction.customId === "igoto10") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 100){
                    
                             let content = "";
                             for(let i = 90; i < 100; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 10/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto9`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto10`)
                            .setDisabled()
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 100; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 10/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto9`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto10`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         }
                  
              })
              client.on('messageCreate',async message => {
                if(message.content ==='!status'){
          
                
             
       
                  try{
                  const { data } = await axios.get(`http://${ip}/dynamic.json`);
                  const regex = /\[([0-9]+)\]/;
                  const queue = data.hostname.match(regex);
                  if(queue){
                    const embed = new EmbedBuilder()
                    .setTitle('<a:online:1232315927455076392>   Online')
                    .addFields(
                      { name: 'Players', value: `**${data.clients}/${data.sv_maxclients}**`, inline: true  },
                      { name: 'Queue', value: `**${queue[1]}**`, inline: true }
                    )
                    .setThumbnail(message.guild.iconURL({dynamic: true }))
                    .setColor('#40f58e')
                   message.channel.send({embeds: [embed]})
                  }else{
                    const embed = new EmbedBuilder()
                    .setTitle('<a:online:1232315927455076392>   Online')
                    .addFields(
                      { name: 'Players', value: `**${data.clients}/${data.sv_maxclients}**`, inline: true  },
                      { name: 'Queue', value: `**0**`, inline: true }
                    )
                    .setThumbnail(message.guild.iconURL({dynamic: true }))
                    .setColor('#40f58e')
                   message.channel.send({embeds: [embed]})
                  }
              
                  }catch(e){
                    const embed = new EmbedBuilder()
                    .setTitle('<a:DoNotDisturb:1232315941447270421>    Offline')
                    .addFields(
                      { name: 'Players', value: `**Offline**`, inline: true  },
                      { name: 'Queue', value: `**Offline**`, inline: true }
                    )
                    .setThumbnail(message.guild.iconURL({dynamic: true }))
                    .setColor('#ff0000')
                   message.channel.send({embeds: [embed]})
                  }
                }
                
              })

              client.on('messageCreate',async message => {
                if(message.content === '!ip'){
               
                const embed = new EmbedBuilder()
                .setColor('#13e3ee')
                .setDescription(`\`\`\`Connect ${ip} \`\`\``)
                message.channel.send({embeds: [embed]})
                  

                }
              })
              client.on('messageCreate',async message => {
                if(message.content === '!clear_activity'){
                   if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                  let wres = db.all().map(entry => entry.ID).filter(id => id.startsWith(`lepta_${message.guild.id}`))
                  await wres.forEach(await db.delete)
                  let wres2 = db.all().map(entry => entry.ID).filter(id => id.startsWith(`wress_${message.guild.id}`))
                  await wres2.forEach(await db.delete)
               }
                }
              })

              client.on('messageCreate',async message => {
                if(message.content === '!developer'){
               
                const embed = new EmbedBuilder()
                .setColor('#13e3ee')
                .setDescription(`\`\`\`By Makaros Dev👻\`\`\``)
                message.channel.send({embeds: [embed]})
                  

                }
              })






const membersChannelId = '1235545515374936104'; // Members Voice Channel
const boostsChannelId = '1235545518906802176' // Boosts voice channel
const serverId = '1218189863216742444' // Server ID

client.on("ready", () => {

    try {
      if (membersChannelId) {
        const total = client.channels.cache.get(membersChannelId)
        if (total) {
          setInterval(() => {
            total.setName(`🕺Members: ${client.guilds.cache.get(serverId).memberCount}`).catch(() => { });
          }, 60000)
        }
      }
      if (boostsChannelId) {
        const total = client.channels.cache.get(boostsChannelId)
        if (total) {
          setInterval(() => { 
            total.setName(`🚀Boosts: ${client.guilds.cache.get(serverId).premiumSubscriptionCount}`).catch(() => { });
          }, 60000)
        }
      }
      
    } catch (error) {
      return;
    }
})




client.on('messageCreate', async (message) => {
	if (message.author.bot) return
  if (message.content === '!gang-setup') {
    if (
        !message.member.permissions.has([PermissionsBitField.Flags.Administrator])
    )
        return message.reply('You dont have permissions to execute this command')
   
    const embed = new EmbedBuilder()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
        .setDescription(
            ` Για να πάρετε το role <@&1235547812494704660>,θα πρέπει να βάλετε στο about me σας ένα **Invite link** του Server μας, μόλις το βάλετε πατήστε το παρακάτω \`κουμπί\`. `
        )
        .setColor('#13e3ee')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`gang`)
            .setEmoji(`💼`)
            .setStyle(ButtonStyle.Secondary)
    )
    message.channel.send({ embeds: [embed], components: [row] })
}
})
client.on('interactionCreate', async (interaction) => {
if (interaction.isButton()) {
		if (interaction.customId === 'gang') {
			await interaction.reply({
				content: 'You sumbit your request',
				ephemeral: true,
			})
			await interaction.guild.channels.cache.get('1235547777321271306')?.send({
				embeds: [
					new EmbedBuilder()
						.setColor('#13e3ee')
						.setAuthor({
							name: interaction.user.username,
							iconURL: interaction.user.displayAvatarURL(),
						})
						.setDescription(`${interaction.user.username} requested gang role`),
				],
				components: [
					new ActionRowBuilder().addComponents(
						new ButtonBuilder()
							.setCustomId(`acceptg-${interaction.user.id}`)
							.setEmoji(`✅`)
							.setStyle(ButtonStyle.Secondary)
					),
				],
			})
		}
		if (interaction.customId.includes('acceptg')) {
			await interaction.update({
				content: `Accepted by ${interaction.user}`,
				components: [],
			})
			await interaction.guild.members.cache
				.get(interaction.customId.split('-')[1])
				?.roles.add('1235547812494704660')
		}
}
})


const vouchChannelId = "1235548566873706587";
const vouchChannelLogsId = "1235548583999307796";


client.on("messageCreate", async (message) => {
  try {
    if (message.channelId === vouchChannelId) {
      const channel = await message.guild.channels.fetch(vouchChannelLogsId);

      const msg = message.content;
      if (!msg) return;

      message.delete();

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
        })
        .setDescription(`**Vouch Request from ${message.author}**`)
        .setColor("#40f58e")
        .addFields({ name: "Vouch", value: `${msg}` });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("acceptVouch")
          .setEmoji("✅")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("declineVouch")
          .setEmoji("❌")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
      );

      await channel.send({
        embeds: [embed],
        components: [row],
        content: `${message.author}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;

    if (interaction.customId === "acceptVouch") {
      const channel = await interaction.guild.channels.fetch(vouchChannelId);
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("acceptVouch")
          .setEmoji("✅")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("declineVouch")
          .setEmoji("❌")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
      );

      const vouchUser = interaction.message.mentions.users.first();
      const embeds = interaction.message.embeds;
      const msg = embeds[0].fields[0].value;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${vouchUser.username}`,
          iconURL: `${vouchUser.displayAvatarURL()}`,
        })
        .setDescription(`\`\`\`${msg}\`\`\``)
        .setColor("#40f58e")
        .setTimestamp();

      await interaction.update({
        components: [row],
        content: `**${vouchUser} | ${interaction.user} accepted the vouch**`,
      });
      await channel.send({ embeds: [embed] });
    } else if (interaction.customId === "declineVouch") {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("acceptVouch")
          .setEmoji("✅")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("declineVouch")
          .setEmoji("❌")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
      );

      const vouchUser = interaction.message.mentions.users.first();

      await interaction.update({
        components: [row],
        content: `**${vouchUser} | ${interaction.user} declined the vouch**`,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

/// football


client.on('messageCreate', async message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if(message.content === '!football') {
      try {
          const left = new ButtonBuilder().setCustomId('leftFootball').setLabel('Αριστερά').setStyle(ButtonStyle.Secondary)
      const right = new ButtonBuilder().setCustomId('rightFootball').setLabel('Δεξιά').setStyle(ButtonStyle.Secondary)
      const center = new ButtonBuilder().setCustomId('centerFootball').setLabel('Κεντρικά').setStyle(ButtonStyle.Primary)

      const row = new ActionRowBuilder().addComponents(left, center, right)

      const msg = await message.channel.send({
          components: [row],
          content: `             🥅🥅🥅\n                 🕴\n\n                 ⚽`,
      });

      const collector = await message.channel.createMessageComponentCollector({ time: 20000 });

          collector.on('collect', async i => {
              const randomOutcome = Math.floor(Math.random() * 2); // 0 or 1
          
              if (i.customId === 'leftFootball') {
                  if (i.user.id !== message.author.id) return await i.reply({ content: `**Δεν μπορείς να κάνεις interact με αυτά τα buttons**`, ephemeral: true})
                  if (randomOutcome === 0) {
                  left.setDisabled(true)
                  right.setDisabled(true)
                  center.setDisabled(true)
                  await msg.edit({ content: `             🥅🥅🥅\n⚽          🕴`, components: [row]})
                  await i.reply({ content: '**Κέρδισες!**' });
                  collector.stop()
                  } else {
                      left.setDisabled(true)
                      right.setDisabled(true)
                      center.setDisabled(true)
                      await msg.edit({ content: `             🥅🥅🥅\n🕴\n⚽\n`, components: [row]})
                      await i.reply({ content: '**Έχασες. Ξανά προσπάθησε**' });
                      collector.stop()
                  }
              } else if (i.customId === 'rightFootball') {
                  if (i.user.id !== message.author.id) return await i.reply({ content: `**Δεν μπορείς να κάνεις interact με αυτά τα buttons**`, ephemeral: true})
                  if (randomOutcome === 0) {
                  left.setDisabled(true)
                  right.setDisabled(true)
                  center.setDisabled(true)
                      await msg.edit({ content: `🥅🥅🥅\n        🕴     ⚽`, components: [row]})
                      await i.reply({ content: '**Κέρδισες!**' });
                      collector.stop()
                  } else {
                      left.setDisabled(true)
                      right.setDisabled(true)
                      center.setDisabled(true)
                      await msg.edit({ content: `             🥅🥅🥅\n                              🕴\n                              ⚽`, components: [row]})
                      await i.reply({ content: '**Έχασες. Ξανά προσπάθησε**' });
                      collector.stop()
                  }
              } else if (i.customId === 'centerFootball') {
                  if (i.user.id !== message.author.id) return await i.reply({ content: `**Δεν μπορείς να κάνεις interact με αυτά τα buttons**`, ephemeral: true})
                  if (randomOutcome === 0) {
                  left.setDisabled(true)
                  right.setDisabled(true)
                  center.setDisabled(true)
                      await msg.edit({ content: `🥅🥅🥅\n                 ⚽\n             🕴`, components: [row]})
                      await i.reply({ content: '**Κέρδισες!**' });
                      collector.stop()
                  } else {
                      left.setDisabled(true)
                      right.setDisabled(true)
                      center.setDisabled(true)
                      await msg.edit({ content: `             🥅🥅🥅\n                 🕴\n                 ⚽`, components: [row]})
                      await i.reply({ content: '**Έχασες. Ξανά προσπάθησε**' });
                      collector.stop()
                  }
              } 
          });
          collector.on('end', () => {
              const left = new ButtonBuilder().setCustomId('leftFootball').setLabel('Αριστερά').setStyle(ButtonStyle.Secondary).setDisabled(true)
              const right = new ButtonBuilder().setCustomId('rightFootball').setLabel('Δεξιά').setStyle(ButtonStyle.Secondary).setDisabled(true)
              const center = new ButtonBuilder().setCustomId('centerFootball').setLabel('Κεντρικά').setStyle(ButtonStyle.Primary).setDisabled(true)

              const row = new ActionRowBuilder().addComponents(left, center, right)

              msg.edit({ components: [row], });
          })
      } catch (error) {
          return;
      }
      
  }
})


/// GunGame
  client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'gungame') {
      try {
        const user = message.mentions.users.first() || (args[0] ? message.guild.members.cache.get(args[0])?.user : null);
        if (!user) return message.reply({ content: '**You need to mention a user to challenge!**', ephemeral: true });
         if (!user || !message.mentions.users.size) return message.reply({ content: '**You need to mention a user to challenge!**', ephemeral: true });
        if (user === message.author) return message.reply({ content: '**You cannot play with yourself!**', ephemeral: true });
        if (user.bot) return message.reply({ content: '**You cannot play with bots!**', ephemeral: true });

            const startEmbed = new EmbedBuilder()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
            .setColor("#40f58e")
                .setDescription(`**${user}, you have been challenged to a 1v1 gun game by ${message.author}**`);

            const acceptButton = new ButtonBuilder()
                .setCustomId('acceptGungame')
                .setLabel('Accept')
                .setStyle('3');

            const declineButton = new ButtonBuilder()
                .setCustomId('declineGungame')
                .setLabel('Decline')
                .setStyle('4');

            const row = new ActionRowBuilder()
                .addComponents(acceptButton, declineButton);

            await message.channel.send({ embeds: [startEmbed], content: `🔫 ${message.author} VS ${user}`, components: [row] });

            const collector = message.channel.createMessageComponentCollector({ filter: i => i.user.id === user.id });

            collector.on('collect', async i => {
                if (i.customId === 'declineGungame') {
                    startEmbed.setDescription(`**${user} declined the challenge**`);
                    acceptButton.setDisabled();
                    declineButton.setDisabled();
                    await i.update({ embeds: [startEmbed], components: [row] });
                } else if (i.customId === 'acceptGungame') {
                    const gameEmbed = new EmbedBuilder()
                    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
                    .setDescription('**🙍‍♂️👉 GO! 👈🙍‍♂️**')
                        .setColor("#40f58e");

                    const blueBtn = new ButtonBuilder()
                        .setCustomId('bleteam')
                        .setLabel('SHOOT')
                        .setStyle(ButtonStyle.Primary);

                    const whiteBtn = new ButtonBuilder()
                        .setCustomId('white')
                        .setLabel('=')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true);

                    const redBtn = new ButtonBuilder()
                        .setCustomId('kokteam')
                        .setLabel('SHOOT')
                        .setStyle(ButtonStyle.Danger);

                    const row2 = new ActionRowBuilder()
                        .addComponents(blueBtn, whiteBtn, redBtn);

                    await i.update({ embeds: [gameEmbed], components: [row2] });

                    const collector2 = i.channel.createMessageComponentCollector();
                    const collector3 = i.channel.createMessageComponentCollector();

                    collector2.on('collect', async interaction => {
                        if (interaction.customId === 'bleteam' || interaction.customId === 'kokteam') {
                            const winner = interaction.customId === 'bleteam' ? message.author : user;
                            gameEmbed.setDescription(`**💀 END! Winner: ${winner}**`);
                            blueBtn.setDisabled();
                            redBtn.setDisabled();
                            await interaction.update({ embeds: [gameEmbed], components: [row2] });
                        }
                    })
                    
                    collector3.on('collect', async interaction => {
                      if (interaction.customId === 'kokteam' || interaction.customId === 'bleteam') {
                          const winner = interaction.customId === 'kokteam' ? message.author : user;
                          gameEmbed.setDescription(`**💀 END! Winner: ${winner}**`);
                          redBtn.setDisabled();
                          blueBtn.setDisabled();
                          await interaction.update({ embeds: [gameEmbed], components: [row2] });
                      }
                  });

                    collector3.on('end', () => {
                        blueBtn.setDisabled();
                        redBtn.setDisabled();
                        row2.components.forEach(component => component.setDisabled(true));
                        i.update({ embeds: [gameEmbed], components: [row2] });
                    });
                }
            });



            
            collector.on('end', () => {
                acceptButton.setDisabled();
                declineButton.setDisabled();
                row.components.forEach(component => component.setDisabled(true));
                message.channel.send('The challenge has ended.');
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
})
///END

/// RPS
client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'rps') {
      try {
          const choices = [
              {name: 'Πέτρα', emoji: '🪨', beats: 'Ψαλίδι'},
              {name: 'Χαρτί', emoji: '📄', beats: 'Πέτρα'},
              {name: 'Ψαλίδι', emoji: '✂️', beats: 'Χαρτί'}
          ]
      
      
           const user = message.mentions.users.first();
            if (!user) return;
            if (user === message.author) return message.reply({content: `**Δεν μπορείς να παίξεις με τον εαυτό σου!**`, ephemeral: true})
            if (user.bot) return message.reply({content: `**Δεν μπορείς να παίξεις με bots!**`, ephemeral: true})
      
          const embed = new EmbedBuilder()
          .setColor("#40f58e")
          .setDescription(`**Είναι η σειρά του ${user}**`)
      
          const buttons = choices.map((choice) => {
              return new ButtonBuilder()
              .setCustomId(choice.name)
              .setEmoji(choice.emoji)
              .setStyle(ButtonStyle.Secondary)
          })
      
          const row = new ActionRowBuilder().addComponents(buttons);
      
          const reply = await message.reply({content: `**${user}, προκλήθηκες σε 1v1 πέτρα ψαλίδι, χαρτί απο τον/ην ${message.author}**`, embeds: [embed], components: [row]})
      
          const targetint = await reply.awaitMessageComponent({
              filter: (i) => i.user.id === user.id,
              time: 120000,
          }).catch(async (error) => {
              buttons.forEach((button) => {
                  button.setDisabled(true);
              });
              embed.setDescription(`**Τέλος παιχνιδιού. Ο/Η ${user} δεν απάντησε στην ώρα που έπρεπε**`)
              await reply.edit({embeds: [embed], content: "", components: [row]})
          })
      
          if (!targetint) return;
      
          const userChoice = choices.find(
              (choice) => choice.name === targetint.customId,
          )
      
          await targetint.reply({
              content: `Επέλεξες **${userChoice.name}**`,
              ephemeral: true,
          })
      
          embed.setDescription(`**Τώρα είναι η σειρά του ${message.author}**`)
          await reply.edit({
              embeds: [embed],
              content: "**STARTED**"
          });
      
          const initialUserInt = await reply.awaitMessageComponent({
              filter: (i) => i.user.id === message.author.id,
              time: 120000
          }).catch(async (error) => {
              buttons.forEach((button) => {
                  button.setDisabled(true);
              });
              embed.setDescription(`**Τέλος παιχνιδιού. Ο/Η ${message.author} δεν απάντησε στην ώρα που έπρεπε**`)
              await reply.edit({embeds: [embed], content: "", components: [row]})
          })
      
          if (!initialUserInt) return;
      
          const intialUserChoice = choices.find(
              (choice) => choice.name === initialUserInt.customId
          );
      
          await initialUserInt.reply({
              content: `Επέλεξες **${intialUserChoice.name}**`,
              ephemeral: true,
          })
      
          let result;
          if (userChoice.beats === intialUserChoice.name) {
              result = `**Νικητής: ${user}**`
          }
      
          if (intialUserChoice.beats === userChoice.name) {
              result = `**Νικητής: ${message.author}**`
          }
      
          if (userChoice.name === intialUserChoice.name) {
              result = '**Ισοπαλία!**'
          }
      
          embed.setDescription(
              `Ο/Η ${user} επέλεξε **${userChoice.name}**\nΟ/Η ${message.author} επέλεξε **${intialUserChoice.name}**`
          )
          buttons.forEach((button) => {
              button.setDisabled(true);
          });
          reply.edit({embeds: [embed], content: `${result}`, components: [row]})
      
      } catch (error) {
          return;
      }
  }
});
/// END

/// Review 
const name = 'Makaros';
const logo = 'https://media.discordapp.net/attachments/1219990888487321661/1220249009700995082/logoPng.png?ex=663a6ab3&is=66391933&hm=34dbcb6fbf3209b51497d14a3f3c568ce6f8d866ace8f6902ffe2ddd2d44c26a&=&format=webp&quality=lossless&width=583&height=583';
const reviewChannel = '1236333254357811240';

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'review') {
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
      .setThumbnail(logo)
      .setColor("#40f58e")
      .setDescription(`**Μέτα απο μια αγορά αφήστε μας το review σας πατώντας το button**`);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('reviewMakaros')
          .setLabel('💯')
          .setStyle(ButtonStyle.Secondary)
      );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'reviewMakaros') {
      const embed = new EmbedBuilder()
          .setTitle(`Review System | ${interaction.guild.name}`)
          .setColor("#40f58e");

          const modal = new ActionRowBuilder()
          .addComponents(
            new TextInputBuilder()
            .setCustomId('stars')
              .setLabel(`Αξιολογίστε βάση αστεριών (1-5)`)
              .setType(3) 
              .setRequired(true),
            new TextInputBuilder()
            .setCustomId('text')
              .setLabel(`Προσθέστε πώς σου φάνηκε το service`)
              .setType(3) 
              .setRequired(true)
          );
    
        await interaction.reply({ content: 'Please provide your review:', components: [modal], ephemeral: true });
      }
    });
    
client.on('interactionCreate', async i => {
  if (i.customId === 'reviewModalMakaros') {
    const channel = await i.guild.channels.cache.get(reviewChannel);
    const stars = i.message.components[0].components[0].value;
    const text = i.message.components[0].components[1].value;

    if (isNaN(stars)) return await i.reply({ content: `**Βάλε μόνο αριθμούς.**`, ephemeral: true});
    if (stars > 5 || stars < 1) return await i.reply({ content: `**Βάλε έναν αριθμό απο το 1 εώς το 5!**`, ephemeral: true});

    const starIcons = '⭐'.repeat(stars);

    const embed = new EmbedBuilder()
      .setAuthor(i.user.username, i.user.displayAvatarURL())
      .setDescription(`**${starIcons} | <t:${Math.round((new Date()).getTime() / 1000)}>**\n\n\`\`\`${text}\`\`\``)
      .setColor("#40f58e");

    await channel.send({ embeds: [embed] });
    await i.reply({ content: `**Success**`, ephemeral: true });
  }
})
/// END


///language

const greekRoleId = '1237525237139111987';
const gbRoleId = '1237525230319042631'

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
    if (command === 'language') {
        const embed = new EmbedBuilder()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
      .setColor("#40f58e")
      .setDescription('**:flag_gr: Διάλεξε την γλώσσα που μιλάς πατώντας το ένα κουμπί\n\n:flag_gb: Choose the language you speak by pressing one button**')
      .setThumbnail(logo);

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('grMakaros').setStyle(ButtonStyle.Secondary).setEmoji('🇬🇷'),
      new ButtonBuilder().setCustomId('gbMakaros').setStyle(ButtonStyle.Secondary).setEmoji('🇬🇧'),
    );

    await message.channel.send({ embeds: [embed], components: [buttons] });
    }
})

client.on('interactionCreate', async interaction => {
    try {

    const grID = greekRoleId;
    const gr = await interaction.guild.roles.cache.get(grID);

    const gbID = gbRoleId;
    const gb = await interaction.guild.roles.cache.get(gbID);

    if (interaction.customId === 'grMakaros') {
        if (!interaction.member.roles.cache.has(grID)) {

        interaction.member.roles.add(gr)
        await interaction.reply({content: `**Πείρες την γλώσσα επιτυχώς**`, ephemeral: true})

      } else {
        await interaction.reply({content: `**Έχεις ήδη πάρει την γλώσσα αυτήν**`, ephemeral: true})

      }} if (interaction.customId === 'gbMakaros') {
        if (!interaction.member.roles.cache.has(gbID)) {

        interaction.member.roles.add(gb)
        await interaction.reply({content: `**You got the language successfully**`, ephemeral: true})
      } else {
        await interaction.reply({content: `**You have already this language**`, ephemeral: true})
      }

    }
    } catch (error) {
      return;
    }
})

///END

/// ROLE ALL


client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'roleall') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return;

    message.react('✅')

  const role = message.mentions.roles.first();
    const members = await message.guild.members.fetch();

    if (!role) return;

    let num = 0;
    setTimeout(() => {
        members.forEach(async m => {
            m.roles.add(role).catch(err => {
                return;
            });
            num++
        })
    }, 100)
  }
})

///END

///Partner

const partnerRequestLogsId = '1238140760075796491'
const partnerChannelId = '1238140665464881323'

client.on('messageCreate', async message => {
        try {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
       const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (command === 'partner') {
        if (!message.member.permissions.has('ADMINISTRATOR')) return await message.reply(`No permissions`);

        const embed = new EmbedBuilder()
        .setThumbnail(logo)
        .setColor("#40f58e")
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
        .setDescription(`**To partner up with us please press the button**`)

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setEmoji('🤝').setCustomId('parterSysButc').setStyle(ButtonStyle.Secondary)
        )

        await message.channel.send({ embeds: [embed], components: [button] });
    }
    } catch (error) {
        return;
    }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isSelectMenu()) return;
    try {
        if (interaction.customId === 'parterSysButc') {
            const modal = new Modal()
            .setCustomId('partnerSytsMM')
            .setTitle('Partner System')
    
            const server_link = new TextInputComponent()
            .setStyle('SHORT')
            .setLabel('Server Link')
            .setRequired(true)
            .setCustomId('server_link')
    
            const server_row = new ActionRowBuilder().addComponents(server_link)
            modal.addComponents(server_row)
            await interaction.showModal(modal)
        }
    } catch (error) {
        return;
    }
})

client.on('interactionCreate', async i => {
    try {
        if (i.customId === 'partnerSytsMM') {
            const serverLink = i.fields.getTextInputValue('server_link')
    if (!serverLink.startsWith('https://') && !serverLink.startsWith('discord.gg') && !serverLink.startsWith('http://')) {
        return i.reply({ content: `Invalid invite link`, ephemeral: true });
    }
        i.reply({ content: `**✅**`, ephemeral: true })
    
            const usere = new EmbedBuilder()
            .setColor("#40f58e")
            .setDescription('# Thanks for the partnership interest\nYou will be updated soon for the status of the partnership')
    
            i.user.send({ embeds: [usere] })
            const channel = await i.guild.channels.cache.get(partnerRequestLogsId) 
    
            const embed = new EmbedBuilder()
            .setColor("#40f58e")
            .addFields(
                { name: 'User', value: `${i.user}` },
                { name: 'Server', value: `${serverLink}` }
              )
            .setAuthor(`${i.user.username}`, `${i.user.displayAvatarURL()}`)
            .setThumbnail(logo)
            .setTimestamp()
    
            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('acceptPartner').setEmoji('✅').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('declinePartner').setEmoji('❌').setStyle(ButtonStyle.Secondary),
            )
    
            await channel.send({ content: `${i.user}`, embeds: [embed], components: [buttons] })
        }
    } catch (error) {
        return;   
    }
})

client.on('interactionCreate', async p => {
    try {
        if (p.customId === 'declinePartner') {
            const partnerUser = p.message.mentions.users.first()
            await partnerUser.send({ content: `Your partnership request has been declined`})
    
            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('acceptPartner').setEmoji('✅').setStyle(ButtonStyle.Secondary).setDisabled(true),
                new ButtonBuilder().setCustomId('declinePartner').setEmoji('❌').setStyle(ButtonStyle.Secondary).setDisabled(true),
            )
    
            await p.update({ components: [buttons] })
        } 
        if (p.customId === 'acceptPartner') {
            const partnerUser = p.message.mentions.users.first()
            await partnerUser.send({ content: `Your partnership request has been accepted`})
            
            const partnerS = p.guild.channels.cache.get(partnerChannelId)
            const server = p.message.embeds[0].fields[1].value;
    
    
            await partnerS.send({ content: `${server} @everyone`})
    
            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('acceptPartner').setEmoji('✅').setStyle(ButtonStyle.Secondary).setDisabled(true),
                new ButtonBuilder().setCustomId('declinePartner').setEmoji('❌').setStyle(ButtonStyle.Secondary).setDisabled(true),
            )
    
            await p.update({ components: [buttons] })
        }
    } catch (error) {
        return;
    }
})


///OWNER MENU


const managerRoleId = '1232316885572522005'
const announceMentChannelId = '1239629546098131014'

client.on('messageCreate', async message => {
  try {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
 const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'owner') {
        if (!message.member.permissions.has('ADMINISTRATOR')) return await message.reply({ content: `No Permissions` });
        const embed = new EmbedBuilder()
        .setColor("#40f58e")
        .setTitle(`Owner Menu | Makaros`)
        .setThumbnail(`${message.author.displayAvatarURL()}`)
        .setDescription('**Select the option that suits you best.\nOptions Available:\n\n> Manager List\n> Announcement\n> Server INFO\n> Ban List**')
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
        
        const select = new SelectMenuBuilder()
        .setCustomId('ownerMenuMakaros')
        .setPlaceholder('Nothing Selected')
        .addOptions([
            {
                label: 'Manager List',
                value: 'managersS',
                emoji: '🧳'
            },
            {
                label: 'Announce',
                value: 'announceS',
                emoji: '📢'
            },
            {
                label: 'Server Info',
                value: 'serverS',
                emoji: '📜'
            },
            {
                label: 'Ban List',
                value: 'banlistS',
                emoji: '🛑'
            }
        ])

        const row = new ActionRowBuilder().addComponents(select)
 
        await message.channel.send({ embeds: [embed], components: [row] })
    }
    } catch (error) {
        return;
    }
})

client.on('interactionCreate', async interaction => {
    try {
        const optionMakaros = interaction.values && interaction.values.length > 0 ? interaction.values[0] : null;
    if (optionMakaros === 'managersS') {
        await interaction.update({})
        const guild = interaction.guild;
        if (!guild) {
        console.error('Guild not found!');
        return;
        }

    const role = guild.roles.cache.get(managerRoleId);
    if (!role) {
      console.error('Role not found!');
      return;
    }

    const membersWithRole = role.members;

    if (membersWithRole.size > 0) {
      let count = 1;
      const memberList = membersWithRole.map((member) => `${count++}. ${member}`).join('\n');

      const embed = new EmbedBuilder()
      .setColor("#40f58e")
      .setTitle(`Managers List | ${guild.name}`)
      .setDescription(`${memberList}`)

        await interaction.followUp({ embeds: [embed], ephemeral: true });
      
    } else {
      interaction.followUp({ content: `No members have this role`, ephemeral: true});
    }
    }
    if (optionMakaros === 'announceS') {
        const announceModal = new Modal()
        .setTitle('Announce')
        .setCustomId('announceModal')

        const text = new TextInputComponent()
        .setCustomId('textAnnouncep')
        .setLabel('Message?')
        .setStyle('SHORT')
        .setRequired(true)

        const text_row = new ActionRowBuilder().addComponents(text)
        
        announceModal.addComponents(text_row)
        interaction.showModal(announceModal) 
    }
    if (optionMakaros === 'serverS') {
        await interaction.update({})
        const embed = new EmbedBuilder()
        .setColor("#40f58e")
        .setDescription(`Server Name: **${interaction.guild.name}**\nId: **${interaction.guild.id}**`)

        await interaction.followUp({ embeds: [embed], ephemeral: true });
    }
    if (optionMakaros === 'banlistS') {
        await interaction.update({})
        const guild = interaction.guild;
            
            if (!guild.available) {
                return interaction.followUp({content: `Guild information not available.`, ephemeral: true});
            }

            const bans = await guild.bans.fetch()
            if (bans.size === 0) {
                return await interaction.followUp({ content: `No bans`, ephemeral: true });
            }

            let counter = 1;
            const bannedMembers = bans.map(ban => `${counter++}. **${ban.user.tag}** (${ban.user.id})`).join('\n');

            const embed = new EmbedBuilder()
            .setColor("#40f58e")
            .setDescription(`${bannedMembers}`)
            .setTitle(`Ban List | ${guild.name}`)

            interaction.followUp({ embeds: [embed], ephemeral: true });
    }
    } catch (error) {
        return;
    }
})

client.on('interactionCreate', async Makaros => {
    try {
        if (Makaros.customId === 'announceModal') {
            Makaros.reply({ content: `Success`, ephemeral: true });
            const announceC = Makaros.guild.channels.cache.get(announceMentChannelId);
            const msg = Makaros.fields.getTextInputValue('textAnnouncep')
    
            await announceC.send({ content: `${msg}`})
        }
    } catch (error) {
        return;
    }
})
///END


///Giveaway 



client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
 const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
    if (command === 'giveaway') {
        try {
            if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: "**Missing permissions**" });

        let duration = args[0];
        let winnerCount = args[1];

        if (!duration)
          return message.channel.send('**Βάλε σωστό duration** `d (ημέρες), h (ώρες), m (λεπτά), s (δευτερόλεπτα)`');
        if (
          !args[0].endsWith("d") &&
          !args[0].endsWith("h") &&
          !args[0].endsWith("m") &&
          !args[0].endsWith("s")
        )
          return message.channel.send('**Command Usage: \`!giveaway duration winnercount channel prize (!giveaway 4d 1 #test test)\`**');

        if (!winnerCount) return message.channel.send('**Command Usage: \`!giveaway duration winnercount channel prize (!giveaway 4d 1 #test test)\`**');
        if (isNaN(args[1])) return message.channel.send('**Βάλε winners**');

        if (args[1] <= 0) return message.channel.send('**Οι winners πρέπει να είναι πιο πάνω απο ένας**');

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) return message.channel.send("**Βάλε ένα κανάλι για να αρχίσει το giveaway**");

        let prize = args.slice(3).join(" ");
        if (!prize) return message.channel.send('**Βάλε prize**');


        let endTime = Date.now() + ms(duration);
        const formattedEndTime = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let startGiveawayEmbed = new EmbedBuilder()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
            .setThumbnail(logo)
            .setDescription("```" + `${prize}` + "```\n" + " > ***Κάντε react στο 🎉 για να συμμετάσχετε στο giveaway!***\n\n" + `**Participants: \`0\`**\n` + `**Το giveaway λήγει σε:** \`${formattedEndTime}\`\n` + `**Hosted από τον/την:** <@${message.author.id}>\n` + `**Ποσό νικητών:**\`${winnerCount}\``)
            .setColor("#40f58e")
            .setTimestamp(endTime);

        let btn = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('giveawayBtn').setLabel('Join').setEmoji('🎉').setStyle(ButtonStyle.Primary)
        );

        let msg = await giveawayChannel.send({ content: '@everyone', embeds: [startGiveawayEmbed], components: [btn] });
            
        let participants = [];

        let data = await gSchema.create({
            GuildId: message.guild.id,
            MessageId: msg.id,
            Running: 'yes',
            Participants: participants,
            Prize: prize,
            ChannelId: giveawayChannel.id,
            EndTime: endTime,
            WinnerCount: winnerCount
        });

        await data.save();
        } catch (error) {
            return console.log(error);
        }
    }
});

client.on('interactionCreate', async i => {
    try {
        if (i.customId === 'giveawayBtn') {
            let data = await gSchema.findOne({ GuildId: i.guild.id, MessageId: i.message.id });
            if (!data) return i.reply({ content: `**Το giveaway αυτό δεν τρέχει**`, ephemeral: true });
            
            let participants = data.Participants || [];
            const userId = i.user.id;

            if (participants.includes(userId)) {
                participants = participants.filter(id => id !== userId);
                await gSchema.findOneAndUpdate({ GuildId: i.guild.id, MessageId: i.message.id }, { Participants: participants });
            
                const guild = await client.guilds.cache.get(data.GuildId);
                const channel = await guild.channels.cache.get(data.ChannelId);
                const message = await channel.messages.fetch(data.MessageId);
            
                let endTime = data.EndTime
                const formattedEndTime = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const embed = message.embeds[0];
                embed.setDescription("```" + `${data.Prize}` + "```\n" + " > ***Κάντε react στο 🎉 για να συμμετάσχετε στο giveaway!***\n\n" + `**Participants: \`${participants.length}\`**\n` + `**Το giveaway λήγει σε:** \`${formattedEndTime}\`\n` + `**Hosted από τον/την:** <@${message.author.id}>\n` + `**Ποσό νικητών:**\`${data.WinnerCount}\``)

                await message.edit({ embeds: [embed] });
                await i.reply({ content: `**Βγήκες απο το giveaway**`, ephemeral: true });
            } else {
                participants.push(userId);
                await gSchema.findOneAndUpdate({ GuildId: i.guild.id, MessageId: i.message.id }, { Participants: participants });
            
                const guild = await client.guilds.cache.get(data.GuildId);
                const channel = await guild.channels.cache.get(data.ChannelId);
                const message = await channel.messages.fetch(data.MessageId);
            
                let endTime = data.EndTime
                const formattedEndTime = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const embed = message.embeds[0];
                embed.setDescription("```" + `${data.Prize}` + "```\n" + " > ***Κάντε react στο 🎉 για να συμμετάσχετε στο giveaway!***\n\n" + `**Participants: \`${participants.length}\`**\n` + `**Το giveaway λήγει σε:** \`${formattedEndTime}\`\n` + `**Hosted από τον/την:** <@${message.author.id}>\n` + `**Ποσό νικητών:**\`${data.WinnerCount}\``)


                await message.edit({ embeds: [embed] });
                await i.reply({ content: `**Μπήκες στο giveaway**`, ephemeral: true });
            }
        }
        if (i.customId === 'giveawayBtnR') 
            if (!i.member.permissions.has('ADMINISTRATOR')) return i.reply({ content: `**Missing permissions**`, ephemeral: true });
            let data = await gSchema.findOne({ GuildId: i.guild.id, MessageId: i.message.id });
            if (!data) return i.reply({ content: `**Το giveaway αυτό δεν τρέχει**`, ephemeral: true });

            if (data.Participants.length < data.WinnerCount) {
                return await i.reply({ content: `**Not enough participants to reroll**`, ephemeral: true });
            }

            const guild = await client.guilds.cache.get(data.GuildId);
            const channel = await guild.channels.cache.get(data.ChannelId);
            const message = await channel.messages.fetch(data.MessageId);

            let participants = data.Participants.slice();
            const winners = [];
            for (let i = 0; i < data.WinnerCount; i++) {
                const randomIndex = Math.floor(Math.random() * participants.length);
                const winnerId = participants.splice(randomIndex, 1)[0]; 
                const winner = await guild.members.fetch(winnerId);
                winners.push(winner);
            }

            i.update({})
            await message.channel.send({ content: `**Συγχαρητήρια ${winners.map(winner => `<@${winner.id}>`).join(', ')}, κέρδισες το ${data.Prize}**` });
        
    } catch (error) {
        return console.log(error)
    }
});

client.on('ready', async () => {
    try {
        const checkGs = async () => {
            const giveaways = await gSchema.find({ Running: 'yes' });
            if (!giveaways) return;
            for (const giveaway of giveaways) {
                const { GuildId, MessageId, ChannelId, EndTime, WinnerCount } = giveaway;
                const guild = await client.guilds.cache.get(GuildId);
                const channel = await guild.channels.cache.get(ChannelId);
                const message = await channel.messages.fetch(MessageId);
                if (!message) return;
                
                if (Date.now() >= EndTime) {
                    if (giveaway.Participants.length < WinnerCount) {
                        await giveaway.deleteOne();
                        return message.channel.send({ content: `Not enough participants` });
                    }
                    let participants = giveaway.Participants.slice();
                    const winners = [];
                    for (let i = 0; i < WinnerCount; i++) {
                        const randomIndex = Math.floor(Math.random() * participants.length);
                        const winnerId = participants.splice(randomIndex, 1)[0]; 
                        const winner = await guild.members.fetch(winnerId);
                        winners.push(winner);
                    }
    
                    let btn = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('giveawayBtnR').setLabel('Reroll').setEmoji('🔁').setStyle(ButtonStyle.Primary)
                    );
    
                    const formattedEndTime = new Date(EndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
                    .setThumbnail(logo)
                        .setDescription("```" + `${giveaway.Prize}` + "```\n" + " > ***Κάντε react στο 🎉 για να συμμετάσχετε στο giveaway!***\n\n" + `**Το giveaway έληξε στις:** \`${formattedEndTime}\`\n` + `**Hosted από τον/την:** <@${message.author.id}>\n` + `**Winners:** ${winners.map(winner => `<@${winner.id}>`).join(', ')}`)
                        .setColor("#40f58e")
                        .setTimestamp(Date.now());
    
                    await message.edit({ components: [btn]});
                    await message.channel.send({ content: `**Συγχαρητήρια ${winners.map(winner => `<@${winner.id}>`).join(', ')}, κέρδισες το ${giveaway.Prize}**` });
    
                    await giveaway.update({ Running: 'no' });
                }
            }
        };
        setInterval(checkGs, 1000);
    } catch (error) {
        return console.log(error);
    }
});

// Example function to simulate fetching the giveaway object
async function getGiveaway() {
  return {
      update: function() {
          console.log('Giveaway updated!');
      },
      // Other properties and methods
  };
}

async function checkGs() {
  try {
      const giveaway = await getGiveaway();
      if (giveaway && typeof giveaway.update === 'function') {
          giveaway.update();
      } else {
          throw new TypeError('giveaway.update is not a function');
      }
  } catch (error) {
      console.error('Error in checkGs:', error);
  }
}

// Simulate the _onTimeout function calling checkGs
setTimeout(checkGs, 1000);


client.on('messageCreate', messageHandler);
client.on('interactionCreate', interactionHandler);

mongoose.connect('mongodb+srv://sergiosazoti66:azotisergios2504.@cluster0.nyv617x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
}).catch(err => console.error('MongoDB connection error:', err));

function messageHandler(message) {
    // Your message handling logic
}

function interactionHandler(interaction) {
    if (interaction.isStringSelectMenu()) { // Updated from isSelectMenu()
        // Your interaction handling logic
    }
}

// Ensure your application handles uncaught exceptions and rejections
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});



 ///END

///slots 





const slotSchema = require('./slotSchema');
const slotLogsId = '1241498186242068621'
const tagsRegainedChannel = '1241498251031744553'

client.on('ready', () => {
    client.application.commands.create(
        {
            name: 'slot',
            description: `Add a slot`,
            options: [ 
                {
                    name: 'user', 
                    description: 'The user you want to add',
                    type: 6,
                    required: "true"
                },
                {
                    name: 'duration', 
                    description: 'The duration you want',
                    type: 3,
                    required: "true"
                },
                {
                    name: 'category', 
                    description: 'The category you want',
                    type: 7,
                    required: "true"
                },
                {
                    name: 'channel_name', 
                    description: 'The channel name you want',
                    type: 3,
                    required: "true"
                },
                {
                    name: 'tags', 
                    description: 'The tags you want',
                    type: 4,
                    required: "true"
                },
                {
                    name: 'role', 
                    description: 'The role you want',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'Here',
                            value: 'here'
                        },
                        {
                            name: 'Everyone',
                            value: 'everyone'
                        }
                    ]
                }
                
            ]
        },
        serverId
    );
    client.application.commands.create(
        {
            name: 'slot-delete',
            description: `Delete a slot`,
            options: [
                {
                    name: 'user',
                    description: 'The user you want',
                    type: 6,
                    required: "true"
                }
            ]
        },
        serverId
    );
    const checkExpiredSlots = async () => {
        try {
            const expiredSlots = await slotSchema.find({ EndTime: { $lt: Date.now(), $ne: null } });

            for (const slot of expiredSlots) {
                const channel = await client.channels.fetch(slot.ChannelId);
                if (channel) await channel.delete();
                await slot.deleteOne();
            }
        } catch (error) {
            return;
        }
    };

    const test = async () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        let data = await slotSchema.findOne({ GuildId: serverId });

        if (hours === 0 && minutes === 0 && seconds === 0) {
            const guild = client.guilds.cache.get(serverId);
            if (guild) {
                const channel = guild.channels.cache.get(tagsRegainedChannel);
                if (channel) {
                    channel.send("Pings have been reset for all slots.");
                    data.Tags = 3;
                } else {
                    return;
                }
            } else {
                return;
            }

        }
    };
    setInterval(checkExpiredSlots, 5000);
    setInterval(test, 5000);
})

client.on('interactionCreate', async interaction => {
    try {
        if (interaction.commandName === 'slot') {
            if (!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({ content: `**Missing Permissions** `, ephemeral: true })
            const user = interaction.options.getUser('user');
            let data = await slotSchema.findOne({ GuildId: interaction.guild.id, UserId: user.id });
            if (data) {
                return await interaction.reply({ content: `**This user already has a slot**`, ephemeral: true });
            } else {
                const duration = interaction.options.getString('duration');
                const roleOption = interaction.options.getString('role');
                const category = interaction.options.getChannel('category')
                if (category.type !== 'GUILD_CATEGORY') return await interaction.reply({ content: `**Invalid Category**`, ephemeral: true });
                const channel_name = interaction.options.getString('channel_name')
                const tags = interaction.options.getInteger('tags')
        
                const durationRegex = /^\d+(s|m|h|d|y)$/;
    
                if (duration && duration.toLowerCase() !== "lifetime" && !duration.match(durationRegex)) {
                    return interaction.reply({ content: `**Invalid format in duration. Please put 1m, 1d, 1h, lifetime, etc**`, ephemeral: true });
                }
    
                await interaction.reply({ content: `**Success**`, ephemeral: true });
    
                let endTime;
                let formattedEndDateTime;
                if (duration.toLowerCase() === "lifetime") {
                    endTime = null;
                    formattedEndDateTime = "Lifetime";
                } else {
                    const durationInMS = parseDuration(duration);
                    endTime = new Date(Date.now() + durationInMS);
                    formattedEndDateTime = `${formatDuration(durationInMS)} (${endTime.toDateString()})`;
                }
    
                const c = await interaction.guild.channels.create(channel_name, {
                    parent: category,
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: 'SEND_MESSAGES',
                        },
                        {
                            id: interaction.guild.id,
                            deny: 'SEND_MESSAGES'
                        }
                    ]
                });

                let role;
                if (roleOption === 'here') {
                    role = 'here'
                    await c.permissionOverwrites.edit(user.id, {
                        'MENTION_EVERYONE': true
                    })
                } else if (roleOption === 'everyone') {
                    role = 'everyone'
                    await c.permissionOverwrites.edit(user.id, {
                        'MENTION_EVERYONE': true
                    })
                } else {
                    return await interaction.reply({ content: "Invalid role option selected", ephemeral: true });
                }

    
                    data = new slotSchema({
                        GuildId: interaction.guild.id,
                        UserId: user.id,
                        RoleId: role,
                        Tags: tags,
                        ChannelId: c.id,
                        EndTime: endTime
                    });

                    await data.save();

                    const e = new EmbedBuilder()
                    .setColor("#40f58e")
                    .setDescription(`**Duration: ${formattedEndDateTime}\nDaily Tags: ${tags}\nAllowed Tags: @${data.RoleId}\n\n>  > Follow server rules**`)
                    .setAuthor(`Slot Details`)
                    .setTitle(`Slot For ${user.username}`)
                    .setThumbnail(user.displayAvatarURL());
        
       await c.send({ embeds: [e], content: `${user}` });

			            const embedKl = new EmbedBuilder()
                    	.setTitle(`Your Slot`)
                    	.setColor("#40f58e")
			            .setThumbnail(user.displayAvatarURL())
			            .setDescription(`Your slot was created ${c}. If you have any questions open a ticket.`)

			await user.send({ embeds: [embedKl] })
	
                    const logs = await interaction.guild.channels.cache.get(slotLogsId);
                    const embed = new EmbedBuilder()
                    .setDescription(`**User: ${user}\nCreated By: ${interaction.user}\nSlot Duration: ${formattedEndDateTime}**`)
                    .setTitle('Slot Created')
                    .setColor("#40f58e")

                    await logs.send({ embeds: [embed] });
            }
        }
    } catch (error) {
        return;
    }
});


client.on('interactionCreate', async interaction => {
    try {
        if (interaction.commandName === 'slot-delete') {
            if (!interaction.member.permissions.has('ADMINISTRATOR')) return await interaction.reply({ content: `**Missing Permissions** `, ephemeral: true })
            const user = interaction.options.getUser('user');
            let data = await slotSchema.findOne({ GuildId: interaction.guild.id, UserId: user.id });
            if (data) {
                await slotSchema.deleteOne({ GuildId: interaction.guild.id, UserId: user.id })
                const c = data.ChannelId;
                const cf = await interaction.guild.channels.cache.get(c);
                cf.delete();
                interaction.reply({ content: `**Success**`, ephemeral: true })
            } else {
                return await interaction.reply({ content: `**No slot found for user ${user}**`, ephemeral: true });
            }
        }
    } catch (error) {
        return;
    }
})

client.on('messageCreate', async message => {
    try {
        if (message.author.bot) return;
        let data = await slotSchema.findOne({ GuildId: message.guild.id, UserId: message.author.id });
        if (data) {
            let role;
            if (data.RoleId === 'here') {
                role = '@here';
            } else if (data.RoleId === 'everyone') {
                role = '@everyone';
            } else {
                role = `<@&${data.RoleId}>`;
            }

            if (message.content.includes('@here') || message.content.includes('@everyone')) {
                if (message.content.includes('@here') && data.RoleId === 'everyone') {
                    message.delete();
                    const e2 = new EmbedBuilder()
                    .setColor("#da0303")
                    .setDescription(`**Wrong ping, Revoked**`)
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
    
                    await slotSchema.deleteOne({ GuildId: message.guild.id, UserId: message.author.id })
                    setTimeout(async () => {
                        await message.channel.delete();
                    }, 5000)
    
                    message.channel.send({ embeds: [e2] });
                    await message.channel.permissionOverwrites.edit(message.author, {
                        SEND_MESSAGES: false
                    });
    
                    const logs = await message.guild.channels.cache.get(slotLogsId);
                    const embed = new EmbedBuilder()
                    .setDescription(`**User: ${message.author}\nSlot: <#${data.ChannelId}>\nReason: \`Used wrong ping\`**`)
                    .setTitle('Slot Revoked')
                    .setColor("#da0303")

                    const embedKl = new EmbedBuilder()
                    .setTitle(`Your Slot`)
                    .setColor("#40f58e")
                    .setThumbnail(user.displayAvatarURL())
                    .setDescription(`Your slot has been revoked. Contact the owner for more information`)

                    await message.author.send({ embeds: [embedKl] })
    
                    await logs.send({ embeds: [embed] });
                } else if (message.content.includes('@everyone') && data.RoleId === 'here') {
                    message.delete();
                    const e2 = new EmbedBuilder()
                    .setColor("#da0303")
                    .setDescription(`**Wrong ping, Revoked**`)
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
    
                    await slotSchema.deleteOne({ GuildId: message.guild.id, UserId: message.author.id })
                    setTimeout(async () => {
                        await message.channel.delete();
                    }, 5000)
    
                    message.channel.send({ embeds: [e2] });
                    await message.channel.permissionOverwrites.edit(message.author, {
                        SEND_MESSAGES: false
                    });
    
                    const logs = await message.guild.channels.cache.get(slotLogsId);
                    const embed = new EmbedBuilder()
                    .setDescription(`**User: ${message.author}\nSlot: <#${data.ChannelId}>\nReason: \`Spammed many tags\`**`)
                    .setTitle('Slot Revoked')
                    .setColor("#da0303")

                    const embedKl = new EmbedBuilder()
                    .setTitle(`Your Slot`)
                    .setColor("#40f58e")
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`Your slot has been revoked. Contact the owner for more information`)

                    await message.author.send({ embeds: [embedKl] })
    
                    await logs.send({ embeds: [embed] });
                }
    
                if (data.Tags > 0) {
                    data.Tags--;
                    data.LastUsedRole = Date.now();
                    await data.save();
                    message.reply({ content: `**${message.author} , you have  ${data.Tags} ping(s) remaining**`});
                    const logs = await message.guild.channels.cache.get(slotLogsId);
                    const embed = new EmbedBuilder()
                    .setDescription(`**User: ${message.author}\nSlot: <#${data.ChannelId}>**`)
                    .setTitle('Slot Ping Used')
                    .setColor("#da0303")
    
                    await logs.send({ embeds: [embed] });
                } else {
                    message.delete();
                    const e2 = new EmbedBuilder()
                    .setColor("#da0303")
                    .setDescription(`**Ping Detected, Revoked**`)
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
    
                    await slotSchema.deleteOne({ GuildId: message.guild.id, UserId: message.author.id })
                    setTimeout(async () => {
                        await message.channel.delete();
                    }, 5000)
    
                    message.channel.send({ embeds: [e2] });
                    await message.channel.permissionOverwrites.edit(message.author, {
                        SEND_MESSAGES: false
                    });
    
                    const logs = await message.guild.channels.cache.get(slotLogsId);
                    const embed = new EmbedBuilder()
                    .setDescription(`**User: ${message.author}\nSlot: <#${data.ChannelId}>\nReason: \`Spammed many tags\`**`)
                    .setTitle('Slot Revoked')
                    .setColor("#da0303")

                    const embedKl = new EmbedBuilder()
                    .setTitle(`Your Slot`)
                    .setColor("#40f58e")
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`Your slot has been revoked. Contact the owner for more information`)

                    await message.author.send({ embeds: [embedKl] })
            
                    await logs.send({ embeds: [embed] });
                }
            }
        }
    } catch (error) {
        return;
    }
});


function parseDuration(duration) {
    const regex = /(\d+)([smhdwy])/;
    const matches = duration.match(regex);
    if (!matches) return 0;

    const [, value, unit] = matches;
    let multiplier = 1;
    switch (unit) {
        case 's': multiplier = 1000; break;
        case 'm': multiplier = 1000 * 60; break;
        case 'h': multiplier = 1000 * 60 * 60; break; 
        case 'd': multiplier = 1000 * 60 * 60 * 24; break; 
        case 'w': multiplier = 1000 * 60 * 60 * 24 * 7; break;
        case 'y': multiplier = 1000 * 60 * 60 * 24 * 365; break;
        default: return 0;
    }
    return parseInt(value) * multiplier;
}

function formatDuration(duration) {
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return years === 1 ? '1 Year' : `${years} Years`;
    } else if (days > 0) {
        return days === 1 ? '1 Day' : `${days} Days`;
    } else if (hours > 0) {
        return hours === 1 ? '1 Hour' : `${hours} Hours`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 Minute' : `${minutes} Minutes`;
    } else {
        return seconds === 1 ? '1 Second' : `${seconds} Seconds`;
    }
}  


///END


client.login(info.token)