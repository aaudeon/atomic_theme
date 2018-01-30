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