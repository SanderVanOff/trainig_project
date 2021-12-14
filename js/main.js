'use strict'

//объявление переменных
const title = document.getElementsByTagName('h1')[0];

const startBtn = document.getElementById('start');
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const addBtn = document.querySelector('.screen-btn');

const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback [type="range"]');
const rangeValue = document.querySelector('span.range-value');


const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const fullCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');



const appData = {
  title: '',
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaprive: true,
  rollback: 0,
  priceWithRollback: 0,
  fullPrice: 0,
  servicePricePercent: 0,
  servicePriceNumber: 0,
  servicePrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  isError: false,
  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', appData.checkValue);
    addBtn.addEventListener('click', appData.addScreenBlock);
    inputRange.addEventListener('input', appData.addRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      
      appData.screens.push({
        id: index,
        name:selectName,
        count: +input.value,
        price: +select.value * +input.value
      });
    });
  },

  addScreenBlock: function(){
      const cloneScreen = screens[0].cloneNode(true);
      screens[screens.length - 1].after(cloneScreen);
  },

  addServices: function () {
    percentItems.forEach(item => {
      const check = item.querySelector('input[type="checkbox"');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"');
      if(check.checked){
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    numberItems.forEach(item => {
      const check = item.querySelector('input[type="checkbox"');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"');
      if(check.checked){
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  //
  addPrice: function () {
    appData.screenPrice = appData.screens.reduce((sum, current) => {
      return sum += +current.price;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePriceNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricePercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice = +appData.screenPrice + appData.servicePricePercent + appData.servicePriceNumber;

    appData.screensCount = appData.screens.reduce((sum, current) => {
      return sum += current.count;
    }, 0);
    appData.rollback = +inputRange.value;
    appData.priceWithRollback = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    
  },

  addRollback: function () {
    rangeValue.textContent = `${inputRange.value}%`;
  }, 

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrice();
    // appData.logger();
    appData.showResult();

  },
  checkValue: function(){
    appData.isError = false;
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if(select.value === '' || input.value === '') {
        appData.isError = true;
      }
      if(!appData.isError) {
        appData.start();
      } else {
        alert('Заполни поля');
      }
    });
  },
  showResult: function(){
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePriceNumber + appData.servicePricePercent;
    fullTotalCount.value = appData.fullPrice;
    fullCountRollback.value = appData.priceWithRollback;
    totalCount.value = appData.screensCount;
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.priceWithRollback);
    console.log(appData.screens);
  }
};


appData.init();