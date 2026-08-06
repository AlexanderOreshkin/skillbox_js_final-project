
const accOpenBtn = document.querySelectorAll('.accordion__btn')

export function openAccordionMenu() {

    accOpenBtn.forEach(button => {
        button.addEventListener('click', function () {
            const isActive = this.classList.contains('accordion__btn--active');

            closeAllSections();

            if (!isActive) {
                this.classList.add('accordion__btn--active');
            }
        });
    });
}

function closeAllSections() {
    accOpenBtn.forEach(button => {
        button.classList.remove('accordion__btn--active');
    });
}