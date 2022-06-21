

$(function () {

    const offset = 100;
  const scrollUp = document.querySelector('.scroll-up');
  const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
  const pathLength = scrollUpSvgPath.getTotalLength();
  
  scrollUpSvgPath.style.strokeDasharray = '${pathLength} ${pathLength}'
  scrollUpSvgPath.style.transition = 'stroke-dashoffset 30ms'
  
  const getTop = () => window.pageYOffset || document.documentElement.scrollTop;
  
  const updataDashoffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / height);

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
    
  };


window.addEventListener('scroll' , () =>{
  updataDashoffset();
  if( getTop() > offset ){
    scrollUp.classList.add('scroll-up--active')
  } else {
    scrollUp.classList.remove('scroll-up--active')
    
  }
  });

  scrollUp.addEventListener('click' , () =>{
  window.scrollTo({
    top:0,
    behavior: 'smooth'
  });
});





  const swiper = new Swiper('.main-swiper', {
    keyboard: true,
    loop: true,
    slidesPerView:1,                                                   
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      
    },
  
  });


  const saleSlider = new Swiper('.sale-swiper', {
    // keyboard: true,
    loop: true,
  slidesPerView:4,                                                    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 4000,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      840: {
        slidesPerView: 3
      },
      1024: {
        slidesPerView: 4
      }
    }
  
  });



  const boxes = document.querySelectorAll('.box');

  window.addEventListener('scroll', checkBoxes);
  
  checkBoxes(); // shows initial box(es) 
  
  function checkBoxes() {
    const triggerBottom = (window.innerHeight / 5 * 4);
    
    boxes.forEach(box => {
      const boxTop = box.getBoundingClientRect().top;
      
      if(boxTop < triggerBottom) {
        box.classList.add('show');
      } else {
        box.classList.remove('show');
      }
    })
  }








});


