const TelegramApi = require('node-telegram-bot-api');
const fs = require('fs');
const { dirname } = require('path');
const token = '5550511372:AAExmmhr9P2T2RG0pcipBEEkNBMTm7RtQoY';

let moskow = [
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
  let piter = [
    {  text:`
Цена: 10000 рyблeй в мecяц+cчётчики cвeт и вoда. (бeз oтoплeния)

Сдaю в aрeндy cтyдию. 51 кв/м. Цeнa: 
B квapтиpe ecть вcя нeoбxoдимaя бытoвaя мeбeль и тexникa, вecь нaбop пocуды.
Я coбcтвeнник, кoмиccии или зaлoгa - нeт.

Peдкo зaxoжy в BK, мoгy нe yвидeть, пpocьбa пиcaть тoлькo в WhаtsАрр +7(950)017-73-14 (Дарья)
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
Цена: 35000. + ку

Новые однокомнатные апартаменты 39 кВ с лоджией от СОБСТВЕННИКА. Пулковское шоссе д.14 ст6 , 10 мин. м. ЗВЕЗДНАЯ. Новая мебель, техника , есть все необходимое. Отличное Расположение -10 мин.пешком ст.м.Звездная, Аэропорт -10 мин.на машине/такси ,15 мин. «Экспофорум», исторический центр города -20 мин, выезды на КАД, ЗСД. Хорошая инфраструктура - сетевые магазины, супермаркет 24, бар, ресторан, кофейня . Территория под видеонаблюдением , есть подземный паркинг (50 ₽ 2 часа), также можно парковаться на домовой территории. 

Контактный номер +79165897899`,
      }
  
  ];
  let novosibirsk = [
    {  text:`
Цена: 9000 рyблeй в мecяц+cчётчики cвeт и вoда. (бeз oтoплeния)

Микрорайон Горский 3, 7 минут ходьбы до станции метро Студенческая. Комната 12 м2. Мебель, холодильник, интернет, бытовая техника. 

89130192591 Наталья


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
Цена: 35000. + ку

Новые однокомнатные апартаменты 39 кВ с лоджией от СОБСТВЕННИКА. Пулковское шоссе д.14 ст6 , 10 мин. м. ЗВЕЗДНАЯ. Новая мебель, техника , есть все необходимое. Отличное Расположение -10 мин.пешком ст.м.Звездная, Аэропорт -10 мин.на машине/такси ,15 мин. «Экспофорум», исторический центр города -20 мин, выезды на КАД, ЗСД. Хорошая инфраструктура - сетевые магазины, супермаркет 24, бар, ресторан, кофейня . Территория под видеонаблюдением , есть подземный паркинг (50 ₽ 2 часа), также можно парковаться на домовой территории. 

Контактный номер +79165897899`,
      }
  
  ];
const bot = new TelegramApi(token,{polling:true})
const keyboard = {
    keyboard: [
        ["Перезапустить бота"],
    ],
    resize_keyboard: true 
}
let count = 0;

bot.setMyCommands([
    {command: '/start', description: 'Начать работу'},     
])
let info = {
    cities: null,
};
bot.on('callback_query', async msg => {
    let id = msg.message.chat.id;
    let data = msg.data;
    
    switch (data) {
        case 'age' :
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/interview/family.jpg'));  
            await bot.sendMessage(id,`Сколько людей будет проживать ?`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: '1', callback_data: 'count_people'},{text: '2', callback_data: 'count_people'},{text: '3', callback_data: 'count_people'}],
                    [{text: '>3 ', callback_data: 'count_people'}],
                ]
            }),
        });
        data = null;
        id = null;
        break;
        case 'count_people' :
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/interview/pets.jpg'));  
            await bot.sendMessage(id,`Есть ли у вас домашние животные ?`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Да', callback_data: 'pets'}],
                    [{text: 'Нет', callback_data: 'pets'}],
                ]
            }),
        });
        data = null;
        id = null;
        break;
        case 'pets':
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/interview/job.jpg'));  
            await bot.sendMessage(id,`Есть ли у вас работа ?`,{
                reply_markup:JSON.stringify({
                    inline_keyboard:[
                        [{text: 'Да', callback_data: 'job'}],
                        [{text: 'Нет', callback_data: 'job'}],
                        [{text: 'Не хочу отвечать', callback_data: 'job'}],
                    ]
                }),
            }); 
            data = null;
            id = null;
            break;
        case 'job':
            bot.sendMessage(id,`Для начала поиска недвижимости нажмите на кнопку`,{
                reply_markup:JSON.stringify({
                    inline_keyboard:[
                        [{text: 'Начать работу', callback_data: 'search'}]
                    ]
                }),
            });
            data = null;
            id = null;
            break;
        case 'search':
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/city.jpg'));
            await bot.sendMessage(id,`В каком городе вы ищите квартиру?`,{
             reply_markup:JSON.stringify({
                 inline_keyboard:[
                     [{text: 'Москва', callback_data: 'Moskow'}],
                     [{text: 'Санкт-Петербург', callback_data: 'Piter'}],
                     [{text: 'Новосибирск', callback_data: 'Novosibirsk'}],
                    ]
             }),
         });
         data = null;
         id = null;
         break;
         case 'Novosibirsk':
            info.cities = 'Novosibirsk'
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/cities/Pererburg.jpg'));
            await bot.sendMessage(id,`Где присматриваете квартиру ?`,{
             reply_markup:JSON.stringify({
                 inline_keyboard:[
                     [{text: 'Дзержинский район', callback_data: 'place'}],
                     [{text: 'Железнодорожный район', callback_data: 'place'}],
                     [{text: 'Заельцовский район', callback_data: 'place'}],
                     [{text: 'Калининский район', callback_data: 'place'}],
                     [{text: 'Кировский  район', callback_data: 'place'}],
                     [{text: 'Ленинский район', callback_data: 'place'}],
                     [{text: 'Октябрский район район', callback_data: 'place'}],
                     [{text: 'Советский район', callback_data: 'place'}],
                     [{text: 'Центральный район', callback_data: 'place'}]
                    ]
             }),
         });
         data = null;
         id = null;
         break;
         case 'Piter':
            info.cities = 'Piter'
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/cities/Novosibirsk.jpg'));
            await bot.sendMessage(id,`Где присматриваете квартиру ?`,{
             reply_markup:JSON.stringify({
                 inline_keyboard:[
                     [{text: 'Адмиралтейский район', callback_data: 'place'}],
                     [{text: 'Василеостровский район', callback_data: 'place'}],
                     [{text: 'Выборгский район', callback_data: 'place'}],
                     [{text: 'Калининский район', callback_data: 'place'}],
                     [{text: 'Кировский  район', callback_data: 'place'}],
                     [{text: 'Колпинский район', callback_data: 'place'}],
                     [{text: 'Красногвардейский район', callback_data: 'place'}],
                     [{text: 'Красносельский район', callback_data: 'place'}],
                     [{text: 'Кронштадский район', callback_data: 'place'}],
                     [{text: 'Курортный район', callback_data: 'place'}],
                     [{text: 'Московский район', callback_data: 'place'}],
                     [{text: 'Невский район', callback_data: 'place'}],
                     [{text: 'Петроградский район', callback_data: 'place'}],
                     [{text: 'Петродворцовый район', callback_data: 'place'}],
                     [{text: 'Приморский район', callback_data: 'place'}],
                     [{text: 'Фрунзенский район', callback_data: 'place'}],
                     [{text: 'Центральный район', callback_data: 'place'}],
                    ]
             }),
         });
         data = null;
         id = null;
         break;
         case 'Moskow':
            info.cities = 'Moskow';
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/img_1.jpg'));
            await bot.sendMessage(id,`Где присматриваете квартиру ?`,{
             reply_markup:JSON.stringify({
                 inline_keyboard:[
                     [{text: 'Центральный административный округ', callback_data: 'place'}],
                     [{text: 'Северный административный округ', callback_data: 'place'}],
                     [{text: 'Северо-восточный административный округ', callback_data: 'place'}],
                     [{text: 'Восточный административный округ', callback_data: 'place'}],
                     [{text: 'Южный административный округ', callback_data: 'place'}],
                     [{text: 'Юго-западный административный округ', callback_data: 'place'}],
                     [{text: 'Западный административный округ', callback_data: 'place'}],
                     [{text: 'Северо-Западный административный округ', callback_data: 'place'}],
                     [{text: 'Зеленоградский административный округ', callback_data: 'place'}],
                     [{text: 'Новомосковский административный округ', callback_data: 'place'}],
                     [{text: 'Троицкий административный округ', callback_data: 'place'}],
                    ]
             }),
         });
         data = null;
         id = null;
         break;
         case 'place':
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/img_2.jpeg'));
            await bot.sendMessage(id,`Сколько комнат должно быть в квартире ?`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Студия', callback_data: 'room'}],
                    [{text: '1', callback_data: 'room'},{text: '2', callback_data: 'room'},{text: '3', callback_data: 'room'}]
                ]
            }),
        });
        data = null;
        id = null;
        break;
        case 'room' :
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/interview/money.jpg'));  
            await bot.sendMessage(id,`Укажите желаемую сумму арендной платы`,{
                reply_markup:JSON.stringify({
                    inline_keyboard:[
                        [{text: '5000-10000', callback_data: 'money'},{text: '10000-15000', callback_data: 'money'},{text: '15000-20000', callback_data: 'money'}],
                        [{text: '20000-25000', callback_data: 'money'},{text: '25000-30000', callback_data: 'money'},{text: '30000-35000', callback_data: 'money'}],
                        [{text: '35000-40000', callback_data: 'money'},{text: '40000-50000', callback_data: 'money'},{text: '>50000', callback_data: 'money'}],
                    ]
                }),
            });
        data = null;
        id = null;    
        break;
        case 'money':
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
        data = null;
        id = null;
        break;
        case 'metro':
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
        data = null;
        id = null;
        break;
        case 'waiting' :
            switch (info.cities) { 
                case 'Novosibirsk':
                    await bot.sendMessage(id,`Мы подобрали для вас несколько квартир`);   
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Novosibirsk/1/flat_1.jpg'));
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Novosibirsk/1/flat_2.jpg'));
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Novosibirsk/1/flat_3.jpg'));
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Novosibirsk/1/flat_4.jpg'));
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Novosibirsk/1/flat_5.jpg')); 
                    await bot.sendMessage(id,`${novosibirsk[0].text}`,{
                reply_markup:JSON.stringify({
                   inline_keyboard:[
                       [{text: 'Загрузить ещё', callback_data: 'first_flat'}],
                   ]
               }),
                });
                break;    
                case 'Piter':
                    await bot.sendMessage(id,`Мы подобрали для вас несколько квартир`);   
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/1/flat_1.jpg'));
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/1/flat_2.jpg'));
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/1/flat_3.jpg'));
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/1/flat_4.jpg'));
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/1/flat_5.jpg')); 
                    await bot.sendMessage(id,`${piter[0].text}`,{
                        reply_markup:JSON.stringify({
                        inline_keyboard:[
                            [{text: 'Загрузить ещё', callback_data: 'first_flat'}],
                        ]
                        }),
                    });
                break;
                case 'Moskow':
                    await bot.sendMessage(id,`Мы подобрали для вас несколько квартир`);   
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_2.jpg'));
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_1.jpg')); 
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_3.jpg')); 
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_4.jpg')); 
                    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/1/flat_5.jpg'));  
                    await bot.sendMessage(id,`${moskow[0].text}`,{
                    reply_markup:JSON.stringify({
                    inline_keyboard:[
                    [{text: 'Загрузить ещё', callback_data: 'first_flat'}],
                    ]
                }),
                    });
                break;
        }
        data = null;
        id = null;
        break;
        case 'first_flat':
            if (info.cities === 'Piter'){
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/2/flat_1.jpg'));
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/2/flat_2.jpg'));
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/2/flat_3.jpg'));
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/2/flat_4.jpg'));
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/2/flat_5.jpg'));
                await bot.sendMessage(id,`${piter[1].text}`,{
                reply_markup:JSON.stringify({
                    inline_keyboard:[
                        [{text: 'Загрузить ещё', callback_data: 'second_flat'}],
                    ]
                }),
            });
            } else {
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_1.jpg'));
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_2.jpg')); 
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_3.jpg')); 
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_4.jpg')); 
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/2/flat_5.jpg'));  
                await bot.sendMessage(id,`${moskow[1].text}`,{
                reply_markup:JSON.stringify({
                    inline_keyboard:[
                        [{text: 'Загрузить ещё', callback_data: 'second_flat'}],
                    ]
                }),
            });
            }
            
        data = null;
        id = null;
        break;
        case 'second_flat':
           if (info.cities === 'Piter'){
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/3/flat_1.jpg'));
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/3/flat_2.jpg'));
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/3/flat_3.jpg'));
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/3/flat_4.jpg'));
                await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/Piter/3/flat_5.jpg'));
           } else {
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_1.jpg'));
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_2.jpg')); 
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_3.jpg')); 
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_4.jpg')); 
            await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/examples/3/flat_5.jpg'));  
           }
        await bot.sendMessage(id,`${moskow[2].text}`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Загрузить ещё', callback_data: 'third_flat'}],
                ]
            }),
        });
        data = null;
        id = null;
        break;
        case 'third_flat':
            await bot.sendMessage(id, `     🚫ВНИМАНИЕ 🚫

Вы исчерпали лимит бесплатных объявлений 👨‍💻

Вы можете приобрести подписку на полную базу недвижимости у нашего «БОТА»👨‍💻

Более 5️⃣0️⃣0️⃣ актуальных вариантов уже ждут именно тебя 🏬`,{
            reply_markup:JSON.stringify({
                inline_keyboard:[
                    [{text: 'Подписка на 3 дня - 599 руб \u{1F4B3}', callback_data: 'payment',url:`https://oplata.qiwi.com/form?invoiceUid=5b316932-ded8-4c4a-b609-cca15747d308`}],
                    [{text: 'Подписка на 1 месяц 1999 руб \u{1F4B3}', callback_data: 'payment',url:`https://oplata.qiwi.com/form?invoiceUid=5e5b928e-625a-4c88-bba6-dbae5b9a3d5a`}],
                    [{text: 'Я оплатил \u{2705}', callback_data: 'payment_finish'}],
                ]
            }),
        });
        data = null;
        id = null;
        break;
        case 'payment_finish':
        await bot.sendMessage(id,`Спасибо за оплату! Мы проверяем ваш платеж. Полный доступ к базе данных будет получен после подтверждения платежа`);
        setTimeout(()=>{
            bot.sendMessage(id,`К сожалению, платеж не был получен`);
        },120000);
        data = null;
        id = null;
        break;
    }
    
       
     
});











bot.on('message', async msg=>{
    const text = msg.text;
    const id = msg.chat.id;
    if (text === `/start` || text === `Перезапустить бота`) {
    await bot.sendMessage(id,`Для начала ответьте на несколько вопросов. 
Будьте честными, арендодатели иногда выставляют дополнительные требования. 
Ответы на эти вопросы помогут подобрать вам подходящий вариант.`);
    await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/interview/age.png'));
    await bot.sendMessage(id,`Сколько вам лет ?`,{
    reply_markup:JSON.stringify({
        inline_keyboard:[
            [{text: '18-25', callback_data: 'age'},{text: '26-30', callback_data: 'age'},{text: '31-35', callback_data: 'age'}],
            [{text: '36-40', callback_data: 'age'},{text: '41-49', callback_data: 'age'},{text: '50 >', callback_data: 'age'}],
        ]
    }),
});
} 
    //else {
    //     switch(count){
    //             case 1 :
    //                 count++
    //                 await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/interview/phone.jpg'));
    //                 await bot.sendMessage(id,`Укажите ваш номер телефона +7`); 
    //                 return; 
    //             case 2 :
    //                 await bot.sendPhoto(id, fs.readFileSync(__dirname +'/images/interview/age.png'));
    //                 count++
    //                 await bot.sendMessage(id,`Сколько вам лет ?`,{
    //                     reply_markup:JSON.stringify({
    //                         inline_keyboard:[
    //                             [{text: '18-25', callback_data: 'age'},{text: '26-30', callback_data: 'age'},{text: '31-35', callback_data: 'age'}],
    //                             [{text: '36-40', callback_data: 'age'},{text: '41-49', callback_data: 'age'},{text: '50 >', callback_data: 'age'}],
    //                         ]
    //                     }),
    //                 });
    //                 return; 
    //             // case 3 :
    //             //     count++
    //             //     await bot.sendMessage(id,`Сколько людей будет проживать ?`);
    //             //     return; 
    //             // case 4 :
    //             //     count++
    //             //     await bot.sendMessage(id,`Есть ли у вас домашние животные ?`);
    //             //     return; 
    //             //  case 5 :
    //             //     count++
    //             //     await bot.sendMessage(id,`Укажите минимальную сумму арендной платы`);
    //             //     return; 
    //             //  case 6 :
    //             //     count++
    //             //     await bot.sendMessage(id,`Укажите максимальную сумму арендной платы`);
    //             //     return; 
    //             //  case 7 :
    //             //     count++
    //             //     await bot.sendMessage(id,`Работаете или учитесь ?`);
    //             //     return; 
    //             // case 8:
    //             //     count = 1;
    //             //     await setTimeout(()=>{
    //             //         bot.sendMessage(id,`Отлично теперь мы можем начать подбор недвижимости для вас`);
    //             //     },1000);
    //             //     await setTimeout(()=>{
    //             //         bot.sendMessage(id,`Для начала поиска недвижимости нажмите на кнопку`,{
    //             //         reply_markup:JSON.stringify({
    //             //             inline_keyboard:[
    //             //                 [{text: 'Начать работу', callback_data: 'search'}]
    //             //             ]
    //             //         }),
    //             //     });
    //             //    },1200)
    //             //     return
    //             default: await bot.sendMessage(id,"Произошла ошибка, пожалуйста, перезапустите бота и начните поиск заново");
    //         }  
    // }   
})

