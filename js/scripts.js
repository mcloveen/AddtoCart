// Cart
let cartItems = [];

// Local Storage Cart-update
if (localStorage.getItem('cartItems')) {
  cartItems = JSON.parse(localStorage.getItem('cartItems'));

  let cartCount = document.querySelector('.cartCount')
  cartCount.innerHTML = cartItems.length
}

// Add to cart button
let addToCartButtons = document.querySelectorAll('.btn-outline-dark');
addToCartButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    // Click products about
    let card = event.target.closest('.card');
    let productName = card.querySelector('.fw-bolder').textContent;
    let productPrice = card.querySelector('.text-muted').nextSibling.textContent;
    let productImage = card.querySelector('img').src; 

    // add product cart
    let product = { name: productName, price: productPrice, image: productImage };
    cartItems.push(product);

    // Local Storage-Cart
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    
    let cartBadge = document.querySelector('.badge');
    cartBadge.textContent = cartItems.length;

    
    let cartContent = document.querySelector('.cart-content');
    cartContent.style.display = 'block';
    updateCartContent();
  });
});


let cartButton = document.querySelector('.btn-outline-dark[type="submit"]');
cartButton.addEventListener('click', function() {
  
  let cartContent = '';
  for (let i = 0; i < cartItems.length; i++) {
    cartContent += cartItems[i].name + ' - ' + cartItems[i].price + '\n';
  }

  // Cart
  alert('Cart:\n\n' + cartContent);
});

// Cart remove
let removeCartItemButtons = document.querySelectorAll('.remove-cart-item');
removeCartItemButtons.forEach(function(button, index) {
  button.addEventListener('click', function(event) {
    // Product remove
    cartItems.splice(index, 1);

    // Local Storage update
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    
    let cartBadge = document.querySelector('.badge');
    cartBadge.textContent = cartItems.length;

    
    updateCartContent();
  });
});


let cartToggle = document.querySelector('.cart-toggle');
let cartContent = document.querySelector('.cart-content');
let cartItemsList = document.querySelector('.cart-items-list');

cartToggle.addEventListener('click', function() {
  if (cartContent.style.display === 'none') {
    
    cartContent.style.display = 'block';
   
    updateCartContent();
  } else {
    // Hide Cart
    cartContent.style.display = 'none';
  }
});

// Cart Update
function updateCartContent() {
  cartItemsList.innerHTML = '';
  for (let i = 0; i < cartItems.length; i++) {
    let listItem = document.createElement('li');
    let productImage = document.createElement('img');
    productImage.src = cartItems[i].image;
    listItem.appendChild(productImage);

    let productInfo = document.createElement('span');
    productInfo.textContent = cartItems[i].name + ' - ' + cartItems[i].price;
    listItem.appendChild(productInfo);

    let removeButton = document.createElement('button');
    removeButton.textContent = 'Delete';
    removeButton.dataset.index = i; 
    removeButton.addEventListener('click', function(event) {
      let itemIndex = event.target.dataset.index;
      removeCartItem(itemIndex);
    });
    listItem.appendChild(removeButton);

    cartItemsList.appendChild(listItem);
  }
}

// Cart Page Update
window.addEventListener('load', function() {
  if (cartItems.length > 0) {
    updateCartContent();
  }
  let cartCount = document.querySelector('.cartCount')
  cartCount.innerHTML = cartItems.length
});

// Remove products Cart
function removeCartItem(index) {
  cartItems.splice(index, 1);

 
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  updateCartContent();
  let cartBadge = document.querySelector('.badge');
  cartBadge.textContent = cartItems.length;
}
