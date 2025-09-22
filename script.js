document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function createProjectCard(project) {
        const card = document.createElement('a');
        card.className = 'project-card';
        card.href = project.github_url;
        card.target = '_blank';
        card.dataset.category = project.category;
        const tagsHTML = project.technologies.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
        card.innerHTML = `
            <div class="project-image"><img src="${project.image}" alt="${project.alt_text}"></div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">${tagsHTML}</div>
            </div>`;
        return card;
    }
    
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const card = createProjectCard(project);
                projectsGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

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
