// Privacy Policy Generator
// Automatically converts markdown to HTML for the privacy policy page using marked library

class PrivacyPolicyGenerator {
    constructor() {
        this.markdownContent = '';
        this.htmlContent = '';
    }

    // Fetch the markdown content
    async loadMarkdown() {
        try {
            const response = await fetch('privacy_policy.md');
            if (!response.ok) {
                throw new Error(`Failed to load markdown: ${response.status}`);
            }
            this.markdownContent = await response.text();
            return true;
        } catch (error) {
            console.error('Error loading privacy policy markdown:', error);
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

        // Add special styling for the "Last Updated" section
        html = html.replace(
            /<p><strong>Last Updated:<\/strong> (.*?)<\/p>/,
            '<div class="last-updated"><strong>Last Updated:</strong> $1</div>'
        );

        // Add special styling for contact information
        html = html.replace(
            /<h2>Contact Us<\/h2>\s*<p>(.*?)<\/p>\s*<p><strong>Email:<\/strong> (.*?)<br>\s*<strong>Website:<\/strong> (.*?)<\/p>/s,
            '<div class="contact-info"><h3>Contact Us</h3><p>$1</p><p><strong>Email:</strong> $2<br><strong>Website:</strong> $3</p></div>'
        );

        // Add horizontal rule before the final note
        html = html.replace(
            /<p><em>This Privacy Policy is effective as of the date listed above and applies to all users of the Wheelie app.<\/em><\/p>/,
            '<hr style="margin: 3rem 0; border: none; border-top: 1px solid #eee;">\n<p><em>This Privacy Policy is effective as of the date listed above and applies to all users of the Wheelie app.</em></p>'
        );

        this.htmlContent = html;
        return true;
    }

    // Render the HTML content
    render() {
        const container = document.querySelector('.privacy-content');
        if (!container) {
            console.error('Privacy content container not found');
            return false;
        }

        // Keep the back link and title, replace the rest
        const backLink = container.querySelector('.back-link');
        const title = container.querySelector('h1');
        
        // Clear the container
        container.innerHTML = '';
        
        // Add back the back link and title
        if (backLink) {
            container.appendChild(backLink);
        }
        if (title) {
            container.appendChild(title);
        }

        // Add the generated content
        container.insertAdjacentHTML('beforeend', this.htmlContent);
        
        return true;
    }

    // Main function to generate the privacy policy
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
    const generator = new PrivacyPolicyGenerator();
    generator.generate().then(success => {
        if (!success) {
            console.error('Failed to generate privacy policy');
        }
    });
});
