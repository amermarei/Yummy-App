$(document).ready(function(){
    $("#loading").fadeOut(500, function(){
        $("#loading").remove();
        $("body").css("overflow", "visible");
    })
})
let menuWidth = $(".menBar").outerWidth();
$(".bar").click(function(){
    if($(".menu").css("left")=== "0px"){
         $(".menu").animate({left:`-${menuWidth}`},500)
         $(".nav").animate({left:`-${menuWidth}`},500)
         $(".bar i").addClass("fa-bars-staggered")
         $(".bar i").removeClass("fa-xmark")
    }else {
        $(".menu").animate({left:"0px"},500)
        $(".nav").animate({left:"0"},500)
        $(".bar i").removeClass("fa-bars-staggered")
        $(".bar i").addClass("fa-xmark")
    }
});






// landing 
async function meal(){
    let Api = await fetch ("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    Api = await Api.json();
    showData(Api.meals.slice(0,20),"landing  .row");
};
meal()



//  search 
$(".searchLink").click(function() {
    $(".landing").fadeOut(200,function(){
        $(".categories").fadeOut(200,function(){
        $(".Ingredients").fadeOut(200,function(){
        $(".areas").fadeOut(200,function(){
            $(".search").removeClass("d-none");
            $(".Detail").addClass("d-none");
            $("#contact").addClass("d-none")
        });
        });
        });
    })
    $(".menu").animate({left:`-${menuWidth}`},500)
    $(".nav").animate({left:`-${menuWidth}`},500)
    $(".bar i").addClass("fa-bars-staggered")
    $(".bar i").removeClass("fa-xmark")
});


// search by name 
async function search(name){
    $(".loading-container").fadeIn(100);
    let searchApi = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    searchApi = await searchApi.json();
    showData(searchApi.meals,"search .searchDetails");
    $(".loading-container").fadeOut(400);
};
$(".searchName").keyup(function(e){
    search(e.target.value);
})

//  search by letter 
async function searchLetter(l){
    $(".loading-container").fadeIn(100);
    let letterApi = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
    letterApi = await letterApi.json();
     if (letterApi.meals) {
        showData(letterApi.meals,"search .searchDetails");
    }else {
        search(l)
    }
    $(".loading-container").fadeOut(400);
};

$(".searchLetter").keyup(function(e){
    if(this.value.length !== 0)
    searchLetter(e.target.value)
})

$('.searchLetter').on("input", function () {
    if (this.value.length > 1)
        this.value = this.value.slice(0, 1);
});
    



// category 

$(".category").click(function() {
    $(".landing").fadeOut(200,function(){
        $(".Ingredients").fadeOut(200,function(){
            $(".areas").fadeOut(200,function(){
         $(".categories").fadeIn(200,function(){
        $(".search").addClass("d-none");
        $(".Detail").addClass("d-none");
        $("#contact").addClass("d-none");
        category();
         });
         });
         });
    });
    
    $(".menu").animate({left:`-${menuWidth}`},500)
    $(".nav").animate({left:`-${menuWidth}`},500)
    $(".bar i").addClass("fa-bars-staggered")
    $(".bar i").removeClass("fa-xmark")
});

async function category(){
    $(".loading-container").fadeIn(100);
    let searchApi = await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`)
    searchApi = await searchApi.json();
    $(".mainCategory").removeClass("d-none");
    $(".filterCategory").addClass("d-none");
    displayCategory(searchApi.categories);
    $(".loading-container").fadeOut(100);
};


function displayCategory(m){
    let x =``;
    for(let i=0 ; i<m.length; i++){
        x+= `
        <div class="col-lg-3 col-md-4" > 
            <div class="img shadow "  onclick="filterCategory('${m[i].strCategory}')">
              <img src="${m[i].strCategoryThumb}" class="w-100 rounded-3" alt="">
              <div class="overlay">${m[i].strCategory}</div>
            </div>
        </div>        
        `
    }
    $(".categories .mainCategory").html(x);
};

async function filterCategory(c){
    let searchApi = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`)
    searchApi = await searchApi.json();
    $(".mainCategory").addClass("d-none");
    $(".filterCategory").removeClass("d-none");
    showData(searchApi.meals,"categories .filterCategory");
};



// Area 
$(".Area").click(function() {
    $(".landing").fadeOut(200,function(){
         $(".categories").fadeOut(200,function(){
             $(".Ingredients").fadeOut(200,function(){
            $(".areas").fadeIn(200,function(){
            $(".search").addClass("d-none");
            $(".Detail").addClass("d-none");
            $("#contact").addClass("d-none")
            area()
            })
            })
         });
    });
    $(".menu").animate({left:`-${menuWidth}`},500)
    $(".nav").animate({left:`-${menuWidth}`},500)
    $(".bar i").addClass("fa-bars-staggered")
    $(".bar i").removeClass("fa-xmark")
});

async function area(){
    $(".loading-container").fadeIn(100);
    let searchApi = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    searchApi = await searchApi.json();
    $(".mainArea").removeClass("d-none");
    $(".filterArea").addClass("d-none");
    displayArea(searchApi.meals);
    $(".loading-container").fadeOut(400);
};


function displayArea(m){
    let x =``;
    for(let i=0 ; i<20; i++){
        x+= `
        <div class="col-lg-3 col-md-4" > 
            <div class="content shadow text-center"  onclick="filterArea('${m[i].strArea}')">
              <i class="fa-solid text-danger fa-3x fa-earth-europe"></i>
              <h2 class="my-3">${m[i].strArea}</h2>
            </div>
        </div>        
        `
    }
    $(".areas .mainArea").html(x);
};

async function filterArea(c){
    let searchApi = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${c}`)
    searchApi = await searchApi.json();
    $(".mainArea").addClass("d-none");
    $(".filterArea").removeClass("d-none");
    showData(searchApi.meals,"areas .filterArea");
};



// Ingredient

$(".Ingredient").click(function() {
    $(".landing").fadeOut(200,function(){
         $(".categories").fadeOut(200,function(){
            $(".areas").fadeOut(200,function(){
                 $(".Ingredients").fadeIn(200,function(){
                 $(".search").addClass("d-none");
                 $(".Detail").addClass("d-none");
                 $("#contact").addClass("d-none")
                 ingredients()
                 })
             })
            })
         });
    $(".menu").animate({left:`-${menuWidth}`},500)
    $(".nav").animate({left:`-${menuWidth}`},500)
    $(".bar i").addClass("fa-bars-staggered")
    $(".bar i").removeClass("fa-xmark")
});

async function ingredients(){
    $(".loading-container").fadeIn(100);
    let searchApi = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    searchApi = await searchApi.json();
    $(".mainIngredients").removeClass("d-none");
    $(".filterIngredients").addClass("d-none");
   displayingredients(searchApi.meals.slice(0,20));
   $(".loading-container").fadeOut(400);
};

function displayingredients(m){
    let x =``;
    for(let i=0 ; i<m.length; i++){
        x+= `
        <div class="col-lg-3 col-md-4" > 
            <div class="content shadow text-center " onclick="filteringredients('${m[i].strIngredient}')">
              <i class="fa-solid fa-3x text-info fa-bowl-food"></i>
              <h2 class="my-3">${m[i].strIngredient}</h2>
              <p  class="lead">${m[i].strDescription.split(" ").splice(0,20).join(" ")}...</p>
            </div>
        </div>        
        `
    }
    $(".Ingredients .mainIngredients").html(x);
};
async function filteringredients(c){
    let searchApi = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${c}`)
    searchApi = await searchApi.json();
    $(".mainIngredients").addClass("d-none");
    $(".filterIngredients").removeClass("d-none");
    showData(searchApi.meals,"Ingredients .filterIngredients");
};

// get id of element  and fetch that details 
async function getId(id){
    let Api = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    Api = await Api.json();
    $(".landing").fadeOut(200,function(){
    $(".Detail").removeClass("d-none");
    $(".search").addClass("d-none");
    $(".filterCategory").addClass("d-none");
    $(".filterArea").addClass("d-none");
    $(".filterIngredients").addClass("d-none");
    $("#contact").addClass("d-none");
    })
    showDetails(Api.meals);
};

// function to show details  of element
function showDetails(m){
    let x =``;
    let recipe = ``
     let tags = m[0].strTags?.split(",")
    let tag =``
    for (let i = 1; i <= 20; i++) {
        if (m[0][`strIngredient${i}`]) {
            recipe += `<li class="my-2 me-2 p-2 d-inline-block alert-success rounded">${m[0][`strMeasure${i}`]} ${m[0][`strIngredient${i}`]}</li>`
        }
    }
    for (let i = 0; i < tags?.length; i++) {
            tag += `<li class="my-2 me-2 p-2 d-inline-block alert-success rounded">${tags[i]}</li>`
    }
    for(let i=0 ; i<m.length; i++){
    x+= `
          <div class="col-md-4">
            <div class="content">
              <img src="${m[i].strMealThumb}" class="w-100 rounded-3 shadow-lg" alt="">
              <h2 class="text-white fs-1 mt-3 fw-lighter text-center">${m[i].strMeal}</h2>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="desc">
              <h3 class="fs-3 text-white mb-3">Instructions :</h3>
              <p class="description lh-lg">${m[i].strInstructions}</p>
              <p class="area fs-3 text-white mb-3">Area :<span class="text-muted fs-5"> ${m[i].strArea}</span></p>
              <div class="recipe">
                <p class="fs-3 text-white mb-3">Recipes :</p>
                <ul class="list-unstyled">
                    ${recipe}
                </ul>
              </div>
              <div class="tag">
                <p class="fs-3 text-white mb-3">Tags :</p>
                    <ul class="list-unstyled">
                        ${tag}
                    </ul>
              </div>
              <div class="links">
                <p class="fs-3 text-white mb-3">links :</p>
                <ul class="list-unstyled">
                   <li class="my-2 me-2 p-2 d-inline-block bg-danger rounded"> <a href="${m[i].strYoutube}">Youtube</a></li>
                   <li class="my-2 me-2 p-2 d-inline-block bg-success rounded"><a href="${m[i].strSource}">Source</a></li>
                </ul>
              </div>
            </div>
          </div>     
    `
    }
    $(".Detail .row").html(x)
}

//  function to display Data 
function showData(m,sec){
    let x =``;
    for(let i=0 ; i<m.length; i++){
        x+= `
        <div class="col-lg-3 col-md-4" >
            <div class="img shadow " onclick="getId(${m[i].idMeal})">
              <img src="${m[i].strMealThumb}" class="w-100 rounded-3" alt="">
              <div class="overlay text-center">${m[i].strMeal}</div>
            </div>
        </div>        
        `
    }
    $(`.${sec}`).html(x);
};



// contact us 

$(".Contact").click(function() {
      $(".landing").fadeOut(200,function(){
         $(".categories").fadeOut(200,function(){
            $(".areas").fadeOut(200,function(){
            $(".Ingredients").fadeOut(200,function(){
                        $(".search").addClass("d-none");
                        $(".Detail").addClass("d-none");
                        $("#contact").removeClass("d-none");
                        clear()
                    })
            })
         });
    });
    $(".menu").animate({left:`-${menuWidth}`},500)
    $(".nav").animate({left:`-${menuWidth}`},500)
    $(".bar i").addClass("fa-bars-staggered")
    $(".bar i").removeClass("fa-xmark")
});
let userName = document.getElementById("name"),
    userEmail = document.getElementById("email"),
    userPhone = document.getElementById("phone"),
    userAge = document.getElementById("age"),
    userPassword = document.getElementById("password"),
    userRePassword = document.getElementById("rePassword"),
    userNameAlert = document.getElementById("namealert"),
    userEmailAlert = document.getElementById("emailalert"),
    userPhoneAlert = document.getElementById("phonealert"),
    userAgeAlert = document.getElementById("agealert"),
    userpasswordAlert = document.getElementById("passwordalert"),
    userRepasswordAlert = document.getElementById("repasswordalert");

function clear(){
    userEmail.value = "";
    userPhone.value = "";
    userAge.value = "";
    userPassword.value = "";
    userRePassword.value = "";
    userName.value = "";
}
userName.addEventListener("focus", () => {
    nameToached = true
})
userEmail.addEventListener("focus", () => {
    emailToached = true
})
userPhone.addEventListener("focus", () => {
    phoneToached = true
})
userAge.addEventListener("focus", () => {
    ageToached = true
})
userPassword.addEventListener("focus", () => {
    passwordToached = true
})
userRePassword.addEventListener("focus", () => {
    repasswordToached = true
})
let nameToached = false,
    emailToached = false,
    phoneToached = false,
    ageToached = false,
    passwordToached = false,
    repasswordToached = false;

function validation() {

    if (nameToached) {
        if (userNameValid()) {
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")

        } else {
            userName.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }

    if (emailToached) {
        if (userEmailValid()) {
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmail.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }

    if (phoneToached) {
        if (userPhoneValid()) {
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhone.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }

    if (ageToached) {
        if (userAgeValid()) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAge.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }

    if (passwordToached) {
        if (userPasswordValid()) {
            userPassword.classList.remove("is-invalid")
            userPassword.classList.add("is-valid")
            userpasswordAlert.classList.replace("d-block", "d-none")
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userPassword.classList.replace("is-valid", "is-invalid")
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if (repasswordToached) {
        if (userRePasswordValid()) {
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userRepasswordAlert.classList.replace("d-block", "d-none")
            userRepasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userRePassword.classList.replace("is-valid", "is-invalid")
            userRepasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }

}

function userNameValid() {
    return /^[a-zA-Z ]+$/.test(userName.value)
}

function userEmailValid() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}

function userPhoneValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}

function userAgeValid() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function userPasswordValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}

function userRePasswordValid() {
    return userPassword.value == userRePassword.value
}

