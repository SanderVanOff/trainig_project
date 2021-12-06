//объявление переменных

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaprive: true,
  rollback: 10,
  fullPrice: 0,
  servicePercentPrice: 0,
  allServicePrices: 0,
  services: {},
  //
  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    } while (appData.isNumber(appData.title));


    for (let i = 0; i < 2; i++) {
      let name = '';
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (appData.isNumber(name));

      let price = 0;
      do {
        price = prompt("Сколько будет стоить данная работа?");
      }
      while (!appData.isNumber(price));

      appData.screens.push({
        id: i,
        name,
        price: +price
      });
    }



    for (let i = 0; i < 2; i++) {
      let name = '';
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (appData.isNumber(name));
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?", 500);
      } while (!appData.isNumber(price));
      appData.services[name + (i + 1)] = +price;
    }

    appData.adaprive = confirm("Нужен ли адаптив на сайте?");
  },
  //
  addPrice: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, current) {
      return sum += +current.price;
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  //
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  ///
  getTitle: function () {
    return appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
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
    appData.addPrice();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();

  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  }
};


appData.start();