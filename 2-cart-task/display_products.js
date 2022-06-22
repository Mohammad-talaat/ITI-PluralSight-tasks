
async function fetchData(){
    const displayedItemContainer = document.querySelector('.displayedItemContainer')
    const data = await fetch('./productsDB.json')
    const products = await data.json()
    displayedItemContainer.innerHTML=''
    for (const product of products) {
        displayedItemContainer.innerHTML += `
      
          <div class="card col p-3 m-2" style="width: 16rem;">
            <img src="${product.image}" style="width:200px;height:200px;">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.category}</p>
              <p class="card-text">EGP ${product.price * 16}</p>
              <button  class="btn btn-primary">Add To Cart</button>
            </div>
          </div>
          
        `
    }
    
}
fetchData()
