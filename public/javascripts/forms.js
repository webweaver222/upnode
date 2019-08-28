
function signup_form() {
    document.querySelectorAll("form").forEach((form, i, array) => { 
    
        form.addEventListener('submit', e => {
            e.preventDefault();
            let submForm = e.target.elements
            
            let userData = {
              email: submForm.email.value,
              username: submForm.username.value,
              password: submForm.password.value,
              repass: submForm.password2.value
            }
  
            fetch('/signup', {
              method: 'post',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  user:  userData
              })
            }).then(res=>res.json())
              .then(res => console.log(res));
            
  
           
        })
      
     })
}
