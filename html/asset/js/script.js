'use strict';

//textSplit  
document.querySelectorAll(".split").forEach(elem => {
   let splitText = elem.innerText;
   let splitWrap = splitText.split("").join("</span><span aria-hidden:'true'>");
   splitWrap = "<span aria-hidden:'true'>" + splitWrap + "</span>";
   elem.innerHTML = splitWrap;
   elem.setAttribute("aria-label", splitText);
});           

//count        
let ordered = 0;
let flag = true;
function countFunc(target) {
   const progress = target.find($('.count[data-percentage]'));
   const percentage = Math.ceil(progress.attr('data-percentage'));
   $({
       countNum: 0
   }).animate({
       countNum: percentage + 1
   }, {
       duration: 1000,
       easing: 'linear',
       step: function() {
           const pct = Math.floor(this.countNum) + '%';
           progress.text(pct);
       }
   });
}
if (document.location.search.match(/type=embed/gi)) {
   window.parent.postMessage("resize", "*");
}   

//scroll
$(window).scroll(function() {        
   const headerText = document.querySelector(".header-title");
   const wScroll = $(window).scrollTop();
   const thisScroll = $(this).scrollTop();
   const wHeight = $(window).height();      
   let tl = new TimelineMax();

   //scrollText    
   $(".scroll").text(wScroll);     

   //eachSectionScroll
   $('section').add('.on').each(function(){
       if(thisScroll > $(this).offset().top - wHeight * 0.7){
           if($(this).find('.sub_title').length > 0){
               headerText.innerText = $(this).find('.sub_title').last().text();
           }
           $(this).addClass('active');
       }else{
           $(this).removeClass('active');
       }
   });
 
   //slideTitle
   $('.sec1 h1 .slide-title').css({
       "transform": "translateX(" + -thisScroll * 0.5 + "px)"
   });
   //shape
   $('.purple, .orange, .green').css({
       "transform": "translateY(" + -thisScroll / 8  + "%)"
   });
   $('.orange-deg, .green-deg').css({
       "transform": "rotate(" + -thisScroll / 5  + "deg)"
   });   
   //slideSkillTitle
   $('.on .to-right').css({
       "transform": "translateX(" + thisScroll * 0.5 + "px)"
   });   
   $('.on .to-left').css({
       "transform": "translateX(" + -thisScroll * 0.5 + "px)"
   });       

   if(wScroll >= $(".sec3").offset().top && flag === true){
       flag = false;
       countFunc($(".f1 .back"));
       countFunc($(".f2 .back"));
       countFunc($(".f3 .back"));
   }            
   bringChar(wScroll, tl);
   
    //section6HorizontalScroll               
   let offsetLeft = (wScroll - $(".sec6").offset().top);
   if(wScroll > $(".sec6").offset().top + 1000){                
      $(".sec6").find('.slide-contents').css("left",+ -offsetLeft + 1000 +"px");
   }else{
      $(".sec6").find('.slide-contents').css("left",+ 0 +"px");
   }

});     

//sectionTitleSplit
function bringChar(e, tl, arr){
   for(let i = 4; i < 7; i++){
       const node = '#section' + i;
       const action = node + ' .title h1 .split span';
       const where = $(node).offset().top;
       if(e >= where * 0.95){                            
           tl.to(action, {
               duration: 0.8,
               opacity: 1,
               y: 0,
               stagger: 0.1,
           }, 0.5);                
       }
   }
}

//sendAMessage
var form = document.getElementById("my-form");

async function handleSubmit(event) {
   event.preventDefault();
   var status = document.getElementById("my-form-status");
   var data = new FormData(event.target);
   fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
         'Accept': 'application/json'
      }
   }).then(response => {
      status.innerHTML = "감사합니다!";
      form.reset()
   }).catch(error => {
      status.innerHTML = "메시지가 발송되지 않았습니다."
   });
}
form.addEventListener("submit", handleSubmit);




