var vW = window.innerWidth;
var vH = window.innerHeight;
const lerp = (a, b, n) => (1 - n) * a + n * b;

const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;

  if (!e) e = window.event;
  if (e.clientX || e.clientY) {
    posx = e.clientX;
    posy = e.clientY;
  }
  return {
    x: posx,
    y: posy,
  };
};
const getSiblings = (e) => {
  let siblings = [];

  if (!e.parentNode) {
    return siblings;
  }

  let sibling = e.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
};

//Cursor
let mouse = {
  x: 0,
  y: 0,
};

class Cursor {
  constructor(el) {
    this.Cursor = el;
    this.Cursor.style.opacity = 0;
    this.Item = document.querySelectorAll("h1");
    this.span = document.querySelectorAll(".wrappersection");
    this.arrow = document.querySelector(".arrow");
    this.hs_arrow = document.querySelector(".hs-arrow");
    this.Hero = document.querySelector("body");
    this.double_img_area = document.querySelector("#area-double-img");
    this.bounds = this.Cursor.getBoundingClientRect();

    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.2 },
      y: { previous: 0, current: 0, amt: 0.2 },
    };
    this.onMouseMoveEv = () => {
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x;
      this.cursorConfigs.y.previous = this.cursorConfigs.y.current = mouse.y;

      //animation
      gsap.to(this.Cursor, {
        duration: 0.8,
        ease: "Power3.easeOut",
        opacity: 1,
      });

      this.onScaleMouse();
      requestAnimationFrame(() => this.render());

      //funzione di clean-up
      window.removeEventListener("mousemove", this.onMouseMoveEv);
    };

    //assegno eventListener personalizzato al mouse
    window.addEventListener("mousemove", this.onMouseMoveEv);
  }

  onScaleMouse() {
    this.Item.forEach((link) => {
      //event in entrata nel container del titolo
      link.addEventListener("mouseenter", () => {
        this.scaleAnimation(this.Cursor.children[0], 0.8, 0.6);
      });

      //event in uscita dal container del titolo
      link.addEventListener("mouseleave", () => {
        this.scaleAnimation(this.Cursor.children[0], 0, 0.8);
      });
    });

    

    //diventare un cerchio quando va sulla freccia dell'horizontal scroll
    this.hs_arrow.addEventListener("mouseenter", () => {
      this.scaleAnimation(this.Cursor.children[0], 0.3, 0.8);
    });
    this.hs_arrow.addEventListener("mouseleave", () => {
      this.scaleAnimation(this.Cursor.children[0], 0, 0.4);
    });
  }

  scaleAnimation(el, amt, duration) {
    gsap.to(el, {
      duration: duration,
      scale: amt,
      ease: "Power3.easeOut",
    });
  }

  render() {
    this.cursorConfigs.x.current = mouse.x;
    this.cursorConfigs.y.current = mouse.y;

    for (const k in this.cursorConfigs) {
      this.cursorConfigs[k].previous = lerp(
        this.cursorConfigs[k].previous,
        this.cursorConfigs[k].current,
        this.cursorConfigs[k].amt
      );
    }

    //render html
    this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`;

    requestAnimationFrame(() => this.render());
  }
}

const cursore = document.querySelector(".cursor");
const nav = document.querySelector("nav");
const logo = document.querySelector("#logo");
const hs_area = document.querySelectorAll("#area");
const wrapper_selection = document.querySelectorAll(".wrappersection");
const root = document.querySelector(":root");


if (vW <= 450 && vH <= 1000) {
  //mobile
} else {
  //Desktop
  window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));
  const cursor = new Cursor(cursore);
  //on hover animation
  wrapper_selection.forEach((obj) => {
    let title = obj.firstElementChild;
    let img = title.firstElementChild;

    obj.addEventListener("mouseenter", () => {
      gsap.to(img, {
        duration: 0.6,
        scale: 1,
        opacity: 1,
        ease: "Power3.easeOut",
      });

      gsap.to(title, {
        duration: 0.6,
        xPercent: 13,
        opacity: 1,
        ease: "Power3.easeOut",
      });
    });
    obj.addEventListener("mouseleave", () => {
      gsap.to(img, {
        duration: 0.6,
        scale: 0,
        opacity: 0,
        ease: "Power3.easeOut",
      });
      gsap.to(title, {
        duration: 0.6,
        xPercent: 0,
        opacity: 1,
        ease: "Power3.easeOut",
      });
    });
  });

  //on hover horizontal scroll
  hs_area.forEach((obj) => {
    let back_hs = obj.querySelector(".back-img");
    obj.addEventListener("mouseenter", () => {
      gsap.to(back_hs, {
        duration: 0.6,
        xPercent: 5,
        yPercent: 5,
        ease: "Power3.easeOut",
      });
    });
    obj.addEventListener("mouseleave", () => {
      gsap.to(back_hs, {
        duration: 0.6,
        xPercent: 0,
        yPercent: 0,
        ease: "Power3.easeOut",
      });
    });
  });
}

window.onload = () => {
  const nav = document.querySelector("nav");
  const logo = document.querySelector("#logo");

  window.addEventListener("scroll", () => {
    if (window.scrollY > nav.offsetHeight + 10) {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  });
};
