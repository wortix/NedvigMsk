const TelegramApi = require('node-telegram-bot-api');
const fs = require('fs');
const { dirname } = require('path');

const token = '5550511372:AAExmmhr9P2T2RG0pcipBEEkNBMTm7RtQoY';

const bot = new TelegramApi(token,{polling:true})
let count = 0;
const button = JSON.stringify()
bot.setMyCommands([
    {command: '/start', description: 'Начать работу'},     
])
bot.on('callback_query', async msg => {
    const id = msg.message.chat.id;
    const data = msg.data;
    if (data==='search'){
       await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/img_1.jpg'));
       await bot.sendMessage(id,`Где присматриваете квартиру ?`,{
        reply_markup:JSON.stringify({
            inline_keyboard:[
                [{text: 'Центральный административный округ', callback_data: 'place'}],
                [{text: 'Северный административный округ', callback_data: 'place'}],
                [{text: 'Северо-восточный административный округ', callback_data: 'place'}],
                [{text: 'Восточный административный округ', callback_data: 'place'}],
                [{text: 'Юго-восточный административный округ', callback_data: 'place'}],
            ]
        }),
    });
    }   
});
bot.on('callback_query', async msg => {
    const id = msg.message.chat.id;
    const data = msg.data;
    if (data==='place'){
       await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/img_2.jpeg'));
       await bot.sendMessage(id,`Сколько комнат должно быть в квартире ?`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Студия', callback_data: 'room'}],
                    [{text: '1', callback_data: 'room'},{text: '2', callback_data: 'room'},{text: '3', callback_data: 'room'}]
                ]
            }),
        });
    }   
});
bot.on('callback_query', async msg=>{
    const id = msg.message.chat.id;
    const data = msg.data;
    if (data === 'room'){
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/img_3.jpg'));
        await bot.sendMessage(id,`Насколько важна близость метро ?`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Хочу ходить пешком', callback_data: 'metro'}],
                    [{text: 'Готов ехать на автобусе', callback_data: 'metro'},],
                    [{text: 'Не пользуюсь метро', callback_data: 'metro'},]
                ]
            }),
        });
       
    }
}) 
bot.on('callback_query', async msg=>{
    const id = msg.message.chat.id;
    const data = msg.data;
    if (data === 'metro'){
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/img_4.webp'));
        await bot.sendMessage(id,`Хотите заехать сразу или готовы подождать ?`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Сразу', callback_data: 'waiting'}],
                    [{text: 'Готов подождать', callback_data: 'waiting'},],
                    [{text: 'Не имеет значение', callback_data: 'waiting'},]
                ]
            }),
        });
       
    }
})
bot.on('callback_query', async msg=>{
    const id = msg.message.chat.id;
    const data = msg.data;
    if (data === 'waiting'){
       setTimeout(()=>{
        bot.sendMessage(id,`Мы подобрали для вас несколько квартир`);  
       },2000);
    }
})
bot.on('message', async msg=>{
    const text = msg.text;
    const id = msg.chat.id;
   
    if (text === `/start`) {
        count++;
       await bot.sendMessage(id,`Аренда Недвижимости (Умный подбор квартир в удобном для вас месте)`);
       await bot.sendMessage(id,`Для начала ответьте на несколько вопросов`); 
       await bot.sendMessage(id,`Как вас зовут ?`); 
    } else {
        switch(count){
            case 1 :
                count++
                await bot.sendMessage(id,`Сколько вам лет ?`);
                break;
            case 2 :
                count++
                await bot.sendMessage(id,`Работаете или учитесь ?`);
                break;
            case 3 :
                count++
                await bot.sendMessage(id,`Сколько людей будет проживать ?`);
                break;
            case 4 :
                count++
                await bot.sendMessage(id,`Есть ли у вас домашние животные ?`);
                break;
             case 5 :
                count++
                await bot.sendMessage(id,`Укажите минимальную сумму арендной платы`);
                break;
             case 6 :
                count++
                await bot.sendMessage(id,`Укажите максимальную сумму арендной платы`);
                break;
             case 7 :
                count++
                await bot.sendMessage(id,`Укажите ваш номер телефона +7`); 
                break;
            case 8:
                await setTimeout(()=>{
                    bot.sendMessage(id,`Отлично теперь мы можем начать подбор недвижимости для вас`);
                },1000);
                await setTimeout(()=>{
                    bot.sendMessage(id,`Для начала поиска недвижимости нажмите на кнопку`,{
                    reply_markup:JSON.stringify({
                        inline_keyboard:[
                            [{text: 'Начать работу', callback_data: 'search'}]
                        ]
                    }),
                });
               },1200)
                    break;
            default: await bot.sendMessage(id,"Произошла ошибка, пожалуйста, перезапустите бота и начните поиск заново");
        }
    }
    
    
})

