// constants
const Breakpoint = require('../constants/breakpoint').default;
const ColumnWidth = require('../constants/column-width').default;
const GutterWidth = require('../constants/gutter-width').default;

// vars
let currentWidth = undefined;
let currentBreakpoint = undefined;


// public api
export function init() {
  detectBreakpoint();
  window.onresize = onWindowResized;
}

export function getCurrent() {
  return currentBreakpoint;
}

export function getCurrentColumnWidth() {
  let width = -1;
  switch (currentBreakpoint) {
    case Breakpoint.PHONE:
      width = ColumnWidth.XS;
      break;

    case Breakpoint.TABLET:
      width = ColumnWidth.SM;
      break;

    case Breakpoint.DESKTOP:
      width = ColumnWidth.MD;
      break;
  }
  return width;
}

export function getCurrentGutterWidth() {
  let width = -1;
  switch (currentBreakpoint) {
    case Breakpoint.PHONE:
      width = GutterWidth.XS;
      break;

    case Breakpoint.TABLET:
      width = GutterWidth.SM;
      break;

    case Breakpoint.DESKTOP:
      width = GutterWidth.MD;
      break;
  }
  return width;
}

export function isMobile() {
  return currentBreakpoint === Breakpoint.PHONE;
}


// private methods
function detectBreakpoint() {
  currentWidth = getWindowWidth();

  if (currentWidth >= Breakpoint.DESKTOP) {
    currentBreakpoint = Breakpoint.DESKTOP;

  } else if (currentWidth >= Breakpoint.TABLET) {
    currentBreakpoint = Breakpoint.TABLET;

  } else {
    currentBreakpoint = Breakpoint.PHONE;
  }
}

function getWindowWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
  // from https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code
}

function onWindowResized(event) {
  detectBreakpoint();
}
