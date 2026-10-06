// The navigation bar and footer every page shares.

const APP_STORE_URL = "https://apps.apple.com/app/wheelie-bike-ride-tracking/id6747010503";

function appStoreBadge() {
    return `
        <a class="badge" href="${APP_STORE_URL}" target="_blank" rel="noopener">
            <picture>
                <source srcset="app-store-badge-white.svg" media="(prefers-color-scheme: dark)">
                <img src="app-store-badge-black.svg" alt="Download on the App Store">
            </picture>
        </a>`;
}

function createHeader() {
    return `
        <header class="nav glass">
            <a class="brand" href="/">
                <img src="Wheelie wordmark.svg" alt="Wheelie" width="77" height="30">
            </a>
            <nav class="nav-links" aria-label="Main">
                <a href="/#features">Features</a>
                <a href="contact.html">Contact</a>
                ${appStoreBadge()}
            </nav>
        </header>`;
}

function createFooter() {
    return `
        <footer class="footer">
            <div class="wrap">
                <a class="maker" href="https://colinsent.me"><img src="assets/colin.webp" alt="Colin Weir, smiling, with pumpkins behind him." width="56" height="56" loading="lazy"><p>Colin Weir is an iOS developer based in Philadelphia.</p></a>
                <span>© ${new Date().getFullYear()} Wheelie</span>
                <nav aria-label="Footer">
                    <a href="privacy.html">Privacy Policy</a>
                    <a href="terms.html">Terms of Use</a>
                    <a href="press.html">Press kit</a>
                    <a href="contact.html">Contact</a>
                    <a href="https://bayouapp.space">Bayou, our Bluesky app</a>
                </nav>
                <p class="fine">Apple, iPhone, Apple Watch, Siri, Apple Health, iCloud, and Live Activities are trademarks of Apple Inc.</p>
            </div>
        </footer>`;
}

function includeComponents() {
    document.body.insertAdjacentHTML("afterbegin", createHeader());
    document.body.insertAdjacentHTML("beforeend", createFooter());
    document.querySelectorAll("[data-app-store-badge]").forEach(slot => {
        slot.outerHTML = appStoreBadge();
    });
}

document.addEventListener("DOMContentLoaded", includeComponents);
