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
});
