/* ============================= */
/* 🚀 LOADER CONTROL            */
/* ============================= */

window.addEventListener("load", function(){

    const loader = document.getElementById("loader");

    setTimeout(()=>{
        loader.classList.add("hide");
    }, 2000); // 2 seconds loading time

});
// Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e=>{
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// Scroll Progress
window.onscroll = ()=>{
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("scrollBar").style.width = scrolled + "%";
};

// Theme Toggle
const toggle = document.getElementById("themeToggle");
toggle.onclick = ()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light"));
};

window.onload = ()=>{
  if(localStorage.getItem("theme") === "true"){
    document.body.classList.add("light");
  }
};

// Filter
function filterSelection(category){
  let cards = document.getElementsByClassName("card");
  for(let i=0;i<cards.length;i++){
    cards[i].style.display = "none";
    if(category === "all" || cards[i].classList.contains(category)){
      cards[i].style.display = "block";
    }
  }
}

// Counter Animation
const counters = document.querySelectorAll(".counter");
counters.forEach(counter=>{
  const update = ()=>{
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const inc = target / 100;

    if(count < target){
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update,20);
    }else{
      counter.innerText = target;
    }
  };
  update();
});


// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Message Sent Successfully!");
});
function openGame(game){
    window.location.href = "games/" + game + ".html";
}

