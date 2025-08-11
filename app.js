// Total AV Support Page JavaScript
class TotalAVSupport {
    constructor() {
        this.chatWidget = null;
        this.chatFab = null;
        this.chatMessages = null;
        this.chatInput = null;
        this.isTyping = false;
        this.supportResponse = "Thank you for contacting Total AV Support! For immediate assistance with your inquiry, please call our support team at +1(888) 289-1749. Our experts are available 24/7 to help you with any questions or technical issues.";
        
        this.init();
    }

    init() {
        this.initializeElements();
        this.attachEventListeners();
        this.initializeAnimations();
        this.initializeAccessibility();
    }

    initializeElements() {
        this.chatWidget = document.getElementById('chatWidget');
        this.chatFab = document.getElementById('chatFab');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendMessage');
        this.closeButton = document.getElementById('closeChat');
        this.startChatButtons = document.querySelectorAll('#startChat, #startChatChannel');
        
        // Debug logging
        console.log('Chat widget found:', !!this.chatWidget);
        console.log('Chat FAB found:', !!this.chatFab);
    }

    attachEventListeners() {
        // Chat FAB click
        if (this.chatFab) {
            this.chatFab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat FAB clicked');
                this.toggleChat();
            });
        }

        // Close chat button
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeChat();
            });
        }

        // Start chat buttons
        this.startChatButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Start chat button clicked');
                this.openChat();
            });
        });

        // Send message
        if (this.sendButton) {
            this.sendButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }

        // Enter key to send message
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Support card interactions
        this.initializeSupportCards();

        // Smooth scrolling for anchor links
        this.initializeSmoothScrolling();

        // Header scroll effect
        this.initializeHeaderScroll();

        // Click outside to close chat
        document.addEventListener('click', (e) => {
            if (this.chatWidget && !this.chatWidget.contains(e.target) && 
                !this.chatFab.contains(e.target) && 
                !this.chatWidget.classList.contains('hidden')) {
                // Don't close if clicking on start chat buttons
                const isStartChatButton = Array.from(this.startChatButtons).some(btn => btn.contains(e.target));
                if (!isStartChatButton) {
                    this.closeChat();
                }
            }
        });

        // Fix phone links
        this.initializePhoneLinks();
    }

    initializePhoneLinks() {
        // Ensure all phone links work properly
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Let the browser handle tel: links naturally
                console.log('Phone link clicked:', this.href);
            });
        });
    }

    initializeAnimations() {
        // Animate elements on scroll
        this.observeElements();
        
        // Add loading animation to buttons
        this.initializeButtonAnimations();
    }

    toggleChat() {
        console.log('Toggle chat called, current state:', this.chatWidget?.classList.contains('hidden'));
        if (this.chatWidget && this.chatWidget.classList.contains('hidden')) {
            this.openChat();
        } else {
            this.closeChat();
        }
    }

    openChat() {
        console.log('Opening chat widget');
        if (this.chatWidget) {
            this.chatWidget.classList.remove('hidden');
            this.chatWidget.style.display = 'flex'; // Ensure it's visible
            
            // Focus on input after animation
            setTimeout(() => {
                if (this.chatInput) {
                    this.chatInput.focus();
                }
            }, 300);
        }
    }

    closeChat() {
        console.log('Closing chat widget');
        if (this.chatWidget) {
            this.chatWidget.classList.add('hidden');
        }
    }

    async sendMessage() {
        const message = this.chatInput?.value?.trim();
        if (!message || this.isTyping) return;

        console.log('Sending message:', message);

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate typing delay
        await this.delay(1500 + Math.random() * 1000);

        // Hide typing indicator and add bot response
        this.hideTypingIndicator();
        this.addMessage(this.supportResponse, 'bot');
    }

    addMessage(content, type) {
        if (!this.chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (type === 'bot') {
            avatarDiv.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5z"/>
                </svg>
            `;
        } else {
            avatarDiv.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            `;
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${this.escapeHtml(content)}</p>`;

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTypingIndicator() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5z"/>
                </svg>
            </div>
            <div class="typing-text">
                Support is typing
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;

        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        if (this.chatMessages) {
            setTimeout(() => {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            }, 100);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    initializeSupportCards() {
        const supportCards = document.querySelectorAll('.support-card');
        supportCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSupportCardClick(card);
            });

            // Add hover effect
            card.addEventListener('mouseenter', () => {
                this.animateCard(card, 'hover');
            });

            card.addEventListener('mouseleave', () => {
                this.animateCard(card, 'leave');
            });
        });
    }

    handleSupportCardClick(card) {
        const category = card.dataset.category;
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Open the chat immediately
        this.openChat();
        
        // Add a contextual message based on the category
        setTimeout(() => {
            const categoryMessages = {
                'installation': 'I need help with installation and setup.',
                'billing': 'I have a question about billing and payments.',
                'account': 'I need help with account management.',
                'protection': 'I have an issue with virus protection.',
                'technical': 'I need technical support.',
                'refunds': 'I want to request a refund or cancel my subscription.'
            };

            const message = categoryMessages[category] || 'I need help with my Total AV software.';
            if (this.chatInput) {
                this.chatInput.value = message;
                this.chatInput.focus();
            }
        }, 500);
    }

    animateCard(card, type) {
        const icon = card.querySelector('.support-card__icon');
        if (type === 'hover' && icon) {
            icon.style.transform = 'rotate(5deg) scale(1.1)';
        } else if (icon) {
            icon.style.transform = '';
        }
    }

    initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollTop = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > scrollThreshold) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }

            lastScrollTop = scrollTop;
        });
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe cards and sections
        const elementsToObserve = document.querySelectorAll('.support-card, .channel-card, .trust-item');
        elementsToObserve.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    initializeButtonAnimations() {
        const buttons = document.querySelectorAll('.btn:not(.chatbot-close):not(#sendMessage)');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Skip tel: links - let them work naturally
                if (button.href && button.href.startsWith('tel:')) {
                    return;
                }
                
                // Ripple effect for other buttons
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation CSS if not already present
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeAccessibility() {
        // Add proper ARIA labels
        const chatFab = document.getElementById('chatFab');
        if (chatFab) {
            chatFab.setAttribute('aria-label', 'Open live chat support');
        }

        const closeButton = document.getElementById('closeChat');
        if (closeButton) {
            closeButton.setAttribute('aria-label', 'Close chat window');
        }

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.chatWidget && !this.chatWidget.classList.contains('hidden')) {
                this.closeChat();
            }
        });

        // Focus management
        this.manageFocusStates();
    }

    manageFocusStates() {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.chatWidget && !this.chatWidget.classList.contains('hidden')) {
                const focusableContent = this.chatWidget.querySelectorAll(focusableElements);
                const firstFocusableElement = focusableContent[0];
                const lastFocusableElement = focusableContent[focusableContent.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Error handling
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        
        // Show user-friendly error message in chat if needed
        if (context === 'chat' && this.chatMessages) {
            this.addMessage('Sorry, there was an error. Please call our support line directly at +1 (888) 289-1749 for immediate assistance.', 'bot');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Total AV Support app');
    const app = new TotalAVSupport();
    
    // Make app globally accessible for debugging
    window.TotalAVApp = app;
    
    // Add additional CSS animations for loading states
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .loading {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .typing-text {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: var(--color-text-secondary);
        }
        
        .typing-indicator {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: var(--color-secondary);
            border-radius: 12px;
            margin-bottom: 16px;
        }
        
        .typing-indicator .message-avatar {
            background: linear-gradient(135deg, #E53E3E, #C53030);
            color: white;
        }
        
        /* Ensure chat widget visibility */
        .chatbot-widget {
            display: none;
        }
        
        .chatbot-widget:not(.hidden) {
            display: flex;
        }
        
        /* Mobile optimizations */
        @media (max-width: 480px) {
            .chatbot-widget {
                height: 70vh;
                max-height: 500px;
            }
            
            .hero__actions {
                gap: 12px;
            }
            
            .btn--lg {
                padding: 12px 20px;
                font-size: 14px;
            }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            .btn--primary {
                border: 2px solid currentColor;
            }
            
            .support-card:hover {
                border-color: currentColor;
            }
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(additionalStyles);
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TotalAVSupport;
}