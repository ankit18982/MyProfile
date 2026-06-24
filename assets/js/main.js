/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close');

function openMenu(){
    navMenu.classList.add('show_menu');
    document.body.classList.add('menu_open');
}

function closeMenu(){
    navMenu.classList.remove('show_menu');
    document.body.classList.remove('menu_open');
}

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', openMenu);
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', closeMenu);
}
/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav_link');
const navCta = document.querySelector('.nav_cta');
function linkAction(){
    closeMenu();
}

navLink.forEach(n => n.addEventListener('click', linkAction));

if(navCta){
    navCta.addEventListener('click', closeMenu);
}

if(navMenu){
    navMenu.addEventListener('click', (event) => {
        if(event.target === navMenu){
            closeMenu();
        }
    });
}
/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills_content'),
skillsHeader = document.querySelectorAll('.skills_header');

function toggleSkills(){
    let itemClass = this.parentNode.className
    for(i=0;i < skillsContent.length;i++){
        skillsContent[i].className = 'skills_content skills_closed';
    };
    if(itemClass === 'skills_content skills_closed'){
        this.parentNode.className = 'skills_content skills_active';
    }
}

skillsHeader.forEach((el)=>{
    el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab)=>{
    tab.addEventListener('click', ()=>{
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification_active');
        });

        target.classList.add('qualification_active');

        tabs.forEach(tab=>{
            tab.classList.remove('qualification_active')
        });
        tab.classList.add('qualification_active')
    });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services_modal'),
modalBtns = document.querySelectorAll('.services_button'),
modalCloses = document.querySelectorAll('.services_close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('modal_active');
}
modalBtns.forEach((modalBtn, i)=>{
    modalBtn.addEventListener('click', function(){
        modal(i);
        console.log(i);
    })
});
modalCloses.forEach((modalClose)=>{
    modalClose.addEventListener('click', ()=>{
        modalViews.forEach((modalView)=>{
            modalView.classList.remove('modal_active');
        });
    })
});



/*==================== PORTFOLIO SWIPER  ====================*/
const portfolioSwiper = document.querySelector('.portfolio_container.swiper');
if (portfolioSwiper) {
    let swiper = new Swiper(".portfolio_container", {
        loop: false,
        grabCursor: true,
        spaceBetween: 24,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        breakpoints: {
            568: {
                slidesPerView: 1.1,
                spaceBetween: 18
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 2.6,
                spaceBetween: 24
            }
        }
    });
}

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial_container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true
    },
    breakpoints:{
        568:{
            slidesPerView:2
        }
    }
  });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const section = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    section.forEach(current=>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        if(scrollY >  sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*='+sectionId+']').classList.add('active-link');
        }else{
            document.querySelector('.nav_menu a[href*='+sectionId+']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header');

    if(this.scrollY >= 80){
        nav.classList.add('scroll-header');
    }else{
        nav.classList.remove('scroll-header')
    }
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560){
        scrollUp.classList.add('show-scroll');
    }else{
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/ 
const themeToggleButton = document.getElementById('theme-toggle');
const darkTheme= 'dark_theme';

//previosuly selected
const themeStorageKey = 'portfolio-theme-v2';
const iconStorageKey = 'portfolio-icon-v2';
const selectedTheme = localStorage.getItem(themeStorageKey);
const sunIconClass = 'uil-sun';
const moonIconClass = 'uil-moon';

const syncThemeIcon = (themeMode) => {
    themeToggleButton.classList.remove(sunIconClass, moonIconClass);
    themeToggleButton.classList.add(themeMode === 'dark' ? sunIconClass : moonIconClass);
};

//get current theme
const getCurrentTheme = ()=>{
    if(document.body.classList.contains(darkTheme)){
        return 'dark';
    }else{
        return 'light';
    }
}
//get current icon
const getCurrentIcon = ()=>{
    if(document.body.classList.contains(darkTheme)){
        return sunIconClass;
    }else{
        return moonIconClass;
    }
}
if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    syncThemeIcon(selectedTheme);
} else {
    syncThemeIcon(getCurrentTheme());
}

// Manually toggle theme 
themeToggleButton.addEventListener('click', ()=>{
    document.body.classList.toggle(darkTheme);
    syncThemeIcon(getCurrentTheme());
    //save the choices
    localStorage.setItem(themeStorageKey, getCurrentTheme());
    localStorage.setItem(iconStorageKey, getCurrentIcon());
    console.log(getCurrentTheme());
    console.log(getCurrentIcon());
});
