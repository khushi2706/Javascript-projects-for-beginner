const menu=[
    {
        id:1,
        title:"buttermilk pancakes",
        category:"breakfast",
        price:15.99,
        img:"https://source.unsplash.com/random?food/1",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    },
    {
        id:2,
        title:"diner double",
        category:"diner",
        price:13.99,
        img:"https://source.unsplash.com/random?food/2",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    },
    {
        id:3,
        title:"lunch double",
        category:"lunch",
        price:16.99,
        img:"https://source.unsplash.com/random?food",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    },
    {
        id:4,
        title:"buttermilk pancakes",
        category:"breakfast",
        price:15.99,
        img:"https://source.unsplash.com/random?food/3",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    },
     {
        id:5,
        title:"diner double",
        category:"diner",
        price:13.99,
        img:"https://source.unsplash.com/random?food/4",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    },
    {
        id:6,
        title:"lunch double",
        category:"lunch",
        price:16.99,
        img:"https://source.unsplash.com/random?food/5",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    },
    {
        id:7,
        title:"buttermilk pancakes",
        category:"breakfast",
        price:15.99,
        img:"https://source.unsplash.com/random?food/6",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    },
     {
        id:8,
        title:"diner double",
        category:"diner",
        price:13.99,
        img:"https://source.unsplash.com/random?food/7",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    },
    {
        id:9,
        title:"lunch double",
        category:"lunch",
        price:16.99,
        img:"https://source.unsplash.com/random?food/8",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    },
    {
        id:10,
        title:"buttermilk pancakes",
        category:"breakfast",
        price:15.99,
        img:"https://source.unsplash.com/random?food/9",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing dfs adfasdfasdfasdf"
    }
]

const sectionCenter=document.querySelector(".sectionContent")
const buttons = document.querySelector(".buttons");

window.addEventListener("DOMContentLoaded", function(){
    displayMenuItems(menu);    
    displayMenuBtns();
})

function displayMenuItems(menuItems){
    var displayMenu=menuItems.map(function(item){
        // console.log(item.img)

        return ` <div class="service-item" >
        <div class="service-item-inner " >
             <img src="${item.img}" class="photo" >
             <div class="item-info">
                 <header>
                     <h4>${item.title}</h4>
                     <h4 class="price">${item.price}</h4>
                 </header>
                 <hr class="h_line">
                 <p class="item-text">${item.desc}</p>
             </div>
        </div>
       
    </div>`
    });
    displayMenu=displayMenu.join("")
    sectionCenter.innerHTML=displayMenu;
}
function displayMenuBtns(){
    const categories=menu.reduce( function(values,item){
        if(!values.includes(item.category)){
            values.push(item.category)
        }
        return values;
    },["all"]);
    
    const categoryBtns = categories.map(function(category){
        return `<button class="filter-btn" type="button"data-id=${category}>${category}</button>`
    }).join("")
    buttons.innerHTML=categoryBtns;
    const filterBtns=document.querySelectorAll(".filter-btn")

    

// filter items

filterBtns.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        const ctg=e.currentTarget.dataset.id;
        const menuCategory=menu.filter(function (menuItem){
            if(menuItem.category ===ctg){
                return menuItem;
            }
        })
        if(ctg === "all"){
            displayMenuItems(menu)
        }
        else{
            displayMenuItems(menuCategory)
        }
    })
})
}