const articleMessages = document.getElementById('messages')
const inputWriteMessage = document.getElementById('write')
const writeMessage = document.getElementById('write-message')
const formSend = document.getElementById('form-send');
const sendWriten = document.getElementById('send-writed')

let inputWriteMessageContinueHeight = 80; 
let writeMessageContinueHeight = 40; 
let articleMessagesContinueHeight = 85;
let formSendContinueHeight = 10;

let charCode = 0;
let oldCharCode = 0;

const nulled = () =>
{
    inputWriteMessage.style.height = `80%`;
    
    writeMessage.style.height = `40%`;
    formSend.style.height = `10%`;
    articleMessages.style.height = `85%`;

    inputWriteMessageContinueHeight = 80; 

    writeMessageContinueHeight = 40; 
    articleMessagesContinueHeight = 85;
    formSendContinueHeight = 10;
};

const minus = () =>
{
    inputWriteMessageContinueHeight -= 5;
    
    writeMessageContinueHeight -= 5;
    formSendContinueHeight -= 1;
    articleMessagesContinueHeight += 1;

    inputWriteMessage.style.height = `${inputWriteMessageContinueHeight}%`;
    
    writeMessage.style.height = `${writeMessageContinueHeight}%`;
    formSend.style.height = `${formSendContinueHeight}%`;
    articleMessages.style.height = `${articleMessagesContinueHeight}%`;
};

inputWriteMessage.addEventListener('keydown', (e) =>
{
    charCode = e.keyCode;

    const length = e.target.value.split('\n').length;

    if(formSend.style.height === '10%')
        return;
    
    if(e.charCode === 13)
    {
        oldCharCode = charCode;
        return;
    };
    
    if(inputWriteMessage.value === '')
        nulled();

    if((length <= 5) && (charCode === 8 && oldCharCode === 13) || (oldCharCode === 8 && charCode === 8 && (inputWriteMessage.value[inputWriteMessage.value.length-1]) === '\n'))
        minus();

    oldCharCode = charCode;
});

inputWriteMessage.addEventListener('keypress', (e) =>
{
    charCode = e.charCode;

    if(e.charCode != 13)
        return;

    if(formSend.style.height != '15%')
    {
        inputWriteMessageContinueHeight += 5;

        writeMessageContinueHeight += 5;
        formSendContinueHeight += 1;
        articleMessagesContinueHeight -= 1;

        inputWriteMessage.style.height = `${inputWriteMessageContinueHeight}%`;
        
        writeMessage.style.height = `${writeMessageContinueHeight}%`;
        formSend.style.height = `${formSendContinueHeight}%`;
        articleMessages.style.height = `${articleMessagesContinueHeight}%`;
        
        console.log(inputWriteMessage.value);
    };
});

const sendMessage = (content = '') =>
{
    const message = document.createElement('div');

    const paragraphSend = document.createElement('p');
    const paragraphText = document.createElement('p');

    paragraphSend.className = 'sended';
    paragraphSend.innerText = 'Отправили: Вы';

    paragraphText.innerText = `${content}`;

    message.className = 'message self-message';
    
    message.appendChild(paragraphSend);
    message.appendChild(paragraphText);
    
    articleMessages.appendChild(message);

    nulled();
};

formSend.addEventListener('submit', element =>
{
    element.preventDefault();

    for(let char of inputWriteMessage.value)
    {
        if(char != ' ')
            break;

        if(inputWriteMessage.value.lastIndexOf(char) === inputWriteMessage.value.length-1)
            return;
    };

    if(inputWriteMessage.value === '')
        return;

    sendMessage(inputWriteMessage.value);
    
    inputWriteMessage.value = '';

    articleMessages.scrollTo({
        top: articleMessages.scrollHeight,
        left: 0,
        behavior: "smooth"
    });

    return;
});

inputWriteMessage.onkeyup = (e) =>
{
    if(e.which === 13 && e.shiftKey)
    {
        e.preventDefault();

        if(e.target.value === '' || e.target.value === '\n')
            return;

        sendMessage(e.target.value);
        
        e.target.value = '';

        articleMessages.scrollTo({
            top: articleMessages.scrollHeight,
            left: 0,
            behavior: "smooth"
        });

        return;
    };
};