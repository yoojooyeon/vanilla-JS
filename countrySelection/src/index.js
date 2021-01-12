import "./styles.css";


const select = document.querySelector("select");

const COUNTRY_LS = "country";

// saving selection value to the local storage 
function saveCountry() {
  const loadedCountry = select.value;
  localStorage.setItem(COUNTRY_LS, loadedCountry);
}

// displaying the saved value from local storage  
function handleChange() {
  const getValue = localStorage.getItem(loadedCountry);
  if (getValue) {
    const option = document.querySelector(`option[value="${getValue}"]`);
    option.getValue = true;
  }
}

function changeEffect() {
  select.addEventListener("change", saveCountry);
}

function init() {
  handleChange;
  changeEffect;
}

init();
