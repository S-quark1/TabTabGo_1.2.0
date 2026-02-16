// clickHelper.js
// Robust clicking for Gmail elements that use jsaction and other event systems

/**
 * Perform a robust click on an element, trying multiple strategies
 * Optimized for Gmail's event system
 * @param {HTMLElement} element - The element to click
 * @returns {boolean} - Whether the click was successful
 */
/**
 * Smart click that tries different strategies based on what works
 * Gmail has different event systems in different regions:
 * - Header: Works with simple click
 * - Navigation/Compose: Needs robust click with mouse events
 * - More labels (J-Ke class): Needs simple click
 * @param {HTMLElement} element - The element to click
 * @returns {boolean} - Whether the click was successful
 */
export function performSmartClick(element) {
    if (!element) {
        console.warn('❌ Cannot click null element');
        return false;
    }

    // Find clickable parent if clicking SVG/path
    let clickTarget = element;
    const tagName = element.tagName ? element.tagName.toLowerCase() : '';

    if (tagName === 'svg' || tagName === 'path') {
        let parent = element.parentElement;
        let maxDepth = 5;

        while (parent && maxDepth > 0) {
            const parentTag = parent.tagName ? parent.tagName.toLowerCase() : '';
            if (parent.getAttribute('role') === 'button' ||
                parentTag === 'button' ||
                parentTag === 'a' ||
                parent.hasAttribute('jsaction') ||
                parent.onclick) {
                clickTarget = parent;
                console.log('📍 Found clickable parent:', {
                    tag: parentTag,
                    role: parent.getAttribute('role'),
                    ariaLabel: parent.getAttribute('aria-label')
                });
                break;
            }
            parent = parent.parentElement;
            maxDepth--;
        }
    }

    console.log('🖱️ Smart clicking:', {
        tag: clickTarget.tagName,
        class: (clickTarget.className || '').toString().substring(0, 80),
        text: (clickTarget.textContent || '').trim().substring(0, 50),
        ariaLabel: clickTarget.getAttribute('aria-label'),
        role: clickTarget.getAttribute('role')
    });

    // Detect element type for click strategy
    const className = (clickTarget.className || '').toString();

    // More labels button and similar Gmail UI elements
    const isGmailUIButton =
        className.includes('J-Ke') || // More labels, etc.
        className.includes('n4') ||   // Navigation elements
        clickTarget.closest('.n6') || // More labels container
        clickTarget.closest('.J-Ke');

    const isHeaderElement =
        clickTarget.closest('[role="banner"]') !== null ||
        clickTarget.closest('.gb_') !== null; // Gmail header classes start with gb_

    const isComposeOrNavigation =
        className.includes('T-I') || // Gmail toolbar/compose buttons
        clickTarget.closest('.T-I') !== null ||
        className.includes('z0') || // Compose button container
        clickTarget.closest('.z0') !== null ||
        className.includes('wG') || // Compose toolbar buttons (attach, link, emoji, etc.)
        clickTarget.closest('.wG') !== null ||
        className.includes('J-Z-I') || // Formatting toolbar buttons
        clickTarget.closest('.J-Z-I') !== null ||
        clickTarget.closest('.AD') !== null; // Inside compose form area

    // Top navigation filter chips (From, To, Any time, etc.)
    const isTopNavFilter =
        className.includes('HW') && className.includes('H0') && className.includes('H2') ||
        clickTarget.closest('.Im') !== null; // Filter container

    // Category tabs (Primary, Promotions, Social, etc.)
    const isCategoryTab =
        clickTarget.closest('.aKk') !== null ||
        clickTarget.closest('[role="tab"]') !== null;

    // Right panel (Calendar, Keep, Tasks, Contacts)
    const isRightPanel =
        clickTarget.closest('[role="complementary"]') !== null;

    console.log('🎯 Element type:', {
        isGmailUI: isGmailUIButton,
        isHeader: isHeaderElement,
        isComposeNav: isComposeOrNavigation,
        isTopNavFilter: isTopNavFilter,
        isCategoryTab: isCategoryTab,
        isRightPanel: isRightPanel
    });

    try {
        // Strategy selection based on element type
        if (isGmailUIButton || isHeaderElement) {
            console.log('📌 Using simple click (Gmail UI / header element)');
            // Gmail UI buttons and header elements work better with simple click
            clickTarget.focus();
            clickTarget.click();
            console.log('✅ Simple click completed');
            return true;
        } else if (isTopNavFilter) {
            console.log('📌 Using robust click (top navigation filter)');
            // Top navigation filters need full mouse events
            return performRobustClickInternal(clickTarget);
        } else if (isCategoryTab) {
            console.log('📌 Using robust click (category tab)');
            // Category tabs (Primary, Promotions, Social) need full mouse events
            return performRobustClickInternal(clickTarget);
        } else if (isRightPanel) {
            console.log('📌 Using robust click (right panel)');
            // Right panel buttons need full mouse events
            return performRobustClickInternal(clickTarget);
        } else if (isComposeOrNavigation) {
            console.log('📌 Using robust click (compose/navigation element)');
            // Compose and navigation need full mouse event sequence
            return performRobustClickInternal(clickTarget);
        } else {
            console.log('📌 Using simple click (default)');
            // Default to simple click for unknown elements
            clickTarget.focus();
            clickTarget.click();
            console.log('✅ Simple click completed');
            return true;
        }
    } catch (error) {
        console.error('❌ Smart click failed, trying fallback:', error);
        // Fallback: try the opposite strategy
        try {
            if (isGmailUIButton || isHeaderElement) {
                console.log('🔄 Fallback: trying robust click');
                return performRobustClickInternal(clickTarget);
            } else {
                console.log('🔄 Fallback: trying simple click');
                clickTarget.click();
                return true;
            }
        } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError);
            return false;
        }
    }
}

/**
 * Internal robust click implementation (extracted from performRobustClick)
 */
function performRobustClickInternal(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Focus first (Gmail expects this)
    if (element.tabIndex >= 0 || element.getAttribute('tabindex')) {
        element.focus();
    }

    // Create realistic mouse events at the element's center
    const mouseEventOptions = {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
        clientX: x,
        clientY: y,
        screenX: x + window.screenX,
        screenY: y + window.screenY,
        button: 0, // Left click
        buttons: 1
    };

    // Mousedown
    const mousedownEvent = new MouseEvent('mousedown', mouseEventOptions);
    element.dispatchEvent(mousedownEvent);

    // Small delay between mousedown and mouseup (more realistic)
    setTimeout(() => {
        // Mouseup
        const mouseupEvent = new MouseEvent('mouseup', mouseEventOptions);
        element.dispatchEvent(mouseupEvent);

        // Click
        const clickEvent = new MouseEvent('click', mouseEventOptions);
        element.dispatchEvent(clickEvent);

        // REMOVED: element.click() - This was causing duplicate actions
        // The dispatched MouseEvent click is sufficient

        console.log('✅ Robust click completed');
    }, 10);

    return true;
}

/**
 * Original performRobustClick - kept for backward compatibility
 * Now just calls performSmartClick
 */
export function performRobustClick(element) {
    return performSmartClick(element);
}

/**
 * Alternative: Try to click the parent element if direct click fails
 * Useful when the actual clickable element is a parent wrapper
 */
export function performClickWithParentFallback(element) {
    // Try direct click first
    let success = performRobustClick(element);

    if (!success && element.parentElement) {
        console.log('⚠️ Direct click may have failed, trying parent element...');

        // Check if parent looks clickable
        const parent = element.parentElement;
        if (parent.getAttribute('role') === 'button' ||
            parent.tagName === 'BUTTON' ||
            parent.hasAttribute('jsaction') ||
            parent.onclick) {

            success = performRobustClick(parent);
        }
    }

    return success;
}

/**
 * Wait for element to be ready before clicking
 * Useful for elements that might be in the process of rendering
 */
export async function performDelayedClick(element, delay = 100) {
    await new Promise(resolve => setTimeout(resolve, delay));
    return performRobustClick(element);
}

/**
 * Scroll element into view and then click
 */
export function performScrollAndClick(element) {
    try {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });

        // Wait a moment for scroll to complete
        setTimeout(() => {
            performRobustClick(element);
        }, 300);

        return true;
    } catch (error) {
        console.error('❌ Scroll and click failed:', error);
        return false;
    }
}

/**
 * Debug helper: Log all event listeners on an element
 * Note: This requires Chrome DevTools to be open with getEventListeners available
 */
export function debugElementEvents(element) {
    console.log('🔍 Element event debugging:');
    console.log('Element:', element);
    console.log('Tag:', element.tagName);
    console.log('Class:', element.className);
    console.log('Role:', element.getAttribute('role'));
    console.log('Tabindex:', element.getAttribute('tabindex'));
    console.log('Has onclick:', element.onclick !== null);
    console.log('Has jsaction:', element.hasAttribute('jsaction'));
    console.log('jsaction value:', element.getAttribute('jsaction'));

    // Try to get event listeners (Chrome only)
    if (typeof getEventListeners === 'function') {
        console.log('Event listeners:', getEventListeners(element));
    } else {
        console.log('(getEventListeners not available - open Chrome DevTools)');
    }
}