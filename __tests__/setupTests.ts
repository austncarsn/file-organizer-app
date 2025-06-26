import '@testing-library/jest-dom';

// Polyfill MessageChannel for Node <15 (React 18+ needs it)
if (typeof global.MessageChannel === 'undefined') {
  global.MessageChannel = class {
    port1 = {};
    port2 = {};
    constructor() {}
  } as any;
}

// Polyfill TextEncoder/TextDecoder for Node <18 (React 18+ needs it)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

it("noop", () => {});
