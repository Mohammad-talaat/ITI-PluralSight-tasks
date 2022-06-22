
async function fetchData(){
    let db = null,
    cartCounter= 0;
    createDB('Online Store',1);

    const displayedItemContainer = document.querySelector('.displayedItemContainer')
    const data = await fetch('./productsDB.json')
    const products = await data.json()
    displayedItemContainer.innerHTML=''
    for (const product of products) {
        displayedItemContainer.innerHTML += `
        
        <div class="card col p-3 m-2" style="width: 16rem;">
            <img src="${product.image}"  style="width:200px;height:200px;">
            <div class="card-body row align-content-end">
                <p style="display:none;">${product.id}</p>
                <h5 class="card-title ">${product.title}</h5>
                <p class="card-text ">${product.category}</p>
                <p class="card-text">EGP ${Math.round(product.price * 18)}</p>
                <div class="mb-3">
                    <span class="fa fa-star starRatingChecked"></span>
                    <span class="fa fa-star starRatingChecked"></span>
                    <span class="fa fa-star starRatingChecked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span> 
                </div>
                <button class="btn btn-primary addToCart">Add To Cart</button>
            </div>
        </div>
        `
    }
    const addToCartBtns = document.getElementsByClassName('addToCart')
    for (const btn of addToCartBtns) {
        btn.addEventListener('click',(e)=>{
        //    console.log(e.target.parentElement.childNodes[1].innerHTML)
        let productID = (e.target.parentElement.childNodes[1].innerHTML)
        console.log(products.find(el => el.id == productID ))
        let product = (products.find(el => el.id == productID ))
        addProductToCart(product)
        alert("Product is added to the cart")
        })
    }

}
fetchData()



function createDB (dbName,dbVersion){
    const request = indexedDB.open(dbName,dbVersion);

    request.onupgradeneeded = e => {
        db = e.target.result
        db.createObjectStore('productQuantity',{keyPath:'id'})
        db.createObjectStore('cartProducts',{keyPath:'id'})
        
    }

    request.onsuccess = e => {
        db = e.target.result
    }   
    request.onerror = e => console.log(`This error is due to ${e.target.error}`)
}

function addProductToCart (Product){
    let transactions = db.transaction('cartProducts',"readwrite")
    transactions.onerror = e=> console.log(e.target.error)
    const cartProductsObjectStore = transactions.objectStore("cartProducts")
    cartProductsObjectStore.add(Product)
    
}

 function get_addProduct (productID){
    const transactions =  db.transaction('cartProducts','readwrite')
    transactions.onerror = e => {console.log(e.target.error)}
    const productsObjectStore =  transactions.objectStore('products')
    const getProduct = productsObjectStore.get(productID)
    getProduct.onerror = e =>console.log(e.target.error)
    getProduct.onsuccess = e =>{
    const viewedProduct = e.target.result
    console.log(viewedProduct)
    addProductToCart(viewedProduct)
   }
}

// function get_addProduct (productID){
//     const transactions =  db.transaction('cartProducts','readwrite')
//     transactions.onerror = e => {console.log(e.target.error)}
//     const productsObjectStore =  transactions.objectStore('products')
//     const getProduct = productsObjectStore.get(productID)
//     if(getProduct){
//         getProduct.onerror = e =>console.log(e.target.error)
//         cartCounter = 0

//     }else if(!getProduct){
//         getProduct.onsuccess = e =>{
            
//         const viewedProduct = e.target.result
//         ++cartCounter
//         console.log(viewedProduct)
//         addProductToCart(viewedProduct)
//         }
//     }
// }

// function addProductToCart (Product){
//     let transactions = db.transaction('cartProducts',"readwrite")
//     transactions.onerror = e=> console.log(e.target.error)
//     const cartProductsObjectStore = transactions.objectStore("cartProducts")
//     cartProductsObjectStore.add(Product)
    
// }