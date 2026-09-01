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
        fig.addEventListener('mouseenter', function(){ card.classList.add('is-flipped'); });
        card.addEventListener('mouseleave', function(){ card.classList.remove('is-flipped'); });
        fig.addEventListener('focus', function(){ card.classList.add('is-flipped'); });
        fig.addEventListener('blur', function(){ card.classList.remove('is-flipped'); });
        fig.addEventListener('click', function(){ card.classList.toggle('is-flipped'); });
        fig.addEventListener('keydown', function(e){
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('is-flipped'); }
        });
    });
});
