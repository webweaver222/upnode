

console.log('hello form client js');


let flip = document.querySelector(".theflip").style;
let upside = document.querySelector(".signup");
let inside = document.querySelector(".signin");
let back_arrow = document.querySelector(".back-arrow")


if (document.querySelector(".up"))
document.querySelector(".up").addEventListener("click", (e) => {

  flip.transform = 'rotateY(180deg)';
  inside.style.display = 'none';
  
  setTimeout(() => {
    back_arrow.style.display = 'inline';
    //document.querySelector(".notif").innerText = '';
    document.querySelector('.dropzone').style.display = 'none'
    uploadCancel()
  }, 200)
});


if (document.querySelector(".in"))
document.querySelector(".in").addEventListener("click", (e) => {
  e.preventDefault()
  flip.transform = 'rotateY(180deg)';
  upside.style.display = 'none';
  
  setTimeout(() => {
    back_arrow.style.display = 'inline';
    document.querySelector('.dropzone').style.display = 'none'
    uploadCancel()
  }, 200)
});


back_arrow.addEventListener("click", (e) => {
  console.log(window.location.href)

  //check if user curently on file page
  if (window.location.href.search(/\/file\//g) != -1) {
    window.location.replace('/');
    return
  }
  

  if (inside.style.display == 'none') {

    flip.transform = 'rotateY(360deg)';

    setTimeout(() => {
      inside.style.display = 'flex'
      document.querySelector('.dropzone').style.display = 'inline-block'
    }, 400)

  } else {

    flip.transform = 'rotateY(360deg)';

    setTimeout(() => {
      upside.style.display = 'flex'
      document.querySelector('.dropzone').style.display = 'inline-block'
    }, 400)

  }

  clearErrors()
  back_arrow.style.display = 'none';



})


if (document.querySelector(".out"))
document.querySelector(".out").addEventListener("click", (e) => {

  e.preventDefault()

  document.querySelector(".signup form").reset()
  document.querySelector(".signin form").reset()

  logOut()

  document.querySelector(".out").style.display = "none"
  document.querySelector(".up").style.display = "block"
  document.querySelector(".in").style.display = "block"

  

});

if (document.querySelector('#file-upload'))
document.querySelector('#file-upload').addEventListener("change", e => {
  
  const file = e.target.files[0] 
 
  if (!file) {
    uploadCancel()
    return;
  }

  let fileName = file.name

  let Wrapper = document.querySelector('.dropzone')
  let nameNode = Wrapper.querySelector('p')

  nameNode.innerText = fileName

  if (Wrapper.querySelector('span')) 
  Wrapper.querySelector('span').innerText = ''
  


  Wrapper.appendChild(nameNode)
  fadeIn(nameNode, '1', '200')
  
  if (!Wrapper.querySelector('button')) {
  let uploadBtn = document.createElement('button')

  uploadBtn.innerText = 'Upload file'
  uploadBtn.classList.add('uploadBtn')

  Wrapper.appendChild(uploadBtn)
   fadeIn(uploadBtn, '1', '200')

   uploadBtn.addEventListener('click', () => {
    fetchUpload(uploadBtn)
   })

  }
});

if(document.querySelector('.download-button')) {
  document.querySelector(".download-button button").addEventListener("click", async function() {
    
     //const res = await fetch('/file', {
     // method: 'POST',
      //body: 
    //}
    //)

  })
}



