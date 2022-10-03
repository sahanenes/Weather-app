const APIKey = "d8433635a719a5191d57e2e5d9343f98";

const form = document.querySelector("form");
const inputForm = document.getElementById("city");
const result = document.getElementById("result");
const warning = document.querySelector(".warning");
// console.log(navigator.geolocation.getCurrentPosition());
function getLocationData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(gettinglocationData);
  } else {
    warning.innerHTML = "Geolocation is not supported by this browser.";
  }
}
getLocationData();
async function gettinglocationData(item) {
  console.log(item.coords);
  const lat = item.coords.latitude;

  const long = item.coords.latitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}`;
  await fetch(url)
    .then((res) => {
      if (!res.ok) {
        warning.innerHTML = `${res.status} error for current city`;
        throw new Error();
      }
      return res.json();
    })
    .then((data) => createCity(data));
}

form.onsubmit = (e) => {
  e.preventDefault();
  getWeatherData();
};
const getWeatherData = async () => {
  let input = inputForm.value;

  let weatherType = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIKey}&units=${weatherType}`;
  await fetch(url)
    .then((res) => {
      if (!res.ok) {
        warning.innerHTML = `${res.status} error, You have to enter a valid city name `;
        throw new Error();
      }
      return res.json();
    })
    .then((data) => {
      createCity(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
      inputForm.value = "";
    });
};
const createCity = (data) => {
  const { name, main, weather, sys } = data;
  const cityNames = result.querySelectorAll(".card-title");
  const cityNamesArray = Array.from(cityNames);
  if (cityNamesArray.length > 0) {
    console.log(cityNamesArray);
    const filteredArray = cityNamesArray.filter(
      (text) => text.innerText == name
    );
    if (filteredArray.length > 0) {
      warning.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
      setTimeout(() => {
        warning.innerText = "";
      }, 5000);
      form.reset();
      return;
    }
  }
  console.log(cityNames);
  const newCity = document.createElement("div");
  newCity.setAttribute("class", "cityclass");
  newCity.innerHTML = `
  <div class="card" >

  <div class="card-body">
    <h5 class="card-title">${name} </h5> 
    <h5 class="card-country"> ${sys.country}</h5> 
    <p class="card-text"> ${Math.floor(main.temp)}°C</p>
 
  <ul class="list-group list-group-flush">
    <li class="list-group-item" ><img style="width: 4rem;" src="./img/cloud_89333.png" alt=""></li>
    
    <li class="list-group-item">${weather[0].description}</li>
  </ul>
  <div class="RemoveBtn ">Remove</div>
  
</div>

`;
  result.appendChild(newCity);
  inputForm.value = "";
  warning.innerHTML = "";
};
result.addEventListener("click", (e) => {
  if (e.target.innerText === "Remove") {
    e.target.closest(".cityclass").remove();
  }
});
