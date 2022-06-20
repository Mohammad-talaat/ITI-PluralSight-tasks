let db,storeProducts;
// db --> global variable to store the result of the different events of the indexedDB

 fetch('./productsDB.json')
.then(res => res.json())
.then(json => storeProducts = json)
    


 function createDB (dbName,dbVersion){
    const request = indexedDB.open(dbName,dbVersion);

    request.onupgradeneeded = e => {
        db = e.target.result
        db.createObjectStore('products',{keyPath:'id'})
        db.createObjectStore('cartProducts',{keyPath:'id'})
        
    }

    request.onsuccess = e => {
        db = e.target.result
        
        let transactions = db.transaction("products","readwrite")
        transactions.onerror = e=> console.log(e.target.error)
        const productsObjectStore = transactions.objectStore('products')
        storeProducts.forEach(product =>{
    
            productsObjectStore.add(product)
        })  

        showAllProducts('products')
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
    const transactions =  db.transaction('products','readwrite')
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
 function removeProductFromCart(productID){
    const transactions = db.transaction('cartProducts','readwrite')
    transactions.onerror = e=> {console.log(e.target.error)}
    const cartProducts = transactions.objectStore('cartProducts')
    cartProducts.delete(productID)
}

function showAllProducts (dbStore){
    const transactions = db.transaction(dbStore,'readonly') 
    const dbObjectStore = transactions.objectStore(dbStore)
    const request = dbObjectStore.openCursor()
    request.onsuccess = e => {
        const cursor = e.target.result
        if (cursor){
            console.log(cursor.value)
            cursor.continue();
        }
    }
}



