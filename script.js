// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  weekDay = document.querySelector('.day');
// Options

let a =[];

// Show Time
function showTime() {
  let today = new Date(),
  hour = today.getHours(),
  min = today.getMinutes(),
  sec = today.getSeconds();
  month = getWeekMonth(today);
  day = today.getDate();
  week = getWeekDay(today);
  // Set AM or PM
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
    greeting.textContent = 'Добрый день, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      `url(./assets/images/evening/${a[hour]}.jpg)`;
    greeting.textContent = 'Добрый вечер, ';
  }
}

let n=1;

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
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
    if(e.target.innerText == ''){
      localStorage.setItem('name', '');
      name.textContent = '[Enter Name]';
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') ==='') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
    if(e.target.innerText === ''){
      localStorage.setItem('focus', '');
      focus.textContent = '[Enter Focus]';
    }
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', ()=>{
  if(name.textContent === 'Введите имя'){
    name.textContent = '';
  }
});

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', ()=>{
  if (focus.textContent === '[Enter Focus]'){
    focus.textContent = '';
  }
})

// Run
showTime();
setBgGreet();
getName();
getFocus();

const nextBtn = document.querySelector('.nextBtn');
nextBtn.addEventListener('click', ()=>{
  nextBackground();
})

const reset = document.querySelector('.localStore');
reset.addEventListener('click', ()=>{
  localStorage.clear();
})

// Цитаты 
const blockquote = document.querySelector('.blockquote');
const figcaption = document.querySelector('.figcaption');
const btn = document.querySelector('.btn');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {  
  const url = `https://api.forismatic.com/api/1.0/?method=getQuote&key=4553&format=json&lang=ru`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);


// Погода
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherHumidity =document.querySelector('.humidity') ;
const windSpeed = document.querySelector('.speed') ;

function setCity(e) {
  if (e.type === 'keypress') {
  if (e.which == 13 || e.keyCode == 13) {
    localStorage.setItem('city', e.target.innerText);
    getWeather();
    city.blur();
  }
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
getWeather()
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);