import { MessageChannel } from "worker_threads";
import { TextEncoder, TextDecoder } from "util";

// Polyfill MessageChannel with cleanup support
if (typeof global.MessageChannel === 'undefined') {
  const channel = new MessageChannel();
  (channel as any).__polyfill = true;
  (global as any).__polyfillMessageChannel = channel;
  global.MessageChannel = function () { return channel; } as any;
}

Object.assign(global, { TextEncoder, TextDecoder });

afterAll(() => {
  jest.useRealTimers();
  const channel = (global as any).__polyfillMessageChannel;
  if (channel && channel.__polyfill) {
    channel.port1.close();
    channel.port2.close();
  }
});
