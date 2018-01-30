/*********************************/
//          Menu Burger
/*********************************/

var menu = document.querySelector('.menu-burger');

menu.addEventListener("click", function(e){
    e.preventDefault();
   this.classList.toggle("open-burger");
});