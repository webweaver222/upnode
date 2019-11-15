
function afterSignIn() {
  

    document.querySelector(".up").style.display = "none"
    document.querySelector(".in").style.display = "none"
    document.querySelector(".out").style.display = "block"

    document.querySelector(".back-arrow").dispatchEvent(new Event("click"));


}

function validationFail(data) {
  clearErrors()

  if (!document.querySelector('.error-notif')) {
    const notif = document.createElement('div')
    notif.className = 'error-notif'
    notif.innerText = "Validation error"
    document.querySelector('.menu-container').appendChild(notif)

    fadeIn(notif, 700)
  }

  const targetForm = document.querySelector(`.${data.postType}`)
  let fields = targetForm.getElementsByTagName('input')

  for (let i = 0; i < fields.length; i++) {
    let key = fields[i].name
    if (Object.keys(data.errors).includes(key)) {
      fields[i].classList.add('errored')

      //creating new error block
      const errorUl = document.createElement('ul')
      errorUl.id = `error-${key}`
      fields[i].parentNode.appendChild(errorUl)

      // adding errors to block
      data.errors[key].forEach(err => {
        const errorLI = document.createElement('li')
        errorLI.innerText = err
        errorUl.appendChild(errorLI)
      })

      //adding listeners

      fields[i].addEventListener('mouseover', opacity1)

      fields[i].addEventListener('mouseout', opacity0)
    }
  }




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


const fadeIn = (element, duration) => {
  (function increment(value = 0) {
      element.style.opacity = String(value);
      if (element.style.opacity !== '0.4') {
          setTimeout(() => {
              increment(value + 0.1);
          }, duration / 10);
      }
  })()

}

function clearErrors () {
  const notif = document.querySelector('.error-notif')
  if (notif)
  notif.parentNode.removeChild(notif)


  document.querySelectorAll('.errored').forEach(input => {
    input.classList.remove('errored')
    input.removeEventListener('mouseover', opacity1)
   input.removeEventListener('mouseout', opacity0)
  
  })

  document.querySelectorAll("[id^='error-']").forEach(errorList => {
    errorList.parentNode.removeChild(errorList)
  })



}

let opacity1 = function (e) {
  e.target.nextElementSibling.style.opacity = '1'
 }

 let opacity0 = function (e) {
  e.target.nextElementSibling.style.opacity = '0'
 }