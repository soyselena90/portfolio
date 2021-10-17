const random_quote_api_url = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timerDiv');

//타이핑문자 맞는지 확인
quoteInputElement.addEventListener('input', ()=> {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    
    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if(character == null){
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }
       else if(character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });
    if(correct){
        renderNewQuote();
    }
});

function getRandomQuote() {
    return fetch(random_quote_api_url)
    .then(response => response.json())
    .then(data => data.content);
}

async function renderNewQuote(){
    const quote = await getRandomQuote(); 
    //새로운 문장 넣기
    quoteDisplayElement.innerHTML = '';
    //문장의 글자 한 글자씩 나누기
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    })    
    //입력창 비우기
    quoteInputElement.value = null;
    startTimer();
}

//timer
let startTime;
function startTimer(){
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime();
    },1000);
}
function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000); //1초 맞춤 
}
renderNewQuote();

