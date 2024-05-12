// Function to toggle display of information section
function toggleInfo() {
    console.log('Toggle info called'); // Debugging statement
    var colophon = document.querySelector('.colophon');
    if (colophon.style.display === 'none' || colophon.style.display === '') {
        colophon.style.display = 'block'; // Show the colophon if it's hidden
    } else {
        colophon.style.display = 'none'; // Hide the colophon if it's visible
    }
}

// Function to play or pause the audio
function playAudio() {
    console.log('Play audio called'); // Debugging statement
    var audio = document.getElementById('audioPlayer');
    if (audio.paused) {
        audio.play(); // Start playing the audio
        // Change text content of all play buttons to 'Stop'
        document.querySelectorAll('.playButton').forEach(button => button.textContent = 'Stop');
    } else {
        audio.pause(); // Pause the audio
        // Change text content of all play buttons to 'Play'
        document.querySelectorAll('.playButton').forEach(button => button.textContent = 'Play');
    }
}

// Function to update the date and time
function updateTime() {
    console.log('Update time called'); // Debugging statement
    var now = new Date();
    var hour = now.getHours();
    // Options for date formatting
    var options = {
        timeZone: 'Europe/Berlin',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        formatMatcher: 'best fit'
    };
    // Format the date string
    var dateString = new Intl.DateTimeFormat('en-UK', options).format(now);
    // Replace commas with bullet symbols after weekdays and months
    dateString = dateString.replace(/(Sun|Mon|Tue|Thu),/g, '$1•');
    dateString = dateString.replace(/(Jan|Mar|Apr|May|Jun|Nov|Dec),/g, '$1•');
    // Remove "at" from the date string
    dateString = dateString.replace(/\sat\s/g, ' '); // Remove "at" surrounded by spaces
    // Update date and time display
    var dateTimeElement = document.querySelector('.footer .date-time');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateString;
    } else {
        console.error('Date/time element not found');
    }
    // Update activity text based on the time of day
    var activityElement = document.querySelector('.footer .activity');
    if (hour >= 6 && hour < 19) {
        activityElement.textContent = 'No croaking';
    } else {
        activityElement.textContent = 'Now croaking';
    }
}

// Function to update the temperature
async function updateTemperature() {
    console.log('Update temperature called'); // Debugging statement
    const url = 'https://api.brightsky.dev/current_weather?lat=53.2484&lon=10.3969';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        // Extract temperature from API response
        const temperature = Math.round(data.weather.temperature);
        console.log('Temperature:', temperature);
        // Update temperature display
        const tempElement = document.querySelector('.footer .temp');
        if (tempElement) {
            tempElement.textContent = temperature + '°C'; // Add '°C' to display the temperature unit
        } else {
            console.error('Temp element not found');
        }
    } catch (error) {
        console.error(error);
    }
}

// Call updateTemperature function initially and every 5 minutes to update the temperature
updateTemperature();
setInterval(updateTemperature, 300000); // 300000 milliseconds = 5 minutes

// Call updateTime function initially and every second to continuously update the date and time
updateTime();
setInterval(updateTime, 1000);



// Function to toggle display of information section
function toggleInfo() {
    console.log('Toggle info called'); // Debugging statement
    var colophon = document.querySelector('.colophon');
    var pressRelease = document.getElementById('pressRelease');
    if (colophon.style.display === 'none' || colophon.style.display === '') {
        colophon.style.display = 'block'; // Show the colophon if it's hidden
        pressRelease.style.display = 'block'; // Show the press release
    } else {
        colophon.style.display = 'none'; // Hide the colophon if it's visible
        pressRelease.style.display = 'none'; // Hide the press release
    }
}

// Function to translate specific text elements to German if the system/browser language is German
function translateToGerman() {
    var language = navigator.language || navigator.userLanguage;
    if (language.startsWith('de')) {
        // Translate specific text elements to German
        var elementsToTranslate = [
            { original: 'Contact', translated: 'Kontakt' },
            { original: 'May–June• 8pm–5am', translated: 'Mai–Juni• 20:00–5:00' },
            { original: 'Experience the enchantment of the Lüneburg’s Kalkberg from May till June… A pit with a pond which once was a rock. Here we• the croaking frogs• greet wonderers with our nocturnes… Like in fairytales• we transform the natural world into the magical realm… Amidst the ancient limestone formations• lush greenery• and bouquet of the lilac• we enamour you with our vibrations… As night descends• step into the infinitely channeled soundscape• where our chorus fills the air with a sonic adventure…',
            translated: 'Erleben Sie den Zauber des Kalkbergs in Lüneburg von April bis Juni. Eine Grube mit einem Teich, die einst ein Felsen war. Hier begrüßen wir – die quakenden Frösche – Wanderer mit unseren nächtlichen Klängen. Wie in Märchen verwandeln wir die natürliche Welt in ein magisches Reich... Umgeben von alten Kalksteinformationen, üppigem Grün und dem Duft des Flieders, verzaubern wir Sie mit unseren Schwingungen. Wenn die Nacht hereinbricht, treten Sie ein in die unendlich kanalisierte Klanglandschaft, wo unser Chor die Luft mit einem klanglichen Abenteuer erfüllt.' }
        ];

        elementsToTranslate.forEach(element => {
            // Select elements containing the original text
            var elements = document.querySelectorAll(`:contains("${element.original}")`);
            elements.forEach(el => {
                // Replace the original text with the translated text
                el.textContent = el.textContent.replace(element.original, element.translated);
            });
        });
    }
}

// Call the translation function initially
translateToGerman();
