import bot from './assets/bot.png';
import user from './assets/user.png';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

//variable to set load time gap
let loadInterval;

//loading part... for loader
function loader(element) {
    element.textContent = '';

    loadInterval = setInterval(() => {
            element.textContent += '.';

            if (element.textContent === '....') {
                element.textContent = '';
            }
        }, 400 //in ms
    );
}


//delayed typing functionality --optional

function typeText(element, text) {
    let index = 0;

    let interval = setInterval(() => {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
            } else {
                clearInterval(interval); //inbuilr js functions
            }
        }, 15 //in ms

    )
}


//Need to generate uniques if for each message to identify and map over it
//can u time and date, use a random number and also hashing or hexadecimal string

function generateUniqueId() {
    //Date.now()
    const timestamp = Date.now();
    const randomNumber = Math.random();
    //Random number to hexadecimal string with .toString() function
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`
}


//coloring alternative msgs for ai or !ai
//rendering dynamic messages

function chatBar(isAi, value, uniqueId) {
    return ( //a template string
        `
        <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
            <div class="profile">
              <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user'}"/>
            </div>
            <div class="message" id=${uniqueId}>${value}</div>
          </div>
        </div>
        `
    )
}


const handleSubmit = async(e) => {
    e.preventDefault();

    //creates a from data object
    const data = new FormData(form);

    //create user chatBar 

    chatContainer.innerHTML += chatBar(false, data.get('prompt'));
    form.reset(); //reset function in js

    //Bot's chatBar

    const uniqueId = generateUniqueId();

    chatContainer.innerHTML += chatBar(true, " ", uniqueId);

    //auto scroll functionality to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    //fetching the newly created chat div and putting loading indicator into it
    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv);

    //fetching data from server --fetch call
    const response = await fetch('https://cgpt-app.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer '
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })

    })

    //clearing pre loading
    clearInterval(loadInterval);
    messageDiv.innerHTML = '';

    //checking response and appending it 
    if (response.ok) {
        const data = await response.json(); //awaiting the response called value
        const parsedData = data.bot.trim();

        typeText(messageDiv, parsedData);

    } else {
        const err = await response.text();

        messageDiv.innerHTML = "Something went wrong";

        alert(err);
    }
}

//calling handleSubmit
form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e);
    }
})