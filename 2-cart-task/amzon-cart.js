let db,storeProducts ;
const data = fetch('productsDB.json')
.then( data => data.json())
.then(data => storeProducts=data )


const btnCreateDB = document.getElementById("btnCreateDB")
const btnAddNote = document.getElementById("btnAddNote")
const btnViewNotes = document.getElementById("btnViewNotes")

btnCreateDB.addEventListener("click", ()=>{
    createDB('storeDatabase','1')
})
btnAddNote.addEventListener("click", ()=>{
    addProductToCart({
    productID:6,
    name:"IPHONE 16 ",
        price:2000,
        imageURL:""
    })

}) 
btnViewNotes.addEventListener("click", ()=>{
    getProduct(2)
})

function createDB (dbName,dbVersion){

    const request = indexedDB.open(dbName,dbVersion);

    request.onupgradeneeded = e => {
        db = e.target.result
        
        db.createObjectStore('products',{keyPath:'productID'})
        db.createObjectStore('cartProducts',{keyPath:'productID'})
        
    }

    request.onsuccess = e => {
        db = e.target.result
        
        let transactions = db.transaction("products","readwrite")
        transactions.onerror = e=> console.log(e.target.error)
        const productsObjectStore = transactions.objectStore('products')
        storeProducts.forEach(product =>{
    
            productsObjectStore.add(product)
        })  
    }

    request.onerror = e => console.log(`This error is due to ${e.target.error}`)

}

function addProduct (Product , dbObjectStore){
    let transactions = db.transaction(dbObjectStore,"readwrite")
    transactions.onerror = e=> console.log(e.target.error)
    const cartProductsObjectStore = transactions.objectStore(dbObjectStore)
    cartProductsObjectStore.add(Product)
    
}

 function getProduct (productID  , dbObjectStore ){
    const transactions =  db.transaction(dbObjectStore,'readonly')
    transactions.onerror = e => {console.log(e.target.error)}
    const productsObjectStore =  transactions.objectStore(dbObjectStore)
    const getProduct = productsObjectStore.get(productID)
    getProduct.onerror = e =>console.log(e.target.error)
    getProduct.onsuccess = e =>{
    const viewedProduct = e.target.result
   addProduct( viewedProduct,'productsCart')
   }
}

function removeProductFromCart(productID){
    const transactions = db.transaction('cartProducts','readwrite')
    transactions.onerror = e=> {console.log(e.target.error)}
    const cartProducts = transactions.objectStore('cartProducts')
    cartProducts.delete(productID)
}

