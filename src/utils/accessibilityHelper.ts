/**
 * Accessibility Helper Utility
 * Provides functions to improve accessibility and keyboard navigation
 */

export class AccessibilityHelper {
  private static instance: AccessibilityHelper;
  private focusableElements: string = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  static getInstance(): AccessibilityHelper {
    if (!AccessibilityHelper.instance) {
      AccessibilityHelper.instance = new AccessibilityHelper();
    }
    return AccessibilityHelper.instance;
  }

  /**
   * Initialize accessibility features
   */
  initialize(): void {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupSkipLinks();
  }

  /**
   * Setup keyboard navigation for the entire application
   */
  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (event) => {
      // Handle Escape key to close modals/dropdowns
      if (event.key === 'Escape') {
        this.handleEscapeKey();
      }

      // Handle Tab key for focus management
      if (event.key === 'Tab') {
        this.handleTabNavigation(event);
      }

      // Handle Enter/Space for button-like elements
      if (event.key === 'Enter' || event.key === ' ') {
        this.handleActivation(event);
      }

      // Handle Arrow keys for menu navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        this.handleArrowNavigation(event);
      }
    });
  }

  /**
   * Handle Escape key press
   */
  private handleEscapeKey(): void {
    // Close any open modals
    const modals = document.querySelectorAll('[role="dialog"][aria-hidden="false"]');
    modals.forEach(modal => {
      const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="đóng"]');
      if (closeButton instanceof HTMLElement) {
        closeButton.click();
      }
    });

    // Close any open dropdowns
    const dropdowns = document.querySelectorAll('[aria-expanded="true"]');
    dropdowns.forEach(dropdown => {
      if (dropdown instanceof HTMLElement) {
        dropdown.setAttribute('aria-expanded', 'false');
        dropdown.click();
      }
    });
  }

  /**
   * Handle Tab navigation and focus trapping
   */
  private handleTabNavigation(event: KeyboardEvent): void {
    const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
    
    if (activeModal) {
      this.trapFocusInModal(event, activeModal as HTMLElement);
    }
  }

  /**
   * Trap focus within a modal
   */
  private trapFocusInModal(event: KeyboardEvent, modal: HTMLElement): void {
    const focusableElements = modal.querySelectorAll(this.focusableElements);
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Handle Enter/Space activation for custom elements
   */
  private handleActivation(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    
    // Handle custom buttons or clickable elements
    if (target.getAttribute('role') === 'button' || 
        target.classList.contains('clickable') ||
        target.hasAttribute('data-clickable')) {
      event.preventDefault();
      target.click();
    }
  }

  /**
   * Handle arrow key navigation for menus and lists
   */
  private handleArrowNavigation(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    const parent = target.closest('[role="menu"], [role="listbox"], [role="tablist"]');
    
    if (!parent) return;

    const items = parent.querySelectorAll('[role="menuitem"], [role="option"], [role="tab"]');
    const currentIndex = Array.from(items).indexOf(target);
    
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
    }

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      (items[nextIndex] as HTMLElement).focus();
    }
  }

  /**
   * Setup focus management
   */
  private setupFocusManagement(): void {
    // Add focus indicators for keyboard users
    document.addEventListener('keydown', () => {
      document.body.classList.add('keyboard-navigation');
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Manage focus for dynamic content
    this.observeContentChanges();
  }

  /**
   * Observe content changes and manage focus accordingly
   */
  private observeContentChanges(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              
              // Auto-focus first focusable element in new modals
              if (element.getAttribute('role') === 'dialog') {
                setTimeout(() => {
                  const firstFocusable = element.querySelector(this.focusableElements) as HTMLElement;
                  if (firstFocusable) {
                    firstFocusable.focus();
                  }
                }, 100);
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Setup screen reader support
   */
  private setupScreenReaderSupport(): void {
    // Announce dynamic content changes
    this.createLiveRegion();
    
    // Add missing labels and descriptions
    this.enhanceFormAccessibility();
    
    // Improve image accessibility
    this.enhanceImageAccessibility();
  }

  /**
   * Create live region for screen reader announcements
   */
  private createLiveRegion(): void {
    if (!document.getElementById('live-region')) {
      const liveRegion = document.createElement('div');
      liveRegion.id = 'live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }
  }

  /**
   * Announce message to screen readers
   */
  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  /**
   * Enhance form accessibility
   */
  private enhanceFormAccessibility(): void {
    // Add labels to inputs without labels
    const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
    inputs.forEach((input) => {
      const placeholder = input.getAttribute('placeholder');
      if (placeholder && !input.getAttribute('aria-label')) {
        input.setAttribute('aria-label', placeholder);
      }
    });

    // Add error announcements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.classList.contains('error') || element.getAttribute('role') === 'alert') {
              this.announceToScreenReader(element.textContent || '', 'assertive');
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Enhance image accessibility
   */
  private enhanceImageAccessibility(): void {
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach((img) => {
      // Add empty alt for decorative images
      if (img.closest('[role="presentation"]') || img.classList.contains('decorative')) {
        img.setAttribute('alt', '');
      } else {
        // Add descriptive alt based on context
        const figcaption = img.closest('figure')?.querySelector('figcaption');
        if (figcaption) {
          img.setAttribute('alt', figcaption.textContent || '');
        }
      }
    });
  }

  /**
   * Setup skip links for keyboard navigation
   */
  private setupSkipLinks(): void {
    if (!document.getElementById('skip-links')) {
      const skipLinks = document.createElement('div');
      skipLinks.id = 'skip-links';
      skipLinks.innerHTML = `
        <a href="#main-content" class="skip-link">Chuyển đến nội dung chính</a>
        <a href="#main-navigation" class="skip-link">Chuyển đến menu điều hướng</a>
        <a href="#search" class="skip-link">Chuyển đến tìm kiếm</a>
      `;
      
      // Add CSS for skip links
      const style = document.createElement('style');
      style.textContent = `
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #000;
          color: #fff;
          padding: 8px;
          text-decoration: none;
          z-index: 9999;
          border-radius: 4px;
        }
        
        .skip-link:focus {
          top: 6px;
        }
        
        .keyboard-navigation *:focus {
          outline: 2px solid #007cba;
          outline-offset: 2px;
        }
        
        .keyboard-navigation button:focus,
        .keyboard-navigation [role="button"]:focus {
          outline: 2px solid #007cba;
          outline-offset: 2px;
        }
      `;
      
      document.head.appendChild(style);
      document.body.insertBefore(skipLinks, document.body.firstChild);
    }
  }

  /**
   * Add ARIA labels to elements
   */
  addAriaLabel(element: HTMLElement, label: string): void {
    element.setAttribute('aria-label', label);
  }

  /**
   * Add ARIA description to elements
   */
  addAriaDescription(element: HTMLElement, description: string): void {
    const descId = `desc-${Math.random().toString(36).substr(2, 9)}`;
    const descElement = document.createElement('div');
    descElement.id = descId;
    descElement.textContent = description;
    descElement.style.display = 'none';
    
    element.appendChild(descElement);
    element.setAttribute('aria-describedby', descId);
  }

  /**
   * Make element focusable
   */
  makeFocusable(element: HTMLElement, role?: string): void {
    element.setAttribute('tabindex', '0');
    if (role) {
      element.setAttribute('role', role);
    }
  }

  /**
   * Remove element from tab order
   */
  removeFromTabOrder(element: HTMLElement): void {
    element.setAttribute('tabindex', '-1');
  }
}

// Export singleton instance
export const accessibilityHelper = AccessibilityHelper.getInstance();

// Auto-initialize
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    accessibilityHelper.initialize();
  });
}