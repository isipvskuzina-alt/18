// ========================================
// 1. ДАННЫЕ
// ========================================

// Стандартные цитаты
const defaultQuotes = [
    { text: 'Жизнь — это то, что с тобой происходит, пока ты строишь планы.', author: 'Джон Леннон' },
    { text: 'Будьте изменением, которое вы хотите видеть в мире.', author: 'Махатма Ганди' },
    { text: 'Не бойтесь, что у вас что-то не получится. Бойтесь, что у вас не получится попробовать.', author: 'Михаил Барышников' },
    { text: 'Будущее принадлежит тем, кто верит в красоту своей мечты.', author: 'Элеонора Рузвельт' },
    { text: 'Сложнее всего начать действовать, все остальное зависит только от упорства.', author: 'Амелия Эрхарт' },
    { text: 'Не смотрите на часы; делайте то, что они делают. Продолжайте двигаться.', author: 'Сэм Левинсон' },
    { text: 'Человек — это то, во что он верит.', author: 'Антон Чехов' },
    { text: 'Только те, кто рискуют зайти слишком далеко, могут узнать, как далеко они могут зайти.', author: 'Томас Стернз Элиот' },
    { text: 'Ваше время ограничено, не тратьте его, живя чужой жизнью.', author: 'Стив Джобс' },
    { text: 'Сделай сегодня то, что другие не хотят, завтра будешь жить так, как другие не могут.', author: 'Джаред Лето' }
];

let quotes = [];
let currentQuoteIndex = -1;

// ========================================
// 2. DOM ЭЛЕМЕНТЫ
// ========================================

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const randomBtn = document.getElementById('randomBtn');

const quoteInput = document.getElementById('quoteInput');
const authorInput = document.getElementById('authorInput');
const addBtn = document.getElementById('addBtn');

const quotesContainer = document.getElementById('quotesContainer');
const quoteCount = document.getElementById('quoteCount');

// ========================================
// 3. LOCALSTORAGE
// ========================================

function loadQuotes() {
    try {
        const saved = localStorage.getItem('userQuotes');
        if (saved) {
            const userQuotes = JSON.parse(saved);
            // Объединяем стандартные и пользовательские
            quotes = [...defaultQuotes, ...userQuotes];
            return true;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
    return false;
}

function saveUserQuotes() {
    try {
        // Сохраняем только пользовательские цитаты (не стандартные)
        const userQuotes = quotes.slice(defaultQuotes.length);
        localStorage.setItem('userQuotes', JSON.stringify(userQuotes));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

// ========================================
// 4. ФУНКЦИИ ДЛЯ ЦИТАТ
// ========================================

function getRandomQuote() {
    if (quotes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote(quote) {
    if (!quote) {
        quoteText.textContent = 'Нет доступных цитат';
        quoteAuthor.textContent = '—';
        return;
    }
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
}

function showRandomQuote() {
    const quote = getRandomQuote();
    if (quote) {
        displayQuote(quote);
        // Находим индекс для подсветки
        currentQuoteIndex = quotes.indexOf(quote);
    }
}

// ========================================
// 5. РЕНДЕРИНГ СПИСКА (GRID)
// ========================================

function renderQuotes() {
    if (quotes.length === 0) {
        quotesContainer.innerHTML = `
            <div class="empty">
                <span class="emoji">📭</span>
                <p>Нет цитат</p>
                <p style="font-size:13px;color:#dfe6e9;">Добавьте свою первую цитату!</p>
            </div>
        `;
        quoteCount.textContent = '0';
        return;
    }

    quoteCount.textContent = quotes.length;

    // Показываем все цитаты (от новых к старым)
    // Для этого переворачиваем массив для отображения
    const reversed = [...quotes].reverse();

    quotesContainer.innerHTML = reversed.map((quote, index) => {
        // Вычисляем реальный индекс в оригинальном массиве
        const realIndex = quotes.length - 1 - index;
        
        // Проверяем, является ли цитата пользовательской
        const isUserQuote = realIndex >= defaultQuotes.length;
        
        return `
            <div class="quote-card">
                <div class="card-text">"${escapeHtml(quote.text)}"</div>
                <div class="card-author">— ${escapeHtml(quote.author)}</div>
                <div class="card-actions">
                    <button class="use-btn" onclick="useQuote(${realIndex})">📋 Использовать</button>
                    ${isUserQuote ? `<button class="btn-danger" onclick="deleteQuote(${realIndex})">🗑️</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// 6. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function clearForm() {
    quoteInput.value = '';
    authorInput.value = '';
    quoteInput.focus();
}

// ========================================
// 7. ДОБАВЛЕНИЕ ЦИТАТЫ
// ========================================

function addQuote() {
    const text = quoteInput.value.trim();
    const author = authorInput.value.trim() || 'Неизвестный автор';

    if (!text) {
        alert('Введите текст цитаты!');
        quoteInput.focus();
        return;
    }

    // Проверка на дубликат
    const isDuplicate = quotes.some(q => 
        q.text.toLowerCase() === text.toLowerCase() && 
        q.author.toLowerCase() === author.toLowerCase()
    );

    if (isDuplicate) {
        alert('Такая цитата уже существует!');
        return;
    }

    // Добавляем цитату
    const newQuote = { text, author };
    quotes.push(newQuote);
    saveUserQuotes();
    renderQuotes();
    clearForm();

    console.log(`✅ Добавлена цитата: "${text}" — ${author}`);
}

// ========================================
// 8. ИСПОЛЬЗОВАНИЕ ЦИТАТЫ
// ========================================

function useQuote(index) {
    const quote = quotes[index];
    if (quote) {
        displayQuote(quote);
        currentQuoteIndex = index;
        // Прокручиваем к верху
        document.querySelector('.quote-display').scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// 9. УДАЛЕНИЕ ЦИТАТЫ
// ========================================

function deleteQuote(index) {
    // Проверяем, что это пользовательская цитата
    if (index < defaultQuotes.length) {
        alert('Нельзя удалить стандартную цитату!');
        return;
    }

    const quote = quotes[index];
    if (!confirm(`Удалить цитату: "${quote.text}"?`)) return;

    quotes.splice(index, 1);
    saveUserQuotes();
    renderQuotes();

    // Если удалили отображаемую цитату, показываем другую
    if (currentQuoteIndex === index) {
        showRandomQuote();
    } else if (currentQuoteIndex > index) {
        currentQuoteIndex--;
    }

    console.log(`🗑️ Удалена цитата: "${quote.text}"`);
}

// ========================================
// 10. ИНИЦИАЛИЗАЦИЯ
// ========================================

function init() {
    console.log('📜 Генератор цитат');

    // Загружаем цитаты
    const hasSaved = loadQuotes();
    if (hasSaved) {
        console.log(`📂 Загружено ${quotes.length} цитат`);
    } else {
        quotes = [...defaultQuotes];
        console.log(`📚 Загружено ${quotes.length} стандартных цитат`);
    }

    // Показываем случайную цитату
    showRandomQuote();
    renderQuotes();

    // Обработчики
    randomBtn.addEventListener('click', showRandomQuote);

    addBtn.addEventListener('click', addQuote);

    quoteInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            addQuote();
        }
    });

    authorInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addQuote();
        }
    });

    console.log('✅ Генератор цитат готов!');
}

// ========================================
// 11. ЗАПУСК
// ========================================

document.addEventListener('DOMContentLoaded', init);