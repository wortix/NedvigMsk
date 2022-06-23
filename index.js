const TelegramApi = require('node-telegram-bot-api');
const fs = require('fs');
const { dirname } = require('path');
const token = '5550511372:AAExmmhr9P2T2RG0pcipBEEkNBMTm7RtQoY';
let flats = [
    {  text:`Апартаменты-студия, 32 м² в ЖК «Лайнер», Восточный, сдан в 4 кв. 2016 Москва, САО, р-н Хорошевский, Ходынский бул 2


Апартамент-студия 185 с просторной лоджией и панорамным видом на улицу. Апартамент оборудован всей необходимой мебелью и техникой (кондиционер, холодильник, варочная панель, посудомоечная и стиральная машины), а также кухонным гарнитуром и барной стойкой со стульями на две персоны. Апартамент наполнен современной мебелью в бежевой цветовой гамме. В зоне отдыха расположен раскладной диван, установлен ЖК телевизор с тумбой. В прихожей имеется вместительный шкаф и скамья с полкой для обуви. В квартире один совмещенный санузел с душевой кабиной, раковиной и зеркалом с подсветкой. Разрешено проживание с животными! Близость к центру города, 300 м от ст. метро ЦСКА, удобство автомобильных развязок, соседство с объектами спортивного клуба ЦСКА и огромный выбор торгово-развлекательной инфраструктуры - далеко не полный список преимуществ расположения арендного дома "Лайнер". Услуги 24/7 ВКЛЮЧЕНЫ В АРЕНДНУЮ ПЛАТУ! (прием корреспонденции, заявок на ремонт, выдача гостевых пропусков и т.д.). Удобный и доступный сервис дополнительных услуг: уборка, стирка, глажка, а также присмотр за животными и др. При заселении оплачивается стоимость аренды за первый месяц. Доступна рассрочка оплаты депозита на 3 месяца! Дополнительно оплачиваются только счетчики коммунальных услуг.`,
  }, 
      {
          text: `Апартаменты-студия, 32 м² в ЖК «Лайнер», Западный, сдан в 4 кв. 2017 Москва, САО, р-н Хорошевский, Ходынский бул., 20А   


Студия с диваном в выделенной секции. Предлагается в аренду студия от собственника, оснащенная всей необходимой бытовой техникой (посудомоечная машина, встроенный холодильник, духовка, варочная панель, вытяжка, кондиционер, телевизор 32 дюйма смарт тв). Санузел оборудован ванной, стиральной машиной, зеркало-шкафом с подсветкой. В прихожей настенная вешалка для верхней одежды и напольная для обуви. Глубокий четырех-секционный шкаф для одежды, тумба под ТВ. В обеденной зоне 2 барных стула и барная стойка, диван раскладывается, спальное место приблизительно 160 на 200. Присутствует остекленная лоджия. Дом находится в районе с развитой инфраструктурой, в двух минутах ходьбы от ТЦ "АВИАПАРК" и парка Ходынское поле. На территории дома располагаются: продуктовые магазины (ВкусВилл, Пятерочка, Мой Маркет), различные рестораны и кафе, студии красоты, массажный салон, химчистка, ателье. Территория комплекса оборудована двумя видами паркинга (подземная парковка арендуется от 9 тыс/мес, под шлагбаумом вокруг дома бесплатно). Дом находится на охраняемой территории. Бесплатное техническое обслуживание за счет арендодателя на весь период проживания, ежедневный консьерж-сервис, личный кабинет арендатора. В секции на каждом этаже камеры видеонаблюдения и охрана 24 часа. Коммунальные платежи включены, кроме счетчиков (свет, вода). Договор заключается на 6 либо 11 месяцев, возврат депозита по истечении срока договора.`,
      },
      {
          text: `1-комн. апартаменты, 32 м² Москва, ВАО, р-н Соколиная гора, 2-й Вольный пер., 11


Срочно сдаются двухуровневые апартаменты общей площадью 32 метра в "LOFT Вольный"! Современное решение по выгодной цене! Совмещенный санузел, потолки 4 метра, панорамные окна. Дизайнерская отделка в стиле лофт, продуманные общественные пространства на этаже, обустроенная внутренняя территория в единой концепции. На территории есть собственная инфраструктура. Вход по пропускам, ресепшн. Есть всё необходимое для комфортного проживания: мебель, техника, кондиционер, стиральная машинка, холодильник, интернет. Всего 9 минут пешком от станции МЦК "Соколиная гора", в пешей доступности парк культуры и отдыха "Измайловский". До метро Семеновская можно доехать за 14 минут. Отличная транспортная доступность. Оперативный показ, звоните!`,
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
        await bot.sendMessage(id, `Вы исчерпали свой лимит бесплатных объявлений`);
       
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

