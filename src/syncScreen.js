// syncScreen.js - Full-screen sync component for EMG synchronization

class SyncScreen {
    constructor() {
        this.overlay = null;
        this.clickCount = 0;
        this.clickTimestamps = [];
        this.onComplete = null;
    }

    /**
     * Show the sync screen with a big button to click 3 times
     * @param {Function} onComplete - Callback when sync is complete
     */
    show(onComplete) {
        this.onComplete = onComplete;
        this.clickCount = 0;
        this.clickTimestamps = [];

        // Create full-screen overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'tabtabgo-sync-overlay';
        this.overlay.innerHTML = `
            <div class="sync-container">
                <div class="sync-header">
                    <h1>📊 EMG SYNC</h1>
                    <p class="sync-instruction">Click the big button below <strong>3 times quickly</strong></p>
                </div>
                
                <button class="sync-button" id="sync-click-btn">
                    <div class="sync-button-content">
                        <div class="click-counter">${this.clickCount}/3</div>
                        <div class="sync-button-text">CLICK HERE</div>
                    </div>
                </button>
                
                <div class="sync-footer">
                    <p>This helps synchronize interaction logs with EMG sensors</p>
                </div>
            </div>
        `;

        // Add styles
        this.addStyles();

        // Add to page
        document.body.appendChild(this.overlay);

        // Add click handler
        const button = document.getElementById('sync-click-btn');
        button.addEventListener('click', () => this.handleClick());

        // Focus the button for keyboard accessibility
        setTimeout(() => button.focus(), 100);
    }

    handleClick() {
        const timestamp = Date.now();
        this.clickTimestamps.push(timestamp);
        this.clickCount++;

        console.log(`🎯 Sync click ${this.clickCount}/3 at ${timestamp}`);

        // Update counter display
        const counter = this.overlay.querySelector('.click-counter');
        counter.textContent = `${this.clickCount}/3`;

        // Add visual feedback
        const button = document.getElementById('sync-click-btn');
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 200);

        // Check if complete
        if (this.clickCount >= 3) {
            // Calculate intervals between clicks
            const intervals = [
                this.clickTimestamps[1] - this.clickTimestamps[0],
                this.clickTimestamps[2] - this.clickTimestamps[1]
            ];
            
            console.log('✅ Sync complete!', {
                timestamps: this.clickTimestamps,
                intervals: intervals,
                totalDuration: this.clickTimestamps[2] - this.clickTimestamps[0]
            });

            // Show completion message briefly
            this.showCompletion();
        }
    }

    showCompletion() {
        const container = this.overlay.querySelector('.sync-container');
        container.innerHTML = `
            <div class="sync-header">
                <h1 style="color: #10b981;">✅ SYNC COMPLETE</h1>
                <p class="sync-instruction">EMG synchronization successful</p>
            </div>
            <div class="sync-stats">
                <div class="sync-stat">
                    <div class="stat-label">Click 1</div>
                    <div class="stat-value">${new Date(this.clickTimestamps[0]).toLocaleTimeString()}.${this.clickTimestamps[0] % 1000}</div>
                </div>
                <div class="sync-stat">
                    <div class="stat-label">Click 2</div>
                    <div class="stat-value">${new Date(this.clickTimestamps[1]).toLocaleTimeString()}.${this.clickTimestamps[1] % 1000}</div>
                </div>
                <div class="sync-stat">
                    <div class="stat-label">Click 3</div>
                    <div class="stat-value">${new Date(this.clickTimestamps[2]).toLocaleTimeString()}.${this.clickTimestamps[2] % 1000}</div>
                </div>
            </div>
            <div class="sync-footer">
                <p>Starting first task...</p>
            </div>
        `;

        // Remove after 2 seconds and call completion callback
        setTimeout(() => {
            this.remove();
            if (this.onComplete) {
                this.onComplete({
                    timestamps: this.clickTimestamps,
                    intervals: [
                        this.clickTimestamps[1] - this.clickTimestamps[0],
                        this.clickTimestamps[2] - this.clickTimestamps[1]
                    ],
                    totalDuration: this.clickTimestamps[2] - this.clickTimestamps[0]
                });
            }
        }, 2000);
    }

    remove() {
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
            this.overlay = null;
        }
    }

    addStyles() {
        // Check if styles already exist
        if (document.getElementById('tabtabgo-sync-styles')) return;

        const style = document.createElement('style');
        style.id = 'tabtabgo-sync-styles';
        style.textContent = `
            #tabtabgo-sync-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                z-index: 2147483647;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .sync-container {
                text-align: center;
                color: white;
                max-width: 600px;
                padding: 40px;
            }

            .sync-header h1 {
                font-size: 48px;
                margin: 0 0 20px 0;
                font-weight: 700;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            }

            .sync-instruction {
                font-size: 24px;
                margin: 0 0 40px 0;
                opacity: 0.95;
            }

            .sync-button {
                width: 300px;
                height: 300px;
                border-radius: 50%;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                border: 8px solid rgba(255, 255, 255, 0.3);
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                margin: 0 auto 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .sync-button:hover {
                transform: scale(1.05);
                box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
                border-color: rgba(255, 255, 255, 0.5);
            }

            .sync-button:active,
            .sync-button.clicked {
                transform: scale(0.95);
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
            }

            .sync-button-content {
                text-align: center;
            }

            .click-counter {
                font-size: 72px;
                font-weight: 700;
                color: white;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }

            .sync-button-text {
                font-size: 24px;
                font-weight: 600;
                color: white;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            }

            .sync-footer {
                font-size: 16px;
                opacity: 0.8;
            }

            .sync-stats {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin: 40px 0;
            }

            .sync-stat {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 20px;
                min-width: 150px;
            }

            .stat-label {
                font-size: 14px;
                opacity: 0.8;
                margin-bottom: 8px;
            }

            .stat-value {
                font-size: 18px;
                font-weight: 600;
                font-family: monospace;
            }
        `;
        document.head.appendChild(style);
    }
}

// Create singleton instance
const syncScreen = new SyncScreen();

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showSync') {
        console.log('📊 Showing sync screen...');
        
        syncScreen.show((syncData) => {
            console.log('✅ Sync data:', syncData);
            
            // Send sync data back to background script
            chrome.runtime.sendMessage({
                action: 'syncComplete',
                data: syncData
            }).then(() => {
                sendResponse({ success: true });
            });
        });
        
        return true; // Keep channel open for async response
    }
    
    if (request.action === 'hideSync') {
        syncScreen.remove();
        sendResponse({ success: true });
    }
});

export { syncScreen };
