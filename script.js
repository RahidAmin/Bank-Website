'use strict';

const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');


//Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


///-----------Implementing smooth scrolling---------------///

buttonScrollTo.addEventListener('click', function (event) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords)

  // console.log(event.target.getBoundingClientRect());

  console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset); //pageXOffset means how much have you scrolled

  console.log('Height/Width viewport:', document.documentElement.clientHeight, document.documentElement.clientWidth);


  ///---Scrolling-----///
  // window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset); //current position+current scroll

  //---smooth scrolling---//
  // window.scrollTo({
  //   left:s1coords.left + window.pageXOffset,
  //   top:s1coords.top + window.pageYOffset,
  //   behavior:"smooth"
  // })

  //---more mordern way for smooth scrolling---//

  section1.scrollIntoView({ behavior: "smooth" })



})


///-----------Page Navigation--------------////  ***Important Section***

//*****This is easy for me*****bad practice***
// document.querySelectorAll('.nav__link').forEach(function(el)
// {
//   el.addEventListener('click',function(e)
// {
//   e.preventDefault();
//   const id=this.getAttribute('href');
//   console.log(id);
//   document.querySelector(id).scrollIntoView({behavior:'smooth'})
// })
// })

//1.add event listener to the common parent element
//2.determine what element organized the element

////Event delegation   
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Maching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }

})


//---------Tabbed Component----------//


// bad practice
// tabs.forEach(t=>t.addEventListener('click',()=>console.log('TAB')))
tabsContainer.addEventListener('click', function (e) {
  //const clicked=e.target;
  //const clicked=e.target.parentElement; 
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked)

  //Guard Clause
  if (!clicked) return;  //Mordern way//if nothing clicked it will imidiately finish the function

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));



  //Activate Tab

  clicked.classList.add('operations__tab--active');


  //  if(clicked)
  //   {
  //     clicked.classList.add('operations__tab--active');
  //   }

  //Activate Content Area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})

///-----------Manu Fade Animation-------////

const handleHover = function (e)  //opacity is not defined because of bind method
{
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //This is very important
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this; //'this' is the argument of bind(1) method
      }
    })

    logo.style.opacity = this;

  }

}
//--my type codes
//  nav.addEventListener('mouseover',function(e)
// {
//  handleHover(e,0.5);
// })

// nav.addEventListener('mouseout',function(e)
// {
//     handleHover(e,1);
// })

//Passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////-------------Sticky Navigation------------////

// const initialCoords=section1.getBoundingClientRect();


// window.addEventListener('scroll',function()
// {
//   if(window.scrollY>initialCoords.top)
//     {
//       nav.classList.add('sticky');
//     }else{
//        nav.classList.remove('sticky');
//     }
// })

//---------Intersection observer API-----------//

// const obsCallBack=function(entries,observer)
// {
//   entries.forEach(entry=>
//     {
//       console.log(entry)
//     }
//   )
// }
// const obsOption={
//    root:null,
//    threshold:0,   //[0,0.2,0.3]
// }

// const observer=new IntersectionObserver(obsCallBack,obsOption);
// observer.observe(section1);



const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry)
  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}
const headerOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
}

const headerObserver = new IntersectionObserver(stickyNav, headerOption);

headerObserver.observe(header);

///--------------Reveal Sections------------///
const allsSections = document.querySelectorAll('.section');

const revealSections = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allsSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

//------------Lazy loading images------------///

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src; //after replace the image,it emit the load event

  //entry.target.classList.remove('lazy-img'); //images load very slow so we should not use this
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '20px',
})

imgTargets.forEach(img => imgObserver.observe(img));

///----------------------Slider-----------------------////

const slider = function () {

  const slides = document.querySelectorAll('.slide');
  //const slider=document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  let maxSlide = slides.length;

  // slider.style.transform='scale(0.3) translateX(-500px)'
  // slider.style.overflow='visible';
  // slides.forEach((s,i)=>
  // {
  //   s.style.transform=`translateX(${100*i}%)`;
  //   //0%,100%,200%,300%
  // })

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  }


  const activateDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }


  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`
    })

  }

  //next slide

  const nextSlide = function () {

    if (curSlide === maxSlide - 1) {
      curSlide = 0;

    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDots(curSlide);

  }

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    }
    else {
      curSlide--;
    }

    goToSlide(curSlide)
    activateDots(curSlide);
  }

  const init = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  }
  init();

  //Event Handlers
  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
    else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  })

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);

    }
  })
}
slider();

//////-------||||||---------Out of the Project----------------||||||-----------///////


///---Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header1=document.querySelector('.header');

// const allSections=document.querySelectorAll('.section');

// allSections.forEach(sec=>sec.addEventListener('click',()=>{
// console.log('Hello')
// }))

// document.getElementById('section--1');

// const allButtons=document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

//------Creating and inserting elements---
//1)insertAdjacentHTML

// const message=document.createElement('div');
//       message.classList.add('my-message');
// message.innerHTML='<button>Click</button>'
//  message.textContent='We use cookies for improved functionility and analytics';
// message.innerHTML='We use cookies for improved functionility and analytics. <button class="btn btn--close--cookie">Get it</button>';


//header1.prepend(message); //it will show upper side of header(1st child)
//header1.append(message) //it will show lower side of header(last child)
//  header1.append(message.cloneNode(true))

// header1.before(message);
// header1.after(message)


//Delete Element
//   document.querySelector('.my-message').addEventListener('click',function()
// {
//   message.remove();
// })

//--------Styles------

// message.style.backgroundColor='darkblue';
// message.style.width='120%';

// console.log(message.style.height) //it won't work


// message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+30+'px';
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary','skyblue');  //modify the root in css

//----------Attributes-------

// const logo=document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// logo.alt='beautiful logo';
// console.log(logo.alt)

//non standard
// console.log(logo.designer)
// console.log(logo.getAttribute('designer')) //it will work


// logo.setAttribute('company','BaNkIsT');
// console.log(logo.getAttribute('company'));

// console.log(logo.src)//absolute result
// console.log(logo.getAttribute('src'))//relative result

// const link=document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

///---Data attribute
// console.log(logo.dataset.versionNumber);

// //classes

// logo.classList.add('i','j');
// logo.classList.remove('i','j');
// logo.classList.toggle('i');
// logo.classList.contains('i'); //not includes




//----------Types of events and events handlers----------///

//   const h1=document.querySelector('h1');

//   // const alertH1=function(event)
//   // {
//   //   alert('EventListener:Great!You are reading the heading');
//   // }

//   h1.addEventListener('mouseenter',alertH1);
//   setTimeout(() => {
//     h1.removeEventListener('mouseenter',alertH1)
//   }, 3000);

// //---Event Propagation bubbling and capturing---//

// //rgb(255,255,255)

// const randomInt=function(min,max)
// {
//  return Math.floor(Math.random()*(max-min+1)+min);
// }

// const randomColour=()=>
//   {
//    return `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`

//   }
//  console.log(randomColour())

//   document.querySelector('.nav__link').addEventListener('click',function(e)
// {
//   this.style.backgroundColor=randomColour();

//   console.log('Link',e.target,e.currentTarget);   /////e.currentTarget same as this keyword

//   //stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click',function(e)
// {
//   this.style.backgroundColor=randomColour();
//   console.log('Container',e.target,e.currentTarget);

//   //Stop Propagation
//   // e.stopPropagation();
// })

// document.querySelector('.nav').addEventListener('click',function(e)
// {
//   this.style.backgroundColor=randomColour();
//   console.log('Nav',e.target,e.currentTarget);
// })





///-----Dom Traversing---------------///

//going Downwards:child
// const h=document.querySelector('h1');
// console.log(h.querySelectorAll('.highlight'));
// console.log(h.childNodes)
// console.log(h.children);

// h.firstElementChild.style.color='white';
// h.lastElementChild.style.color='red';

// //Going Upwards:parents

// console.log(h.parentNode)
// console.log(h.parentElement)

// h.closest('.header').style.background='var(--gradient-secondary)';
// h.closest('h1').style.background='var(--color-tertiary)';

//Going Sideways:siblings

// console.log(h.previousElementSibling);
// console.log(h.nextElementSibling);

// console.log(h.previousSibling);
// console.log(h.nextSibling);

// console.log(h.parentElement.children)

// const x=[1,2,4]; ///x is not using anyware
// [...h.parentElement.children].forEach(function(el)
// {
//   if(el !== h)
//     {
//       el.style.transform='scale(0.5)';
//     }
// })

////--------------Lifecycle DOM events------------//

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parse and Dom tree built', e); //Js and html load
})

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
})

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })
