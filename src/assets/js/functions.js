const API_KEY = '9fd7a449d055dba26a982a3220f32aa2';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const citySelect = document.querySelector('#city');
const submitCity = document.querySelector('#submit');
const weatherDiv = document.querySelector('#weather');

const mealSelect = document.getElementById("meal-select");
const submitButton = document.getElementById("submit-button");
const mealName = document.getElementById("meal-name");
const mealImage = document.getElementById("meal-image");
const mealCat = document.getElementById("meal-category");
const mealIns = document.getElementById("meal-ins");
const youtubeButton = document.getElementById("youtube-button");


// Fetch the food data from the API
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=American")
  .then(response => response.json())
  .then(data => {
    // Populate the dropdown menu with the meal names
    data.meals.forEach(meal => {
      const option = document.createElement("option");
      option.value = meal.idMeal;
      option.text = meal.strMeal;
      mealSelect.add(option);
    });
  })
  .catch(error => console.log(error));


// Add a click event listener to the submit button
submitButton.addEventListener("click", () => {
  // Get the selected meal ID from the dropdown menu
  const selectedMealId = mealSelect.value;

  // Fetch the meal details from the API using the selected meal ID
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMealId}`)
    .then(response => response.json())
    .then(data => {
      // Display the meal name and image
      mealName.textContent = data.meals[0].strMeal;
      mealImage.src = data.meals[0].strMealThumb;
      mealCat.textContent = data.meals[0].strCategory;
      mealIns.textContent = data.meals[0].strInstructions;
     // Show the YouTube button
     youtubeButton.style.display = "inline-block";
     youtubeButton.dataset.youtubeLink = data.meals[0].strYoutube;
   })
   .catch(error => console.log(error));
});

      // Add a click event listener to the YouTube button
      youtubeButton.addEventListener("click", () => {
      const youtubeLink = youtubeButton.dataset.youtubeLink;
      if (youtubeLink) {
        window.open(youtubeLink, "_blank");
      }
      });

      // Add a click event listener to the submitCity (for weather)
      submitCity.addEventListener('click', () => {
        const selectedCity = citySelect.value;
        const url = `${BASE_URL}?q=${selectedCity}&appid=${API_KEY}`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = Math.round(data.main.temp - 273.15);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const cityName = data.name;
      
            weatherDiv.innerHTML = `
              <h2>${cityName}</h2>
              <br>
              <p> ☀️ Weather: ${weatherDescription}</p>
              <p> 🌡️ Temperature: ${temperature}°C</p>
              <p> 🌧 Humidity: ${humidity}%</p>
              <p> 💨 Wind Speed: ${windSpeed} m/s</p>
            `;
      
            weatherDiv.style.display = 'block';
          })
          .catch(error => {
            console.error(error);
          });
      });