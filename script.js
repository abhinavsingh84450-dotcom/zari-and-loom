/**
 * ZARI & LOOM — BOUTIQUE HANDLOOM & BRIDAL STUDIO, DWARKA, NEW DELHI
 * script.js — Accessible Navigation, Mobile Drawer & Form Validation Engine
 * Strict compliance with AGENTS.md & design-brief.md
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Mobile Navigation & Hamburger Drawer
     ========================================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('#primary-navigation');
  const body = document.body;

  if (navToggle && primaryNav) {
    /**
     * Toggles mobile navigation menu state
     * @param {boolean} [forceState] - Optional boolean to force open (true) or closed (false)
     */
    const toggleMenu = (forceState) => {
      const isCurrentlyExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      const shouldOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyExpanded;

      navToggle.setAttribute('aria-expanded', String(shouldOpen));
      primaryNav.classList.toggle('is-open', shouldOpen);
      body.classList.toggle('nav-open', shouldOpen);

      if (shouldOpen) {
        // Focus first link in drawer for keyboard a11y
        const firstLink = primaryNav.querySelector('a');
        if (firstLink) {
          firstLink.focus();
        }
      }
    };

    // Click on hamburger toggle
    navToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    // Close when clicking outside of the header / nav drawer
    document.addEventListener('click', (event) => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded && !primaryNav.contains(event.target) && !navToggle.contains(event.target)) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    // Close when pressing Escape key (WCAG Keyboard A11y Requirement)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          toggleMenu(false);
          navToggle.focus();
        }
      }
    });

    // Close menu when clicking on any navigation link inside drawer
    const navLinks = primaryNav.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navToggle.getAttribute('aria-expanded') === 'true') {
          toggleMenu(false);
        }
      });
    });

    // Reset drawer state when window resizes to desktop breakpoint (>= 992px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) {
        if (navToggle.getAttribute('aria-expanded') === 'true') {
          toggleMenu(false);
        }
      }
    });
  }

  /* ==========================================================================
     2. Accessible Form Validation Engine (Zero alert() Rule)
     ========================================================================== */
  const bookingForms = document.querySelectorAll('form[data-validate="true"], #booking-form, form.consultation-form');

  bookingForms.forEach((form) => {
    // Disable native browser validation popups to use custom accessible inline errors
    form.setAttribute('novalidate', 'true');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let isFormValid = true;
      let firstInvalidInput = null;

      // Select all form input controls
      const inputs = form.querySelectorAll('input, select, textarea');

      inputs.forEach((input) => {
        // Clear previous error message and invalid attributes
        clearInputError(input);

        // Validation checks
        const validity = validateField(input);

        if (!validity.isValid) {
          isFormValid = false;
          showInputError(input, validity.message);
          if (!firstInvalidInput) {
            firstInvalidInput = input;
          }
        }
      });

      if (!isFormValid) {
        // Focus first field with validation error
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
      } else {
        // Show submission loading feedback and redirect to thank-you.html
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Confirming Appointment...';
        }

        // Store user's first name, full name, and consultation mode in sessionStorage
        try {
          const nameInput = form.querySelector('[name="fullName"], [name="name"], #fullName, #name');
          const modeInput = form.querySelector('[name="consultationMode"], #consultationMode');
          const categoryInput = form.querySelector('[name="sareeCategory"], #sareeCategory');

          if (nameInput && nameInput.value) {
            const fullName = nameInput.value.trim();
            const firstName = fullName.split(' ')[0];
            sessionStorage.setItem('zl_client_name', fullName);
            sessionStorage.setItem('zl_client_first_name', firstName);
          }
          if (modeInput && modeInput.value) {
            sessionStorage.setItem('zl_consultation_mode', modeInput.value);
          }
          if (categoryInput && categoryInput.value) {
            sessionStorage.setItem('zl_saree_category', categoryInput.value);
          }
        } catch (e) {
          // Graceful fallback if storage is restricted
        }

        // Direct redirect without alert() popup
        setTimeout(() => {
          window.location.href = 'thank-you.html';
        }, 400);
      }
    });

    // Real-time error clearing when user edits an invalid field
    form.querySelectorAll('input, select, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
          const validity = validateField(input);
          if (validity.isValid) {
            clearInputError(input);
          }
        }
      });
    });
  });

  /**
   * Evaluates input validity against rules
   * @param {HTMLElement} input
   * @returns {{isValid: boolean, message: string}}
   */
  function validateField(input) {
    const value = input.value.trim();

    // Required check
    if (input.hasAttribute('required') && !value) {
      const fieldLabel = getFieldLabel(input);
      return { isValid: false, message: `Please enter your ${fieldLabel}.` };
    }

    // Email format check
    if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { isValid: false, message: 'Please enter a valid email address (e.g., ananya@example.com).' };
      }
    }

    // Phone format check: Strict 10-digit Indian mobile number starting with 6-9
    if (input.type === 'tel' && value) {
      const phoneClean = value.replace(/[\s\-()+]/g, '');
      let tenDigit = phoneClean;
      if (phoneClean.length === 12 && phoneClean.startsWith('91')) {
        tenDigit = phoneClean.slice(2);
      } else if (phoneClean.length === 11 && phoneClean.startsWith('0')) {
        tenDigit = phoneClean.slice(1);
      }

      const indianPhoneRegex = /^[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(tenDigit)) {
        return { isValid: false, message: 'Please provide a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.' };
      }
    }

    // Date check (cannot be in the past)
    if (input.type === 'date' && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        return { isValid: false, message: 'Please select a future date for your bridal appointment.' };
      }
    }

    return { isValid: true, message: '' };
  }

  /**
   * Retrieves human-readable label text for an input
   * @param {HTMLElement} input
   * @returns {string}
   */
  function getFieldLabel(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) {
      return label.textContent.replace('*', '').trim().toLowerCase();
    }
    return input.name || 'field';
  }

  /**
   * Injects inline accessible error element in DOM
   * @param {HTMLElement} input
   * @param {string} message
   */
  function showInputError(input, message) {
    input.setAttribute('aria-invalid', 'true');
    const errorId = `${input.id || input.name}-error`;
    input.setAttribute('aria-describedby', errorId);

    // Look for existing error span or create new one
    let errorSpan = document.getElementById(errorId);
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.id = errorId;
      errorSpan.className = 'form-error';
      errorSpan.setAttribute('role', 'alert');
      input.parentNode.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
  }

  /**
   * Removes inline error from DOM
   * @param {HTMLElement} input
   */
  function clearInputError(input) {
    input.removeAttribute('aria-invalid');
    const errorId = `${input.id || input.name}-error`;
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
      errorSpan.remove();
    }
    input.removeAttribute('aria-describedby');
  }

  /* ==========================================================================
     3. Smooth Anchor Scrolling with Sticky Header Compensation
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#main-content') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     4. Interactive Collections Category Filter (aria-pressed & Live Announce)
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sareeCards = document.querySelectorAll('.saree-card');
  const filterStatus = document.getElementById('filter-status');

  if (filterButtons.length > 0 && sareeCards.length > 0) {
    /**
     * Filters saree cards by data-category attribute
     * @param {string} categoryKey
     * @param {HTMLButtonElement} targetButton
     */
    const filterCategory = (categoryKey, targetButton) => {
      // Update aria-pressed and active classes across all filter buttons
      filterButtons.forEach((btn) => {
        const isCurrent = btn === targetButton;
        btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
        btn.classList.toggle('active', isCurrent);
      });

      let visibleCount = 0;
      sareeCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = categoryKey === 'all' || cardCategory === categoryKey;

        if (shouldShow) {
          card.classList.remove('is-hidden');
          card.removeAttribute('hidden');
          visibleCount++;
        } else {
          card.classList.add('is-hidden');
          card.setAttribute('hidden', '');
        }
      });

      // Announce filter count for assistive technology screen readers
      if (filterStatus && targetButton) {
        const label = targetButton.textContent.replace(/\(\d+\)/, '').trim();
        filterStatus.textContent = `Displaying ${visibleCount} handloom sarees in ${label}.`;
      }
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');
        filterCategory(category, btn);
      });
    });

    // Check if page loaded with a category hash or query parameter
    const urlHash = window.location.hash.replace('#', '').toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = (urlParams.get('category') || urlHash).toLowerCase();

    if (categoryParam) {
      const matchingBtn = document.querySelector(`.filter-btn[data-filter="${categoryParam}"]`);
      if (matchingBtn) {
        filterCategory(categoryParam, matchingBtn);
      }
    }
  }

  /* ==========================================================================
     5. URL Query Parameter Auto-Fill for Saree Inquiries (?saree=...)
     ========================================================================== */
  const urlParams = new URLSearchParams(window.location.search);
  const sareeParam = urlParams.get('saree');
  const notesField = document.querySelector('#notes, [name="notes"]');
  if (sareeParam && notesField && !notesField.value) {
    const formattedSaree = decodeURIComponent(sareeParam).replace(/[-_]/g, ' ');
    notesField.value = `Inquiring about: ${formattedSaree}\nI would like to schedule a private bridal styling consultation / drape session for this piece.`;
  }

  /* ==========================================================================
     6. Personalized Thank-You Confirmation (Reading from sessionStorage)
     ========================================================================== */
  const clientNameDisplay = document.getElementById('client-name-display');
  const consultationModeDisplay = document.getElementById('consultation-mode-display');

  if (clientNameDisplay) {
    try {
      const storedFirstName = sessionStorage.getItem('zl_client_first_name');
      const storedFullName = sessionStorage.getItem('zl_client_name');
      if (storedFirstName || storedFullName) {
        clientNameDisplay.textContent = storedFirstName || storedFullName;
      }
    } catch (e) {
      // Graceful fallback to default in HTML
    }
  }

  if (consultationModeDisplay) {
    try {
      const storedMode = sessionStorage.getItem('zl_consultation_mode');
      if (storedMode) {
        consultationModeDisplay.textContent = storedMode;
      }
    } catch (e) {
      // Graceful fallback to default in HTML
    }
  }
});


