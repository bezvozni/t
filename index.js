/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
	const Discord = require('discord.js')
	const bot = new Discord.Client()
	const config = require('./botconfig.json')


	var token = config.token
	var reactionType = config.reactionType
	var roleName = config.roleName
	var roleID 

	bot.on('ready', () => { 
		console.log(`Бот \x1b[36m${bot.user.username}\x1b[0m запущен и готов к работе!`)
		bot.generateInvite({permissions: ["ADMINISTRATOR"]}).then(link => { 
			console.log(link)
		})
	})

	bot.on('messageReactionAdd', (MessageReaction, user) => {
		
		for (let role of MessageReaction.message.guild.roles.cache.values()) {
			if (role.name === roleName) {
				roleID = role.id;
				break;
			}
		}

		if (reactionType == '*') {
			if (MessageReaction.message.reactions.cache.size >= 1) {
				MessageReaction.message.member.roles.add(roleID)
			}
		} else {
			let count = 0
			for (let react of MessageReaction.message.reactions.cache) {
				if (react[1]._emoji.name == reactionType) {
					count++
				}
			}
			if (count >= 1) {
				MessageReaction.message.member.roles.add(roleID)
			}
		}
	})


	bot.login(token);
