// fetching data using callbacks
function getData(callBack) {
    let req = new XMLHttpRequest();
    req.open('GET', "https://jsonplaceholder.typicode.com/users");
    req.onload = function() {
      if (req.status == 200) {
        callBack(this.responseText);
      } else {
        callBack("Error: " + req.status);
      }
    }
   req.send();
  }

function printData(data){
    const users = JSON.parse(data)
    users.forEach(user => {
        console.log(user)
    })

}
  getData(printData);







