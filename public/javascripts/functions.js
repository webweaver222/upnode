const recentTableFetch = async function (sortBy = 'date', order = '-1')  {

  
  console.log('1')
  let json = await fetch('/recentUploads', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sort: sortBy,
      order: order
    })
  })

  let data = await json.json()
  
  recentTableBuild(data)

}


function recentTableBuild(files) {

  document.querySelector("#uptable").innerHTML = ''


  let uptable = document.querySelector("#uptable")
  var table = document.createElement('table')
  var tableHeader = document.createElement('tr')
  var FileNameH = document.createElement('th')
  FileNameH.innerText = 'File Name'
  var FileUploader = document.createElement('th')
  FileUploader.innerText = 'Uploader'
  var FileSize = document.createElement('th')
  FileSize.innerText = 'File Size'
  var date = document.createElement('th')
  date.innerText = 'Upload date'

  

  tableHeader.appendChild(FileNameH)
  tableHeader.appendChild(FileUploader)
  tableHeader.appendChild(FileSize)
  tableHeader.appendChild(date)
  FileNameH.addEventListener("click", () => {
    recentTableFetch('originalName', '1')
  })
  
  table.appendChild(tableHeader)

  files.recentFiles.forEach(file => {
    let row = document.createElement('tr')
    let FileName = document.createElement('td')
    if (file.originalName.length > 35) file.originalName = file.originalName.substr(0, 35) + '...'
    FileName.innerHTML = `<a href='/file/${file._id}'>${file.originalName}</a>`
    row.appendChild(FileName)



    FileUploader = document.createElement('td')
    FileUploader.innerText = (file.uploader) ? `${file.uploader.username}` : 'anon'
    row.appendChild(FileUploader)

    FileSize = document.createElement('td')
    FileSize.innerText = `${file.size}`
    row.appendChild(FileSize)

    date = document.createElement('td')
    date.innerText = `${file.date}`
    row.appendChild(date)

    table.appendChild(row)

})

  uptable.appendChild(table)
}

function afterSignIn() {
  

    document.querySelector(".up").style.display = "none"
    document.querySelector(".in").style.display = "none"
    document.querySelector(".out").style.display = "block"

    document.querySelector(".back-arrow").dispatchEvent(new Event("click"));


}

function notif(message) {

  let notif = document.querySelector('.notif')

  if (notif) {
    notif.parentNode.removeChild(notif)
  }

    notif = document.createElement('div')
    notif.className = 'notif'
    notif.innerText = 'Download link:'
    const link = document.createElement('textarea')
    link.cols = '45'
    link.style.marginTop = '10px'
    link.innerText = message 

     

    document.querySelector('.menu-container').appendChild(notif)
    notif.appendChild(link)
    fadeIn(notif, '1' , '700')
    uploadCancel()
  
}

function errorNotif(message) {
  if (!document.querySelector('.error-notif')) {
    const notif = document.createElement('div')
    notif.className = 'error-notif'

   
     notif.innerText = message

    document.querySelector('.menu-container').appendChild(notif)

    fadeIn(notif, '0.4' , '700')
  }
}

function validationFail(data) {
  clearErrors()

  errorNotif("Validation error")
  
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


const fadeIn = (element, opacity, duration) => {
  return new Promise(function(resolve, reject) {
    (function increment(value = 0) {
      element.style.opacity = String(value);
      if (element.style.opacity !== opacity) {
          setTimeout(() => {
              increment(value + 0.1);
          }, duration / 10);
      } else resolve('+')
  })()

  })

}

const fadeOut = (element, duration) => {
  return new Promise(function(resolve, reject) {
    (function decrement(value = 1) {
      element.style.opacity = String(value);
      if (element.style.opacity > '0') {
        setTimeout(() => {
            decrement(value - 0.1);
        }, duration / 10);
    } else resolve('+')
    })();
  })
};


async function uploadAnimation(button,flip) {
  if (flip == 'on') {
    button.innerText = ''
    //button.style.backgroundColor = '#44ffff'

    let dot = []
    for (let i = 0 ; i < 4; i++) {
       dot[i] = document.createElement('div')
       dot[i].className = 'dot'
       button.appendChild(dot[i])
    }

    let children = [].slice.call(button.children);
    while (true) {
      for (const dot of children) {
        await fadeOut(dot, '80')
      }

      for (const dot of children) {
        await fadeIn(dot, '0.8', '80')
      }

    }
  } else {
    button.innerHtml = ''
    //button.style.backgroundColor = 'rgb(170,255,255)'
    button.innerText = 'Upload file'
  }
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

function uploadCancel () {
  document.querySelector('#file-upload').value = ''

  const dropzone = document.querySelector('.dropzone')
  dropzone.querySelector('p').innerText = ''

  if (dropzone.querySelector('button'))
  dropzone.removeChild(dropzone.querySelector('button'))

  dropzone.querySelector('span').innerText = 'Drop your file here'
}

 async function fetchUpload(uploadBtn) {
  
    const file = document.querySelector('#file-upload').files[0]

    
      if (document.querySelector('.error-notif'))
          document.querySelector('.error-notif').parentNode.removeChild(document.querySelector('.error-notif'))

    let formData = new FormData()
    formData.append('upload', file)

    uploadBtn.disabled = true; 
    uploadAnimation(uploadBtn ,'on')

    const res = await fetch('/upload', {
      method: 'POST',
      body: formData
    })

    uploadAnimation(uploadBtn ,'off')
    uploadBtn.disabled = false; 

    const json = await res.json()

    if (json.error) {
      errorNotif(json.error.message)
    } else  notif(json.link)


}


