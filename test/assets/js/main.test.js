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

  describe('GSAP Initialization', () => {
    it('should register ScrollTrigger plugin', () => {
      simulatePageLoad();
      expect(gsap.registerPlugin).toHaveBeenCalledWith(ScrollTrigger);
    });
  });

  describe('Bootstrap Components', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div data-bs-toggle="tooltip" title="Test Tooltip"></div>
        <div data-bs-toggle="popover" title="Test Popover"></div>
      `;
    });

    it('should initialize tooltips and popovers', () => {
      simulatePageLoad();
      expect(bootstrap.Tooltip).toHaveBeenCalled();
      expect(bootstrap.Popover).toHaveBeenCalled();
    });
  });

  describe('Gallery Modal', () => {
    let modal;
    let button;

    beforeEach(() => {
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

  describe('Smooth Scrolling', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div style="padding-top: 100px">
          <a href="#test">Scroll to Test</a>
          <div id="test" style="margin-top: 200px">Test Section</div>
        </div>
      `;
    });

    it('should handle anchor clicks with smooth scrolling', () => {
      simulatePageLoad();
      const targetElement = document.getElementById('test');
      const expectedOffset = targetElement.offsetTop - 70; // 70px navbar adjustment

      document.querySelector('a').click();

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: expectedOffset,
        behavior: 'smooth',
      });
    });
  });
});
