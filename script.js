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
      message.innerHTML='<button>Click</button>'
      //  message.textContent='We use cookies for improved functionility and analytics';
      // message.innerHTML='We use cookies for improved functionility and analytics. <button class="btn btn--close--cookie">Get it</button>';


      header1.prepend(message); //it will show upper side of header(1st child)
      //header1.append(message) //it will show lower side of header(last child)
      // header1.append(message.cloneNode(true))

      // header1.before(message);
      // header1.after(message)
      

      //Delete Element
      document.querySelector('.my-message').addEventListener('click',function()
    {
      message.remove();
    })
     