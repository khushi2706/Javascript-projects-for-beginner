const secrchBtn = document.getElementById("search-btn")
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipleCloseBtn = document.getElementById('recipe-close-btn')
const container = document.getElementById('container');


//event listenrs
secrchBtn.addEventListener('click',getMealList);
mealList.addEventListener('click',getRecipe);
var mealData = []
//get meallist
// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                mealData.push(meal);
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meals)
{
    console.log(meals);
    meal = meals[0];
    let html = `
    <div class = "recipe-meal-img">
      <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <p class = "recipe-category">${meal.strCategory}</p>
    <div class = "recipe-instruct">
      <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
      </div>
    
    <div class = "recipe-link">
      <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>`
    mealDetailsContent.innerHTML = html;
    
    // .classList.add('dark-bg')
    mealDetailsContent.parentElement.classList.add('showRecipe');
    container.classList.add('dark-bg')
    
    document.getElementById("recipe-close-btn").addEventListener("click", ()=>{
        container.classList.remove('dark-bg');
        mealDetailsContent.parentElement.classList.remove('showRecipe');
    });
  
}