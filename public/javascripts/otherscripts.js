
function afterSignIn() {
    /*let list = document.querySelector("div.menu ul")
    list.querySelectorAll("li").forEach(li => {
        li.style.display = "none"
    })

    let logout = document.createElement('li')
    logout.classList.add("out")
    logout.innerHTML = '<a href="#">Log Out</a>'
    list.appendChild(logout)

    document.querySelector(".out").addEventListener("click", (e) => {
    
        e.preventDefault()


        logOut()


        list.removeChild(logout)
        list.querySelectorAll("li").forEach(li => {
            li.style.display = "block"
        })



    });

*/

    document.querySelector(".up").style.display = "none"
    document.querySelector(".in").style.display = "none"
    document.querySelector(".out").style.display = "block"

    document.querySelector(".back-arrow").dispatchEvent(new Event("click"));


}

async function logOut() {
   const res = await fetch(
    '/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        /*body: JSON.stringify({
            user:  userData,
            postType: postType

        })*/
      }
   )
      
        const jsonres = await res.json()

      

        console.log(jsonres)

      
}