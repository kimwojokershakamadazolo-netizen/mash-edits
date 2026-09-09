// Portfolio Page JavaScript - Portfolio-specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    initializeNavigation();
    setupScrollAnimations();
});

// Initialize Portfolio Page
function initializePortfolio() {
    if (document.getElementById('portfolioGrid')) {
        renderPortfolioGrid();
        setupFilterButtons();
        setupModalHandlers();
        setupLightboxHandlers();
    }
}

// Render Portfolio Grid
function renderPortfolioGrid() {
    const grid = document.getElementById('portfolioGrid');
    grid.innerHTML = '';

    portfolioData.forEach(project => {
        const card = createPortfolioCard(project);
        grid.appendChild(card);
    });
}

function createPortfolioCard(project) {
    const card = document.createElement('div');
    card.className = 'portfolio-card fade-in';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-project-id', project.id);

    const playButtonHTML = project.type === 'video' ? '<div class="play-button">▶</div>' : '';

    card.innerHTML = `
        <div class="portfolio-card-image-wrapper">
            <img src="${project.coverImage}" alt="${project.title}" class="portfolio-card-image" loading="lazy">
            <div class="portfolio-card-overlay">${playButtonHTML}</div>
        </div>
        <div class="portfolio-card-content">
            <div class="portfolio-card-category">${project.category.toUpperCase()}</div>
            <h3 class="portfolio-card-title">${project.title}</h3>
            <p class="portfolio-card-location">📍 ${project.location}</p>
            <p class="portfolio-card-description">${project.description}</p>
            <a href="#" class="portfolio-card-button">VIEW GALLERY</a>
        </div>
    `;

    card.addEventListener('click', (e) => {
        e.preventDefault();
        if (project.type === 'video') {
            openVideoModal(project);
        } else {
            openProjectModal(project);
        }
    });

    return card;
}

// Setup Filter Buttons
function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(category) {
    const cards = document.querySelectorAll('.portfolio-card');
    let visibleCount = 0;

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
            card.style.display = '';
            setTimeout(() => card.classList.add('fade-in'), 10);
            visibleCount++;
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
}

// Modal Handlers
function setupModalHandlers() {
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.modal-close');

    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    // Video Modal
    const videoModal = document.getElementById('videoModal');
    const videoCloseBtn = videoModal.querySelector('.modal-close');
    videoCloseBtn.addEventListener('click', () => closeModal(videoModal));
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeModal(videoModal);
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    let galleryHTML = '';
    
    // Regular gallery images
    if (project.galleryImages && project.galleryImages.length > 0) {
        galleryHTML += `
            <div class="gallery-container">
                <h3>Gallery</h3>
                <div class="gallery-grid">
                    ${project.galleryImages.map((img, idx) => `
                        <div class="gallery-thumbnail" onclick="openLightbox(${idx}, '${project.id}')" style="cursor: pointer;">
                            <img src="${img.url}" alt="${img.title}" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Story sections (for weddings)
    if (project.galleryStories && project.galleryStories.length > 0) {
        galleryHTML += project.galleryStories.map(story => `
            <div class="gallery-story-section">
                <h4>${story.section}</h4>
                <div class="gallery-grid">
                    ${story.images.map((img, idx) => `
                        <div class="gallery-thumbnail" onclick="openLightbox(${project.galleryImages.length + idx}, '${project.id}')" style="cursor: pointer;">
                            <img src="${img.url}" alt="${img.title}" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    let metaHTML = `
        <div class="project-meta">
            <div class="meta-item">
                <span class="meta-label">Location</span>
                <span class="meta-value">${project.location}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Date</span>
                <span class="meta-value">${project.date}</span>
            </div>
    `;

    // Add wedding-specific metadata
    if (project.type === 'wedding') {
        metaHTML += `
            <div class="meta-item">
                <span class="meta-label">Couple</span>
                <span class="meta-value">${project.coupleNames}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Wedding Type</span>
                <span class="meta-value">${project.weddingType}</span>
            </div>
        `;
    }

    metaHTML += '</div>';

    modalBody.innerHTML = `
        <img src="${project.coverImage}" alt="${project.title}" class="project-hero">
        <div class="project-info">
            <h2>${project.title}</h2>
            ${metaHTML}
            <p class="project-description">${project.introduction || project.description}</p>
        </div>
        ${galleryHTML}
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openVideoModal(project) {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');

    videoContainer.innerHTML = `
        <iframe src="${project.videoUrl}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Lightbox Handlers
function setupLightboxHandlers() {
    const lightbox = document.getElementById('galleryLightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    prevBtn.addEventListener('click', () => previousImage());
    nextBtn.addEventListener('click', () => nextImage());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') previousImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Swipe support for mobile
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    lightbox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) nextImage();
        if (touchEndX - touchStartX > 50) previousImage();
    });
}

let currentImageIndex = 0;
let currentProjectId = '';
let currentGalleryImages = [];

function openLightbox(index, projectId) {
    const project = portfolioData.find(p => p.id === projectId);
    if (!project) return;

    currentImageIndex = index;
    currentProjectId = projectId;
    
    // Combine regular gallery images and story images
    currentGalleryImages = [...(project.galleryImages || [])];
    if (project.galleryStories) {
        project.galleryStories.forEach(story => {
            currentGalleryImages = currentGalleryImages.concat(story.images || []);
        });
    }

    displayLightboxImage();
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function displayLightboxImage() {
    if (currentGalleryImages.length === 0) return;

    const img = currentGalleryImages[currentImageIndex];
    document.getElementById('lightboxImage').src = img.url;
    document.getElementById('lightboxImageTitle').textContent = img.title || '';
    document.getElementById('lightboxImageCounter').textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    displayLightboxImage();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    displayLightboxImage();
}

// Navigation Handler
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
        });
    });
}

// Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#book' && href !== '#contact-form') {
            if (document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// Scroll Animations
function setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.portfolio-card, .featured-card').forEach(card => {
            observer.observe(card);
        });
    }
}
