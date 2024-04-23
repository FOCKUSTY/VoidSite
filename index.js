const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { addMessage, addAccount, findAccount, getAccount, getMessage, messages, loadMessage, getMessageCount } = require('./server/src/database/database');
const { permanentHash, checkInput, unHash } = require('./server/src/database/hashing');
const { createImageFile } = require('./server/src/index');
const config = require('./config.json');

const socket = require('socket.io');
const io = socket(http);

const dataLoadedMessage = new Map();

app.use("/", express.static(__dirname + "/client/src"));

io.on('connection', socket =>
{
	console.log("> A client has connected");

	socket.on('login account', data =>
	{
		findAccount(data.email, data.password).then(findData =>
		{
			socket.emit('login to account', findData)
		})
	});

	socket.on('find account', (data = {type: '', email: '', username: ''}) =>
	{
		getAccount('findOne', data.type, '', data.username, data.email).then(account =>
		{
			if(account)
				socket.emit('is account exists', true);
			
			else
				socket.emit('is account exists', false);
		})
	})

	socket.on('check input', input =>
	{
		socket.emit('checked input', checkInput(input) );
	});

	socket.on('check email', email =>
	{
		let data =
		{
			isAllowed: false,
			email: ''
		};

		for(let mail of config.allowedMails)
		{
			if(email.slice(email.length-mail.length, email.length) === mail)
				data = { isAllowed: true, email: email };
		};

		socket.emit('checked email', data)
	})

	socket.on('hash password', (password) =>
	{
		socket.emit('hashed password', permanentHash(password));
	});

	socket.on('get account data', async (args = {findType:'findAll', type:'id', id:'', username:'', email:''}) =>
	{
		await getAccount(args.findType, args.type, args.id, args.username, args.email).then((accountData) =>
		{
			socket.emit('request account data', accountData?.dataValues);
		})
	});

	socket.on('login user on main', (data = { first: { email:'', password:'' }, second: { email:'', password:'' }}) =>
	{
		let isGood = true;

		if(!data || !data.first || !data.second)
			return;

		if(data.first.email != data.second.email)
		{
			socket.emit('login user', false)
			isGood = false;
		}
		else if(data?.first.password == data.second.password)
		{
			socket.emit('login user', true)
			isGood = true;
		}
		else
		{
			socket.emit('login user', false)
			isGood = false;
		};
	})

	socket.on('get messages', async(data = {count: 10, user: 'username', nulled: false}) =>
	{
		let messageCount = 0;
		let offset = 0;
		let length = data.count;
		
		await getMessageCount().then(count => messageCount = count );

		if(!data.nulled)
			dataLoadedMessage.set(data.user, 0)

		const getted = dataLoadedMessage.get(data.user);

		if(messageCount <= dataLoadedMessage.get(data.user))
			return 0;

		if(getted && data.nulled)
		{
			dataLoadedMessage.set(data.user, getted+data.count);
			offset = getted;
			length = messageCount-getted;
		}
		else
		{
			dataLoadedMessage.set(data.user, data.count);
			length = data.count;
			offset = 0;
		}

		console.log(offset, data, messageCount, messageCount-dataLoadedMessage.get(data.user), dataLoadedMessage.get(data.user))

		await loadMessage({
			length: data.count,
			offset: offset,
			type:'offset-length'
		}).then(async (messages) =>
		{
			const ids = messages.split('\n');
			const msgs = [];

			for(let id of ids)
			{
				await getMessage('findOne', id).then(msg =>
					{
						for(let option in msg)
						{
							if(option == 'dataValues')
							{
								msgs.push(msg[option]);
								continue;
							};
						};
					});
			};

			socket.emit('load message', msgs);
		})

/* 		await getMessage().then(async (messages) =>
			{
				const length = dataLoadedMessage.get(data.user);

				const msgs = [];

				for(let id of messages)
				{
					await getMessage('findOne', id).then(msg =>
						{
							for(let option in msg)
							{
								if(option == 'dataValues')
								{
									msgs.push(msg[option]);
									continue;
								}
							}
						});
				};

				socket.emit('load message', msgs);
			}); */
	});

	socket.on('new account', accountData =>
	{
		addAccount(...accountData).then((data) =>
		{
			socket.emit('new account has been added', data);
		});
	})

	socket.on('chat message', msg =>
	{
		addMessage(msg);
		socket.broadcast.emit('chat message', msg);
	});

	socket.on('disconnect', socket =>
	{
		console.log("> A client has disconnected!");
	});

	socket.on('create image file', (data = {path: '', name: '', buffer: ''}) =>
	{
		// data.buffer.replace(/^data:image\/\w+;base64,/, "");
		data.buffer = Buffer.from(data.buffer, 'base64');
		data.path = `${config.url}/` + data.path;
		
		createImageFile(data);
	});
})

http.listen(config.port, err =>
{
	console.log(config.url);
	console.log(config.url + "/channels/main");
	console.log(config.url + "/channels/reg");
});