document.addEventListener('DOMContentLoaded', () => {
    fetch('resume.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            populateBusinessCard(data);
        })
        .catch(error => {
            console.error('Error fetching resume data:', error);
            const card = document.querySelector('.business-card');
            card.innerHTML = `<p>Error loading profile. Please try again.</p>`;
        });
});

function populateBusinessCard(data) {
    const card = document.querySelector('.business-card');
    const info = data.personalInfo;

    // Get current job title (first one in the experience list)
    const currentTitle = data.experience.length > 0 ? data.experience[0].title : "IT Professional";
    
    // Create a dynamic tagline from skills
    const highlights = [
        "Think",
        "Solve",
        "Innovative",
    ].join(' | ');

    card.innerHTML = `
        <h1 class="card-name">${info.name}</h1>
        <p class="card-title">${currentTitle}</p>
        <p class="card-tagline">${highlights}</p>

        <div class="contact-links">
            <a href="mailto:${info.email}" title="Email"><i class="fas fa-envelope"></i></a>
            <a href="${info.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
            <a href="${info.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
            <a href="${info.website}" target="_blank" title="Website"><i class="fas fa-globe"></i></a>
            <a href="${info.projects}" target="_blank" title="Projects"><i class="fas fa-clipboard"></i></a>
        </div>

        <div class="action-buttons">
            <a href="resume.html" class="btn">View Full Resume</a>
            <a href="resume.html?print=true" class="btn secondary">Printable Version</a>
        </div>
    `;
}