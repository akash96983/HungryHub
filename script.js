const ranRecipe = document.getElementById("random");
const ingredients = document.getElementById("ingredients")
const search = document.getElementById("searc")
const finalRes = document.getElementById("searchedfood")

fetch("https://www.themealdb.com/api/json/v1/1/random.php")
.then((res)=>{
    return res.json();
})
.then((res)=>{
    console.log(res.meals),randomFood(res.meals[0])
})
.catch((err)=>{
    console.log(err);
});


function randomFood(data){
    console.log(data);
    let recImage = document.createElement("img");
    recImage.src=data.strMealThumb;
    recImage.style.height='300px';
    recImage.style.width="400px"
    recImage.style.borderRadius = "10px"
    
    let p = document.createElement("p");
    p.style.backgroundColor="#3D3D3D"
    p.innerText = data.strMeal;
    p.style.color="white"
    p.style.fontSize="30px"
    p.style.textAlign="center"
    ranRecipe.append(recImage,p)

    let div = document.createElement("div")
    let h3 = document.createElement("h3");

    h3.innerHTML=`INGREDIENTS  <i class="fa fa-sign-out" style="font-size:48px;color:black;margin-left:30px" onclick=ingredients.style.display="none"></i>`;
    div.append(h3);

    for(let i=1;i<=20;i++){
        let p = document.createElement("p");
        let INGREDIENTS = `strIngredient${i}`;
        p.innerText = data[INGREDIENTS];
        div.append(p);

        div.style.border="2px solid black"
        div.style.backgroundColor="white";
        div.style.height="auto"
        div.style.width="80%"
        div.style.margin="auto";
        div.style.padding="50px"
        div.style.fontSize = "20px";
        div.style.borderRadius="10px"
        div.textAlign="center"

        ingredients.append(div)
        ranRecipe.onclick=()=>{
            ingredients.style.display="inherit"
        }
    }
}

search.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        rec = search.value;
        console.log(rec)

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${rec}`)
    .then(res=>
        res.json()
    )
    .then((data)=>{
       searchedRec(data.meals)
    })

    }
})

function searchedRec(data){
    console.log(data)
        data.forEach((el)=>{
        let div = document.createElement("div");
        let img = document.createElement("img");

        img.src = el.strMealThumb;
        img.style.height = '200px';

        let p = document.createElement("p");
        p.innerHTML=el.strMeal;
        p.style.color="white"

        div.append(img,p);
        finalRes.append(div);
    })
}


