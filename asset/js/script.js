gsap.registerPlugin(ScrollTrigger);
const portfolioSlisder = new Swiper(".portfolio_slider", {
  spaceBetween: 20,
  slidesPerView: "auto",
  slidesOffsetAfter: 16,
  slidesOffsetBefore: 16,
  breakpoints: {
    768: {
      slidesOffsetAfter: 60,
      slidesOffsetBefore: 60,
    },
  },
});

// animtion
let originalTexts1;
let originalTexts2;
let originalTexts3;

const slogan = () => {
  const alphabetArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  ScrollTrigger.matchMedia({
    all: () => {
      originalTexts1 = gsap.utils
        .toArray(".text-slot:first-child h3 .char:not(:first-child)")
        .map((el) => el.textContent);
      originalTexts2 = gsap.utils
        .toArray(".text-slot:nth-child(2) h3 .char:not(:first-child)")
        .map((el) => el.textContent);
      originalTexts3 = gsap.utils
        .toArray(".text-slot:last-child h3 .char:not(:first-child)")
        .map((el) => el.textContent);

      const start = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".slogan",
            toggleActions: "play reverse play reverse",
            start: "0% 70%",
          },
        })
        .set(".text-slot h3 .char:not(:first-child)", {
          text: function () {
            return alphabetArray[
              Math.floor(Math.random() * alphabetArray.length)
            ];
          },
        })
        .from(".text-slot h3", {
          opacity: 0,
          onComplete: () => {
            const texts = gsap.utils.toArray(".text-slot h3");
            texts.forEach((text) => {
              console.log(text);
              const tl = gsap.timeline();
              tl.to(text.querySelectorAll(".char:not(:first-child)"), {
                text: function () {
                  return alphabetArray[
                    Math.floor(Math.random() * alphabetArray.length)
                  ];
                },
                stagger: { amount: 0.5 },
              })

                .to(
                  text.querySelectorAll(".char:not(:first-child)"),
                  {
                    text: function () {
                      return alphabetArray[
                        Math.floor(Math.random() * alphabetArray.length)
                      ];
                    },
                    stagger: { amount: 0.5 },
                  },
                  ">-0.5"
                )
                .to(
                  texts[0].querySelectorAll(".char:not(:first-child)"),
                  {
                    text: (idx) => {
                      return originalTexts1[idx];
                    },
                    stagger: { amount: 0.5 },
                  },
                  ">-0.5"
                )
                .to(
                  texts[1].querySelectorAll(".char:not(:first-child)"),
                  {
                    text: (idx) => {
                      return originalTexts2[idx];
                    },
                    stagger: { amount: 0.5 },
                  },
                  ">-1"
                )
                .to(
                  texts[2].querySelectorAll(".char:not(:first-child)"),
                  {
                    text: (idx) => {
                      return originalTexts3[idx];
                    },
                    stagger: { amount: 0.5 },
                  },
                  ">-1"
                );
            });
          },
        });
    },
  });
};
const banner = () => {
  ScrollTrigger.saveStyles();
  ScrollTrigger.matchMedia({
    "(min-width:1280px)": () => {
      const start = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".banner",
            toggleActions: "play reverse play reverse",
            start: "0 70%",
          },
        })
        .from(".banner_bg h3 .char", {
          yPercent: 100,
          stagger: { amount: 1 },
        });
    },
    "(max-width:1279px)": () => {
      const start = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".banner",
            toggleActions: "play reverse play reverse",
            start: "0 70%",
          },
        })
        .from(".banner_bg h3 .char", {
          yPercent: 100,
          stagger: { amount: 1 },
        });
    },
  });
};
const slogan2Animation = () => {
  class CanvasAni {
    constructor(canvas, ctx, total, imgSrc) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.frames = {
        frame: 0,
      };
      this.total = total;
      this.imgSrc = imgSrc;
      this.imgs = [];

      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      // 이미지 배열에 추가
      for (let i = 0; i < total; i++) {
        const img = new Image();
        img.src = this.imgSrc(i);
        this.imgs.push(img);
      }

      this.load();

      window.addEventListener("resize", () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.render();
      });
    }
    animate() {
      const text = gsap.timeline({ paused: true });

      ScrollTrigger.matchMedia({
        "(min-width:769px)": () => {
          const tl = gsap
            .timeline({
              scrollTrigger: {
                trigger: "article",
                scrub: 3,
                pin: true,
                end: `+=${window.innerWidth * 2}`,
              },
            })
            .to(
              this.frames,
              {
                duration: 10,
                onUpdate: () => {
                  this.render();
                },
                frame: this.total - 1,
                snap: "frame",
                ease: "none",
              },
              1
            )
            .from(
              ".slogan_2 h3 span",
              {
                filter: "blur(50px)",
                opacity: 0,
                duration: 2,
                ease: "none",
                stagger: {
                  amount: 1,
                },
              },
              2
            )
            .from(
              ".slogan_2 p",
              {
                opacity: 0,
                duration: 2,
                ease: "none",
              },
              6
            )
            .from(
              ".slogan_2 p span",
              {
                opacity: 0,
                duration: 2,
                ease: "none",
                yPercent: 10,
                stagger: {
                  amount: 0.5,
                },
              },
              7
            )
            .to(
              ".slogan_2",
              {
                delay: 1,
                opacity: 0,
                duration: 1,
              },
              ">-0.5"
            )
            .from(".portfolio", {
              opacity: 0,
              duration: 2,
            })
            .from({}, {});
        },
        "(max-width:768px)": () => {
          const tl = gsap
            .timeline({
              scrollTrigger: {
                trigger: "article",
                scrub: 3,
                pin: true,
                end: `+=${window.innerWidth * 6}`,
              },
            })
            .to(
              this.frames,
              {
                duration: 10,
                onUpdate: () => {
                  this.render();
                },
                frame: this.total - 1,
                snap: "frame",
                ease: "none",
              },
              0
            )
            .from(
              ".slogan_2 h3 span",
              {
                filter: "blur(50px)",
                opacity: 0,
                duration: 2,
                ease: "none",
                stagger: {
                  amount: 1,
                },
              },
              1
            )
            .from(
              ".slogan_2 p",
              {
                opacity: 0,
                duration: 2,
                ease: "none",
              },
              5
            )
            .from(
              ".slogan_2 p span",
              {
                opacity: 0,
                duration: 2,
                ease: "none",
                yPercent: 10,
                stagger: {
                  amount: 0.5,
                },
              },
              6
            )
            .to(
              ".slogan_2",
              {
                opacity: 0,
                duration: 1,
              },
              9.5
            )
            .from(".portfolio", {
              opacity: 0,
            })
            .to({}, {});
        },
      });
    }
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    load() {
      this.imgs[0].addEventListener("load", () => {
        this.render();
      });
    }
    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(
        this.imgs[this.frames.frame],
        window.innerWidth <= 600
          ? window.innerWidth / 2 - this.canvas.width
          : 0,
        0,
        window.innerWidth <= 600 ? this.canvas.width * 2 : this.canvas.width,
        this.canvas.height
      );
    }
  }

  const can = document.querySelector("#imgVid");

  const ctx = can.getContext("2d");

  const imgSrc = (index) => `/asset/imgs/frames/${(index + 1).toString()}.jpg`;

  const canAni1 = new CanvasAni(can, ctx, 121, imgSrc);

  canAni1.animate();
};

const rolling = () => {
  ScrollTrigger.saveStyles(".slogan_3_wrap, .slogan_3 h3 .char, .rolling");
  ScrollTrigger.matchMedia({
    "(min-width:1280px)": () => {
      const textWidth = document
        .querySelector(".slogan_3 h3")
        .getBoundingClientRect().width;

      const start = gsap.timeline({
        scrollTrigger: {
          trigger: ".slogan_3",
          toggleActions: "play reverse play reverse",
        },
      });

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".slogan_3",
            pin: true,
            end: `+=${window.innerHeight * 4}`,
            scrub: 1,
          },
        })
        .set(".slogan_3_wrap", {
          translateX: -textWidth / 2,
        })
        .from(".slogan_3 h3 .char", {
          filter: "blur(50px)",
          opacity: 0,
          stagger: {
            amount: 0.5,
          },
        })
        .to(".slogan_3 h3 .char", {
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        })
        .to(".slogan_3_wrap", {
          delay: 0.25,
          translateX: textWidth / 2,
          left: "0%",
          duration: 1,
        })
        .from(".rolling", {
          opacity: 0,
        })

        .to(".rolling", {
          yPercent: -75,
          duration: 2,
          ease: "none",
        })
        .to({ duration: 0.1 }, {});
    },
    "(max-width:1279px)": () => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".slogan_3",
            pin: true,
            end: `+=${window.innerHeight * 4}`,
            scrub: 1,
          },
        })
        .from(".slogan_3 h3 .char", {
          filter: "blur(50px)",
          opacity: 0,
          stagger: {
            amount: 0.5,
          },
        })
        .to(".slogan_3 h3 .char", {
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        })
        .to(".slogan_3_wrap", {
          delay: 0.25,
          duration: 1,
        })
        .from(".rolling", {
          opacity: 0,
        })

        .to(".rolling", {
          yPercent: -75,
          duration: 2,
          ease: "none",
        })
        .to({ duration: 0.1 }, {});
    },
  });
};
const slogan4 = () => {
  ScrollTrigger.saveStyles(".slogan_4_text h3, .slogan_4_bar");
  ScrollTrigger.matchMedia({
    "(min-width:1280px)": () => {
      const start = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".slogan_4_text",
            scrub: 1,
          },
        })
        .from(".slogan_4_text h3", {
          yPercent: 30,
          stagger: {
            amount: 0.5,
          },
          opacity: 0,
        });
      const bar = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".slogan_4_bar",
            start: "0 70%",

            scrub: true,
          },
        })
        .to(".slogan_4_bar", {
          clipPath: `inset(0 0 0% 0)`,
        });
    },
    "(min-width:769px) and (max-width:1279px) ": () => {
      const start = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".slogan_4_text",
            scrub: 1,
          },
        })
        .from(".slogan_4_text h3", {
          yPercent: 30,
          stagger: {
            amount: 0.5,
          },
          opacity: 0,
        });
      const bar = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".slogan_4_bar",
            start: "0 70%",
            end: "30% 0",
            scrub: true,
          },
        })
        .to(".slogan_4_bar", {
          clipPath: `inset(0 0 0% 0)`,
        });
    },
    "(max-width:768px)": () => {
      const start = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".slogan_4_text",
            scrub: 1,
          },
        })
        .from(".slogan_4_text h3", {
          yPercent: 30,
          stagger: {
            amount: 0.5,
          },
          opacity: 0,
        });
      const bar = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".slogan_4_bar",
            start: "0 70%",
            end: "30% 0",

            scrub: true,
          },
        })
        .to(".slogan_4_bar", {
          clipPath: `inset(0 0 0% 0)`,
        });
    },
  });
};

slogan();
banner();
slogan2Animation();
rolling();
slogan4();

// const cursor = document.querySelector(".cursor");
// const cursorWidth = cursor.getBoundingClientRect().width;
// const cursorheight = cursor.getBoundingClientRect().height;
// let cursorText = "";
// window.addEventListener("mousemove", (e) => {
//   let posX = e.clientX;
//   let posY = e.clientY;
//   cursor.style.transform = `translate(${posX - cursorWidth / 2}px,${
//     posY - cursorheight / 2
//   }px)`;
// });

// document
//   .querySelector(".portfolio_wrap")
//   .addEventListener("mouseenter", (e) => {
//     cursor.style.transform = "scale(1.5)";
//     cursor.innerHTML = e.target.dataset.cursor;
//   });
