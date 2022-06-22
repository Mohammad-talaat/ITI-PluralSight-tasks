
async function fetchData(){
    const displayedItemContainer = document.querySelector('.displayedItemContainer')
    const data = await fetch('./productsDB.json')
    const products = await data.json()
    displayedItemContainer.innerHTML=''
    for (const product of products) {
        displayedItemContainer.innerHTML += `
      
        <div class="card col p-3 m-2" style="width: 16rem;">
            <img src="${product.image}" style="width:200px;height:200px;">
            <div class="card-body row align-content-end">
                <h5 class="card-title ">${product.title}</h5>
                <p class="card-text ">${product.category}</p>
                <p class="card-text">EGP ${product.price * 16}</p>
                <div class="mb-3">
                    <span class="fa fa-star starRatingChecked"></span>
                    <span class="fa fa-star starRatingChecked"></span>
                    <span class="fa fa-star starRatingChecked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span> 
                </div>
                <button class="btn btn-primary">Add To Cart</button>
            </div>
        </div>
        `
    }
    
}
fetchData()
