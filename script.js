function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// --- RED PANEL ---




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation();
function navAnimation(){
    gsap.to(".nav_part1 svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
          trigger: "#page1",
          scroller: "#main",
          start: "top 0",
          end: "top -5%",
          scrub: true,
        },
    
      });
    
      gsap.to(".nav_part2 .link", {
        transform: "translateY(-100%)",
        opacity:"0",
        scrollTrigger: {
          trigger: "#page1",
          scroller: "#main",
          start: "top 0",
          end: "top -5%",
          scrub: true,
        },
        
      });
}
navAnimation();

function VideoConAnimation(){
    let videocon = document.querySelector('#video_container');
let playbtn = document.querySelector("#play");

videocon.addEventListener('mouseenter',()=>{
    gsap .to(playbtn,{
        opacity:1,
        scale:1
    });
});

videocon.addEventListener('mouseleave',()=>{
    gsap.to(playbtn,{
        opacity:0,
        scale:0
    });
});

videocon.addEventListener('mousemove',function(e){
    const rect = videocon.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Use GSAP to smoothly animate the cursor movement
    gsap.to(playbtn, {
      x: x-60,
      y: y-50,

    });
});

}
VideoConAnimation();

function loadingAnimation(){
    gsap.from('#page1 h1',{
        y:100,
        opacity:0,
        delay:.5,
        duration:0.5,
        stagger:0.4

    })

    gsap.from('#video_container',{
        scale:0.9,
        opacity:0,
        delay:.5,
        duration:0.5,

    })
}
loadingAnimation();
function cursorAnimation(){
let cursor = document.querySelector('.cursor');
document.addEventListener('mousemove',function(event){
    gsap.to(cursor,{
     
        top:event.y,
        left:event.x,
    })
});



let childs = document.querySelectorAll('.child');
childs.forEach(function(elem){
   elem.addEventListener('mouseenter',function(){
        gsap.to(cursor,{
            transform:' translate(-50%,-50%) scale(1)'
        });
    })

    elem.addEventListener('mouseleave',()=>{
        gsap.to(cursor,{
            transform:' translate(-50%,-50%) scale(0)'
        });
    });
});

}
cursorAnimation();

function expandDiv(){
const boxes = document.querySelectorAll('.dets');
boxes.forEach(function(box){

// Add 'expand' class on mouse enter to increase height
box.addEventListener('mouseenter', () => {
  box.classList.add('expand');
});

// Remove 'expand' class on mouse leave to reset height
box.addEventListener('mouseleave', () => {
  box.classList.remove('expand');
});
});}

expandDiv();
