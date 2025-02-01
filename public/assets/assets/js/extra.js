
function scrollToTop(){
    const scrollDuration = 100;
    const startScroll = window.scrollY;
    const startTime = performance.now();

    function easeOut(t){
        return 1 - Math.pow(1-t, 3);
    }

    function scrollToTopAnimation(currentTime) { 
        const elapsedTime = currentTime - startTime; 
        if (elapsedTime > scrollDuration) { 
          window.scrollTo(0, 0); 
          return; 
        } 
     
        const scrollProgress = elapsedTime / scrollDuration; 
        const ease = easeOut(scrollProgress); 
        const targetScroll = startScroll * (1 - ease); 
     
        // Calculate the scroll step precisely 
        const scrollStep = targetScroll - window.scrollY; 
     
        window.scrollBy(0, scrollStep); 
        requestAnimationFrame(scrollToTopAnimation); 
      } 
     
      requestAnimationFrame(scrollToTopAnimation); 
    } 
     
    scrollToTop();
