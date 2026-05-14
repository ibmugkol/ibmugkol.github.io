// Main JavaScript file for IBM User Group Kolkata

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Universal Header
    const headerContainer = document.getElementById('universal-header');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light sticky-top py-3">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <i class="fa-solid fa-microchip text-primary me-2"></i>IBM UG Kolkata
                    </a>
                    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link" id="nav-home" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="nav-meetups" href="meetups.html">Meetups</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        // Determine active page
        const currentPath = window.location.pathname;
        if (currentPath.includes('meetups.html')) {
            const meetupsLink = document.getElementById('nav-meetups');
            if (meetupsLink) meetupsLink.classList.add('active');
        } else {
            // Default to Home if not meetups page
            const homeLink = document.getElementById('nav-home');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    // 2. Render Universal Footer
    const footerContainer = document.getElementById('universal-footer');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 mb-4 mb-md-0">
                            <h3 class="footer-brand"><i class="fa-solid fa-microchip text-primary me-2"></i>IBM UG Kolkata</h3>
                            <p class="mb-1 fw-bold text-white">Community Leader: <a class="text-decoration-none text-light hover-primary" style="transition: color 0.3s; color: #fff;" href="https://www.linkedin.com/in/imsampro">Soumyadeep Mandal</a></p>
                            <p>Organizer & Host: IBM User Group Kolkata & <a class="text-decoration-none text-light hover-primary" style="transition: color 0.3s; color: #fff;" href="https://www.linkedin.com/in/imsampro">Soumyadeep Mandal</a></p>
                            
                            <div class="social-icons">
                                <a href="https://x.com/ibmugkol" aria-label="X" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
                                <a href="https://www.linkedin.com/company/ibmugkol" aria-label="LinkedIn" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                                <a href="https://github.com/ibmugkol" aria-label="GitHub" target="_blank"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <p class="mb-2"><a href="index.html" class="text-decoration-none text-light hover-primary" style="transition: color 0.3s; color: #fff;">Home</a></p>
                            <p class="mb-0"><a href="meetups.html" class="text-decoration-none text-light hover-primary" style="transition: color 0.3s; color: #fff;">Meetups</a></p>
                        </div>
                    </div>
                    <div class="footer-divider"></div>
                    <p class="copyright">&copy; 2026 IBM User Group Kolkata. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
});
