document.addEventListener('DOMContentLoaded', () => {
    const desktopMediaItems = document.querySelectorAll('.media-item');
    let currentIndex = 0;
    let desktopImageInterval;

    function showMedia(items, index) {
        items.forEach((item, i) => {
            item.style.opacity = i === index ? '1' : '0';
            const video = item.querySelector('video');
            if (video) {
                if (i === index) {
                    video.play().catch(error => {
                        console.log('Error playing video:', error);
                    });
                    video.addEventListener('ended', () => onVideoEnd(items));
                } else {
                    video.pause();
                    video.currentTime = 0;
                    video.removeEventListener('ended', () => onVideoEnd(items));
                }
            }
        });
    }

    function loopMedia(items) {
        const currentItem = items[currentIndex];
        if (!currentItem) return;

        const isVideo = currentItem.querySelector('video') !== null;

        if (!isVideo) {
            currentIndex = (currentIndex + 1) % items.length;
            showMedia(items, currentIndex);
        }
    }

    function onVideoEnd(items) {
        currentIndex = (currentIndex + 1) % items.length;
        showMedia(items, currentIndex);

        const nextItem = items[currentIndex];
        if (!nextItem.querySelector('video')) {
            clearInterval(desktopImageInterval);
            desktopImageInterval = setInterval(() => loopMedia(desktopMediaItems), 5000);
        }
    }

    showMedia(desktopMediaItems, currentIndex);

    desktopImageInterval = setInterval(() => loopMedia(desktopMediaItems), 5000);
});

document.addEventListener('DOMContentLoaded', () => {
    const mobileMediaItems = document.querySelectorAll('.mobile-media-item');
    let currentIndex = 0;
    let mobileImageInterval;

    function showMedia(items, index) {
        items.forEach((item, i) => {
            item.style.opacity = i === index ? '1' : '0';
            const video = item.querySelector('video');
            if (video) {
                if (i === index) {
                    video.play().catch(error => {
                        console.log('Error playing video:', error);
                    });
                    video.addEventListener('ended', () => onVideoEnd(items));
                } else {
                    video.pause();
                    video.currentTime = 0;
                    video.removeEventListener('ended', () => onVideoEnd(items));
                }
            }
        });
    }

    function loopMedia(items) {
        const currentItem = items[currentIndex];
        if (!currentItem) return;

        const isVideo = currentItem.querySelector('video') !== null;

        if (!isVideo) {
            currentIndex = (currentIndex + 1) % items.length;
            showMedia(items, currentIndex);
        }
    }

    function onVideoEnd(items) {
        currentIndex = (currentIndex + 1) % items.length;
        showMedia(items, currentIndex);

        const nextItem = items[currentIndex];
        if (!nextItem.querySelector('video')) {
            clearInterval(mobileImageInterval);
            mobileImageInterval = setInterval(() => loopMedia(mobileMediaItems), 5000);
        }
    }

    showMedia(mobileMediaItems, currentIndex);

    mobileImageInterval = setInterval(() => loopMedia(mobileMediaItems), 5000);
});



document.addEventListener('DOMContentLoaded', () => {
    const saleBannerContainer = document.getElementById('sale-banner-container');

    const saleBannerTextWrapper = document.createElement('div');
    saleBannerTextWrapper.className = 'sale-banner-text-wrapper';

    const texts = [
        'Get up to 499 on 3999/- CODE-HIGH77',
        'Get combo of 3 tshirts at flat- 2800/-',
        'Get gym dryfit tshirt combo of 3 at flat- 2100/-'
    ];

    texts.forEach(text => {
        const saleBannerText = document.createElement('p');
        saleBannerText.className = 'sale-banner-text';
        saleBannerText.textContent = text;
        saleBannerTextWrapper.appendChild(saleBannerText);
    });

    saleBannerContainer.appendChild(saleBannerTextWrapper);
});

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.exclusive-banner');
    const texts = document.querySelectorAll('.exclusive-banner-text');

    function randomPosition() {
        const x = Math.random() * (banner.clientWidth - 100);
        const y = Math.random() * (banner.clientHeight - 50);
        return { x, y };
    }

    function moveClouds() {
        texts.forEach(text => {
            const { x, y } = randomPosition();
            text.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    function deflectClouds(e) {
        texts.forEach(text => {
            const rect = text.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100; // Adjust as needed
            const deflectX = (dx / distance) * Math.min(maxDistance, maxDistance - distance);
            const deflectY = (dy / distance) * Math.min(maxDistance, maxDistance - distance);
            text.style.transform = `translate(${deflectX}px, ${deflectY}px)`;
        });
    }

    moveClouds();
    setInterval(moveClouds, 5000); // Move clouds every 5 seconds

    banner.addEventListener('mousemove', deflectClouds);
    banner.addEventListener('mouseleave', moveClouds);
});
