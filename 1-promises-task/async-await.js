// fetching data using async-await
async function fetchData(){

    const data = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await data.json()
    users.forEach(user => {
        console.log(user)
    });
}
fetchData()