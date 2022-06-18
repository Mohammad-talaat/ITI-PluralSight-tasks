let db = null
let product = [
    {
        productID:1,
        productName:'product-1'
    },
    {
        productID:2,
        productName:'product-2'
    }
]

const btnCreateDB = document.getElementById("btnCreateDB")
const btnAddNote = document.getElementById("btnAddNote")
const btnViewNotes = document.getElementById("btnViewNotes")

btnCreateDB.addEventListener("click", ()=>{
    createDB('storeDatabase','1')

})
btnAddNote.addEventListener("click", ()=>{
    addProductToCart(product)

}) 
// btnViewNotes.addEventListener("click", viewNotes)

function createDB (dbName,dbVersion){

    const request = indexedDB.open(dbName,dbVersion);

    request.onupgradeneeded = e => {
        db = e.target.result
        
        db.createObjectStore('products',{keyPath:'productID'})
        db.createObjectStore('cartProducts',{keyPath:'productID'})
        
    }

    request.onsuccess = e => {
        db = e.target.result
        console.log(db)
    }

    request.onerror = e => console.log(`This error is due to ${e.target.error}`)

}

function addProductToCart (Product){
    let transactions = db.transaction("cartProducts","readwrite")
    transactions.onerror = e=> console.log(e.target.error)
    const cartProducts = transactions.objectStore('cartProducts')
    Product.forEach(product =>{

        cartProducts.add(product)
    })
}

function getProduct (productID){
    const transactions = db.transaction('products','readonly')
    transactions.onerror = e => {console.log(e.target.error)}
    const product = transactions.objectStore('products')
    product.get(productID)
}

function removeProductFromCart(productID){
    const transactions = db.transaction('cartProducts','readwrite')
    transactions.onerror = e=> {console.log(e.target.error)}
    const cartProducts = transactions.objectStore('cartProducts')
    cartProducts.delete(productID)
}

