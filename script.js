const container = document.querySelector('.container');
const para = document.querySelector('.intro');
const input = document.getElementById('story'); 
// const children = storyBox.querySelectorAll('.child'); 


const doneBtn = document.getElementById('done'); 
const clearBtn = document.getElementById('clear'); 
const randomLetter = document.getElementById('getRandom');


const switchTheme = document.querySelector('.material'); 


input.addEventListener('input', () => {
    sessionStorage.setItem('words', input.value); 
})

if(sessionStorage.getItem('words')) {
    input.value = sessionStorage.getItem('words'); 
}

doneBtn.addEventListener('click', function() {
    makeArray(); 
    input.focus(); 
})

clearBtn.addEventListener('click', function() {
    input.value = ''; 
    input.focus(); 
    sessionStorage.clear(); 
    para.textContent = '"The only writing is rewriting" - Ernest Hemingway'
})

function makeArray() {
    let story = input.value;
    let array = story.split(' ');
    let space = array.indexOf(''); 
    if(space !== -1) {
        array.splice(space); 
    } 
    let count = array.length; 
    console.log(count); 

    switch (true) {
        case (count < 5):
            para.textContent = 'You have ' + (6-count) + ' more words to go.' 
            break;
        case (count === 5):
            para.textContent = 'You have 1 more word to go.';
            break; 
        case (count > 6): 
            para.textContent = 'You\'re at ' + count + ' words.'
            break;
        default:
            const storyHero = document.querySelector('.story-hero');
            const storyDisplay = document.querySelector('.large-text')
            container.style.display = 'none'; 
            storyHero.style.display = 'block'; 
            let sixWords = array.join(' '); 
            storyDisplay.textContent = sixWords; 
            function createButtons() {
                twttr.widgets.createShareButton(
                    '/',
                    document.getElementById('twitter-container'),
                    {
                      size: 'large',
                      text: sixWords,
                      hashtags: 'insixwords'
                    }
                  )
                  .then( function( el ) {
                    console.log('Tweet button added.');
                  });
            const newButtons = document.querySelectorAll('.new-button');
            const twitterBtn = document.getElementById('twitter-container'); 
                
            function displayScreen() {
                container.style.display = 'block'; 
                storyHero.style.display = 'none'; 
                storyDisplay.textContent = ''; 
                twitterBtn.innerHTML = '';
            }
            newButtons[0].addEventListener('click', () => {
                displayScreen(); 
                para.textContent = '"The only writing is rewriting" - Ernest Hemingway'; 
            })
            newButtons[1].addEventListener('click', () => {
                displayScreen();
                para.textContent = '"A word after a word after a word is power." - Margaret Atwood';
                input.value = '';   
            })
            
        }
        createButtons();
        break;
    }
}


randomLetter.addEventListener('click', () => {
    input.value = alphabet[getRandomNumber(26)]; 
    input.focus();
})
    
let alphabet = [];  
for(let i = 65; i <= 90; i++) {
alphabet.push(String.fromCharCode(i)); 
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * (max)); 
}

const darkMode = document.querySelector('.md-dark');
const lightMode = document.querySelector('.md-light');
const buttons = document.querySelectorAll('.button'); 


switchTheme.addEventListener('click', () => {
   
    document.body.classList.toggle('dark-theme'); 
    if(darkMode.style.display === 'none') {
        darkMode.style.display = 'block'; 
        lightMode.style.display = 'none';
    } else {
        darkMode.style.display = 'none';
        lightMode.style.display = 'block';
    }
    for(let i = 0; i<buttons.length; i++) {
        buttons[i].classList.toggle('dark-theme'); 
    }

    localStorage.setItem('mode', document.body.classList); 
}) 

if(localStorage.getItem('mode')) {
    let currentMode = localStorage.getItem('mode'); 

    document.body.classList = currentMode; 
    darkMode.style.display = 'none'; 
    lightMode.style.display = 'block'; 

    function changeBtn() {
        let i = 4;
        while (i--) {
                buttons[i].classList.add('dark-theme'); 
            }
        return;
    }
    changeBtn(); 
    
}




    


// sessionStorage.clear();



function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('sessionStorage')) {
    console.log('Yippee! We can use localStorage awesomeness')
  }
  else {
    console.log('Too bad, no localStorage for us')
  }