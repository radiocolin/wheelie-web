// Header Component
function createHeader() {
    return `
        <header class="header">
            <nav class="nav">
                <div class="nav-container">
                    <div class="logo">
                        <a href="index.html">
                            <img src="Wheelie wordmark.svg" alt="Wheelie" class="logo-img">
                        </a>
                    </div>
                    <div class="nav-links">
                        <a href="index.html#features">Features</a>
                        <a href="index.html#download">Download</a>
                        <a href="index.html#footer">About</a>
                        <a href="https://instagram.com/wheelie.app" target="_blank" rel="noopener noreferrer" class="nav-instagram">📸 Instagram</a>
                    </div>
                </div>
            </nav>
        </header>
    `;
}

// Footer Component
function createFooter() {
    return `
        <footer id="footer" class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-logo">
                        <img src="Wheelie wordmark-K.svg" alt="Wheelie" class="footer-logo-img">
                    </div>
                    <p class="footer-text">Making every bike ride an adventure worth tracking.</p>
                    <div class="footer-links">
                        <a href="privacy.html">Privacy Policy</a>
                        <a href="terms.html">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// Function to include components in the page
function includeComponents() {
    // Insert header at the beginning of body
    const body = document.body;
    const firstChild = body.firstChild;
    body.insertBefore(document.createRange().createContextualFragment(createHeader()), firstChild);
    
    // Insert footer before the closing body tag
    body.insertBefore(document.createRange().createContextualFragment(createFooter()), body.lastChild);
}

// Auto-include components when DOM is loaded
document.addEventListener('DOMContentLoaded', includeComponents);
