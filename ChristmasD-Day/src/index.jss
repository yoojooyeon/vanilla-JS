// * This Christmas time is based in Korean time *
// First, the time was set to UTC, Universal Coordinated Time, to generalize the time zones
// Then, it was changed to Korean specific time to set the D-Day timer to work properly to count days, hours, and minutes until Christmas
// Restriction: upcoming Christmas is set to Dec-25-2021. Changes need to be made to the date accordingly for this D-day tracker to work properly

const NINE_HOURS_MILLISECONDS = 32400000;

const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h3");

function getTime() {
  const xmasDay = new Date("2021-12-25:00:00:00+0900");
  const currDay = new Date();
  const currKor = currDay.getTime() + currDay.getTimezoneOffset()*60000 + NINE_HOURS_MILLISECONDS;
  const xmasKor = xmasDay.getTime() + xmasDay.getTimezoneOffset()*60000 + NINE_HOURS_MILLISECONDS;
  
  const remaining = xmasKor - currKor;
  
  const d = 86400 * 1000;
  const h = 60 * 60 * 1000;
  const m = 60 * 1000;
  const s = 1000;

  const days = Math.floor(remaining/d);
  const hours = Math.floor((remaining%d)/h);
  const minutes = Math.floor((remaining%h)/m);
  const seconds = ((remaining%m)/s).toFixed(0);
  
  clockTitle.innerText = `${days < 10 ? `0${days}` : days}d ${hours < 10 ? `0${hours}` : hours}h ${minutes < 10 ? `0${minutes}` : minutes}m ${seconds < 10 ? `0${seconds}` : seconds}s`; 

}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
