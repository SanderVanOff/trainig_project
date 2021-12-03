//объявление переменных

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaprive: true,
  rollback: 10,
  fullPrice: 0,
  servicePercentPrice: 0,
  allServicePrices: 0,
  service1: '',
  service2: '',
  //
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    );
    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    }
    while (!appData.isNumber(appData.screenPrice));
    appData.adaprive = confirm("Нужен ли адаптив на сайте?");
  },
  //
  getAllServicePrices: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      let num = 0;
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }

      do {
        num = prompt("Сколько это будет стоить?", 500);
      } while (!appData.isNumber(num));
      sum += +num;
    }
    return sum;
  },
  //
  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },
  ///
  getTitle: function () {
    return appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
  },
  getServicePercentPrices: function () {
    return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
  },
  ///
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num !== null;
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    appData.logger();

  },
  logger: function(){
    for(key in appData){
      console.log(key, appData[key]);
    }
  }
};


appData.start();