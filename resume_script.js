document.addEventListener('DOMContentLoaded', () => {
    fetch('resume.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            populateResume(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // Optionally display an error message on the page
            document.body.innerHTML = '<p>Error loading resume data. Please try again later.</p>';
        });
});

function populateResume(data) {
    // Set document title
    document.title = `CV - ${data.personalInfo.name}`;
    
    // Populate Header
    const header = document.getElementById('resume-header');
    header.innerHTML = `
        <h1>${data.personalInfo.name}</h1>
        <div class="contact-info">
            <span>${data.personalInfo.location} | </span>
            <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a> | 
            <a href="${data.personalInfo.linkedin}" target="_blank">LinkedIn</a>
        </div>
    `;

    // Populate Summary
    document.getElementById('summary-content').textContent = data.summary;

    // Populate Experience
    const experienceSection = document.getElementById('experience-section');
    data.experience.forEach(job => {
        const jobItem = document.createElement('article');
        jobItem.className = 'experience-item';
        
        let descriptionHTML = '<ul>';
        job.description.forEach(point => {
            descriptionHTML += `<li>${point}</li>`;
        });
        descriptionHTML += '</ul>';

        jobItem.innerHTML = `
            <h3>${job.title}</h3>
            <p class="job-meta"><strong>${job.company}</strong> | ${job.location} | ${job.dates}</p>
            ${descriptionHTML}
        `;
        experienceSection.appendChild(jobItem);
    });

    // Populate Skills
    const skillsSection = document.getElementById('skills-section');
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skills-container';
    data.skills.forEach(skillCat => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        let skillsHTML = '';
        skillCat.items.forEach(skill => {
            skillsHTML += `<span class="skill-item">${skill}</span>`;
        });

        categoryDiv.innerHTML = `
            <h3>${skillCat.category}</h3>
            <div class="skill-list">${skillsHTML}</div>
        `;
        skillsContainer.appendChild(categoryDiv);
    });
    skillsSection.appendChild(skillsContainer);


    // Populate Education
    const educationSection = document.getElementById('education-section');
    data.education.forEach(edu => {
        const eduItem = document.createElement('article');
        eduItem.className = 'education-item';
        eduItem.innerHTML = `
            <h3>${edu.university}</h3>
            <p class="education-meta">${edu.location}</p>
            <p>${edu.degree} - Graduated ${edu.graduationDate}</p>
        `;
        educationSection.appendChild(eduItem);
    });
}