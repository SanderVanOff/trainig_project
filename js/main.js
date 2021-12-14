'use strict'

//объявление переменных
const title = document.getElementsByTagName('h1')[0];

const startBtn = document.getElementById('start');
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const addBtn = document.querySelector('.screen-btn');

const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const cmsOpen = document.querySelector('#cms-open');
const inputRange = document.querySelector('.rollback [type="range"]');
const rangeValue = document.querySelector('span.range-value');


const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const fullCountRollback = document.getElementsByClassName('total-input')[4];
const cmsVariants = document.querySelector('.hidden-cms-variants');
const selectCmsVariants = cmsVariants.querySelector('#cms-select');
const cmsOtherInput = document.querySelector('#cms-other-input');
const mainControl = cmsVariants.querySelector('.main-controls__input');

let screens = document.querySelectorAll('.screen');

console.log(selectCmsVariants.value)

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
  isActive: true,
  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', this.checkValue.bind(appData));
    addBtn.addEventListener('click', this.addScreenBlock.bind(appData));
    inputRange.addEventListener('input', this.addRollback);
    cmsOpen.addEventListener('change', this.openCMS.bind(appData));
    resetBtn.addEventListener('click', this.reset.bind(appData));
    selectCmsVariants.addEventListener('change', this.showOtherControl.bind(appData));
  },
  addTitle: function () {
    document.title = title.textContent;
  },

  addScreens: function () {
    this.screens = [];
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      
      this.screens.push({
        id: index,
        name:selectName,
        count: +input.value,
        price: +select.value * +input.value
      });
    });
  },

  removeScreen: function () {
    screens.forEach((screen, idx) => {
      if(idx !== 0) {
        screen.remove();
      } else {
        screen.querySelector('select').value = '';
        screen.querySelector('input').value = '';
      }
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
      const input = item.querySelector('input[type="text"]');
      if(check.checked){
        this.servicesPercent[label.textContent] = +input.value;
      }
      console.log(check.id)
    });

    numberItems.forEach(item => {
      const check = item.querySelector('input[type="checkbox"');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');
      if(check.checked){
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  removeServices: function () {
    percentItems.forEach(item => {
      item.querySelector('input[type="checkbox"').checked = false;
    });

    numberItems.forEach(item => {
      item.querySelector('input[type="checkbox"').checked = false;
    });

    inputRange.value = 0;
    this.addRollback();
    cmsVariants.style.display = 'none';
    cmsOpen.checked = false;
    selectCmsVariants.value = '';
    cmsOtherInput.value = '';
    mainControl.style.display = 'none';
  },
  //
  addPrice: function () {
    this.screenPrice = this.screens.reduce((sum, current) => {
      return sum += +current.price;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePriceNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricePercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice = +this.screenPrice + this.servicePricePercent + this.servicePriceNumber;

    this.screensCount = this.screens.reduce((sum, current) => {
      return sum += current.count;
    }, 0);
    this.rollback = +inputRange.value;
    if(selectCmsVariants.value === '50') {
      this.fullPrice = this.fullPrice + (this.fullPrice / 2);
    } 
    if(cmsOtherInput.value) {
      this.fullPrice = this.fullPrice + (this.fullPrice * (+cmsOtherInput.value / 100));
    }
    this.priceWithRollback = this.fullPrice - (this.fullPrice * (this.rollback / 100));
    
  },

  addRollback: function () {
    rangeValue.textContent = `${inputRange.value}%`;
  }, 
  cleanData: function () {
    for(let key in cleanAppData) {
      appData[key] = cleanAppData[key];
    } 
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrice();
    // this.logger();
    this.showResult();
    this.isActive = false;
    this.changeIsActive();
  },
  reset: function () {
    
    this.removeScreen();
    this.removeServices();
    this.cleanData();
    this.showResult();
    this.isActive = true;
    this.changeIsActive();
  },
  changeIsActive: function () {
    if(this.isActive){
      screens.forEach(screen => {
        const select = screen.querySelector('select');
        const input = screen.querySelector('input');
        select.disabled = false;
        input.disabled = false;
      });
      addBtn.disabled = false;
      startBtn.style.display = '';
      resetBtn.style.display = 'none';
    } else {
      screens.forEach(screen => {
        const select = screen.querySelector('select');
        const input = screen.querySelector('input');
        select.disabled = true;
        input.disabled = true;
      });
      addBtn.disabled = true;
      startBtn.style.display = 'none';
      resetBtn.style.display = 'block';
    }
    
  },
  checkValue: function(){
    this.isError = false;
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if(select.value === '' || input.value === '') {
        this.isError = true;
      }
      if(!this.isError) {
        this.start();
      } else {
        alert('Заполни поля');
      }
    });
  },
  showResult: function(){
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePriceNumber + this.servicePricePercent;
    fullTotalCount.value = this.fullPrice;
    fullCountRollback.value = this.priceWithRollback;
    totalCount.value = this.screensCount;
  },
  openCMS: function (event) {
    if(event.target.checked) {
      cmsVariants.style.display = 'flex';
    } else {
      cmsVariants.style.display = 'none';
    }
  
    
  },

  showOtherControl: function (event) {
    if(event.target.value === 'other') {
      mainControl.style.display = 'block';
    }else {
      mainControl.style.display = 'none';
    }
  },
  logger: function () {
    console.log(this.fullPrice);
    console.log(this.priceWithRollback);
    console.log(this.screens);
  }
};

const cleanAppData = Object.assign({}, appData);

appData.init();


