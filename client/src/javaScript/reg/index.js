const passwordEye = document.getElementById('reg-passwordEye');
const inputPassword = document.getElementById('reg-password');
const inputNickname = document.getElementById('reg-nickname');
const passwordParagraph = document.getElementById('reg-password-paragraph');
const nicknameParagraph = document.getElementById('reg-nickname-paragraph');

let isClickedOnPasswordEye = false;

passwordEye.onclick = () =>
{
    if(isClickedOnPasswordEye)
    {
        inputPassword.type = 'password';
        isClickedOnPasswordEye = false;
    }
    else
    {
        inputPassword.type = 'text';
        isClickedOnPasswordEye = true;
    };
};

inputPassword.oninput = (element) =>
{
    for(let char of inputPassword.value)
    {
        if(!enabledPasswordLettersHashiedA.get(char)) inputPassword.value = inputPassword.value.slice(0, inputPassword.value.indexOf(char)); 
    };

    setTimeout(() =>
    {
        let isHasEnabledCharInPassword = false;
        for(let char of letters)
        {
            if(inputPassword.value.indexOf(char) != -1) isHasEnabledCharInPassword = true;
        }

        setTimeout(() =>
        {
            if(!isHasEnabledCharInPassword) passwordParagraph.innerText = 'Ваш пароль слишком легкий';
            else passwordParagraph.innerText = 'Ваш пароль';

            if(!inputPassword.value.length) passwordParagraph.innerText = 'Пароль обязателен';
        }, 200)
    }, 1000);

    setTimeout(() =>
    {
        const userPassword = enterPassword(inputPassword.value);
        localStorage.setItem('userPassword', userPassword);
    }, 2000);
};

inputNickname.oninput = (element) =>
{
    let isHasEnablesChar = false;
    
    for(let char of inputNickname.value) if(enabledPasswordLettersHashiedA.get(char)) isHasEnablesChar = true;

    setTimeout(() =>
    {
        if(!isHasEnablesChar)
        {
            inputNickname.value = '';
            nicknameParagraph.innerText = 'Ваш никнейм содержал\nтолько спец.  символы';
        };

        if(!inputNickname.value.length) nicknameParagraph.innerText = 'Псевдоним обязателен';
    }, 3000);

    setTimeout(() => { console.log(inputNickname.value) }, 2000);
};