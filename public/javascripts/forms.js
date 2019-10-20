
/*var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { */
  
    document.querySelectorAll("form").forEach((form, i, array) => { 
    
        form.addEventListener('submit', e => {
            e.preventDefault();
            let submForm = e.target.elements

            /* frontend data validation goes here... */
            
            let postType = 'signin'

            let userData = {
              email: submForm.email.value,
              password: submForm.password.value,
            }

            if (submForm.up) {
              userData.username = submForm.username.value
              userData.repass = submForm.password2.value
              postType = 'signup'
            }
            
  
            fetch('/sign', {
              method: 'post',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  user:  userData,
                  postType: postType

              })
            }).then(res=>res.json())
              .then(res => {
        
                let list = document.querySelector("div.menu ul")
                list.querySelectorAll("li").forEach(li => { li.style.display = "none" })

                let logout = document.createElement('li')
                logout.classList.add("out")
                logout.innerHTML = '<a href="#">Log Out</a>'
                list.appendChild(logout)

                document.querySelector(".out").addEventListener("click", (e) => { 
       
                  flip.transform = 'rotateY(180deg)';
                  upside.style.display = 'none';
                  setTimeout(() => {
                    back_arrow.style.display = 'inline';
                  }, 400)
                
              });

                

                document.querySelector(".back-arrow").dispatchEvent(new Event("click"));
              });
            
  
           
        })
      
     })
     
//});

