 document.addEventListener('DOMContentLoaded', () => {
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        backToTopButton.style.display = 
            window.pageYOffset > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Recipe Print Functionality
    function setupRecipePrinting() {
        const recipes = document.querySelectorAll('#recipes article');
        recipes.forEach(recipe => {
            const printButton = document.createElement('button');
            printButton.textContent = 'Друкувати рецепт';
            printButton.classList.add('print-button');
            printButton.addEventListener('click', () => {
                const printContents = recipe.innerHTML;
                const originalContents = document.body.innerHTML;
                
                document.body.innerHTML = `
                    <div class="print-recipe">${printContents}</div>
                `;
                
                window.print();
                
                document.body.innerHTML = originalContents;
                setupRecipePrinting();
            });
            
            recipe.appendChild(printButton);
        });
    }

    setupRecipePrinting();

    // Recipe Ingredient Scaler
    function setupIngredientScaler() {
        const recipes = document.querySelectorAll('#recipes article');
        recipes.forEach(recipe => {
            const scalerContainer = document.createElement('div');
            scalerContainer.classList.add('ingredient-scaler');
            
            const scalerLabel = document.createElement('label');
            scalerLabel.textContent = 'Кількість порцій: ';
            
            const scalerInput = document.createElement('input');
            scalerInput.type = 'number';
            scalerInput.value = 1;
            scalerInput.min = 1;
            
            scalerInput.addEventListener('change', () => {
                const ingredients = recipe.querySelectorAll('ul li');
                ingredients.forEach(ingredient => {
                    const originalText = ingredient.getAttribute('data-original') || ingredient.textContent;
                    ingredient.setAttribute('data-original', originalText);
                    
                    const match = originalText.match(/(\d+(?:\.\d+)?)\s*([а-яА-Я\w]+)/);
                    if (match) {
                        const quantity = parseFloat(match[1]);
                        const unit = match[2];
                        const newQuantity = (quantity * scalerInput.value).toFixed(1);
                        ingredient.textContent = `${newQuantity} ${unit}`;
                    }
                });
            });
            
            scalerContainer.appendChild(scalerLabel);
            scalerContainer.appendChild(scalerInput);
            recipe.insertBefore(scalerContainer, recipe.querySelector('ul'));
        });
    }

    setupIngredientScaler();
});
