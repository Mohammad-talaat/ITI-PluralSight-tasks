async function fetchData(){
    const data = await fetch('./productsDB.json')
    const parsedData = await data.json()
    console.log(parsedData)

}
 fetchData()   

 