
  
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
              userData.repass = submForm.repass.value
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
            }).then(res => res.json())
              .then(data => {
              
              if (!data.errors) {
                afterSignIn()
              } else {
                  validationFail(data)
                }
              
            })
            
              
            
  
           
        })
      
     })
     
    