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

