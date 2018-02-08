/*********************************/
//          Animation scroll
/*********************************/

animateScroll();

var scrollPosition = 0;
var ticking = false;

window.addEventListener('scroll', function(e){
    e.preventDefault();
    scrollPosition = window.scrollY;
    if(!ticking){
        window.requestAnimationFrame(function(){
            animateScroll(scrollPosition);
            ticking = false;
        });
    }
    ticking = true;
});

function animateScroll(){

    var positionStart = 400;
    var element = document.getElementsByClassName("js-animate-scroll");

    for(var i = 0; i < element.length; i++){
        var elementTop = element[i].offsetTop - positionStart;
        var elementBottom = elementTop + element[i].clientHeight + positionStart;

        for(var nb = 0; nb < element[i].children.length; nb++) {
            if ((scrollPosition > elementTop) && (scrollPosition < elementBottom)) {
                element[i].children[nb].classList.add("scroll-visible");
            }
            else {
                element[i].children[nb].classList.remove("scroll-visible");
            }
        }
    }
}


/*********************************/
//       Animate Materialize
/*********************************/

jQuery(document).ready(function() {

    // Active l'animation des SELECT
    jQuery('select').material_select();

    // Déclenche datepicker
    jQuery('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });

    // Déclenche le timepicker
    jQuery('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
    });

    // Active l'animation compteur de charactère
    jQuery(document).ready(function() {
        jQuery('input#lastname').characterCounter();
    });

});


/*********************************/
//          Menu Burger
/*********************************/

var menu = document.querySelector('.menu-burger');

menu.addEventListener("click", function(e){
    e.preventDefault();
   this.classList.toggle("open-burger");
});
/*********************************/
//          Menu Sticky
/*********************************/

window.addEventListener('scroll', function(e){
    e.preventDefault();
    scrollPosition = window.scrollY;
    window.requestAnimationFrame(function(){
        menuSticky(scrollPosition);
    });
});

var menu = document.querySelector('.menu--main');
var header = document.querySelector('header');
var headerHeight = header.offsetHeight;
var animateHeight = 200;

function menuSticky(scrollPosition){

    if(scrollPosition > headerHeight){
        menu.setAttribute("style", "position: fixed; top: 39px;");

    }
    else{
        menu.setAttribute("style", "position: inherit");
    }

}
/*********************************/
//          Animation slider
/*********************************/

class Slider{

    constructor($selector){
        this.durationMs = 4000; // Time scrolling slider
        this.current = 0;
        this.tabItems = [];
        this.zoneImg = null;

        this.slider = document.querySelectorAll($selector);

        if(this.slider.length > 0) {
            this.slider = document.querySelector($selector);
            this.zoneImg = this.slider.querySelectorAll('.slider-img');
            this.tabItems = this.slider.querySelectorAll('.link-border');

            // Create first image
            var initImg = document.createElement("IMG");
            var initLinkImg = this.tabItems[0].getAttribute("data-image");
            initImg.setAttribute("src", initLinkImg);
            initImg.setAttribute("class", "slide-img");
            this.zoneImg[0].appendChild(initImg);

            // Loop titles
            this.tabItems.forEach(function (element, index) {
                element.setAttribute('x-id', index); // add id at title
                element.addEventListener("click", function(event){
                    event.preventDefault();
                    element.classList.remove('animate-bar-transition');
                    void element.offsetTop; // restart animation at click
                    slide.goTo(parseInt(this.getAttribute('x-id')));
                }, false);
            });
        }
        this.animateTitle(this.current); // Init animate Title
        this.animateSlide(this.current += 1); // Init animate slide
    }

    goTo(nb){
        if(this.tabItems[nb]){
            this.current = nb; // get id with at click or after animate
            this.showItem(this.current);
        }

    }

    animateSlide(nb){
        this.timer = setTimeout(function(){
            slide.goTo(nb); // go to the next image
        }, this.durationMs); // duration to the next image
    }

    animateTitle(){
        var nb = this.current; // get id of the current slide
        var nbTitles = this.tabItems.length;

        // title now
        this.tabItems[nb].classList.add('animate-bar-transition'); // add class "animate-bar-transition"
        this.tabItems[nb].querySelector('.progress-bar').style.opacity = "1"; // add opacity animation bar
        this.tabItems[nb].querySelector('.progress-bar').style.animationDuration = this.durationMs+"ms"; // add duration animation bar
        for(var i = nb + 1; i < nbTitles; i++){ // titles next
            this.tabItems[i].querySelector('.progress-bar').style.opacity = "1"; // add opacity for the next animation bars
            this.tabItems[i].classList.remove('animate-bar-transition'); // remove class for the next animation bars
        }

        // title prev
        var nbPrev = nb;
        if(nbPrev === 0){ // if first title
            nbPrev = nbTitles - 1; // get the last title
            this.tabItems[nbPrev].classList.remove('animate-bar-transition'); // remove class for the last title
        }
        else{
            for(i = 0; i < nbPrev; i++){
                this.tabItems[i].querySelector('.progress-bar').style.opacity =  "0"; // the animation bars is transparent
                this.tabItems[i].classList.remove('animate-bar-transition'); // remove class "animate-bar-transition"
            }
        }
    }

    showItem(){
        // active the title
        slide.animateTitle(this.current);

        // clear the setTimeout at click
        clearTimeout(this.timer);

        var item = this.tabItems[this.current]; // get the current title
        var currentImg = this.zoneImg[0].querySelector('.slide-img'); // get the current image

        // create new image
        var newImg = document.createElement("img");
        newImg.setAttribute('class', 'slide-img');
        newImg.setAttribute('src', item.getAttribute('data-image'));

        currentImg.style.zIndex = "2"; // add attribute at current image
        currentImg.style.opacity = "0";
        newImg.style.zIndex = "1"; // add attribute at next image

        // remove the current image and add attribute at the new image
        setTimeout(function(){ currentImg.remove(); newImg.style.zIndex = "2"; }, 300);

        this.zoneImg[0].appendChild(newImg); //

        // go to the next image
        if(this.current === (this.tabItems.length -1)){
            this.current = 0;
        }
        else{
            this.current += 1;
        }

        slide.animateSlide(this.current);
    }
}