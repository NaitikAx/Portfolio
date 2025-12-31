/* HERO TOGGLE */
const logoWrap = document.getElementById("logoWrap");
logoWrap.addEventListener("click",()=>{
  logoWrap.classList.toggle("active");
});

/* SWIPERS */
new Swiper(".thumbSwiper",{
  loop:true,
  speed:1200,
  autoplay:{delay:3000,disableOnInteraction:false},
  slidesPerView:1.1,
  spaceBetween:16,
  breakpoints:{
    768:{slidesPerView:2.3},
    1024:{slidesPerView:3.3}
  }
});

new Swiper(".bannerSwiper",{
  loop:true,
  speed:1400,
  autoplay:{delay:3500,disableOnInteraction:false},
  slidesPerView:1.05
});

/* FADE IN */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add("show");
  });
},{threshold:.2});

document.querySelectorAll(".fade-in").forEach(el=>observer.observe(el));

/* ZOOM PRODUCTS ONLY */
const overlay=document.getElementById("zoomOverlay");
const zoomImg=document.getElementById("zoomImg");

document.querySelectorAll(".zoomable").forEach(el=>{
  el.addEventListener("click",e=>{
    e.stopPropagation();
    zoomImg.src=el.src;
    overlay.classList.add("active");
  });
});

overlay.addEventListener("click",()=>{
  overlay.classList.remove("active");
});

/* SNOW (MOBILE OPTIMIZED) */
const canvas=document.getElementById("snow");
const ctx=canvas.getContext("2d");
let w,h,flakes=[];

function resize(){
  w=canvas.width=window.innerWidth;
  h=canvas.height=window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

const flakeCount = window.innerWidth < 768 ? 60 : 120;

for(let i=0;i<flakeCount;i++){
  flakes.push({
    x:Math.random()*w,
    y:Math.random()*h,
    r:Math.random()*2+1,
    s:Math.random()*0.5+0.3
  });
}

function snow(){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="rgba(190,170,255,.6)";
  flakes.forEach(f=>{
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();
    f.y+=f.s;
    if(f.y>h){f.y=-5;f.x=Math.random()*w;}
  });
  requestAnimationFrame(snow);
}
snow();