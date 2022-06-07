
// fetch return the repsonse as a promise
fetch('https://jsonplaceholder.typicode.com/users').then(
    res => res.json()).then((data)=>{
        data.forEach(user => {

            console.log(user)})
        }); 
   
