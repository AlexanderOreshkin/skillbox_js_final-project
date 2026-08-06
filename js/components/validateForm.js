export function initFormValidation() {
    const form = document.querySelector('.questions__form');

    const validator = new JustValidate(form, {
        validateBeforeSubmitting: true,
        lockForm: true,
        focusInvalidField: true,
    });

    validator
        .addField('#name', [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста, укажите ваше имя',
            },
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Имя должно содержать минимум 3 символа',
            },
            {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Имя не должно превышать 20 символов',
            },
            {
                rule: 'customRegexp',
                value: /^[а-яА-ЯёЁa-zA-Z\s\-]+$/,
                errorMessage: 'Имя может содержать только буквы, пробелы и дефисы',
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста, укажите ваш email',
            },
            {
                rule: 'email',
                errorMessage: 'Введите корректный email адрес (например: name@example.com)',
            },
        ])
        .addField('#agree', [
            {
                rule: 'required',
                errorMessage: 'Вы должны согласиться с политикой конфиденциальности',
            },
        ])
    .onSuccess(async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            agree: formData.get('pendant') === 'on'
        };

        const submitBtn = form.querySelector('.questions__btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        try {
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Успешный ответ от сервера:', result);

            showModal(
                'Ваша заявка успешно отправлена! Наши менеджеры свяжутся с вами в ближайшее время.',
                true
            );

            form.reset();

        } catch (error) {
            console.error('Ошибка отправки формы:', error);

            showModal(
                'Извините, произошла ошибка при отправке формы. Пожалуйста, проверьте подключение к интернету и попробуйте снова, или свяжитесь с нами по телефону.',
                false
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    return validator;
}

function showModal(message, isSuccess = true) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__overlay"></div>
        <div class="modal__content ${isSuccess ? 'modal__content--success' : 'modal__content--error'}">
            <button class="modal__close" aria-label="Закрыть">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="modal__icon">
                ${isSuccess ? 
                    '<svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' :
                    '<svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/></svg>'
                }
            </div>
            <h3 class="modal__title">${isSuccess ? 'Успешно!' : 'Ошибка'}</h3>
            <p class="modal__message">${message}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal__close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    const overlay = modal.querySelector('.modal__overlay');
    overlay.addEventListener('click', () => {
        modal.remove();
    });
    
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// Функция для добавления стилей модального окна (если их нет в CSS)
// function addModalStyles() {
//     if (document.querySelector('#modal-styles')) return;
    
//     const styles = document.createElement('style');
//     styles.id = 'modal-styles';
//     styles.textContent = `
//         .modal {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             z-index: 1000;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             animation: fadeIn 0.3s ease;
//         }
        
//         .modal__overlay {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0, 0, 0, 0.5);
//         }
        
//         .modal__content {
//             position: relative;
//             background: white;
//             border-radius: 16px;
//             padding: 32px;
//             max-width: 400px;
//             width: 90%;
//             text-align: center;
//             z-index: 1001;
//             animation: slideUp 0.3s ease;
//             box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
//         }
        
//         .modal__close {
//             position: absolute;
//             top: 16px;
//             right: 16px;
//             background: none;
//             border: none;
//             cursor: pointer;
//             padding: 4px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #666;
//             transition: color 0.2s;
//         }
        
//         .modal__close:hover {
//             color: #000;
//         }
        
//         .modal__icon {
//             margin-bottom: 20px;
//             color: #4CAF50;
//         }
        
//         .modal__content--error .modal__icon {
//             color: #f44336;
//         }
        
//         .modal__title {
//             font-size: 24px;
//             font-weight: 600;
//             margin-bottom: 12px;
//             color: #333;
//         }
        
//         .modal__message {
//             font-size: 16px;
//             color: #666;
//             line-height: 1.5;
//         }
        
//         @keyframes fadeIn {
//             from {
//                 opacity: 0;
//             }
//             to {
//                 opacity: 1;
//             }
//         }
        
//         @keyframes slideUp {
//             from {
//                 transform: translateY(30px);
//                 opacity: 0;
//             }
//             to {
//                 transform: translateY(0);
//                 opacity: 1;
//             }
//         }
//     `;
//     document.head.appendChild(styles);
// }
