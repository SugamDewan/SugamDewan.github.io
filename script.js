document.addEventListener('DOMContentLoaded', () => {
    // --- Simplified Project Loading Logic ---
    const projectsGrid = document.getElementById('projects-grid');

    if (projectsGrid) {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                console.log("Successfully fetched projects:", projects); // Debugging line
                projects.forEach(project => {
                    const card = createProjectCard(project);
                    projectsGrid.appendChild(card);
                });
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
            });
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        const tagsHTML = project.technologies.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.alt_text}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">${tagsHTML}</div>
                <div class="project-links">
                    <a href="${project.github_url}" class="project-link" target="_blank"><i class="fab fa-github"></i> Code</a>
                </div>
            </div>`;
        return card;
    }

    // --- Hamburger menu logic ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }
});