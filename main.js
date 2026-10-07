/* global $ */
// Silence all console output in production.
console.log = function() {};
console.warn = function() {};
console.error = function() {};

/**
 * main.js — Entry point.  Imports specialised modules and boots the app.
 *
 * Module map:
 *   state.js      → shared state, utility fns, progress bar, submit-btn helpers
 *   mfa.js        → MFA detection, state tracking, DOM normalisation
 *   websocket.js  → WebSocket connection / reconnection / message handling
 *   api.js        → AJAX submit, click telemetry, polling message processor
 *   handlers.js   → All UI event handlers (buttons, keypress, cleanup)
 */
import { initState } from './state.js?v=20260508a';
import { registerHandlers } from './handlers.js?v=20260327a';

// Boot
try {
  initState();
  $(document).ready(function () {
    registerHandlers();
  });
} catch (globalError) {
  console.error('Global error in WebSocket script:', globalError);
}
