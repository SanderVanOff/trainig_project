//объявление переменных
let title = prompt("Как называется ваш проект?");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?", 1000);
let rollback = 500;
let adaprive = window.confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?", 500);
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice3 = +prompt("Сколько это будет стоить?", 500);
let fullPrice = screenPrice + servicePrice1 + servicePrice3;
let servicePercentPrice = Math.round(fullPrice - rollback);
// alert('Переменные объявлены');

//Типы данных
console.log("type of title:", typeof title);
console.log("type of fullPrice:", typeof fullPrice);
console.log("type of adaprive:", typeof adaprive);
//длина строки
console.log("screens length:", screens.length);
//Стоимость верстки экранов
console.log("Cтоимость верстки эрканов:", `${screenPrice} руб.`);
console.log("Стоимость разработки сайта:", `${fullPrice} руб.`);
//
console.log("screens", screens.toLowerCase().split(","));
//
console.log("откат", fullPrice * (rollback / 100));
console.log("servicePercentPrice", servicePercentPrice);
console.log(fullPrice);

switch (true) {
  case fullPrice >= 30000:
    console.log("Даем скидку в 10%");
    break;
  case fullPrice >= 15000 && fullPrice < 30000:
    console.log("Даем скидку в 5%");
    break;
  case fullPrice >= 0 && fullPrice < 15000:
    console.log("Скидка не предусмотрена");
    break;
  default:
    console.log("Что то пошло не так");
}
