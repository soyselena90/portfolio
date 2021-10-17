//Selectors
const header = document.querySelector("#header");
const hamburgerMenu = document.querySelector(".hamburger_menu");
const hotelActive = document.querySelectorAll(".featured_hotels");
const roomsActive = document.querySelectorAll(".featured_rooms");

hamburgerMenu.addEventListener('click', () => {
  header.classList.toggle('menu_open');
});

window.addEventListener('scroll', () => {
    let windowPosition = window.scrollY;
    header.classList.toggle('active', windowPosition > 0);
    
    hotelActive.forEach((hotel) => {
        const htOffsetTop = hotel.offsetTop;
        if(windowPosition > htOffsetTop *0.5){
            hotel.classList.add('active');
        }        
    });
    
    roomsActive.forEach((room) => {
        const htOffsetTop = room.offsetTop;
        if(windowPosition > htOffsetTop*0.8){
            room.classList.add('active');
        }        
    });    
});





