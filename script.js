document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // --- Function to Create a Single Project Card  ---
    function createProjectCard(project) {
        const card = document.createElement('a');
        card.className = 'project-card fade-in';
        card.href = project.github_url;
        card.target = '_blank';
        card.dataset.category = project.category;

        // Create elements safely 
        const imageDiv = document.createElement('div');
        imageDiv.className = 'project-image';
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.alt_text;
        imageDiv.appendChild(img);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'project-content';

        const title = document.createElement('h3');
        title.textContent = project.title;

        const description = document.createElement('p');
        description.textContent = project.description;

        const techDiv = document.createElement('div');
        techDiv.className = 'project-tech';
        project.technologies.forEach(tagText => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tagText;
            techDiv.appendChild(tag);
        });

        contentDiv.appendChild(title);
        contentDiv.appendChild(description);
        contentDiv.appendChild(techDiv);

        card.appendChild(imageDiv);
        card.appendChild(contentDiv);

        return card;
    }
    
    // --- Fetch project data and display all projects initially ---
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const card = createProjectCard(project);
                projectsGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));

    // --- Add click event listeners to filter buttons ---
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // To Prevent page jump
            
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