import '@testing-library/jest-dom/extend-expect';

class IntersectionObserver {
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  });
  
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  });
  
