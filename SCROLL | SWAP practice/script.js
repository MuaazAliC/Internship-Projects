var tl = gsap.timeline();

tl.from("h1", {
  y: -30,
  duration: 0.5,
  delay: 0.2,
  opacity: 0,
});

tl.from("h2", {
  y: -30,
  duration: 0.5,
  opacity: 0,
  stagger: 0.2,
});

tl.from("#page1 #box1", {
  scale: 0,
  opacity: 0,
  duration: 1,
  borderRadius: "50%",
  rotate: 360,
  scrollTrigger: {
    trigger: "#page1 #box1",
     start: "top 100%",
    
  },
});

gsap.from("#page2 h1", {
  scale: 0,
  x: 3000,
  duration: 1,
  scrollTrigger: {
    trigger: "#page2 h1",
    // markers: true,
    start: "top 100%",
    end: "top 50%",
    scrub: 2,
  },
});

gsap.to("#page3 h1", {
 transform:"translate(-270%)",
 scrollTrigger:{
 trigger:("#page3"),
 markers:true,
  start:"top 0%",
  end:"top -100%",
  scrub:2,
  pin:true,
 },
});
gsap.from("#page4 #box4", {
  scale: 0,
  opacity: 0,
  x:4000,
  duration: 1,
  borderRadius: "50%",
  rotate: 360,
  scrollTrigger: {
    trigger: "#page4 #box4",
    // markers: true,
    start: "top 100%",
    end: "top 50%",
    scrub: 2,
  },
});
