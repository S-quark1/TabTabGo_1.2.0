'use strict';

/* ========= STATE ========= */

export const navState = {
    focusedElement: null,
    focusHistory: [],
    lastAction: null,
    mouse: { x: 0, y: 0 },
    maxHistory: 5
};

function generateElementFeatures(el) {
    const rect = el.getBoundingClientRect();
    return {
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute('role') || '',
        text: getButtonText(el),
        rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
        className: getClassNameString(el).toLowerCase(),
        id: (el.id || '').toLowerCase()
    };
}

export function updateFocusHistory(element) {
    if (!element) return;

    navState.focusedElement = element;
    navState.focusHistory.push({
        element: element,
        timestamp: Date.now(),
        features: generateElementFeatures(element)
    });

    if (navState.focusHistory.length > navState.maxHistory) {
        navState.focusHistory.shift();
    }
}

/* ========= HELPERS ========= */

function getClassNameString(el) {
    if (!el.className) return '';
    return typeof el.className === 'string'
        ? el.className
        : el.className.toString();
}

function getButtonText(el) {
    return el.getAttribute('aria-label') ||
        el.getAttribute('data-tooltip') ||
        el.title ||
        el.textContent?.trim().slice(0, 100) ||
        el.tagName.toLowerCase();
}