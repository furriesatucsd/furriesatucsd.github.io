/**
 * @jest-environment jsdom
 */

/* global simulatePageLoad, createModalEvent */

describe('Main JavaScript Functionality', () => {
  beforeEach(() => {
    // Import main.js for each test to ensure clean state
    jest.isolateModules(() => {
      require('../../../src/assets/js/main');
    });
  });

  describe('Gallery Modal', () => {
    let modal;
    let button;

    beforeEach(() => {
      // Set up modal and trigger button
      document.body.innerHTML = `
        <div id="galleryModal">
          <div class="modal-title"></div>
          <img id="galleryModalImage" />
        </div>
        <button 
          data-bs-toggle="modal" 
          data-bs-target="#galleryModal"
          data-bs-image="/test.jpg"
          data-bs-title="Test Image"
        ></button>
      `;

      modal = document.getElementById('galleryModal');
      button = document.querySelector('button');
      simulatePageLoad();
    });

    it('should update modal content when shown', () => {
      modal.dispatchEvent(createModalEvent('show', button));

      const modalTitle = modal.querySelector('.modal-title');
      const modalImage = modal.querySelector('#galleryModalImage');

      expect(modalTitle.textContent).toBe('Test Image');
      expect(modalImage.src).toContain('/test.jpg');
    });
  });

  describe('Event Calendar', () => {
    it('should show mobile calendar and hide desktop calendar on small screens', () => {
      // Set up test elements
      document.body.innerHTML = `
        <div id="desktop-calendar"></div>
        <div id="mobile-calendar"></div>
      `;

      // Mock window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      // Trigger page load
      simulatePageLoad();

      // Check initial state
      const desktopCalendar = document.getElementById('desktop-calendar');
      const mobileCalendar = document.getElementById('mobile-calendar');

      expect(desktopCalendar.style.display).toBe('none');
      expect(mobileCalendar.style.display).toBe('block');
    });

    it('should show desktop calendar and hide mobile calendar on large screens', () => {
      // Set up test elements
      document.body.innerHTML = `
        <div id="desktop-calendar"></div>
        <div id="mobile-calendar"></div>
      `;

      // Mock window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 769,
      });

      // Trigger page load
      simulatePageLoad();

      // Check initial state
      const desktopCalendar = document.getElementById('desktop-calendar');
      const mobileCalendar = document.getElementById('mobile-calendar');

      expect(desktopCalendar.style.display).toBe('block');
      expect(mobileCalendar.style.display).toBe('none');
    });

    it('should update calendar visibility on window resize', () => {
      // Set up test elements
      document.body.innerHTML = `
        <div id="desktop-calendar"></div>
        <div id="mobile-calendar"></div>
      `;

      // Mock window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 769,
      });

      // Trigger page load
      simulatePageLoad();

      const desktopCalendar = document.getElementById('desktop-calendar');
      const mobileCalendar = document.getElementById('mobile-calendar');

      // Initial state (large screen)
      expect(desktopCalendar.style.display).toBe('block');
      expect(mobileCalendar.style.display).toBe('none');

      // Simulate resize to small screen
      window.innerWidth = 768;
      window.dispatchEvent(new Event('resize'));

      expect(desktopCalendar.style.display).toBe('none');
      expect(mobileCalendar.style.display).toBe('block');

      // Simulate resize to large screen
      window.innerWidth = 769;
      window.dispatchEvent(new Event('resize'));

      expect(desktopCalendar.style.display).toBe('block');
      expect(mobileCalendar.style.display).toBe('none');
    });
  });
});
