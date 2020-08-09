const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Enable/Disable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// pass joke to the speech API
function tellMe(joke) {
    console.log('tell me: ', joke)
    VoiceRSS.speech({
        key: '5d4ed92113f2448a88a64a6503953549',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Joke teller API
async function JokeTeller() {
    let Joke = '';
    const ApiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(ApiUrl);
        const data = await response.json();
        if (data.setup) {
            Joke = `${data.setup} ... ${data.delivery}`;
        } else {
            Joke = data.joke;
        }
        // text-to-speech
        tellMe(Joke);
        // disable/enable button
        toggleButton();
    } catch (error) {
        console.log('whoops, ', error)
    }
}

// Event Listeners
button.addEventListener('click', JokeTeller)
audioElement.addEventListener('ended', toggleButton)














