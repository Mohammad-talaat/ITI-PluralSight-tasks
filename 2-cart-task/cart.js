const cartItemsContainer = document.getElementsByClassName('cartItemsContainer')[0];
const cartCounter = document.getElementById('cartCounter');
const subTotalPrice = document.getElementsByClassName('subTotalPrice')[0];
const emptyCartEl = document.createElement('h5')
emptyCartEl.innerHTML = 'The Shopping Cart is currently empty!'
// cartItemsContainer.append(emptyCartEl)
let totalPrice = 0;
// cartItemsContainer.innerHTML = ''
async function displayCartProducts(){
    connectDataBase('Online Store',1);
}

function connectDataBase(dbName,dbVersion){
    const request = indexedDB.open(dbName,dbVersion);
        request.onupgradeneeded = e => {
            db = e.target.result   
        }

        request.onsuccess = e => {
            db = e.target.result
            let  transaction = db.transaction('cartProducts', 'readonly');
            let objectStore = transaction.objectStore('cartProducts');
            let countRequest = objectStore.count();
            countRequest.onsuccess = function() {
              cartCounter.innerHTML = countRequest.result
              // console.log(`hi `+countRequest.result)
              if(countRequest.result != '0'){
                // console.log(`this is from the if condition if the cart counter is 0`)
              //  cartItemsContainer.append(emptyCartEl)
              showAllProducts('cartProducts')
              }
            }
        }

        request.onerror = e => console.log(`This error is due to ${e.target.error}`)
}

function removeProductFromCart(productID){  
    const transactions = db.transaction('cartProducts','readwrite')
    transactions.onerror = e=> {console.log(e.target.error)}
    const cartProducts = transactions.objectStore('cartProducts')
    cartProducts.delete(productID)
}

function showAllProducts (dbStore){
  let cartProductsCounter = 0
    const transactions = db.transaction(dbStore,'readonly') 
    const dbObjectStore = transactions.objectStore(dbStore)
    const request = dbObjectStore.openCursor()
    cartItemsContainer.innerHTML = ''
    request.onsuccess = e => {
        const cursor = e.target.result
        if (cursor){
            const product = cursor.value
            cartItemsContainer.innerHTML +=`
    <!-- start of items cards -->
              <div class="card mb-3" style="border: 1px solid black; " >
                <div class="row g-0">
                  <div class="col-md-4 p-3" style="display: block;">  
                    <i class="fa-solid fa-trash m-4 col-sm-1 col-1 deleteProduct"></i>
                    <p style="display:none;">${product.id}</p>
                    <img src="${product.image}" class="img-fluid rounded-start" style="width:150px;height:200px">
                  </div>

                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title col-9">${product.title}</h5>
                      <h5 class="priceContainer">
                        <span class='Price'>EGP ${Math.round(product.price * 18)}</span>
                      </h5>
                      <p class="card-text">${product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of items cards -->
    `
        totalPrice += Math.round(product.price * 18)
        ++cartProductsCounter
            cursor.continue();
        } 
        subTotalPrice.innerHTML = `Sub-Total: EGP ${totalPrice}`
        const deleteProduct = document.getElementsByClassName('deleteProduct')
        cartCounter.innerHTML = cartProductsCounter
        for (const product of deleteProduct){
          product.addEventListener('click',(e)=>{
            const deletedProductId = e.target.parentElement.childNodes[3].innerHTML
            let productPrice = (e.target.parentElement.parentElement.parentElement.getElementsByClassName('Price')[0].innerHTML)
            productPrice = (parseInt(productPrice.split(' ')[1]))
            totalPrice -= (productPrice/2)
            e.target.parentElement.parentElement.parentElement.remove()
            removeProductFromCart(parseInt(deletedProductId))
            let  transaction = db.transaction('cartProducts', 'readonly');
            let objectStore = transaction.objectStore('cartProducts');
            let countRequest = objectStore.count();
            countRequest.onsuccess = function() {
              cartCounter.innerHTML = countRequest.result
              // console.log(`hi `+countRequest.result)
              if(countRequest.result == '0'){
                // console.log(`this is from the if condition if the cart counter is 0`)
               cartItemsContainer.append(emptyCartEl)
              }
            }
            subTotalPrice.innerHTML = `Sub-Total: EGP ${totalPrice}`
          })
        }
      }
}

displayCartProducts()