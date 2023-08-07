const portfolioSlisder = new Swiper(".portfolio_slider", {
  spaceBetween: 20,
  slidesPerView: "auto",
  slidesOffsetAfter: 60,
  slidesOffsetBefore: 60,
});

// animtion
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
      text.to(".vid_text", {
        xPercent: -100,
      });
      ScrollTrigger.saveStyles(".vid_text");
      ScrollTrigger.matchMedia({
        "(min-width:1280px)": () => {
          gsap.set(".vid_text .char", { yPercent: 20 });
          const tl = gsap
            .timeline({
              scrollTrigger: {
                trigger: ".slogan_2",
                scrub: 1,
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
            .to({}, {});
        },
        "(max-width:767px)": () => {
          gsap.set(".vid_text .char", { yPercent: 20 });
          const tl = gsap
            .timeline({
              scrollTrigger: {
                trigger: ".vid",
                scrub: 1,
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
              1
            )
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
slogan2Animation();
