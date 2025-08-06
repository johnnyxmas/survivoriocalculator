// Remove payment and banner elements after page load
document.addEventListener('DOMContentLoaded', function() {
    // Function to remove elements containing specific text
    function removeElementsWithText(searchText) {
        const xpath = `//*[contains(text(), '${searchText}')]`;
        const elements = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
        for (let i = 0; i < elements.snapshotLength; i++) {
            const element = elements.snapshotItem(i);
            // Remove the parent container to ensure complete removal
            if (element.parentElement) {
                element.parentElement.style.display = 'none';
            }
            element.style.display = 'none';
        }
    }
    
    // Function to remove elements by class or id patterns
    function removeElementsByPattern(pattern) {
        // Check class names
        document.querySelectorAll(`[class*="${pattern}"]`).forEach(el => {
            el.style.display = 'none';
        });
        
        // Check IDs
        document.querySelectorAll(`[id*="${pattern}"]`).forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Initial removal
    function removeBanners() {
        // Remove by text content
        removeElementsWithText('payment method');
        removeElementsWithText('basic functions are free');
        removeElementsWithText('Payment Method');
        removeElementsWithText('Basic Functions Are Free');
        
        // Remove by class/id patterns
        removeElementsByPattern('banner');
        removeElementsByPattern('payment');
        removeElementsByPattern('notice');
        removeElementsByPattern('announcement');
        removeElementsByPattern('alert');
        
        // Remove Quasar specific banners
        document.querySelectorAll('.q-banner, .q-notification, .q-alert').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Run immediately
    removeBanners();
    
    // Run again after a delay to catch dynamically loaded content
    setTimeout(removeBanners, 1000);
    setTimeout(removeBanners, 3000);
    
    // Watch for new elements being added
    const observer = new MutationObserver(function(mutations) {
        removeBanners();
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Create and add theme toggle button
    function createThemeToggle() {
        // Check if button already exists
        if (document.querySelector('.theme-toggle')) return;
        
        // Create button element
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle dark/light theme');
        
        // SVG icons for sun and moon
        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.591a.75.75 0 101.06 1.06l1.591-1.591zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.591-1.591a.75.75 0 10-1.06 1.06l1.591 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.591a.75.75 0 001.06 1.06l1.591-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.591-1.591a.75.75 0 00-1.06 1.06l1.591 1.591z"/>
        </svg>`;
        
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
        </svg>`;
        
        // Check current theme
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');
        button.innerHTML = currentTheme === 'dark' ? sunIcon : moonIcon;
        
        // Add click handler
        button.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark-theme');
            const newTheme = isDark ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            button.innerHTML = isDark ? sunIcon : moonIcon;
            
            // Update Quasar theme if available
            if (window.Quasar && window.Quasar.Dark) {
                window.Quasar.Dark.set(isDark);
            }
        });
        
        // Add button to page
        document.body.appendChild(button);
    }
    
    // Create theme toggle after a delay to ensure page is loaded
    setTimeout(createThemeToggle, 100);
    
    // Also try to remove navigation elements
    function removeNavigation() {
        // Remove header/navigation elements
        const selectors = [
            '.q-header',
            '.q-toolbar',
            '.q-drawer',
            'header',
            'nav',
            '[class*="navigation"]',
            '[class*="nav-menu"]',
            '[class*="navbar"]',
            '[id*="navigation"]',
            '[id*="nav-menu"]',
            '[id*="navbar"]'
        ];
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.display = 'none';
            });
        });
        
        // Adjust page container padding
        const pageContainer = document.querySelector('.q-page-container');
        if (pageContainer) {
            pageContainer.style.paddingTop = '0';
        }
    }
    
    // Remove navigation
    removeNavigation();
    setTimeout(removeNavigation, 1000);
    setTimeout(removeNavigation, 3000);
});