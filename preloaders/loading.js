const os = require('os')
window.addEventListener('DOMContentLoaded', () => {
    var user = localStorage.getItem("_user_token_")
    if(user){
      document.getElementById("href").innerHTML = `./home.html`
    } else {
      document.getElementById("href").innerHTML = `./setup.html`
    }
    
    localStorage.setItem("local_hostname", os.hostname())
    localStorage.setItem("local_username", os.userInfo().username||"admin")

    setTimeout(() => {
      text()
      document.title = "Loading Cliptra"
      document.getElementById("loader").classList.remove("hidden")
    }, 1000);

    function text(){
      const things = ["Cliptra doesn't save your transfers", "Cliptra is open sourced", "Cliptra is ran by a single developer", "Cliptra was created on March 3rd 2024", "We will soon have a mobile app", "Cliptra is fully encrypted 🤐"];
      const random = Math.floor(Math.random() * things.length);
      document.getElementById("loading-text").innerHTML = `<strong>Did you know?</strong> ${things[random]}`
    }
})