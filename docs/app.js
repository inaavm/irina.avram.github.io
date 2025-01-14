const flashcards = [
    { question: "How do you say 'hello' in Spanish?", answer: "Hola" },
    { question: "How do you say 'goodbye' in French?", answer: "Au revoir" },
    { question: "How do you say 'thank you' in German?", answer: "Danke" },
];

let currentIndex = 0;

function nextCard() {
    const cardElement = document.getElementById("card");

    if (currentIndex < flashcards.length) {
        cardElement.innerHTML = flashcards[currentIndex].question;
        currentIndex++;
    } else {
        cardElement.innerHTML = "You've completed the flashcards!";
    }
}

// Initial card display
nextCard();
