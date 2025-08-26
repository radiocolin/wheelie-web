// Load and render terms of use markdown content
fetch('terms_of_use.md')
    .then(response => response.text())
    .then(markdown => {
        // Configure marked options
        marked.setOptions({
            breaks: true,
            gfm: true
        });
        
        // Convert markdown to HTML
        const html = marked.parse(markdown);
        
        // Insert the HTML into the terms-content div
        document.querySelector('.terms-content').innerHTML = 
            '<a href="index.html" class="back-link">← Back to Wheelie</a>' + html;
    })
    .catch(error => {
        console.error('Error loading terms of use:', error);
        document.querySelector('.terms-content').innerHTML = 
            '<a href="index.html" class="back-link">← Back to Wheelie</a>' +
            '<h1>Terms of Use</h1>' +
            '<p>Error loading terms of use content. Please try again later.</p>';
    });
