'use strict';


 const nav = $(".nav");
 const navBtn = $('.nav_btn');
 const all = $(".nav li a");
 const home = $(".nav .list01 a");
 const about = $(".nav .list02 a");
 const work = $(".nav .list03 a");
 const contact = $(".nav .list04 a"); 

//fixed menu
 navBtn.click(function() {
    $(this).toggleClass("active");
    nav.toggleClass("show");
});

all.click(function(){
    nav.removeClass("show");
    $('#nav_btn').removeClass("active");
});

 home.mouseover(function(){
    $(all).css("color","#ff5e5e")
    nav.addClass("");
    
 });
 home.mouseout(function(){
    $(all).css("color","#fff")
    nav.removeClass("");
 });

 about.mouseover(function(){
    nav.addClass("");
 });
 about.mouseout(function(){
    nav.removeClass("");
 });

 work.mouseover(function(){
    $(all).css("color","#95e499");
 });
 work.mouseout(function(){
    $(all).css("color","#fff");
 });

 contact.mouseover(function(){
    nav.addClass("");
 });
 contact.mouseout(function(){
    nav.removeClass("");
 });




