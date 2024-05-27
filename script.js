'use strict';


//Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click',openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//////-------||||||---------Out of the Project----------------||||||-----------///////


///---Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header1=document.querySelector('.header');

const allSections=document.querySelectorAll('.section');

allSections.forEach(sec=>sec.addEventListener('click',()=>{
console.log('Hello')
}))

document.getElementById('section--1');

const allButtons=document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//------Creating and inserting elements---
//1)insertAdjacentHTML

const message=document.createElement('div');
      message.classList.add('my-message');
      // message.innerHTML='<button>Click</button>'
      //  message.textContent='We use cookies for improved functionility and analytics';
      message.innerHTML='We use cookies for improved functionility and analytics. <button class="btn btn--close--cookie">Get it</button>';


      header1.prepend(message); //it will show upper side of header(1st child)
      //header1.append(message) //it will show lower side of header(last child)
      //  header1.append(message.cloneNode(true))

      // header1.before(message);
      // header1.after(message)
      

      //Delete Element
      document.querySelector('.my-message').addEventListener('click',function()
    {
      message.remove();
    })
     
    //--------Styles------

    message.style.backgroundColor='darkblue';
    message.style.width='120%';

    console.log(message.style.height) //it won't work
   
         
    message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+30+'px';
    console.log(getComputedStyle(message).height);
    
    document.documentElement.style.setProperty('--color-primary','skyblue');  //modify the root in css

    //----------Attributes-------

    const logo=document.querySelector('.nav__logo');
    console.log(logo.src);
    console.log(logo.alt);
    logo.alt='beautiful logo';
    console.log(logo.alt)

    //non standard
    console.log(logo.designer)
    console.log(logo.getAttribute('designer')) //it will work


    logo.setAttribute('company','BaNkIsT');
    console.log(logo.getAttribute('company'));

    console.log(logo.src)//absolute result
    console.log(logo.getAttribute('src'))//relative result
    
    const link=document.querySelector('.nav__link--btn');
    console.log(link.href);
    console.log(link.getAttribute('href'));

    ///---Data attribute
    console.log(logo.dataset.versionNumber);

    //classes

    logo.classList.add('i','j');
    logo.classList.remove('i','j');
    logo.classList.toggle('i');
    logo.classList.contains('i'); //not includes


    ///-----------Implementing smooth scrolling---------------///

    const buttonScrollTo=document.querySelector('.btn--scroll-to');
    const section1=document.querySelector('#section--1');

    buttonScrollTo.addEventListener('click',function(event)
  {
    const s1coords=section1.getBoundingClientRect();
    console.log(s1coords)

    // console.log(event.target.getBoundingClientRect());

    console.log('Current Scroll (X/Y)',window.pageXOffset,window.pageYOffset); //pageXOffset means how much have you scrolled

    console.log('Height/Width viewport:',document.documentElement.clientHeight,document.documentElement.clientWidth);


   ///---Scrolling-----///
    // window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset); //current position+current scroll

    //---smooth scrolling---//
    // window.scrollTo({
    //   left:s1coords.left + window.pageXOffset,
    //   top:s1coords.top + window.pageYOffset,
    //   behavior:"smooth"
    // })

    //---more mordern way for smooth scrolling---//

    section1.scrollIntoView({behavior:"smooth"})



  })

  //----------Types of events and events handlers----------///

  const h1=document.querySelector('h1');

  const alertH1=function(event)
  {
    alert('EventListener:Great!You are reading the heading');
  }

  h1.addEventListener('mouseenter',alertH1);
  setTimeout(() => {
    h1.removeEventListener('mouseenter',alertH1)
  }, 3000);

//---Event Propagation bubbling and capturing---//

//rgb(255,255,255)

const randomInt=function(min,max)
{
 return Math.floor(Math.random()*(max-min+1)+min);
}

const randomColour=()=>
  {
   return `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`
   
  }
 console.log(randomColour())
  
  document.querySelector('.nav__link').addEventListener('click',function(e)
{
  this.style.backgroundColor=randomColour();

  console.log('Link',e.target,e.currentTarget);   /////e.currentTarget same as this keyword

  //stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click',function(e)
{
  this.style.backgroundColor=randomColour();
  console.log('Container',e.target,e.currentTarget);

  //Stop Propagation
  // e.stopPropagation();
})

document.querySelector('.nav').addEventListener('click',function(e)
{
  this.style.backgroundColor=randomColour();
  console.log('Nav',e.target,e.currentTarget);
})
