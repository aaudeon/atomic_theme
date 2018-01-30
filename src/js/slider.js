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