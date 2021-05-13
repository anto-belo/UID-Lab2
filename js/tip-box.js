let tipBox = {
    tipBoxSelf: document.getElementById('tip-box-wrapper'),
    cardHeader: document.getElementById('card-header'),
    cardInfo: document.getElementById('card-info'),
    cardsInfo: [
        "Chop your own wood and it will warm you twice.",
        "I don’t care what you think about me. I don’t think about you at all.",
        "Work hard to get what you like, otherwise you'll be forced to just like what you get.",
        "In the End, we will remember not the words of our enemies, but the silence of our friends.",
        "The weak can never forgive. Forgiveness is the attribute of the strong."],
    currentCard: 0,
    tipBoxCloseCross: document.getElementById('tip-box-cross'),
    prevCardButton: document.getElementById('prev-card-button'),
    nextCardButton: document.getElementById('next-card-button'),
    dontShowCheckbox: document.getElementById('dont-show-checkbox'),
}

tipBox.tipBoxInit = function () {
    tipBox.tipBoxSelf.hidden = true;
    if (localStorage.getItem('show-tips') === 'n') {
        return;
    }
    tipBox.generateCardDots();
    tipBox.updateTipBox();
    setTimeout(() => tipBox.tipBoxSelf.hidden = false, 5000);
}

tipBox.generateCardDots = function () {
    let tipBoxDotsContainer = document.getElementById('tip-box-dots');
    for (let i = 0; i < tipBox.cardsInfo.length; i++) {
        tipBoxDotsContainer.innerHTML += "<i class=\"fas fa-circle dot cursor-pointer\"></i>";
    }
    tipBox.tipBoxDots = document.querySelectorAll('i.dot');
    for (let i = 0; i < tipBox.tipBoxDots.length; i++) {
        tipBox.tipBoxDots[i].addEventListener('click', () => {
            tipBox.currentCard = i;
            tipBox.updateTipBox();
        });
    }
}

tipBox.updateTipBox = function () {
    tipBox.cardHeader.innerText = 'TIP ' + (tipBox.currentCard + 1);
    tipBox.cardInfo.innerText = tipBox.cardsInfo[tipBox.currentCard];
    tipBox.disableAllDots();
    tipBox.tipBoxDots[tipBox.currentCard].setAttribute('class', 'far fa-circle dot');
}

tipBox.disableAllDots = function () {
    for (let i = 0; i < tipBox.tipBoxDots.length; i++) {
        tipBox.tipBoxDots[i].setAttribute('class', 'fas fa-circle dot cursor-pointer');
    }
}

document.getElementById('logo').addEventListener('click', () => {
    localStorage.setItem('show-tips', 'y');
});

tipBox.dontShowCheckbox.addEventListener('change', () => {
    if (tipBox.dontShowCheckbox.checked === true) {
        localStorage.setItem('show-tips', 'n');
    } else {
        localStorage.setItem('show-tips', 'y');
    }
});

function prevCard() {
    if (tipBox.currentCard === 0) {
        tipBox.currentCard = tipBox.cardsInfo.length;
    }
    tipBox.currentCard--;
    tipBox.updateTipBox();
}

tipBox.prevCardButton.addEventListener('click', prevCard);

document.addEventListener('keydown', e => {
    if (e.key === "ArrowLeft") {
        prevCard();
    }
});

function nextCard() {
    if (tipBox.currentCard === tipBox.cardsInfo.length - 1) {
        tipBox.currentCard = -1;
    }
    tipBox.currentCard++;
    tipBox.updateTipBox();
}

tipBox.nextCardButton.addEventListener('click', nextCard);

document.addEventListener('keydown', e => {
    if (e.key === "ArrowRight") {
        nextCard();
    }
});

document.addEventListener('keydown', e => {
    if (e.key === "Escape") {
        tipBox.tipBoxSelf.hidden = true;
    }
});

tipBox.tipBoxCloseCross.addEventListener('click', () => {
    tipBox.tipBoxSelf.hidden = true;
});

tipBox.tipBoxInit();
