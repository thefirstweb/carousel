(function () {
    function carousel (option) {
        if (!option) {
            console.error('not option');
            return;
        }
        if (!option.dom) {
            console.error('not set dom');
            return;
        }
        if (!option.viewCount) {
            console.error('not set viewCount');
            return;
        }
        var dot,
            w,
            l,
            dom = option.dom,
            items = dom.querySelectorAll('.mod_carousel_list'),
            currentCount = 0;
        if (!items || items.length === 0) {
            console.error('no content');
            return;
        }
        w = items[0].clientWidth;
        l = items.length;
        function slide (count) {
            var slideContent = dom.getElementsByTagName('ol')[0];
            slideContent.style.left = '-' + w*option.viewCount*count + 'px';
        }
        function slideDot () {
            dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', '');
            currentCount = parseInt(this.getAttribute('data-count'), 10);
            dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', 'focus');
            slide(currentCount);
        }
        function slideArrow () {
            var arrow = this.getAttribute('class');
            dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', '');
            if (arrow === 'mod_carousel_arrow_l') {
                if (currentCount !== 0) {
                    currentCount--;
                }
            } else {
                if ((Math.ceil(l / option.viewCount) - 1) > currentCount) {
                    currentCount++;
                }
            }
            dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', 'focus');
            slide(currentCount);
        }
        dot = Math.ceil(l / option.viewCount);
        // add 1 is for ui padding-left 1;
        //dom.querySelectorAll('ol')[0].style.width = w*l + '1' + 'px';
        dom.querySelectorAll('ol')[0].style.width = w*l + 1 + 'px';
        var arrowL = dom.querySelectorAll('.mod_carousel_arrow_l')[0],
            arrowR = dom.querySelectorAll('.mod_carousel_arrow_r')[0];
        var dots = dom.querySelectorAll('.mod_carousel_dots')[0];
        if (dots) {
            dots.outerHTML = '';
            delete dots;
        }
        if (dot > 1) {
            arrowL.onclick = slideArrow;
            arrowR.onclick = slideArrow;
            arrowL.setAttribute('data-state', '');
            arrowR.setAttribute('data-state', '');

            var dotDom = document.createElement('div');
            dotDom.setAttribute('class', 'mod_carousel_dots');
            dotDom.setAttribute('style', 'text-align:center;');
            for (var i = 0; i < dot; i++) {
                var span = document.createElement('span');
                if (i === 0) {
                    span.setAttribute('data-state', 'focus');
                }
                span.setAttribute('class', 'mod_carousel_dot');
                span.setAttribute('data-count', i);
                span.onclick = slideDot;
                dotDom.appendChild(span);
            }
            dom.appendChild(dotDom);
        } else {
            arrowL.setAttribute('data-state', 'hide');
            arrowR.setAttribute('data-state', 'hide');
        }

        dom.addEventListener('touchstart', handleTouchStart, false);
        dom.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        }

        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    /* left swipe */
                    // console.log('left swipe');
                    dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', '');
                    if ((Math.ceil(l / option.viewCount) - 1) > currentCount) {
                        currentCount++;
                    }
                    dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', 'focus');
                    slide(currentCount);
                } else {
                    /* right swipe */
                    // console.log('right swipe');
                    dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', '');
                    if (currentCount !== 0) {
                        currentCount--;
                    }
                    dom.querySelectorAll('.mod_carousel_dot')[currentCount].setAttribute('data-state', 'focus');
                    slide(currentCount);
                }
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */
                    console.log('up swipe');
                } else {
                    /* down swipe */
                    console.log('down swipe');
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        }
        function reset() {
            var dots = dom.querySelectorAll('.mod_carousel_dots')[0];
            if (dots) {
                dots.outerHTML = '';
                delete dots;
            }
            dom.removeEventListener('touchstart', handleTouchStart, false);
            dom.removeEventListener('touchmove', handleTouchMove, false);
            arrowL.setAttribute('data-state', 'hide');
            arrowR.setAttribute('data-state', 'hide');
            dom.getElementsByTagName('ol')[0].outerHTML = '';
            delete dom.getElementsByTagName('ol')[0];
        }
        this.reset = reset;
    }
    window.carousel = carousel;
})();
