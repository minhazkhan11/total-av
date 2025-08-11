// Total AV Support Page JavaScript - Final Fixed Version
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
        console.log('Elements initialized:', {
            chatWidget: !!this.chatWidget,
            chatFab: !!this.chatFab,
            chatMessages: !!this.chatMessages,
            chatInput: !!this.chatInput,
            sendButton: !!this.sendButton,
            closeButton: !!this.closeButton,
            startChatButtons: this.startChatButtons.length
        });
    }

    attachEventListeners() {
        // Chat FAB click
        if (this.chatFab) {
            this.chatFab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat FAB clicked');
                this.openChat();
            });
        }

        // Close chat button - Fixed
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                this.closeChat();
            });
        }

        // Start chat buttons - Fixed
        this.startChatButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Start chat button ${index + 1} clicked`);
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

        // Initialize all interactive elements
        this.initializeSupportCards();
        this.initializePhoneLinks();
        this.initializeSmoothScrolling();
        this.initializeHeaderScroll();

        // Click outside to close chat
        document.addEventListener('click', (e) => {
            if (this.chatWidget && !this.chatWidget.contains(e.target) && 
                e.target !== this.chatFab && !this.chatFab?.contains(e.target) &&
                !this.chatWidget.classList.contains('hidden')) {
                
                const isStartChatButton = Array.from(this.startChatButtons).some(btn => 
                    btn === e.target || btn.contains(e.target)
                );
                const isSupportCard = e.target.closest('.support-card');
                
                if (!isStartChatButton && !isSupportCard) {
                    this.closeChat();
                }
            }
        });
    }

    initializePhoneLinks() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        console.log('Initializing phone links:', phoneLinks.length);
        
        phoneLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                console.log(`Phone link ${index + 1} clicked:`, this.href);
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    initializeSupportCards() {
        const supportCards = document.querySelectorAll('.support-card');
        console.log('Initializing support cards:', supportCards.length);
        
        supportCards.forEach((card, index) => {
            console.log(`Setting up card ${index + 1}:`, card.dataset.category);
            
            // Use event delegation approach for reliability
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Support card clicked: ${card.dataset.category}`);
                this.handleSupportCardClick(card);
            });

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.support-card__icon');
                if (icon) {
                    icon.style.transform = 'rotate(5deg) scale(1.1)';
                }
            });

            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.support-card__icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });

            // Accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleSupportCardClick(card);
                }
            });
        });
    }

    handleSupportCardClick(card) {
        const category = card.dataset.category || 'general';
        console.log('Handling support card click for:', category);
        
        // Visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Open chat and add support message
        this.openChat();
        
        // Add the support response after a brief delay
        setTimeout(() => {
            this.addMessage(this.supportResponse, 'bot');
        }, 300);
    }

    openChat() {
        console.log('Opening chat widget');
        if (!this.chatWidget) {
            console.error('Chat widget not found!');
            return;
        }

        // Show the chat widget
        this.chatWidget.classList.remove('hidden');
        this.chatWidget.style.display = 'flex';
        
        console.log('Chat widget opened');
        
        // Focus input after animation
        setTimeout(() => {
            if (this.chatInput) {
                this.chatInput.focus();
            }
        }, 300);
    }

    closeChat() {
        console.log('Closing chat widget');
        if (!this.chatWidget) {
            console.error('Chat widget not found!');
            return;
        }

        this.chatWidget.classList.add('hidden');
        
        // Hide after animation
        setTimeout(() => {
            if (this.chatWidget.classList.contains('hidden')) {
                this.chatWidget.style.display = 'none';
            }
        }, 300);
        
        console.log('Chat widget closed');
    }

    async sendMessage() {
        const message = this.chatInput?.value?.trim();
        if (!message || this.isTyping) {
            return;
        }

        console.log('Sending message:', message);

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate response delay
        await this.delay(1000 + Math.random() * 500);

        // Hide typing and show response
        this.hideTypingIndicator();
        this.addMessage(this.supportResponse, 'bot');
    }

    addMessage(content, type) {
        if (!this.chatMessages) {
            console.error('Chat messages container not found');
            return;
        }

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
        if (this.isTyping) return;
        
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
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        if (this.chatMessages) {
            setTimeout(() => {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            }, 50);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href.startsWith('#support')) return;
                
                e.preventDefault();
                const target = document.querySelector(href);
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

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            }
        });
    }

    initializeAnimations() {
        // Simple scroll-triggered animations
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

        const elementsToObserve = document.querySelectorAll('.support-card, .channel-card, .trust-item');
        elementsToObserve.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });

        // Button animations
        const buttons = document.querySelectorAll('.btn, .support-card');
        buttons.forEach(button => {
            button.addEventListener('mousedown', function() {
                if (!this.href || !this.href.startsWith('tel:')) {
                    this.style.transform = 'scale(0.98)';
                }
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    initializeAccessibility() {
        // ARIA labels
        if (this.chatFab) {
            this.chatFab.setAttribute('aria-label', 'Open live chat support');
            this.chatFab.setAttribute('title', 'Open live chat support');
        }

        if (this.closeButton) {
            this.closeButton.setAttribute('aria-label', 'Close chat window');
            this.closeButton.setAttribute('title', 'Close chat window');
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.chatWidget && !this.chatWidget.classList.contains('hidden')) {
                this.closeChat();
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Total AV Support application');
    
    // Force light theme
    document.documentElement.setAttribute('data-color-scheme', 'light');
    
    // Create app instance
    const app = new TotalAVSupport();
    window.TotalAVApp = app;
    
    console.log('Total AV Support application initialized');
    
    // Add final CSS enhancements
    const finalStyles = document.createElement('style');
    finalStyles.textContent = `
        /* Final CSS fixes */
        .chatbot-widget {
            display: none;
        }
        
        .chatbot-widget:not(.hidden) {
            display: flex !important;
        }
        
        .chatbot-widget.hidden {
            display: none !important;
        }
        
        .support-card {
            cursor: pointer;
            user-select: none;
        }
        
        .support-card:active {
            transform: scale(0.95) !important;
        }
        
        .btn:active {
            transform: scale(0.95);
        }
        
        .chat-fab:active {
            transform: scale(0.9);
        }
        
        a[href^="tel:"]:active {
            transform: scale(0.95);
        }
        
        .phone-number-box:active {
            transform: translateY(-1px) scale(0.98) !important;
        }
        
        /* Ensure proper message display */
        .message-content p {
            margin: 0;
            line-height: 1.5;
            word-wrap: break-word;
        }
        
        /* Mobile enhancements */
        @media (max-width: 480px) {
            .chatbot-widget {
                width: calc(100vw - 32px) !important;
                right: 16px !important;
                bottom: 90px !important;
                height: 70vh !important;
                max-height: 500px !important;
            }
        }
    `;
    
    document.head.appendChild(finalStyles);
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TotalAVSupport;
}