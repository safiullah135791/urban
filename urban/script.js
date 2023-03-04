const show = (toggle,nav) =>{
    const toggleId  = document.getElementById(toggle);
    const navId = document.getElementById(nav)
    
    if(toggleId && navId){
        toggleId.addEventListener('click',()=>{
            navId.classList.toggle('show')
        })
    }
}
show('navbar','nav');

const product = [
    {
        id : 0,
        image : 'img/1.jpg',
        title : 'Shirts',
        price : 350 
    },
    {
        id : 1,
        image : 'img/2.jpg',
        title : 'T-shirts',
        price : 240 
    },
    {
        id : 2,
        image : 'img/3.jpg',
        title : 'Formal Dresses',
        price : 620
    },
    {
        id : 3,
        image : 'img/4.jpg',
        title : 'Swetter',
        price : 530 
    },
    {
        id : 4,
        image : 'img/5.jpg',
        title : 'Casual Shirts',
        price : 570 
    },
    {
        id : 5,
        image : 'img/6.jpg',
        title : 'Branded T-shirts',
        price : 450 
    }
]

const categories = [...new Set(product.map((item)=> {return item}))]

let i = 0;

document.getElementById("search").addEventListener('keyup',(e)=>{
    const searchData = e.target.value.toLowerCase();
    const filterData = categories.filter((item)=>{
        return(
            item.title.toLowerCase().includes(searchData)
        )
    })
    displayItem(filterData)
})
const displayItem = (items)=>{
    document.getElementById("new__fashion").innerHTML = items.map((item)=>{
        var {image,title,price} = item;
        return(
            `<div class="new__images">
            <img class='product-image' src=${image} alt="">
            <p class="img__name">${title}</p>
            <span class="price">$ ${price}.00</span>
            <button class="add-to-cart">Add to Cart</button>
            </div>`
        )
    }).join('')
}

displayItem(categories)

const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
    if (cartModalOverlay.style.transform === 'translateX(-200%)'){
      cartModalOverlay.style.transform = 'translateX(0)';
    } else {
      cartModalOverlay.style.transform = 'translateX(-200%)';
    }
  })
  // end of open cart modal

// close cart modal
const closeBtn = document.querySelector ('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')){
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})

const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (var j=0; j < addToCart.length; j++) {
  button = addToCart[j];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('price')[0].innerText;
  
  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  addItemToCart (price, imageSrc);
   updateCartPrice()
}

function addItemToCart (price, imageSrc) {
    var productRow = document.createElement('div');
    productRow.classList.add('product-row');
    var productRows = document.getElementsByClassName('product-rows')[0];
    var cartImage = document.getElementsByClassName('cart-image');
    
    for (var j = 0; j < cartImage.length; j++){
      if (cartImage[j].src == imageSrc){
        alert ('This item has already been added to the cart')
        return;
      }
    }

    
  var cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        </div>
        
      `
  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
  productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
  updateCartPrice()

}


const removeBtn = document.getElementsByClassName('remove-btn')
for(var j=0;j<removeBtn.length;j++){
    button = removeBtn[j];
    button.addEventListener('click',removeItem)
}
function removeItem(event){
    btnClicked = event.target;
    btnClicked.parentElement.parentElement.remove();
    updateCartPrice()    
}
var quantityInput = document.getElementsByClassName('product-quantity')[0]
for(var j=0;j<quantityInput;j++){
    input = quantityInput[j];
    input.addEventListener('change',changeQuantity)
    }
function changeQuantity(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartPrice()
}


function updateCartPrice(){
    var total = 0;
    for(var i=0;i<productRow.length;i+=2){
        cartRow = productRow[i];

        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity )      
    }

  document.getElementsByClassName('total-price')[0].innerText =  '$' + total

  document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
  
}


const purchaseBtn = document.querySelector('.purchase-btn');

const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked () {
  alert ('Thank you for your purchase');
  cartModalOverlay.style.transform= 'translateX(-100%)'
 var cartItems = document.getElementsByClassName('product-rows')[0]
 while (cartItems.hasChildNodes()) {
   cartItems.removeChild(cartItems.firstChild)
   
 }
 updateCartPrice()
}