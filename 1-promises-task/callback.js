// fetching data using callbacks
function getData(callBack) {
    let req = new XMLHttpRequest();
    req.open('GET', "https://jsonplaceholder.typicode.com/users");
    req.onload = function() {
      if (req.status == 200) {
        const data = JSON.parse(this.responseText) 
        data.forEach(user => {
          callBack(user);
        });
      } else {
        callBack("Error: " + req.status);
      }
    }
   req.send();
  }

function printData(data){
    console.log(data)
}

getData(printData);







