const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

function openMenu(){
    menu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow='hidden';
}

function closeMenu(){
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow='';
}

hamburger.onclick=()=>{
    menu.classList.contains('active') ? closeMenu() : openMenu();
};

overlay.onclick=closeMenu;


const track=document.getElementById('track');
const dotsContainer=document.getElementById('dots');

const slides=[
    'images/slide1.jpg',
    'images/slide2.jpg',
    'images/slide3.webp',
    'images/slide4.jpg'
];

let current=0;

slides.forEach((src,i)=>{
    const slide=document.createElement('div');
    slide.className='slide';
    slide.innerHTML=`<img src="${src}">`;
    track.appendChild(slide);

    const dot=document.createElement('div');
    dot.className='dot';
    dot.onclick=()=>goTo(i);
    dotsContainer.appendChild(dot);
});

function goTo(i){
    track.style.transform=`translateX(-${i*100}%)`;
    current=i;

    document.querySelectorAll('.dot').forEach((d,index)=>{
        d.classList.toggle('active',index===i);
    });
}

function next(){
    goTo((current+1)%slides.length);
}
function prev(){
    goTo((current-1+slides.length)%slides.length);
}

document.getElementById('next').onclick=next;
document.getElementById('prev').onclick=prev;

setInterval(next,5000);

goTo(0);
