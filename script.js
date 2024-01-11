const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
  'Be a good person, Do not waste time to prove it',
  'if there is anything you wanted to be there, why eyes needs to shred some tears',
];
// store the list of words and the index of the word the player is currently typing


let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

let inputEventListener; // Variable to hold the input event listener

document.getElementById('start').addEventListener('click', () => {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  words = quote.split(' ');
  wordIndex = 0;

  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  quoteElement.innerHTML = spanWords.join('');
  quoteElement.childNodes[0].className = 'highlight';
  messageElement.innerText = '';

  typedValueElement.value = '';
  typedValueElement.disabled = false; // Enable the textbox
  typedValueElement.focus();

  function openModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerText = message;
    modal.style.display = 'block';
  }

  function closeModal() {
    const modal = document.getElementById('modal');
    modalMessage.innerText = '';
    modal.style.display = 'none';
  }
  // Add or update the input event listener
  inputEventListener = function () {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
  
      // Disable the input event listener
      typedValueElement.removeEventListener('input', inputEventListener);
      // Disable the textbox
      typedValueElement.disabled = true;
  
      // Display success message in the modal
      openModal(message);
  }else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      typedValueElement.value = '';
      wordIndex++;

      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }

      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = '';
    } else {
      typedValueElement.className = 'error';
    }
  };

  typedValueElement.addEventListener('input', inputEventListener);

  startTime = new Date().getTime();
});
