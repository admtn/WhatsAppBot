const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

/*client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});*/


function getWord(){
    words = ['shake','apple','chess','hosue'];
    return words[Math.floor(Math.random()*words.length)];
}

word = getWord();

client.on('message',msg=>{
    guess = msg.body;
    response = getResponse(guess,word);
    if(guess.length !=5){
        client.sendMessage(message.from, 'Please ente a 5 letter word');
    }
    else if(chances == 5){
        client.sendMessage(message.from,'You have no more chances');
    }
    else{
        response = getResponse(guess,word);
        client.sendMessage(msg.from,response);
        chances += 1;
    }
});

function getResponse(input,word){
    let output = '⬜⬜⬜⬜⬜';
    let output_l = output.split('');
    let world_l = word.split('');
    let input_l = input.split('');

    for(let i = 0; i < 5; i++){
        if(word_l[i] === input_l[i]){
            output_l =[i] = '🟩';
            word_l[i] = '#';
            input_l[i] = '*';
        }
    }

    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(input_l[i] === world_l[j]){
                output_l[i] = '🟧';
                input_l[i] = '*';
                world_l[i] = '#';
            }
        }

    }

    return output_l.join('');


}


client.initialize();
