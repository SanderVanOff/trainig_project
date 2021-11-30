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
let servicePrice2 = +prompt("Сколько это будет стоить?", 500);
let fullPrice = null;
let servicePercentPrice = null;
let allServicePrices = null;

const showTypeOf = function(variable){
  console.log(variable, typeof variable);
};

const getAllServicePrices = function(price1, price2){
  return price1 + price2;
};

function getFullPrice(){
  return screenPrice + allServicePrices;
}

const getTitle = function(title){
  return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
};

const getServicePercentPrices = function(){
  return Math.round(fullPrice - rollback);
};

const getRollbackMessage = function(price){
  if(price >= 30000) {
    return "Даем скидку в 10%";
  } else if(price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if(price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};


allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaprive);
console.log("screens", screens.toLowerCase().split(","));
console.log(getRollbackMessage(fullPrice));
console.log("servicePercentPrice", servicePercentPrice);
