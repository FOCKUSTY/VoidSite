const fs = require('fs');

let example;

(async () =>
{
    example = fs.readFileSync('client\\src\\channels\\example\\example.html', 'utf-8');
})();

const createFolder = (data = {path: 'client\\src\\channels', name: 'test'}) =>
{
    try
    {
        fs.mkdirSync(`${data.path}\\${data.name}`);
    
        return {text: 'Папка успешно создана', error: null, type: 'Successed'};
    }
    catch (err)
    {
        console.error(err);
        
        return {text: 'Error << Ошибка на стороне сервера', error: err, type: "Error"};
    };
};

const createFile = (data = {path: 'client\\src\\channels', name: 'test.txt', chat: {name, info}}) =>
{
    try
    {
        const html = `${example}`;
        
        html.replace('NAMEOFCHAT', chat.name);
        html.replace('CHATINFO', chat.info);

        fs.writeFile(`${data.path}\\${data.name}`, `${html}`, callback =>
        {
            return {text: '?', error: '?', type: '?', callback: callback};
        });
    }
    catch (err)
    {
        console.error(err);
        
        return {text: 'Error << Ошибка на стороне сервера', error: err, type: "Error"};
    };
};

module.exports =
{
    createFolder,
    createFile
}