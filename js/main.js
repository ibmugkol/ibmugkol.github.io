// Apply theme immediately to prevent visual flash
(function () {
    let theme = 'light';
    try {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = savedTheme || (prefersDark ? 'dark' : 'light');
    } catch (e) {
        try {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
        } catch (err) { }
    }
    document.documentElement.setAttribute('data-theme', theme);
})();

async function initializeApp() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const currentPath = window.location.pathname;

    // Detect if we are in the meetups subdirectory
    const isSubdir = currentPath.includes('/meetups/');
    const prefix = isSubdir ? '../' : '';

    // Helper to adjust relative paths inside injected containers
    function adjustRelativePaths(container, pathPrefix) {
        if (!pathPrefix) return;
        
        // Adjust href on all local anchor links
        container.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                link.setAttribute('href', pathPrefix + href);
            }
        });

        // Adjust src on all local images
        container.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
                img.setAttribute('src', pathPrefix + src);
            }
        });
    }

    // 1. Fetch & Render Universal Header
    const headerContainer = document.getElementById('universal-header');
    if (headerContainer) {
        try {
            const response = await fetch(`${prefix}header.html`);
            if (response.ok) {
                const headerHtml = await response.text();
                headerContainer.innerHTML = headerHtml;

                // Adjust relative paths in the header for subfolders
                adjustRelativePaths(headerContainer, prefix);

                // Update theme toggle icon based on current theme
                const themeToggleIcon = headerContainer.querySelector('#theme-toggle i');
                if (themeToggleIcon) {
                    themeToggleIcon.className = currentTheme === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
                }

                // Set active nav item
                if (currentPath.includes('meetups')) {
                    const meetupsLink = headerContainer.querySelector('#nav-meetups');
                    if (meetupsLink) meetupsLink.classList.add('active');
                } else if (currentPath.includes('members.html')) {
                    const membersLink = headerContainer.querySelector('#nav-members');
                    if (membersLink) membersLink.classList.add('active');
                } else {
                    const homeLink = headerContainer.querySelector('#nav-home');
                    if (homeLink) homeLink.classList.add('active');
                }

                // Setup Theme Toggle Listener
                setupThemeToggle();
            } else {
                console.error('Failed to load header.html:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching header.html:', error);
        }
    }

    // 2. Fetch & Render Universal Footer
    const footerContainer = document.getElementById('universal-footer');
    if (footerContainer) {
        try {
            const response = await fetch(`${prefix}footer.html`);
            if (response.ok) {
                const footerHtml = await response.text();
                footerContainer.innerHTML = footerHtml;

                // Adjust relative paths in the footer for subfolders
                adjustRelativePaths(footerContainer, prefix);
            } else {
                console.error('Failed to load footer.html:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching footer.html:', error);
        }
    }

    // 3. Initialize Bob Waving Animation
    initBobAnimation();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Theme toggler function
function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Apply theme to document
        document.documentElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            console.warn('LocalStorage write failed:', e);
        }

        // Update button icon
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
        }

        // Update hero backdrop image if present
        const backdrop = document.getElementById('hero-backdrop-img');
        if (backdrop) {
            backdrop.src = newTheme === 'dark' ? 'assets/HeroBackground-dark.png' : 'assets/HeroBackground-light.png';
        }
    });
}

// Bob Waving Animation initialization
function initBobAnimation() {
    const bobLottieEl = document.getElementById('bob-lottie');
    const bobPlaceholderEl = document.getElementById('bob-placeholder');
    const backdropEl = document.getElementById('hero-backdrop-img');

    if (!bobLottieEl || !bobPlaceholderEl) return;

    // Apply the correct backdrop src on load based on theme
    if (backdropEl) {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        backdropEl.src = currentTheme === 'dark' ? 'assets/HeroBackground-dark.png' : 'assets/HeroBackground-light.png';
    }

    // Load from window.bobWaveData directly
    const animationData = window.bobWaveData;
    if (!animationData) {
        console.warn('Bob wave animation data (bob-wave-data.js) not loaded yet.');
        return;
    }

    // Ensure lottie library is loaded
    if (typeof lottie === 'undefined') {
        console.warn('Lottie library not found. Waiting 500ms...');
        setTimeout(() => initBobAnimation(), 500);
        return;
    }

    const anim = lottie.loadAnimation({
        container: bobLottieEl,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animationData
    });

    anim.goToAndStop(0, true);

    // Hide placeholder, show lottie container
    bobPlaceholderEl.style.display = 'none';
    bobLottieEl.classList.remove('hidden');

    let isPlaying = false;
    const playAnimation = () => {
        if (!isPlaying) {
            isPlaying = true;
            anim.goToAndPlay(0, true);
        }
    };

    anim.addEventListener('complete', () => {
        isPlaying = false;
    });

    // Hover or touch on the main animation container to wave
    const animContainer = document.querySelector('.bob-animation-container') || bobLottieEl;
    animContainer.addEventListener('mouseenter', playAnimation);
    animContainer.addEventListener('touchstart', playAnimation);
}
