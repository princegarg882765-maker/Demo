let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(name, price, image) {

    price = parseFloat(price.replace("$", ""));

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }

    saveCart();
    updateCart();
}
function updateCart() {

    let cartItems = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let navTotal=document.getElementById("nav-total");
    let cartbutton = document.getElementById("cart-button");
    let ViewCart = document.getElementById("ViewCart");
    let viewcart_total = document.getElementById("viewcart-total");
    let CheckoutList = document.getElementById("Checkout-orederList");
    let innerImage = document.getElementById("inner-SameImage");
    let innerContent = document.getElementById("inner-Samecontent");
    if (cartItems && cartbutton && cartCount) {
        cartItems.innerHTML = "";
        cartbutton.innerHTML = "";
        if (cart.length === 0) {
            cartItems.innerHTML = `<div class="d-flex justify-content-center align-items-center  h-100 w-100 cart-empty-text"><p>No products in the cart</p></div>`;
            cartCount.innerText = 0;
            navTotal.innerText= "$0.00";
            cartbutton.innerHTML = `<div class="p-4">
                       <button class="btn w-100 rounded-pill cart-button">CONTINUE SHOPPING</button>
                     </div>`
            return;
        }

        let total = 0;
        let count = 0;

        cart.forEach((item, index) => {

            total += item.price * item.qty;
            count += item.qty;
            cartItems.innerHTML += `
<div class="cart-item d-flex justify-content-between align-items-start py-4 px-1">

    <div class="d-flex">
        <img src="${item.image}" width="65" class="me-3 ">

        <div>
            <h6 class="mb-2">${item.name}</h6>

            <div class="qty-box d-flex align-items-center">
                <button class="qty-btn" onclick="changeQty(${index},-1)">-</button>
                <span class="px-3 border-start border-end">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
            </div>
        </div>
    </div>

    <div class="text-end" style="color:#737373;">
        <button class="remove-btn mb-2" onclick="removeItem(${index})">
           <i class="fa-solid fa-times" style="font-size:0.8rem; color:#737373;"></i>
        </button>
         <div class="fw-bold">$${(item.price * item.qty).toFixed(2)}</div>
    </div>

</div>
`;

        });

        cartbutton.innerHTML = `<div class="py-2 border-top">
  <div class="d-flex justify-content-between mb-2 pb-2 mb-3 border-bottom px-4 cart-subtotal">
    <span class="text-dark py-1">Subtotal:</span>
    <span class="py-1">$<span id="cart-total">0</span></span>
  </div>
<div class="pt-1 px-4"> 
  <a href="ViewCart.html"><button class="w-100 rounded-pill mb-3 cart-button">VIEW CART</button></a>
  <a href="Checkout.html"><button class="w-100 rounded-pill mb-3 cart-button">CHECKOUT </button></a>
</div>
</div>`
        let cartTotal = document.getElementById("cart-total");
        cartTotal.innerText = total.toFixed(2);
        cartCount.innerText = count;
        navTotal.innerText= `$${total.toFixed(2)}`;
    }


    else if (ViewCart && cartCount && viewcart_total) {
        ViewCart.innerHTML = "";
        cartCount.innerHTML = "";
        viewcart_total.innerHTML = "";
        let total = 0;
        let count = 0;
        ViewCart.innerHTML = `<tr class="border thead-cart px-5"> 
                              <th colspan="3" class="text-end">Product</th> 
                              <th>Price</th> 
                              <th>Quantity</th> 
                              <th>Subtotal</th> 
                              </tr>`;
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            count += item.qty;
            ViewCart.innerHTML += `<tr class="tbody-cart border">
         <td> <div class="text-end" style="color:#737373;"> <button class="remove-btn mb-2" onclick="removeItem(${index})"> <i class="fa-solid fa-times" style="font-size:0.8rem; color: #b5b5b5;"></i> </button> </div> </td>
        <td><img src="${item.image}" width="65" class="me-3 "></td>
         <td> <h6 class="mb-2" style=" color: #52505E;">${item.name}</h6></td>
          <td style="color: #52505E;">$${item.price.toFixed(2)}</td>
           <td> <div class="qty-box d-flex align-items-center " style=" color: #52505E;"> <button class="qty-btn" onclick="changeQty(${index},-1)">-</button> <span class="px-3 border-start border-end">${item.qty}</span> <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button> </div> </td>
            <td><div class="text-start" style=" color: #52505E;"> <div>$${(item.price * item.qty).toFixed(2)}</div> </div> </td> </tr>`;
        });
        viewcart_total.innerHTML = `<tr class="border-bottom"><td class="p-2">Subtotal</td> <td>$${total.toFixed(2)}</td></tr> <tr class="border-bottom"><td class="p-2">Total</td> <td>$${total.toFixed(2)}</td></tr>`;
        cartCount.innerText = count;
        navTotal.innerText= `$${total.toFixed(2)}`;
    }
    else if (cartCount && CheckoutList) {

        cartCount.innerHTML = "";
        CheckoutList.innerHTML = "";
        let total = 0;
        let count = 0;
        CheckoutList.innerHTML += `<tr class="border-bottom">
                  <th>Product</th>
                  <th class="text-end">Subtotal</th>
                 </tr>`
        cart.forEach((item, index) => {
            CheckoutList.innerHTML += `<tr class="border-bottom">
                    <td>${item.name} x ${item.qty} </td>
                    <td class="text-end">$${(item.price * item.qty).toFixed(2)}</td>
                    </tr>`
            total += item.price * item.qty;
            count += item.qty;
            cartCount.innerText = count;
            navTotal.innerText= `$${total.toFixed(2)}`;
        });
        CheckoutList.innerHTML += `<tr class="border-bottom">
                    <td>Subtotal</td>
                    <td class="text-end">$${total.toFixed(2)}</td>
                    </tr>
                    <tr class="border-bottom">
                    <td>Total</td>
                    <td class="text-end">$${total.toFixed(2)}</td>
                    </tr>`
    }
    else if (cartCount) {
        cartCount.innerHTML = "";

        let total = 0;
        let count = 0;

        cart.forEach((item, index) => {
            total += item.price * item.qty;
            count += item.qty;
            cartCount.innerText = count;
             navTotal.innerText= `$${total.toFixed(2)}`;
        });

    }
    else {
        return;
    }
}
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}
function changeQty(index, change) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}
function RelatedAdd(name, price, image) {
    let existing = cart.find(item => item.name === name);
    console.log("hello")
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }

    saveCart();
    updateCart();
}
function Related(img, name, oldprice, newprice, discount) {

    let product = {
        img: img,
        name: name,
        oldprice: oldprice,
        newprice: newprice,
        discount: discount
    };

    localStorage.setItem("selectedProduct", JSON.stringify(product));

}
document.addEventListener("DOMContentLoaded", function () {

    let product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (product) {
        console.log(product.discount);
        let SameImage = document.getElementById("inner-SameImage");
        let innerContent = document.getElementById("inner-Samecontent");
        SameImage.innerHTML = "";
        innerContent.innerHTML = "";
        SameImage.innerHTML = `  <div class="Same-card-image position-relative">
            <img src="${product.img}" class="h-100 w-100" alt="">
            <span class="position-absolute m-4 start-0 card-discount">${product.discount}</span>
            <div>
            </div>
          </div>`;

        innerContent.innerHTML = `
<h4 class="pb-4">${product.name}</h4>

<p class="pb-4"><del>${product.oldprice}</del>
<span>${product.newprice}</span>+ Free Shipping
Id eget magna velit lectus dui est, pellentesque dignissim sollicitudin accumsan in maecenas 
vitae dignissim bibendum feugiat purus morbi dui rhoncus elementum odio amet.</p>`;

        innerContent.innerHTML += `
                          <div class="d-flex align-items-center gap-3 border-bottom pb-3">
                              <div class="qty-box d-flex align-items-center">
                                  <button class="qty-btn">-</button>
                                  <span class="px-3 border-start border-end">1</span>
                                  <button class="qty-btn">+</button>
                              </div>
                          
                              <button class="btn-same border-0"
                              onclick="RelatedAdd('${product.name}','${product.newprice}','${product.img}')">
                                  ADD TO CART
                              </button>
                          </div>
                          <div class="safe-checkout-box">
                               <div class="checkout-title">
                                   Guaranteed Safe Checkout
                               </div>
                           
                               <div class="payment-icons">
                                   <img class="rounded-1" src="../website_image/visa.png">
                                   <img class="rounded-1" src="../website_image/mastercard.png">
                                   <img class="rounded-1" src="../website_Image/american.png">
                                   <img class="rounded-1" src="../website_Image/paypal.png">
                               </div>
                         </div>`;

    }

});
function QuickView(img, name, oldprice, newprice, discount){
      
        let SameImage = document.getElementById("inner-SameImage");
        let innerContent = document.getElementById("inner-Samecontent");
        SameImage.innerHTML = "";
        innerContent.innerHTML = "";
        SameImage.innerHTML = `  <div class="Same-card-image position-relative">
            <img src="${img}" class="h-100 w-100" alt="">
            <span class="position-absolute m-4 start-0 card-discount">${discount}</span>
            <div>
            </div>
          </div>`;

        innerContent.innerHTML = `
<h4 class="pb-4">${name}</h4>

<p class="pb-4"><del>${oldprice}</del>
<span>${newprice}</span>+ Free Shipping
Id eget magna velit lectus dui est, pellentesque dignissim sollicitudin accumsan in maecenas 
vitae dignissim bibendum feugiat purus morbi dui rhoncus elementum odio amet.</p>`;

        innerContent.innerHTML += `
                          <div class="d-flex align-items-center gap-3 border-bottom pb-3">
                              <div class="qty-box d-flex align-items-center">
                                  <button class="qty-btn">-</button>
                                  <span class="px-3 border-start border-end">1</span>
                                  <button class="qty-btn">+</button>
                              </div>
                          
                              <button class="btn-same border-0"
                              onclick="RelatedAdd('${name}','${newprice}','${img}')">
                                  ADD TO CART
                              </button>
                          </div>
                          <div class="safe-checkout-box">
                               <div class="checkout-title">
                                   Guaranteed Safe Checkout
                               </div>
                           
                               <div class="payment-icons">
                                   <img class="rounded-1" src="../website_image/visa.png">
                                   <img class="rounded-1" src="../website_image/mastercard.png">
                                   <img class="rounded-1" src="../website_Image/american.png">
                                   <img class="rounded-1" src="../website_Image/paypal.png">
                               </div>
                         </div>`;

    }
document.addEventListener("DOMContentLoaded", updateCart);