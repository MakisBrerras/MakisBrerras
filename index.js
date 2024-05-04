const { Client, GatewayIntentBits, Partials, EmbedBuilder, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent , GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions],
partials: [Partials.Message, Partials.Channel, Partials.Reaction]});
const { Permissions } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputValue, TextInputBuilder, TextInputStyle, SelectMenuBuilder, InteractionType, ChannelType, PermissionsBitField, ButtonBuilder, ButtonStyle, AuditLogEvent, AttachmentBuilder, SlashCommandBuilder  } = require('discord.js');
const moment = require('moment')
const ms = require('ms')
const db = require('quick.db')
const puppeteer = require('puppeteer')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10');
const info = require('./info.json')
const prefix = '!'
const axios = require('axios')
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

/// Game


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



///




const name = 'Makaros';
const logo = 'https://cdn.discordapp.com/attachments/1219990888487321661/1220249009700995082/logoPng.png?ex=66371ef3&is=6635cd73&hm=02d8d9bc8d731f9ec22dddc3d0efaba30d580dd638aa819244693b88de6adb5f&'
const reviewChannel = '1236329895139741848'

client.on('messageCreate', async message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if(message.content === '!review') {
        const embed = new EmbedBuilder()
        .setAuthor({ name: name, iconURL: logo })
        .setThumbnail(logo)
        .setColor('#13e3ee')
        .setDescription(`**Μέτα απο μια αγορά αφήστε μας το review σας πατώντας το button**`)
    
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('reviewMakaros').setEmoji('💯').setStyle(ButtonStyle.Secondary)
        )
    
        await message.channel.send({embeds: [embed], components: [row]})
    }
})

client.on('interactionCreate', async interaction => {
    if (interaction.customId === 'reviewMakaros') {
        const modal = new EmbedBuilder()
        .setCustomId('reviewModalMakaros')
        .setTitle(`Review System | ${interaction.guild.name}`)

        const stars = new TextInputComponent()
        .setCustomId('stars')
        .setLabel(`Αξιολογίστε βάση αστεριών (1-5)`)
        .setStyle('SHORT')
        .setRequired(true)
        
        const text = new TextInputComponent()
        .setCustomId('text')
        .setLabel(`Προσθέστε πώς σου φάνηκε το service`)
        .setStyle('SHORT')
        .setRequired(true)

        const starsRow = new ActionRowBuilder().addComponents(stars)
        const textRow = new ActionRowBuilder().addComponents(text)

        modal.addComponents(starsRow, textRow)

        await interaction.showModal(modal)
    }
})

client.on('interactionCreate', async i => {
    if (i.customId === 'reviewModalMakaros') {
        const channel = await i.guild.channels.cache.get(reviewChannel)
        const stars = await i.fields.getTextInputValue('stars')
        const text = await i.fields.getTextInputValue('text')

        if (isNaN(stars)) return await i.reply({ content: `**Βάλε μόνο αριθμούς.**`, ephemeral: true})
        if (stars > 5 || stars < 0) return await i.reply({ content: `**Βάλε έναν αριθμό απο το 1 εώς το 5!**`, ephemeral: true})
        if (stars == 0) return await i.reply({ content: `**Δεν γίνεται να βάλεις 0 αστέρια**`, ephemeral: true})

        await i.reply({ content: `**Success**`, ephemeral: true})
        const starIcons = '⭐'.repeat(stars);

        const embed = new EmbedBuilder()
        .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
        .setDescription(`**${starIcons} | <t:${(Math.round((new Date()).getTime() / 1000))}:R>\n\n\`\`\`${text}\`\`\`**`)
        .setColor('#13e3ee')

        await channel.send({ embeds: [embed] });
    }
})




client.login(info.token)
