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
    document.querySelectorAll('#pubs .pubcard').forEach(function(card){
        var fig = card.querySelector('.card-image');
        if (!fig) return;
        function setFlip(on){
            card.classList.toggle('is-flipped', on);
            fig.setAttribute('aria-expanded', on ? 'true' : 'false');
        }
        function toggle(){ setFlip(!card.classList.contains('is-flipped')); }
        fig.addEventListener('mouseenter', function(){ setFlip(true); });
        card.addEventListener('mouseleave', function(){ setFlip(false); });
        fig.addEventListener('focus', function(){ setFlip(true); });
        fig.addEventListener('blur', function(){ setFlip(false); });
        fig.addEventListener('click', toggle);
        fig.addEventListener('keydown', function(e){
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });
});
