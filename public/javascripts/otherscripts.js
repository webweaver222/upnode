
function afterSignIn() {
  

    document.querySelector(".up").style.display = "none"
    document.querySelector(".in").style.display = "none"
    document.querySelector(".out").style.display = "block"

    document.querySelector(".back-arrow").dispatchEvent(new Event("click"));


}

async function logOut() {
  await fetch(
    '/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }
   )
      


      
}