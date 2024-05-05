// Function to toggle display of information section
function toggleInfo() {
    var colophon = document.querySelector('.colophon');
    if (colophon.style.display === 'none' || colophon.style.display === '') {
        colophon.style.display = 'block'; // Show the colophon if it's hidden
    } else {
        colophon.style.display = 'none'; // Hide the colophon if it's visible
    }
}

// Function to play or pause the audio
function playAudio() {
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

import { inject } from "@vercel/analytics"
