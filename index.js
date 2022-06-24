const TelegramApi = require('node-telegram-bot-api');
const fs = require('fs');
const { dirname } = require('path');
const token = '5457140174:AAF_-TJVUxJHQfTR1qOE1TN_ze6DTwHre_Q';
let flats = [
    {  text:`
Адрес: Дмитровское шоссе 43к1
Цена: 16000 рублей (цена из-за срочности) + ку

Сдам однокомнатную квартиру, в отличном состоянии. Мебель, техника все имеется. Wi-Fi и TV подключено. Коммунальные услуги включены в ежемесячную стоимость, дополнительно оплата за воду и свет по счетчикам. Хорошая инфраструктура. Залога нет.

Обращаться по телефону: 89030836722– Яна (посредник) 
    `,
  }, 
      {
          text: `
Адрес: ул. земляной вал 39/1
Цена: 15.000 + ку.

Сдается квартира на длительный срок аренды без повышения, без посредников, агентств, и т.д.
Был сделан хороший ремон, все удобства для жизни есть. 
Вся необходимая мебель и техника присутствует.

По всем интересующим вопросам обращайтесь в What's app +79298008382 (Оксана)`,
      },
      {
          text: `
Адрес: Парковый бульвар 2 к.6
Цена: 25000. + ку

Сдаётся квартира-студия в новом многоэтажном доме в ЖК Зеленоградский.В квартире встроенная кухня с холодильником, посудомоечная машина, свч, духовка, варочная панель с 3 конфорками, чайник. Отдельная гардеробная, в которой имеется система хранения, отдельный открытый шкаф, зеркало и выведены розетки Двуспальная кровать, стиральная машина, гладильная доска, сушилка, пылесос, TV с WiFi и поддержкой Smart TV, большой балкон с панорамным остеклением с красивым видом. ЖК уже развитой инфраструктурой: на территории сетевые супермаркеты, салоны красоты и тп. Парковка на придомовой территории, в том числе за шлагбаумом  Видео-наблюдение в лифтах, в подъездной группе и на этажах аключаю договор. Залог 100%. Только на длительный срок

Контактный номер +79165897899`,
      }
  
  ];
const bot = new TelegramApi(token,{polling:true})
let count = 0;
const keyboard = {
    keyboard: [
        ["Перезапустить бота"],
    ],
    resize_keyboard: true 
}
function previous(id){
    if (count===0) return
    count--
    return bot.sendMessage(id,'Назад')
}
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
       await bot.sendMessage(id,`Мы подобрали для вас несколько квартир`);   
       await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_2.jpg'));
       await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_1.jpg')); 
       await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_3.jpg')); 
       await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_4.jpg')); 
       await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_5.jpg'));  
       await bot.sendMessage(id,`${flats[0].text}`,{
           reply_markup:JSON.stringify({
               inline_keyboard:[
                   [{text: 'Загрузить ещё', callback_data: 'first_flat'}],
               ]
           }),
       });
    }     
})
bot.on('callback_query', async msg=>{
    const id = msg.message.chat.id;
    const data = msg.data;
    if (data === 'first_flat'){  
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_1.jpg'));
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_2.jpg')); 
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_3.jpg')); 
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_4.jpg')); 
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_5.jpg'));  
        await bot.sendMessage(id,`${flats[1].text}`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Загрузить ещё', callback_data: 'second_flat'}],
                ]
            }),
        });
     }
})
bot.on('callback_query', async msg=>{
    const id = msg.message.chat.id;
    const data = msg.data;
    if (data === 'second_flat'){  
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_1.jpg'));
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_2.jpg')); 
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_3.jpg')); 
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_4.jpg')); 
        await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_5.jpg'));  
        await bot.sendMessage(id,`${flats[2].text}`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Загрузить ещё', callback_data: 'third_flat'}],
                ]
            }),
        });
     }
})
bot.on('callback_query', async msg=>{
    const id = msg.message.chat.id;
    const data = msg.data;
    if (data === 'third_flat'){  
        await bot.sendMessage(id, `     🚫ВНИМАНИЕ 🚫

Вы исчерпали лимит бесплатных объявлений 👨‍💻

Вы можете приобрести полную базу недвижимости у нашего «БОТА»👨‍💻

Более 5️⃣0️⃣0️⃣ актуальных вариантов уже ждут именно тебя 🏬`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Оплатить \u{1F4B3}', callback_data: 'payment',url:`https://oplata.qiwi.com/form?invoiceUid=e97958d7-a624-4e16-a331-289d81af3b94`}],
                    [{text: 'Я оплатил \u{2705}', callback_data: 'payment_finish'}],
                ]
            }),
        });
       
     }
})
bot.on('callback_query', async msg=>{
    const id = msg.message.chat.id;
    const data = msg.data;
    if (data === 'payment_finish'){  
        await bot.sendMessage(id,`Спасибо за оплату! Мы проверяем ваш платеж. Полный доступ к базе данных будет получен после подтверждения платежа`);
        setTimeout(()=>{
            bot.sendMessage(id,`К сожалению, платеж не был получен`);
        },60000)
     }
})
bot.on('message', async msg=>{
    const text = msg.text;
    const id = msg.chat.id;
   
    if (text === `/start` || text === `Перезапустить бота`) {
        count++;
        await bot.sendMessage(id,`Для начала ответьте на несколько вопросов`,{
            reply_markup:keyboard,
           
        });
       await bot.sendMessage(id,`Как вас зовут ?`); 
    } else {
        switch(count){
                case 1 :
                    count++
                    await bot.sendMessage(id,`Сколько вам лет ? `);
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

