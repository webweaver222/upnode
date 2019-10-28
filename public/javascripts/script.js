

    console.log('hello form client js');

    let flip   = document.querySelector(".theflip").style;
    let upside = document.querySelector(".signup");
    let inside = document.querySelector(".signin");
    let back_arrow   = document.querySelector(".back-arrow")
    


    if (document.querySelector(".up")) {
    document.querySelector(".up").addEventListener("click", (e) => { 
        
        flip.transform = 'rotateY(180deg)';
        inside.style.display = 'none';
        setTimeout(() => {
          back_arrow.style.display = 'inline';
          document.querySelector(".notif").innerText = '';
        }, 600)
         
        

        
    });}


    if (document.querySelector(".in")) {
    document.querySelector(".in").addEventListener("click", (e) => { 
        e.preventDefault()
        flip.transform = 'rotateY(180deg)';
        upside.style.display = 'none';
        setTimeout(() => {
          back_arrow.style.display = 'inline';
        }, 400)
      
    });
  }

    back_arrow.addEventListener("click", (e) => { 

      if (inside.style.display == 'none') {

        flip.transform = 'rotateY(360deg)';
      
        setTimeout(() => {
         inside.style.display = 'flex'
        }, 400)
     
      } else {

        flip.transform = 'rotateY(360deg)';
        
        setTimeout(() => {
          upside.style.display = 'flex'
        }, 400)
     
      }

      
      back_arrow.style.display = 'none';

      
    })
  

    if (document.querySelector(".out")) {
     document.querySelector(".out").addEventListener("click", (e) => { 
      
      e.preventDefault()
      logOut()

      let list = document.querySelector("div.menu ul")

      list.removeChild(list.querySelector('li'))

    let signup = document.createElement('li')
    signup.classList.add("up")
    signup.innerHTML = '<a href="#">Sign Up</a>'
    list.appendChild(signup)

    let signin = document.createElement('li')
    signin.classList.add("in")
    signin.innerHTML = '<a href="#">Sign In</a>'
    list.appendChild(signin)
    
  });
}
