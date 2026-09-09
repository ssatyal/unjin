// Custom hero parallax: the campus photo is full-width and taller than the banner,
// so it can pan vertically. It starts framed on the LOWER portion of the image and
// pans upward (slower than the page) as you scroll.
$(document).ready(function(){
    var hero = document.querySelector('.cover-parallax');
    var img  = hero && hero.querySelector('.cover-photo');
    if (!hero || !img) return;
    var maxUp = 0;                      // how far the image can travel (overflow)
    var FACTOR = 0.42;                  // < 1 => banner moves slower than the page
    var START  = 0.66;                  // start ~0.66 down the image (a bit below middle)
    function update(){
        // Start framed a bit below the middle, then pan DOWN toward the bottom third
        // as the page scrolls down.
        var ty = -maxUp * START - window.scrollY * FACTOR;
        if (ty > 0) ty = 0;
        if (ty < -maxUp) ty = -maxUp;
        img.style.transform = 'translateY(' + ty + 'px)';
    }
    function measure(){
        maxUp = Math.max(0, img.offsetHeight - hero.offsetHeight);
        update();
    }
    if (img.complete) measure(); else img.addEventListener('load', measure);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', update, { passive: true });
});

// Publication flip cards.
// The flip is LATCHED with a class rather than driven by :hover on the figure,
// so it can't oscillate: hovering (or focusing) the FIGURE flips the card to the
// abstract; the flip is held while the pointer stays anywhere on the card and
// released when it leaves. Keyboard: focusing the figure flips, blurring unflips.
// Touch: tapping the figure toggles the flip.
$(document).ready(function(){
    var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
    document.querySelectorAll('#pubs .pubcard').forEach(function(card){
        var fig = card.querySelector('.card-image');
        var back = card.querySelector('.pubcard-back');
        if (!fig) return;
        if (back) back.setAttribute('aria-hidden', 'true');   // abstract not read until revealed
        function setFlip(on){
            card.classList.toggle('is-flipped', on);
            fig.setAttribute('aria-expanded', on ? 'true' : 'false');
            if (back) back.setAttribute('aria-hidden', on ? 'false' : 'true');
        }
        function toggle(){ setFlip(!card.classList.contains('is-flipped')); }

        // Mouse: flip only while the pointer is over the FIGURE zone (the top of the
        // card); moving down to the title/links area flips back so the venue/DOI links
        // are reachable without leaving the card. Driven off the non-rotating card, so
        // it can't oscillate.
        if (!isTouch) {
            card.addEventListener('mousemove', function(e){
                var rect = card.getBoundingClientRect();
                setFlip((e.clientY - rect.top) <= fig.offsetHeight);
            });
            card.addEventListener('mouseleave', function(){ setFlip(false); });
        }
        // Keyboard
        fig.addEventListener('focus', function(){ setFlip(true); });
        fig.addEventListener('blur', function(){ setFlip(false); });
        // Touch: tap the figure to toggle
        if (isTouch) fig.addEventListener('click', toggle);
        fig.addEventListener('keydown', function(e){
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });
});
