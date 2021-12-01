//объявление переменных
let title = null;
let screens = null;
let screenPrice = null;
let adaprive = null;
let rollback = 500;
let fullPrice = null;
let servicePercentPrice = null;
let allServicePrices = null;
let service1 = null;
let service2 = null;

const isNumber = function(num){
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function(){
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );
  
  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  }
  while(!isNumber(screenPrice));
  
  adaprive = window.confirm("Нужен ли адаптив на сайте?");
};

const showTypeOf = function(variable){
  console.log(variable, typeof variable);
};

const getAllServicePrices = function(){
  let sum = 0;
  for (let i = 0; i < 2; i++){
    let num;
    if(i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    }else if( i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }
  while(!isNumber(num)) {
      num = +prompt("Сколько это будет стоить?", 500);
    }
    sum +=num;
  }
  return sum;
};

function getFullPrice(){
  return +screenPrice + allServicePrices;
}

const getTitle = function(){
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

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaprive);

console.log('allServicePrices', allServicePrices);
console.log("screens", screens.toLowerCase().split(","));
console.log(getRollbackMessage(fullPrice));
console.log("servicePercentPrice", servicePercentPrice);
