var discord = require('discord.js');
var roblox = require('roblox-js');
var client = new discord.Client();
var token = "NTE1MTY2OTQ0Njc3MDY4ODEw.DthNhg.mDoJKnk4e_cyfkhzg679jupczx0"


client.login(token)

 var fortunes = [ 
    'Yes.',
    'No.',
    'Maybe.',
	'Probably not.',
	'Probably yes.',
	'Never.',
	'OMG, yes.'
];

roblox.login({username: "NCARankManagement", password: "XL1@!.3+x17=2"}).then((success) => {

}).catch(() => {console.log("Sorry, it failed.");});


client.on("ready", () => {
  client.user.setGame(`Developing..`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on('message', async message => {
  
  let blacklisted = ['bitch','die','fuck'] 

  
  let foundInText = false;
  for (var i in blacklisted) { 
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }
  
    if (foundInText) {
      message.delete();
      message.channel.sendMessage('Hey! No bad words!')
  }
});﻿

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} joined ${guild}`)
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} left ${guild}`)
});

var prefix = '!';
var groupId = 4071754;
var maximumRank = 10;
var minimumRank = 1
function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)




    if(isCommand('Promote', message)){
	if(!message.member.roles.some(r=>["Deputy Director General", "Director General", "Deputy Unit Director", "Unity Director"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    	var username = args[1]
    	if (username){
    		message.channel.send(`<a:loading:515181491936952330> Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`${id} is rank ${rank} and not promotable.`)
					} else {
						message.channel.send(`${id} is rank ${rank} and promotable.`)
						roblox.promote(groupId, id)
						.then(function(roles){
							message.channel.send(`Promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}`)
						}).catch(function(err){
							message.channel.send("Failed to promote.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }

	if(isCommand('Demote', message)){
	if(!message.member.roles.some(r=>["Deputy Director General", "Director General", "Deputy Unit Director", "Unity Director"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    	var username = args[1]
    	if (username){
    		message.channel.send(`<a:loading:515181491936952330> Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(minimumRank >= rank){
						message.channel.send(`${id} is rank ${rank} and not demotable.`)
					} else {
						message.channel.send(`${id} is rank ${rank} and demotable.`)
						roblox.demote(groupId, id)
						.then(function(roles){
							message.channel.send(`Demoted from ${roles.oldRole.Name} to ${roles.newRole.Name}`)
						}).catch(function(err){
							message.channel.send("Failed to demote.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }

	if(isCommand('rank', message)){
	var username = args[1]
    	if (username){
    		message.channel.send(`<a:loading:515181491936952330> Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
						message.channel.send(`Current rank: ${rank}.`)
					
                });
			});
		}
	}
	
	const args1 = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args1.shift().toLowerCase();
	

	if (command === "shout") {
        if(!message.member.roles.some(r=>["Deputy Director General", "Director General", "Assistant Director General"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("Sorry, you don't have permissions to use this!");
        if (!args) { // Check if there's no arguments to use to shout, and return (stop going further)
            return;
            message.reply('Please specify a message to shout.')
        }
        const shoutMSG = args1.join(" "); // Joins the arguments minus prefix to form the message to be shouted
		message.channel.send(`<a:loading:515181491936952330> Shouting...`)
        roblox.shout(groupId, shoutMSG)
            .then(function() {
                console.log(`Shouted ${shoutMSG}`); // OPTIONAL - Logs specified string to the console
				message.channel.send(`<:check:515266391054483497> Successfully shouted!`)
                // message.channel.send('Shouted to the group!') // OPTIONAL - Sends a message to the channel
            })
            .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
                console.log(`Shout error: ${error}`) // Log the error to console if there is one.
            });
	    }
             
 
 
	
	



	if(isCommand('restart', message)){
	 if(message.author.id != "262968012078841866")
      return message.reply("This Command can only be executed by the Bot's Developer!");
  
    restartBot(message.channel);
    return;
     }
  
   function restartBot(channel) {
      channel.send('The Bot is now restarting...')
      .then(msg => client.destroy())
      .then(() => client.login(token));
   }

   if(isCommand('8ball', message)){
   if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]); // Get a random 8ball answer
            else var embed = new discord.RichEmbed()
                     .addField('Usage', '!8ball <Question>') // Error message
                     .setColor(0xFF0000)
            message.channel.sendEmbed(embed)
			}

  if(isCommand('cmds', message)){
  
  message.channel.sendMessage("**Here's a list of available commands**")
            var embed = new discord.RichEmbed() // Code Box 
                .setTitle('User Commands') // Code Box Title
                
                .addField('!group', 'Gives you the Group Link')
                .addField('!london', 'Gives you the London Link')
                .addField('!8ball', 'Ask a Question')
                .addField('!updates', 'Displays the Bots latest Updates')
				.addField('!ping', 'Pong!')
				.addField('!rank', 'Checks the rank of a user')
				
				
				
                .setColor(0x00FFFF) 
            message.channel.sendEmbed(embed); 
            var embed = new discord.RichEmbed()
                .setTitle('UDD+/Mod Commands')
                .addField('!promote', 'Promotes a user')
				.addField('!patrol', 'Announces a patrol in the #events channel')
				.addField('!training', 'Announces a training in the #events channel')
				.addField('!kick', 'Announces a training in the #events channel')
				.addField('!mute', 'Announces a training in the #events channel')
				.addField('!unmute', 'Announces a training in the #events channel')
				.addField('!demote', 'Demotes a user')
				.addField('!shout', '(ADG+) Shouts a message')
				
                .setColor(0x00FFFF)
            message.channel.sendEmbed(embed)
			}

  if(isCommand('group', message)){
  message.channel.sendMessage('You can find the Group at');
            message.channel.sendMessage('https://www.roblox.com/My/Groups.aspx?gid=4071754')
			}

  if(isCommand('london', message)){
  message.channel.sendMessage('You can find London at');
            message.channel.sendMessage('https://www.roblox.com/games/1591974778/CASINO-City-of-London')
			}

  if(isCommand('updates', message)){
   message.channel.sendMessage('**Bot Updates**');
            var embed = new discord.RichEmbed()
                //.addField('!info', 'Updated the Informations')
                .addField('!group', 'Command added')
                //.addField(';kick', 'Command added')
				//.addField('Profile Picture', 'Updated it')
				.addField('!patrol', 'Command added')
				.addField('!demote', 'Command added')
				.addField('!rank', 'Command added')
				.addField('!shout', 'Command added')
				.addField('!kick', 'Command added')
				.addField('!ping', 'Command added')
				.addField('!mute', 'Command added')
				.addField('!unmute', 'Command added')
				.addField('!training', 'Command added')
				.addField('Word-Blacklist', 'Added')
                .setColor(0x00FFFF)
            message.channel.sendEmbed(embed)
			}

  if(isCommand('patrol', message)){
	if(!message.member.roles.some(r=>["Instructor", "Unit Supervisor", "Unit Deputy Director", "Unity Director", "Assistant Director General", "Deputy Director General", "Director General"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
             const channel = client.channels.get("495554660061544448")
			 channel.send(`||Patrol|| Hosted by ${message.author} <@&495333778663931904> https://www.roblox.com/games/1591974778/CASINO-City-of-London`) //${message.author} tags the user. ${message.author.tag} doesn't tag.
			}

  if(isCommand('training', message)){
    if(!message.member.roles.some(r=>["Instructor", "Unit Supervisor", "Unit Deputy Director", "Unity Director", "Assistant Director General", "Deputy Director General", "Director General"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
             const channel = client.channels.get("495554660061544448")
			 channel.send(`||Training|| Hosted by ${message.author} <@&495333778663931904> https://www.roblox.com/games/2084324500/NCA-Camp-Prometheus#`) //${message.author} tags the user. ${message.author.tag} doesn't tag.
			}
  

  

  if(isCommand('mute', message)){

  if (!message.member.roles.some(r=>["Moderator", "Head Moderator", "Deputy Director General", "Director General"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); // if author has no perms
        var mutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!mutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("I cannot mute this member!") // if memebr is an admin
        var mutereasondelete = 10 + mutedmember.user.id.length //sets the length of the kickreasondelete
        var mutereason = message.content.substring(mutereasondelete).split(" "); // deletes the first letters until it reaches the reason
        var mutereason = mutereason.join(" "); // joins the list kickreason into one line
        if (!mutereason) return message.reply("Please indicate a reason for the mute!") // if no reason
        mutedmember.addRole(Muted) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
        message.reply(`${mutedmember.user} has been muted by ${message.author} because: ${mutereason}`); // sends a message saying he was kicked
    }

	if(isCommand('unmute', message)){
	if (!message.member.roles.some(r=>["Moderator", "Head Moderator", "Deputy Director General", "Director General"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); // if author has no perms
        var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!unmutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        unmutedmember.removeRole(Muted) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
        message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`); // sends a message saying he was kicked
    }

  if(isCommand('ping', message)){
    	
    message.reply(`Pong! Latency is ${message.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(isCommand('kick', message)){ // creates the command kick
        if (!message.member.roles.some(r=>["Head Moderator", "Deputy Director General", "Director General"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); // if author has no perms
        var kickedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!kickedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        if (!kickedmember.kickable) return message.reply("I cannot kick this member!") // if the member is unkickable
        var kickreasondelete = 10 + kickedmember.user.id.length //sets the length of the kickreasondelete
        var kickreason = message.content.substring(kickreasondelete).split(" "); // deletes the first letters until it reaches the reason
        var kickreason = kickreason.join(" "); // joins the list kickreason into one line
        if (!kickreason) return message.reply("Please indicate a reason for the kick!") // if no reason
        kickedmember.kick(kickreason) //if reason, kick
            .catch(error => message.reply(`Sorry @${message.author} I couldn't kick because of : ${error}`)); //if error, display error
        message.reply(`${kickedmember.user.username} has been kicked by ${message.author.username} because: ${kickreason}`); // sends a message saying he was kicked
    }

	
  
       
  
  

  

  if(isCommand('exit', message)){
    if(message.author.id != "262968012078841866")
      return message.reply("This Command can only be executed by the Bot's Developer!");

	  exitBot(message.channel);
	  return;
  }
    function exitBot(channel) {
        channel.send('Thank you for using the Rank Management Bot!')
        .then(msg => client.destroy())
  }


});