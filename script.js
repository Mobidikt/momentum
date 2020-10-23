// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  weekDay = document.querySelector('.day');
// Options
const nextBtn = document.querySelector('.nextBtn');
let a =[];
let cit ='';
let nam ='';
let foc= '';
let n=1;

// Weather
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherHumidity =document.querySelector('.humidity') ;
const windSpeed = document.querySelector('.speed') ;

// Show Time
function showTime() {
  let today = new Date(),
  hour = today.getHours(),
  min = today.getMinutes(),
  sec = today.getSeconds();
  month = getWeekMonth(today);
  day = today.getDate();
  week = getWeekDay(today);
  // Set AM or PMА
  // const showAmPm = true;
  // const amPm = hour >= 12 ? 'PM' : 'AM';

function getWeekMonth(date){
  let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  return months[date.getMonth()];
}
  function getWeekDay(date) {
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
  }

  // // 12hr Format
  // hour = hour % 12 || 12;

  weekDay.innerHTML = `${week}, ${day} ${month}.`;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} `;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function randomNumber (){
  let random = parseInt(1+Math.random()*20)
  if(random <10){
      return random = '0'+random;
    } else {
      return random
    }
}

for(let i=0; i<24; i++){
  a[i]=randomNumber();
  if(a[i-1]!==a[i]){
  } else a[i]=randomNumber();
}
// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if(hour <6){
    document.body.style.backgroundImage =
      `url(./assets/images/night/${a[hour]}.jpg)`;
    greeting.textContent = 'Доброй ночи, ';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      `url(./assets/images/morning/${a[hour]}.jpg)`;
    greeting.textContent = 'Доброе утро, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      `url(./assets/images/day/${a[hour]}.jpg)`;
    greeting.textContent = `Добрый день, `;
  } else {
    // Evening
    document.body.style.backgroundImage =
      `url(./assets/images/evening/${a[hour]}.jpg)`;
    greeting.textContent = `Добрый вечер, `;
  }
}

function nextBackground(){
  let today = new Date(),
    hour = today.getHours();
  if((hour+n)<=23){
    document.body.style.backgroundImage =
      `url(./assets/images/evening/${a[hour+n]}.jpg)`;
      n=n+1;
  } else {
    n=-hour;
    document.body.style.backgroundImage =
    `url(./assets/images/evening/${a[hour+n]}.jpg)`;
    n=n+1;
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    name.textContent = 'Введите имя';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}


// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
      document.removeEventListener('keydown', handleEscCloseName);
    }
  } 
   else {
    localStorage.setItem('name', e.target.innerText);
    if(e.target.innerText == ''){
      localStorage.setItem('name', '');
      name.textContent = 'Введите имя';
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') ==='') {
    focus.textContent = 'Введите цель';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
      document.removeEventListener('keydown', handleEscCloseFocus);
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
    if(e.target.innerText === ''){
      localStorage.setItem('focus', '');
      focus.textContent = 'Введите цель';
    }
  }
}

// const reset = document.querySelector('.localStore');
// reset.addEventListener('click', ()=>{
//   localStorage.clear();
// })

function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', e.target.innerText);
      city.blur();
      validCity();
      document.removeEventListener('keydown', handleEscCloseCity);
    }else if(e.keyCode == 27){
      console.log(e.keyCode);
    } 
  }
  else {
    localStorage.setItem('city', e.target.innerText);
    if(e.target.innerText == ''){
      localStorage.setItem('city', '');
      city.textContent = 'Введите город';
    }
  }
}

function getCity() {
  if (localStorage.getItem('city') === null || localStorage.getItem('city') ==='') {
    city.textContent = 'Введите город';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

function validCity(){
  if(city.textContent !=='' && city.textContent !=='Введите город'){
    getWeather();
  } else {
    city.textContent = `Введите город`;
  temperature.textContent = ` °C`;
  weatherDescription.textContent = ``;
  weatherHumidity.textContent = `Влажность:  %`;
  windSpeed.textContent = `Скорость ветра:  м/с`;
  }
}

async function getWeather() {  
  try{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=98acfd1273ecf338e2e4e1a788021fc1&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp} °C`;
  weatherDescription.textContent = data.weather[0].description;
  weatherHumidity.textContent = `Влажность: ${data.main.humidity} %`;
  windSpeed.textContent = `Скорость ветра: ${data.wind.speed} м/с`;
  } catch(err) {
    city.textContent = `Введите город`;
  temperature.textContent = ` °C`;
  weatherDescription.textContent = ``;
  weatherHumidity.textContent = `Влажность:  %`;
  windSpeed.textContent = `Скорость ветра:  м/с`;
  }
  
}

function handleEscCloseCity(e) {
    if (e.key === "Escape") {
      city.textContent = cit;
      city.blur();
      validCity();
      document.removeEventListener('keydown', handleEscCloseCity);
    }
  }
function handleEscCloseName(e) {
  if (e.key === "Escape") {
    name.textContent = nam;
    name.blur();
    document.removeEventListener('keydown', handleEscCloseName);
  }
}
function handleEscCloseFocus(e) {
  if (e.key === "Escape") {
    focus.textContent = foc;
    focus.blur();
    document.removeEventListener('keydown', handleEscCloseFocus);
  }
}

city.addEventListener('keypress', setCity);
city.addEventListener('blur', validCity);
city.addEventListener('click', ()=>{
  if (city.textContent === 'Введите город'){
    city.textContent = '';
  } else { cit = city.textContent;}
  document.addEventListener('keydown', handleEscCloseCity);
})

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', ()=>{
  if(name.textContent === 'Введите имя'){
    name.textContent = '';
  } else { nam = name.textContent;}
  document.addEventListener('keydown', handleEscCloseName);
});

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', ()=>{
  if (focus.textContent === 'Введите цель'){
    focus.textContent = '';
  } else { foc = focus.textContent;}
document.addEventListener('keydown', handleEscCloseFocus);
});

nextBtn.addEventListener('click', ()=>{
  nextBackground();
});

document.addEventListener('DOMContentLoaded', validCity);
// Run
showTime();
setBgGreet();
getName();
getFocus();
getCity();
validCity();
