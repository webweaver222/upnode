let s = "Hey fellow warriors"


let arr = s.split(' ').map((word,i,arr) => {
   console.log(word.length)
   if (word.length >= 5) {
      var word = word.split('').reverse().join("")
   }
   return word
}).join(' ')

console.log(arr)

