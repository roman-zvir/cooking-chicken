 type="application/ld+json">

    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Рецепти Курки",
        "url": "https://www.yourwebsite.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.yourwebsite.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }



        // Back to Top Button JavaScript
        const backToTopButton = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Simple Recipe Search (Client-side)
        function searchRecipes() {
            const searchInput = document.getElementById('recipe-search');
            const recipes = document.querySelectorAll('#recipes section');
            const searchTerm = searchInput.value.toLowerCase();

            recipes.forEach(recipe => {
                const title = recipe.querySelector('h2').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    recipe.style.display = 'block';
                } else {
                    recipe.style.display = 'none';
                }
            });
        }
