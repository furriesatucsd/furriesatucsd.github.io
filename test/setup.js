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

// Define mocks
const mocks = {
  gsap: {
    registerPlugin: jest.fn(),
    to: jest.fn(),
  },
  ScrollTrigger: {},
  bootstrap: {
    Tooltip: jest.fn(),
    Popover: jest.fn(),
  },
  fetch: jest.fn(),
};

// Set up window mock with proper scrollTo implementation
const scrollToMock = jest.fn();
const windowMock = {
  ...global.window,
  scrollTo: scrollToMock,
};

// Override JSDOM's window.scrollTo implementation
Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  writable: true,
  value: scrollToMock,
});

// Apply globals
Object.assign(global, {
  ...mocks,
  window: windowMock,
  simulatePageLoad,
  createModalEvent,
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});
