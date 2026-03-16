fetch("data.json")
  .then(respones => respones.json())
  .then(data => {
     dat=data;
    latestdrop(data.latest_drop, "indexpage")
    latestdrop(data.shopall, "shopall_card")
    latestdrop(data.categorywise.men, "men_card")
    latestdrop(data.categorywise.women, "women_card")
    latestdrop(data.categorywise.pack_gear, "packs_gear_card")
   
  })
  let dat;
function latestdrop(data, id) {
  let item = document.getElementById(id)
  if (!item) return;
  data.forEach(itemdetails => {
    if (itemdetails.discount != "") {
      item.innerHTML += `<div class="col-md-3 col-sm-4 col-6 all-card pb-5">
          <div class="card-image  mb-3 position-relative">
            <a href="SameProduct.html" onclick="Related('${itemdetails.img}','${itemdetails.name}','${itemdetails.oldPrice}','${itemdetails.newPrice}','${itemdetails.discount}')"><img src="${itemdetails.img}" class="img-fluid" alt="" ></a>
            <span class="position-absolute m-3 start-0 card-discount">${itemdetails.discount}</span>
            <div>
            <button class="icon1" style="background-color:white; border-radius:50%" 
            data-bs-toggle="tooltip"data-bs-placement="left"title="Add to cart" >
            <span  onclick="addToCart('${itemdetails.name}','${itemdetails.newPrice}','${itemdetails.img}')"><i class="fa-solid fa-cart-shopping">
            </i></span></button>
           <button class="icon2"  data-bs-toggle="modal" data-bs-target="#productModal"  onclick="QuickView('${itemdetails.img}','${itemdetails.name}','${itemdetails.oldPrice}','${itemdetails.newPrice}','${itemdetails.discount}')" style="background-color:white; border-radius:50%">
           <span 
           data-bs-toggle="tooltip"data-bs-placement="left"title="Quick View"
           ><i class="fa-solid fa-eye"></i></span>
          </button>
            </div>
          </div>
          <div class="px-3 img-heading">
           <h6>${itemdetails.name}</h6>
           <del>${itemdetails.oldPrice}</del>
           <span>${itemdetails.newPrice}</span>
          </div>
          </div>`
    }
    else {
      item.innerHTML += `<div class="col-md-3 col-sm-4 col-6 all-card pb-5">
          <div class="card-image  mb-3 position-relative">
            <a href="SameProduct.html" onclick="Related('${itemdetails.img}','${itemdetails.name}','${itemdetails.oldPrice}','${itemdetails.newPrice}','${itemdetails.discount}')"><img src="${itemdetails.img}" class="img-fluid" alt="" ></a>
            <div>
            <button class="icon1" style="background-color:white; border-radius:50%" data-bs-toggle="tooltip"data-bs-placement="left"title="Add to cart"><span  onclick="addToCart('${itemdetails.name}','${itemdetails.newPrice}','${itemdetails.img}')"><i class="fa-solid fa-cart-shopping">
            </i></span></button>
           <button class="icon2"  data-bs-toggle="modal" data-bs-target="#productModal" onclick="QuickView('${itemdetails.img}','${itemdetails.name}','${itemdetails.oldPrice}','${itemdetails.newPrice}','${itemdetails.discount}')" style="background-color:white; border-radius:50%">
           <span data-bs-toggle="tooltip"data-bs-placement="left"title="Quick View"  ><i class="fa-solid fa-eye"></i></span>
          </button>
            </div>
          </div>
          <div class="px-3 img-heading">
           <h6>${itemdetails.name}</h6>
           <span>${itemdetails.newPrice}</span>
          </div>
          </div>`
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipTriggerList.forEach(function(el){
       new bootstrap.Tooltip(el)
    })
  });
}



function sort(value,page,id){
if(value === "highTolow"){
   highTolow(page,id)
}

if(value === "lowTohigh"){
   lowTohigh(page,id)
}

if(value ==="Default sorting"){
   let data;
  if(page == "shopall"){
    data = [...dat.shopall];
  }
  else if(page == "men"){
    data = [...dat.categorywise.men];
  }
  else if(page == "women"){
    data = [...dat.categorywise.women];
  }
  else if(page == "pack_gear"){
    data = [...dat.categorywise.pack_gear];
  }
document.getElementById(id).innerHTML = "";
  latestdrop(data , id);
}


}
function lowTohigh(page , id){
  let data;
  if(page == "shopall"){
    data = [...dat.shopall];
  }
  else if(page == "men"){
    data = [...dat.categorywise.men];
  }
  else if(page == "women"){
    data = [...dat.categorywise.women];
  }
  else if(page == "pack_gear"){
    data = [...dat.categorywise.pack_gear];
  }

  data.sort(function(a,b){
    return parseFloat(a.newPrice.replace("$","")) - parseFloat(b.newPrice.replace("$",""));
  });
document.getElementById(id).innerHTML = "";
  latestdrop(data , id);
}
function highTolow(page,id){
  let data;
  if(page == "shopall"){
    data = [...dat.shopall];
  }
  else if(page == "men"){
    data = [...dat.categorywise.men];
  }
  else if(page == "women"){
    data = [...dat.categorywise.women];
  }
  else if(page == "pack_gear"){
    data = [...dat.categorywise.pack_gear];
  }

  data.sort(function(a,b){
    return parseFloat(b.newPrice.replace("$","")) - parseFloat(a.newPrice.replace("$",""));
  });

 document.getElementById(id).innerHTML = "";
  latestdrop(data , id);
}
