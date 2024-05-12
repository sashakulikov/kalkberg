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

// Translation function for German
function translateToGerman() {
    var language = navigator.language || navigator.userLanguage;
    if (language.startsWith('de')) {
        // Translation mappings for specific text elements
        var translations = {
            'Contact': 'Kontakt',
            'May–June• 8pm–5am': 'Mai–Juni, 20:00–5:00',
        };

        // Translate elements by their structure or position in the document
        var elementsToTranslate = document.querySelectorAll('.translate');
        elementsToTranslate.forEach(element => {
            var text = element.textContent.trim();
            if (translations.hasOwnProperty(text)) {
                element.textContent = translations[text];
            }
        });
    }
}

// Call the translation function initially
translateToGerman();
