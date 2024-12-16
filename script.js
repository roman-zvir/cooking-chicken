document.addEventListener('DOMContentLoaded', () => {
    // Back to Top Button (previous implementation)
    const backToTopButton = document.getElementById('back-to-top');
    
    const toggleBackToTopVisibility = () => {
        backToTopButton.style.display = 
            window.pageYOffset > 300 ? 'block' : 'none';
    };

    window.addEventListener('scroll', toggleBackToTopVisibility);

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Improved Recipe Printing with Visual Feedback
    const setupRecipePrinting = () => {
        const recipeSections = document.querySelectorAll('#recipes section');
        
        recipeSections.forEach(recipe => {
            const printButton = document.createElement('button');
            printButton.textContent = 'Друкувати рецепт';
            printButton.classList.add('print-button');
            
            printButton.addEventListener('click', () => {
                // Temporary visual feedback
                printButton.classList.add('printing');
                printButton.textContent = 'Друк...';
                
                try {
                    const printWindow = window.open('', '_blank');
                    printWindow.document.write(`
                        <html>
                            <head>
                                <title>Друк рецепту</title>
                                <style>
                                    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; }
                                    img { max-width: 100%; height: auto; }
                                    h2 { color: #2c3e50; border-bottom: 2px solid #e67e22; }
                                </style>
                            </head>
                            <body>
                                ${recipe.innerHTML}
                            </body>
                        </html>
                    `);
                    printWindow.document.close();
                    printWindow.print();
                    
                    // Reset button after printing
                    setTimeout(() => {
                        printButton.classList.remove('printing');
                        printButton.textContent = 'Друкувати рецепт';
                    }, 1000);
                } catch (error) {
                    console.error('Помилка друку:', error);
                    printButton.textContent = 'Помилка друку';
                    printButton.style.backgroundColor = 'red';
                    printButton.style.color = 'white';
                }
            });
            
            recipe.appendChild(printButton);
        });
    };

    // Improved Ingredient Scaling with Enhanced Validation
    const setupIngredientScaler = () => {
        const recipeSections = document.querySelectorAll('#recipes section');
        
        recipeSections.forEach(recipe => {
            const scalerContainer = document.createElement('div');
            scalerContainer.classList.add('ingredient-scaler');
            
            const scalerLabel = document.createElement('label');
            scalerLabel.textContent = 'Кількість порцій: ';
            
            const scalerInput = document.createElement('input');
            scalerInput.type = 'number';
            scalerInput.value = 1;
            scalerInput.min = 1;
            scalerInput.max = 10;
            scalerInput.setAttribute('aria-label', 'Кількість порцій');
            
            scalerInput.addEventListener('change', () => {
                const ingredients = recipe.querySelectorAll('ul li');
                
                ingredients.forEach(ingredient => {
                    const originalText = ingredient.getAttribute('data-original') || ingredient.textContent;
                    ingredient.setAttribute('data-original', originalText);
                    
                    const match = originalText.match(/(\d+(?:\.\d+)?)\s*([а-яА-Я\w]+)/);
                    if (match) {
                        const quantity = parseFloat(match[1]);
                        const unit = match[2];
                        
                        // Safety checks
                        const scaleFactor = Math.min(Math.max(scalerInput.value, 1), 10);
                        const newQuantity = (quantity * scaleFactor).toFixed(1);
                        
                        ingredient.textContent = `${newQuantity} ${unit}`;
                    }
                });
            });
            
            scalerContainer.appendChild(scalerLabel);
            scalerContainer.appendChild(scalerInput);
            recipe.insertBefore(scalerContainer, recipe.querySelector('ul'));
        });
    };

    setupRecipePrinting();
    setupIngredientScaler();
});
