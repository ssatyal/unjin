$(document).ready(function(){
    $('.parallax').parallax();
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
