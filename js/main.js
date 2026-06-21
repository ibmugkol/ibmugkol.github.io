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

function initializeApp() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const currentPath = window.location.pathname;

    // Detect if we are in the meetups subdirectory
    const isSubdir = currentPath.includes('/meetups/');
    const prefix = isSubdir ? '../' : '';

    // 1. Render Universal Header
    const headerContainer = document.getElementById('universal-header');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg sticky-top py-3">
                <div class="container">
                    <a class="navbar-brand" href="${prefix}index.html">
                        <img src="${prefix}assets/icon-dark.svg" class="bob-logo-icon dark-icon me-2" alt="IBM UG logo" width="28" height="28">
                        <img src="${prefix}assets/icon.svg" class="bob-logo-icon light-icon me-2" alt="IBM UG logo" width="28" height="28">
                        IBM UG Kolkata
                    </a>
                    <button class="navbar-toggler border-0 text-color" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa-solid fa-bars" style="color: var(--text-color);"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto align-items-center">
                            <li class="nav-item">
                                <a class="nav-link" id="nav-home" href="${prefix}index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="nav-meetups" href="${prefix}meetups.html">Meetups</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="nav-members" href="${prefix}members.html">Members</a>
                            </li>
                            <li class="nav-item">
                                <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle theme">
                                    <i class="fa-regular ${currentTheme === 'dark' ? 'fa-sun' : 'fa-moon'}"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        // Set active nav item
        if (currentPath.includes('meetups')) {
            const meetupsLink = document.getElementById('nav-meetups');
            if (meetupsLink) meetupsLink.classList.add('active');
        } else if (currentPath.includes('members.html')) {
            const membersLink = document.getElementById('nav-members');
            if (membersLink) membersLink.classList.add('active');
        } else {
            const homeLink = document.getElementById('nav-home');
            if (homeLink) homeLink.classList.add('active');
        }

        // Setup Theme Toggle Listener
        setupThemeToggle();
    }

    // 2. Render Universal Footer
    const footerContainer = document.getElementById('universal-footer');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 mb-4 mb-md-0">
                            <h3 class="footer-brand">
                                <img src="${prefix}assets/icon-dark.svg" class="bob-logo-icon dark-icon me-2" alt="IBM UG logo" width="24" height="24">
                                <img src="${prefix}assets/icon.svg" class="bob-logo-icon light-icon me-2" alt="IBM UG logo" width="24" height="24">
                                IBM UG Kolkata
                            </h3>
                            <p class="mb-1 text-white opacity-75">Community Leader: <a class="text-decoration-none text-white fw-semibold" href="https://go.omniaigs.com/r/jGyS1u" target="_blank">Soumyadeep Mandal</a></p>
                            <p class="opacity-75">Organizer & Host: IBM User Group Kolkata & Soumyadeep Mandal</p>
                            
                            <div class="social-icons">
                                <a href="https://go.omniaigs.com/r/KvG8z1" aria-label="X" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
                                <a href="https://go.omniaigs.com/r/1vfbJd" aria-label="LinkedIn" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                                <a href="https://go.omniaigs.com/r/eT8P9K" aria-label="GitHub" target="_blank"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div class="col-md-6 text-md-end d-flex flex-column justify-content-between">
                            <div>
                                <p class="mb-2"><a href="${prefix}index.html" class="text-decoration-none">Home</a></p>
                                <p class="mb-2"><a href="${prefix}meetups.html" class="text-decoration-none">Meetups</a></p>
                                <p class="mb-0"><a href="${prefix}members.html" class="text-decoration-none">Members</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="footer-divider"></div>
                    <p class="copyright">&copy; 2026 IBM User Group Kolkata. Adhering to the IBM Design Language.</p>
                </div>
            </footer>
        `;
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
