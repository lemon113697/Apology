// Get all elements
const envelopeWrapper = document.getElementById('envelope-wrapper');
const envelope = document.getElementById('envelope');
const letterContainer = document.getElementById('letter-container');
const closeBtn = document.getElementById('close-btn');
const audioPlayer = document.getElementById('audio-player');
const musicInfo = document.getElementById('music-info');
const musicPlayer = document.getElementById('music-player');
const minimizeBtn = document.getElementById('minimize-btn');

// Set a custom song name (change this to your song title)
const songName = "Playing..."; // Change this to your actual song name

// Force audio to play when page loads
window.addEventListener('load', function() {
    // Display the custom song name
    musicInfo.textContent = songName;
    
    // Try to play the audio
    const playPromise = audioPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Audio is playing
            musicInfo.textContent = "♫ " + songName;
            console.log('Audio playing successfully');
        }).catch(error => {
            // Browser blocked autoplay, play on first user interaction
            console.log('Autoplay blocked, will play on user interaction');
            musicInfo.textContent = "Click to play";
            
            // Play audio on any click
            document.body.addEventListener('click', function playOnClick() {
                audioPlayer.play().then(() => {
                    musicInfo.textContent = "♫ " + songName;
                });
                document.body.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    }
    
    // Handle error if file doesn't load
    audioPlayer.addEventListener('error', function(e) {
        musicInfo.textContent = 'Failed to load';
        console.error('Audio error:', e);
        console.error('Make sure the Google Drive file is shared publicly and the link is correct');
    });
});

// Envelope opening functionality
envelopeWrapper.addEventListener('click', function() {
    envelope.classList.add('open');
    setTimeout(() => {
        letterContainer.classList.add('active');
    }, 400);
});

// Close letter functionality
closeBtn.addEventListener('click', function() {
    letterContainer.classList.remove('active');
    setTimeout(() => {
        envelope.classList.remove('open');
    }, 400);
});

// Close when clicking outside the letter
letterContainer.addEventListener('click', function(e) {
    if (e.target === letterContainer) {
        closeBtn.click();
    }
});

window.addEventListener('load', function() {
    musicInfo.textContent = songName;
    audioPlayer.preload = 'auto';
    audioPlayer.loop = true; // Optional: loop the song

    const playPromise = audioPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicInfo.textContent = "♫ " + songName;
        }).catch(error => {
            musicInfo.textContent = "Tap envelope to play";
            // Existing click handler stays for envelope interaction
        });
    }
});
