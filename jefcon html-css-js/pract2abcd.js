const initSlider = () => {
    const imageList = document.querySelector(".b .c");
    const slideButtons = document.querySelectorAll(".b .slide-button");
    const sliderScrollbar = document.querySelector(".a .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft =imageList.scrollWidth - imageList.clientWidth;

// ---------------HANDLE SCROLLBAR THUMB DRAG----------------
    scrollbarThumb.addEventListener("mousedown", (e) =>{
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        // -------------UPDATE THUMB POSITION ON MOUSE MOVE---------------
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width- scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));


            const scrollPosition = (boundedPosition/maxThumbPosition) * maxScrollLeft

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition; 
        }

        // -------REMOVE EVENT LISTNER ON MOUSE UP------------
        const handleMouseUp =() =>{
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

        }

        // ---------------------ADD EVENT LISTENERS FOR DRAG INTERACTION---------
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // -----------------SLIDE MAGES ACCORDING TO THE SLIDE IMAGE CLICKS-----------
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            // console.log(button);
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount =imageList.clientWidth * direction;
            imageList.scrollBy({left: scrollAmount, behavior: "smooth"});

        });
    });
    const handleSlideButtons =() => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >=  maxScrollLeft ? "none" : "block" ;
    }
// ----------------UPDATE SCROLBAR POSITION BASED ON IMAGE SCROLL----------
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth-scrollbarThumb.offsetWidth)
        scrollbarThumb.style.left =`${thumbPosition}px`;

    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}

window.addEventListener("load",initSlider);