// Press Page Generator
// Automatically converts markdown to HTML for the press page using marked library

class PressPageGenerator {
    constructor() {
        this.markdownContent = '';
        this.htmlContent = '';
        this.pressImages = [
            'wheelie-icon.png',
            'wheelie-wordmark.png',
            'wheelie-screenshot-1.png',
            'wheelie-screenshot-2.png',
            'wheelie-screenshot-3.png',
            'wheelie-screenshot-4.png',
            'wheelie-screenshot-5.png',
            'wheelie-screenshot-6.png',
            'wheelie-screenshot-7.png',
            'wheelie-export.png'
        ];
    }

    // Fetch the markdown content
    async loadMarkdown() {
        try {
            const response = await fetch('press.md');
            if (!response.ok) {
                throw new Error(`Failed to load markdown: ${response.status}`);
            }
            this.markdownContent = await response.text();
            return true;
        } catch (error) {
            console.error('Error loading press markdown:', error);
            return false;
        }
    }

    // Convert markdown to HTML using marked library
    convertMarkdownToHtml() {
        if (!this.markdownContent) {
            return false;
        }

        // Configure marked options
        marked.setOptions({
            breaks: true, // Convert line breaks to <br>
            gfm: true,    // GitHub Flavored Markdown
            headerIds: false // Don't add IDs to headers
        });

        // Convert markdown to HTML
        let html = marked.parse(this.markdownContent);

        // Add special styling for the quote
        html = html.replace(
            /<blockquote>\s*<p>(.*?)<\/p>\s*<p>— (.*?)<\/p>\s*<\/blockquote>/s,
            '<blockquote><p>$1</p><p>— $2</p></blockquote>'
        );

        // Add press images section after the main content
        const imagesSection = this.createImagesSection();
        html += imagesSection;

        // Add special styling for contact information
        html = html.replace(
            /<h3>Media Contact<\/h3>\s*<p><strong>(.*?)<\/strong><br>\s*<strong>Email:<\/strong> (.*?)<br>\s*<strong>Website:<\/strong> (.*?)<\/p>/s,
            '<div class="contact-info"><h3>Media Contact</h3><p><strong>$1</strong><br><strong>Email:</strong> $2<br><strong>Website:</strong> $3</p></div>'
        );

        this.htmlContent = html;
        return true;
    }

    // Create the press images section
    createImagesSection() {
        const imagesHtml = this.pressImages.map(imageName => {
            const imagePath = `press-images/${imageName}`;
            const displayName = imageName.replace(/\.(png|jpg|jpeg)$/i, '').replace(/-/g, ' ');
            return `
                <div class="image-item">
                    <img src="${imagePath}" alt="${displayName}" loading="lazy">
                    <a href="${imagePath}" download="${imageName}">Download ${imageName}</a>
                </div>
            `;
        }).join('');

        return `
            <div class="press-images">
                <h3>Press Images</h3>
                <p>High-resolution images for media use. Click to download.</p>
                <div class="image-grid">
                    ${imagesHtml}
                </div>
            </div>
        `;
    }

    // Render the HTML content
    render() {
        const container = document.querySelector('.press-content');
        if (!container) {
            console.error('Press content container not found');
            return false;
        }

        // Keep the back link, replace the rest
        const backLink = container.querySelector('.back-link');
        
        // Clear the container
        container.innerHTML = '';
        
        // Add back the back link
        if (backLink) {
            container.appendChild(backLink);
        }

        // Add the generated content
        container.insertAdjacentHTML('beforeend', this.htmlContent);
        
        return true;
    }

    // Main function to generate the press page
    async generate() {
        const loaded = await this.loadMarkdown();
        if (!loaded) {
            return false;
        }

        const converted = this.convertMarkdownToHtml();
        if (!converted) {
            return false;
        }

        return this.render();
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const generator = new PressPageGenerator();
    generator.generate().then(success => {
        if (!success) {
            console.error('Failed to generate press page');
        }
    });
});
