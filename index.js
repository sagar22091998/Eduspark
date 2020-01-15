///////////////////POPUP////////////////////

let but = document.querySelector('#navbar ul li .login');
let temp = document.querySelector('.popup-login');

//POPUP HUA
but.addEventListener('click',() => {
temp.style.display = 'block';
});

//POPUP CLOSE BY X
but = document.querySelector('.popup-close');
but.addEventListener('click',() => {
temp.style.display = 'none';
});

//POP CLOSE by CLICKING  ONLY  OUTSIDE POPUP
temp.addEventListener('click',e => {
    if(e.target.className==='popup-login') //IMP Condition
        temp.style.display = 'none';
});