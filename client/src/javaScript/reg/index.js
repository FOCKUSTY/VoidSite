const passwordEye = document.getElementById('reg-passwordEye');
const inputPassword = document.getElementById('reg-password');
const inputUsername = document.getElementById('reg-username');
const inputEmail = document.getElementById('reg-email');
const passwordParagraph = document.getElementById('reg-password-paragraph');
const usernameParagraph = document.getElementById('reg-username-paragraph');
const emailParagraph = document.getElementById('reg-email-paragraph');
const regSubmit = document.getElementById('reg-submit')

let isClickedOnPasswordEye = false;

passwordEye.onclick = () =>
{
    if(isClickedOnPasswordEye)
    {
        inputPassword.type = 'password';
        isClickedOnPasswordEye = false;

        passwordEye.style.backgroundImage = 'url(../../vektor-image/eye_closed.svg)'
    }
    else
    {
        inputPassword.type = 'text';
        isClickedOnPasswordEye = true;

        passwordEye.style.backgroundImage = 'url(../../vektor-image/eye_open.svg)'
    };
};

regSubmit.onclick = (e) =>
{
    e.preventDefault();

    let isHasEnabledCharInPassword = false;
    let isPasswordGood = true;

    let isHasEnablesChar = false;
    let usernameIsGood = true;

    if(inputPassword.value.length === 0)
    {
        isPasswordGood = false;
        passwordParagraph.innerText = `Пароль обязателен`;
    }
    
    if(inputUsername.value.length === 0)
    {
        usernameIsGood = false;
        usernameParagraph.innerText = 'Псевдоним обязателен';
    }
    
    if(inputEmail.value.length === 0)
        emailParagraph.innerText = 'Почта обязательна';



    for(let char of inputPassword.value)
        if(!enabledPasswordLettersHashiedA.get(char))
            inputPassword.value = inputPassword.value.slice(0, inputPassword.value.indexOf(char)); 



    for(let char of letters)
        if(inputPassword.value.indexOf(char) != -1)
            isHasEnabledCharInPassword = true;

    for(let symbol of symbols)
        if(inputPassword.value.indexOf(symbol) != -1)
            isHasEnabledCharInPassword = true;



    if(!isHasEnabledCharInPassword && inputPassword.value.length != 0)
    {
        isPasswordGood = false;
        passwordParagraph.innerText = `Ваш пароль слишком легкий\nДобавьте латинскую букву или спец. символ`;
    }
    else if(isHasEnabledCharInPassword)
    {
        isPasswordGood = true;
        passwordParagraph.innerText = `Ваш пароль`;
    };

    if(inputPassword.value.length < 5 && inputPassword.value.length != 0)
    {
        isPasswordGood = false;
        passwordParagraph.innerText = `В пароле должно быть более 5 символов`;
    };
    
    for(let char of inputUsername.value)
        if(enabledPasswordLettersHashiedA.get(char))
            isHasEnablesChar = true;

    if(inputUsername.value.length < 3 && inputUsername.value.length != 0)
    {
        usernameIsGood = false;
        usernameParagraph.innerText = 'В псевдониме должно быть более 3-х символов'
    }
    
    if(!isHasEnablesChar && inputUsername.value.length != 0)
    {
        usernameIsGood = false;
        inputUsername.value = '';
        usernameParagraph.innerText = 'Ваш никнейм содержал только спец.  символы';
    };
}

inputPassword.oninput = (element) =>
{
    for(let char of inputPassword.value)
        if(!enabledPasswordLettersHashiedA.get(char))
            inputPassword.value = inputPassword.value.slice(0, inputPassword.value.indexOf(char)); 
};

/* inputNickname.oninput = (element) =>
{
    let isHasEnablesChar = false;
    
    for(let char of inputNickname.value) if(enabledPasswordLettersHashiedA.get(char)) isHasEnablesChar = true;

    setTimeout(() =>
    {
        if(inputNickname.value.length < 3 && inputNickname.value.length != 0) nicknameParagraph.innerText = 'В псевдониме должно быть более 3-х символов';
        if(inputNickname.value.length === 0) nicknameParagraph.innerText = 'Псевдоним обязателен';
        
        if(!isHasEnablesChar)
        {
            inputNickname.value = '';
            nicknameParagraph.innerText = 'Ваш никнейм содержал только спец.  символы';
        };
    }, 3000);

    setTimeout(() => { console.log(inputNickname.value) }, 2000);
}; */