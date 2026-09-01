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
        fig.addEventListener('mouseenter', function(){ setFlip(true); });
        card.addEventListener('mouseleave', function(){ setFlip(false); });
        fig.addEventListener('focus', function(){ setFlip(true); });
        fig.addEventListener('blur', function(){ setFlip(false); });
        // Only bind tap-to-toggle on touch devices; on a mouse, hover handles it
        // (a click would otherwise immediately un-flip a card you just hovered).
        if (isTouch) fig.addEventListener('click', toggle);
        fig.addEventListener('keydown', function(e){
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });
});
