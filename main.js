//объявление переменных
let title = "Название проекта";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1000;
let rollback = 50;
let fullPrice = 20000;
let adaprive = true;

// alert('Переменные объявлены');

//Типы данных
console.log("type of title:", typeof title);
console.log("type of fullPrice:", typeof fullPrice);
console.log("type of adaprive:", typeof adaprive);
//длина строки
console.log("screens length:", screens.length);
//Стоимость верстки экранов
console.log(
  "Cтоимость верстки эрканов:",
  `${screenPrice} руб. /`,
  `${(screenPrice / 76).toFixed(1)} $. /`,
  `${(screenPrice / 2.76).toFixed(1)} ₴. /`,
  `${(screenPrice / 11.68).toFixed(1)} ¥.`
);
console.log(
    "Стоимость разработки сайта:",
    `${fullPrice} руб. /`,
    `${(fullPrice / 76).toFixed(1)} $. /`,
    `${(fullPrice / 2.76).toFixed(1)} ₴. /`,
    `${(fullPrice / 11.68).toFixed(1)} ¥.`
  );
//
console.log("screens", screens.toLowerCase().split(","));
//
console.log("откат", fullPrice * (rollback / 100));
