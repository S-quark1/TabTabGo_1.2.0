// taskInterstitial.js - Brief screen shown between tasks

class TaskInterstitial {
    constructor() {
        this.overlay = null;
    }

    /**
     * Show brief task completion screen
     * @param {number} taskNumber - Completed task number
     * @param {number} totalTasks - Total number of tasks
     * @param {string} status - 'completed' or 'skipped'
     * @param {Function} onComplete - Callback when interstitial is done
     */
    show(taskNumber, totalTasks, status = 'completed', onComplete) {
        // Remove any existing overlay
        this.remove();

        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'tabtabgo-task-interstitial';
        
        const statusEmoji = status === 'completed' ? '✅' : '⏭️';
        const statusText = status === 'completed' ? 'Task Complete' : 'Task Skipped';
        const statusColor = status === 'completed' ? '#10b981' : '#f59e0b';

        this.overlay.innerHTML = `
            <div class="interstitial-container">
                <div class="interstitial-icon" style="color: ${statusColor};">${statusEmoji}</div>
                <div class="interstitial-title">${statusText}</div>
                <div class="interstitial-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(taskNumber / totalTasks) * 100}%;"></div>
                    </div>
                    <div class="progress-text">Task ${taskNumber} of ${totalTasks}</div>
                </div>
                ${taskNumber < totalTasks ? '<div class="interstitial-next">Next task starting...</div>' : '<div class="interstitial-next">Session complete!</div>'}
            </div>
        `;

        // Add styles
        this.addStyles();

        // Add to page
        document.body.appendChild(this.overlay);

        // Auto-remove after 2.5 seconds
        setTimeout(() => {
            this.remove();
            if (onComplete) {
                onComplete();
            }
        }, 2500);
    }

    remove() {
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
            this.overlay = null;
        }
    }

    addStyles() {
        // Check if styles already exist
        if (document.getElementById('tabtabgo-interstitial-styles')) return;

        const style = document.createElement('style');
        style.id = 'tabtabgo-interstitial-styles';
        style.textContent = `
            #tabtabgo-task-interstitial {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 2147483646;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                animation: interstitialFadeIn 0.3s ease-out;
            }

            @keyframes interstitialFadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .interstitial-container {
                text-align: center;
                color: white;
                max-width: 500px;
                padding: 40px;
            }

            .interstitial-icon {
                font-size: 80px;
                margin-bottom: 20px;
                animation: iconPop 0.5s ease-out;
            }

            @keyframes iconPop {
                0% {
                    transform: scale(0);
                }
                50% {
                    transform: scale(1.2);
                }
                100% {
                    transform: scale(1);
                }
            }

            .interstitial-title {
                font-size: 36px;
                font-weight: 700;
                margin-bottom: 30px;
                opacity: 0;
                animation: titleSlideIn 0.5s ease-out 0.2s forwards;
            }

            @keyframes titleSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .interstitial-progress {
                margin-bottom: 20px;
                opacity: 0;
                animation: progressFadeIn 0.5s ease-out 0.4s forwards;
            }

            @keyframes progressFadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 10px;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #059669);
                transition: width 0.5s ease-out;
                border-radius: 4px;
            }

            .progress-text {
                font-size: 18px;
                color: rgba(255, 255, 255, 0.8);
            }

            .interstitial-next {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.6);
                margin-top: 20px;
                opacity: 0;
                animation: nextFadeIn 0.5s ease-out 0.6s forwards;
            }

            @keyframes nextFadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create singleton instance
const taskInterstitial = new TaskInterstitial();

export { taskInterstitial };
