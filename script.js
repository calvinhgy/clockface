document.addEventListener('DOMContentLoaded', function() {
    // Create tick marks for seconds
    const clockFace = document.querySelector('.clock-face');
    for (let i = 0; i < 60; i++) {
        const tick = document.createElement('div');
        tick.classList.add('tick');
        if (i % 5 === 0) {
            tick.classList.add('five');
        }
        tick.style.transform = `rotate(${i * 6}deg)`;
        clockFace.appendChild(tick);
    }

    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Calculate rotation angles
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60) * 6) + 90;
        const hoursDegrees = ((hours / 12) * 360) + ((minutes/60) * 30) + 90;
        
        // Update hand rotations
        document.querySelector('.hour-hand').style.transform = `rotate(${hoursDegrees}deg)`;
        document.querySelector('.minute-hand').style.transform = `rotate(${minutesDegrees}deg)`;
        document.querySelector('.second-hand').style.transform = `rotate(${secondsDegrees}deg)`;
    }
    
    // Update clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);
    
    // Prevent iPad from sleeping
    function keepAwake() {
        if (window.navigator.wakeLock) {
            window.navigator.wakeLock.request('screen')
                .catch(err => console.log('Wake Lock error:', err));
        }
    }
    
    // Try to keep the screen awake if supported
    if ('wakeLock' in navigator) {
        keepAwake();
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                keepAwake();
            }
        });
    }
    
    // Prevent default touch behaviors to enable full-screen experience
    document.addEventListener('touchstart', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Toggle fullscreen on tap
    document.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        }
    });
});