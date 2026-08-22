// NobleTrust Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // -------------------------------------------------------------
    // 1. Mobile Menu Drawer Toggle & Accessible Backdrop
    // -------------------------------------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('header nav');
    
    // Create backdrop element if it doesn't already exist
    let backdrop = document.querySelector('.menu-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'menu-backdrop';
        document.body.appendChild(backdrop);
    }

    function toggleMobileMenu(forceState) {
        if (!mainNav || !mobileMenuBtn) return;
        const isOpen = typeof forceState === 'boolean' ? forceState : !mainNav.classList.contains('open');
        
        mainNav.classList.toggle('open', isOpen);
        mobileMenuBtn.classList.toggle('open', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        backdrop.classList.toggle('open', isOpen);

        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });

        backdrop.addEventListener('click', function() {
            toggleMobileMenu(false);
        });

        // Close mobile drawer on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) {
                toggleMobileMenu(false);
            }
        });
    }

    // -------------------------------------------------------------
    // 2. Page Transition Animation & Non-Intrusive Navigation
    // -------------------------------------------------------------
    const transitionOverlay = document.querySelector('.page-transition-overlay');

    if (transitionOverlay) {
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 300);
    }

    // Handle internal navigation links without breaking browser shortcuts
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Close mobile menu when navigating
        link.addEventListener('click', function() {
            toggleMobileMenu(false);
        });

        // Only handle internal HTML page links
        const isInternalHtml = link.hostname === window.location.hostname &&
                               !href.startsWith('#') &&
                               !href.startsWith('mailto:') &&
                               !href.startsWith('tel:') &&
                               (href.endsWith('.html') || href === './' || href === '/');

        if (isInternalHtml) {
            link.addEventListener('click', function(e) {
                // Do NOT intercept if:
                // - User is holding Ctrl/Cmd/Shift/Alt (open in new tab/window)
                // - User middle-clicked
                // - Target is _blank
                // - Link points to the current exact page
                if (
                    e.defaultPrevented ||
                    e.button !== 0 ||
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey ||
                    link.target === '_blank' ||
                    link.href === window.location.href
                ) {
                    return;
                }

                if (transitionOverlay) {
                    e.preventDefault();
                    const target = this.href;
                    transitionOverlay.classList.add('active');

                    setTimeout(() => {
                        window.location.href = target;
                    }, 350);
                }
            });
        }
    });

    // Handle browser back/forward cache navigation
    window.addEventListener('pageshow', function(event) {
        if (transitionOverlay && transitionOverlay.classList.contains('active')) {
            transitionOverlay.classList.remove('active');
        }
    });

    // -------------------------------------------------------------
    // 3. Homepage Hero Image Slider
    // -------------------------------------------------------------
    const sliderContainer = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slides img');
    let currentSlide = 0;
    let slideInterval = null;

    if (slides.length > 0) {
        slides[currentSlide].classList.add('active');

        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        function startSlideTimer() {
            if (!slideInterval) {
                slideInterval = setInterval(() => showSlide(currentSlide + 1), 3500);
            }
        }

        function stopSlideTimer() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }

        startSlideTimer();

        // Pause rotation on user hover
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlideTimer);
            sliderContainer.addEventListener('mouseleave', startSlideTimer);
            sliderContainer.addEventListener('touchstart', stopSlideTimer, { passive: true });
            sliderContainer.addEventListener('touchend', startSlideTimer, { passive: true });
        }
    }

    // -------------------------------------------------------------
    // 4. Customer Feedback Form & LocalStorage Persistence
    // -------------------------------------------------------------
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackList = document.getElementById('feedbackList');
    const FEEDBACK_STORAGE_KEY = 'nobletrust_user_feedbacks';

    function getStoredFeedbacks() {
        try {
            const data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (err) {
            console.error('Failed to read from localStorage', err);
            return [];
        }
    }

    function saveFeedback(item) {
        try {
            const feedbacks = getStoredFeedbacks();
            feedbacks.unshift(item);
            localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbacks));
        } catch (err) {
            console.error('Failed to save to localStorage', err);
        }
    }

    function createFeedbackElement(item, isNew = false) {
        const div = document.createElement('div');
        div.className = 'feedback-item' + (isNew ? ' new-item' : '');
        
        const dateStr = item.date || new Date().toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong>${escapeHtml(item.name)}</strong>
                <small style="color: #666; font-size: 0.85rem;">${dateStr}</small>
            </div>
            <p style="margin: 0; color: #444;">${escapeHtml(item.message)}</p>
        `;
        return div;
    }

    function renderFeedbacks() {
        if (!feedbackList) return;
        feedbackList.innerHTML = '';
        const items = getStoredFeedbacks();

        if (items.length > 0) {
            const heading = document.createElement('h3');
            heading.style.textAlign = 'center';
            heading.style.color = '#7a5a00';
            heading.style.margin = '24px 0 16px 0';
            heading.textContent = 'Community Submissions (' + items.length + ')';
            feedbackList.appendChild(heading);

            items.forEach(item => {
                feedbackList.appendChild(createFeedbackElement(item));
            });
        }
    }

    if (feedbackForm && feedbackList) {
        renderFeedbacks();

        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const messageInput = document.getElementById('message');

            const name = nameInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !message) return;

            const newItem = {
                id: Date.now(),
                name: name,
                message: message,
                date: new Date().toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })
            };

            saveFeedback(newItem);
            renderFeedbacks();

            feedbackForm.reset();
            showNotification('Thank you! Your feedback has been published.', 'success');
        });
    }

    // -------------------------------------------------------------
    // 5. Contact Form Submission Handling
    // -------------------------------------------------------------
    const contactForm = document.querySelector('.contact-form-area form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for reaching out! A NobleTrust representative will contact you shortly.', 'success');
            contactForm.reset();
        });
    }

    // -------------------------------------------------------------
    // 6. Utility Notification Toast & XSS Escape
    // -------------------------------------------------------------
    function showNotification(msg, type = 'success') {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.right = '24px';
        toast.style.backgroundColor = type === 'success' ? '#2e7d32' : '#c62828';
        toast.style.color = '#ffffff';
        toast.style.padding = '14px 24px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
        toast.style.zIndex = '10000';
        toast.style.fontSize = '0.95rem';
        toast.style.fontWeight = 'bold';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        toast.textContent = msg;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 350);
        }, 4000);
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
});
