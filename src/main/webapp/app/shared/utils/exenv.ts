export const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export const canUseWorkers = typeof Worker !== 'undefined';

export const canUseEventListeners = canUseDOM && !!(window.addEventListener || window['attachEvent']);

export const canUseViewport = canUseDOM && !!window.screen;