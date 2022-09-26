const APIKey = "d8433635a719a5191d57e2e5d9343f98";
const form = document.querySelector("form");
const inputForm = document.getElementById("city");
const result = document.getElementById("result");
const warning = document.querySelector(".warning");

form.onsubmit = (e) => {
  e.preventDefault();
  getWeatherData();
};
const getWeatherData = () => {
  let input = inputForm.value;

  let weatherType = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIKey}&units=${weatherType}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        warning.innerHTML = `there is a ${res.status} error`;
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
  const newCity = document.createElement("div");
  newCity.setAttribute("class", "cityclass");
  newCity.innerHTML = `
  <div class="card" >

  <div class="card-body">
    <h5 class="card-title">${name} , ${sys.country}</h5> 
    <p class="card-text">Temperature is ${Math.floor(main.temp)}°C</p>
 
  <ul class="list-group list-group-flush">
    <li class="list-group-item" ><img style="width: 4rem;" src="./img/cloud_89333.png" alt=""></li>
    
    <li class="list-group-item">${weather[0].description}</li>
  </ul>
  <div class="RemoveBtn ">Remove</div>
  
</div>`;
  result.appendChild(newCity);
  inputForm.value = "";
  warning.innerHTML = "";
};
result.addEventListener("click", (e) => {
  if (e.target.innerText === "Remove") {
    e.target.closest(".cityclass").remove();
  }
});
