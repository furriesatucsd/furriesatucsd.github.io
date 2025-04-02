// Mock style imports
jest.mock('../src/assets/scss/style.scss', () => ({}));

// Suppress JSDOM errors for unimplemented features
const errorHandler = {
  originalError: global.console.error,
  handleError(...args) {
    if (args[0]?.includes?.('Not implemented: window.scrollTo')) {
      return;
    }
    this.originalError.call(global.console, ...args);
  },
};

// Override error handling
global.console.error = errorHandler.handleError.bind(errorHandler);

// Define test helpers
const simulatePageLoad = () => {
  document.dispatchEvent(new Event('DOMContentLoaded'));
};

const createModalEvent = (type, button) => {
  const event = new CustomEvent(`${type}.bs.modal`, {
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(event, 'relatedTarget', {
    value: button,
    enumerable: true,
  });
  return event;
};

// Mock GSAP to prevent initialization errors
const gsap = {
  registerPlugin: jest.fn(),
  to: jest.fn(),
};
const ScrollTrigger = {};

// Apply globals
Object.assign(global, {
  gsap,
  ScrollTrigger,
  simulatePageLoad,
  createModalEvent,
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});
