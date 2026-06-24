# Краткий ответ на задания

---

## 1️⃣ GRID-СЕТКА: СОЗДАНИЕ И УПРАВЛЕНИЕ

### 📌 **Создание Grid**

```css
.container {
    display: grid;                  /* Включаем сетку */
    grid-template-columns: ...;     /* Колонки */
    grid-template-rows: ...;        /* Строки */
    gap: 20px;                      /* Отступы */
}
```

---

### 📌 **Управление колонками**

```css
/* 1. Фиксированное количество */
.container {
    grid-template-columns: repeat(3, 1fr);
    /* 3 равные колонки */
}

/* 2. Разные размеры */
.container {
    grid-template-columns: 200px 1fr 300px;
    /* 200px | остальное | 300px */
}

/* 3. Автоматическое заполнение (рекомендуется) */
.container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* Автоматически подстраивается */
}

/* 4. Конкретные размеры */
.container {
    grid-template-columns: 100px 200px 150px;
}

/* 5. Доли (fr) */
.container {
    grid-template-columns: 1fr 2fr 1fr;
    /* 1 часть : 2 части : 1 часть */
}
```

---

### 📌 **Управление строками**

```css
/* 1. Фиксированная высота */
.container {
    grid-template-rows: 100px 200px auto;
}

/* 2. Автоматические строки */
.container {
    grid-auto-rows: minmax(120px, auto);
    /* Минимум 120px, может растягиваться */
}
```

---

### 📌 **Расположение элементов**

```css
/* Элемент занимает несколько колонок */
.item {
    grid-column: 1 / 3;     /* С 1 по 3 колонку */
    grid-column: span 2;    /* Занимает 2 колонки */
}

/* Элемент занимает несколько строк */
.item {
    grid-row: 1 / 3;        /* С 1 по 3 строку */
    grid-row: span 2;       /* Занимает 2 строки */
}

/* Расположение в конкретном месте */
.item {
    grid-column: 2 / 4;     /* Колонки 2-3 */
    grid-row: 1 / 2;        /* Строка 1 */
}
```

---

### 📌 **Выравнивание**

```css
.container {
    /* Выравнивание элементов по горизонтали */
    justify-items: start;   /* start, center, end, stretch */
    
    /* Выравнивание элементов по вертикали */
    align-items: start;     /* start, center, end, stretch */
    
    /* Выравнивание всей сетки */
    justify-content: center; /* start, center, end, space-between */
    align-content: start;    /* start, center, end, space-between */
}
```

---

### 📌 **Пример в проекте**

```css
.quotes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}
```

**Что делает:**
- Автоматически создаёт колонки
- Каждая колонка минимум 280px
- Растягивается на доступное место
- Отступы 20px

---

## 2️⃣ ОБРАБОТКА СОБЫТИЙ В REACT

### 📌 **Базовый синтаксис**

```jsx
// 1. Базовый обработчик
function Button() {
    function handleClick() {
        console.log('Клик!');
    }
    
    return <button onClick={handleClick}>Нажми</button>;
}

// 2. Стрелочная функция
function Button() {
    return (
        <button onClick={() => console.log('Клик!')}>
            Нажми
        </button>
    );
}
```

---

### 📌 **С передачей параметров**

```jsx
function Button() {
    const handleClick = (name) => {
        console.log(`Привет, ${name}!`);
    };
    
    return (
        <button onClick={() => handleClick('Иван')}>
            Нажми
        </button>
    );
}
```

---

### 📌 **Разные типы событий**

```jsx
// 1. Клик
<button onClick={handleClick}>Клик</button>

// 2. Изменение input
<input onChange={handleChange} />

// 3. Отправка формы
<form onSubmit={handleSubmit}>...</form>

// 4. Наведение мыши
<div onMouseEnter={handleHover}>...</div>

// 5. Движение мыши
<div onMouseMove={handleMove}>...</div>

// 6. Клавиатура
<input onKeyDown={handleKey} />
<input onKeyPress={handleKeyPress} />
<input onKeyUp={handleKeyUp} />
```

---

### 📌 **Объект события (event)**

```jsx
// Доступ к событию
const handleClick = (e) => {
    e.preventDefault();          // Отменить действие по умолчанию
    console.log(e.target);        // Элемент, вызвавший событие
    console.log(e.type);          // Тип события ('click')
};

// Работа с input
const handleChange = (e) => {
    const value = e.target.value; // Значение поля
    const name = e.target.name;   // Имя поля
    const checked = e.target.checked; // Для чекбоксов
};

// Клавиатура
const handleKey = (e) => {
    console.log(e.key);           // Нажатая клавиша
    console.log(e.code);          // Код клавиши
    if (e.key === 'Enter') {
        // Нажат Enter
    }
};
```

---

### 📌 **Отличие React от HTML**

| HTML | React |
|------|-------|
| `onclick="handleClick()"` | `onClick={handleClick}` |
| `onchange="handleChange()"` | `onChange={handleChange}` |
| `onsubmit="handleSubmit()"` | `onSubmit={handleSubmit}` |
| `onmouseover="handleHover()"` | `onMouseOver={handleHover}` |

---

### 📌 **Пример компонента**

```jsx
function QuoteApp() {
    const [quote, setQuote] = useState(null);
    
    // Обработчик клика
    const handleRandom = () => {
        const random = getRandomQuote();
        setQuote(random);
    };
    
    // Обработчик формы
    const handleSubmit = (e) => {
        e.preventDefault();
        addQuote();
    };
    
    // Обработчик input
    const handleChange = (e) => {
        setText(e.target.value);
    };
    
    return (
        <div>
            <button onClick={handleRandom}>
                🎲 Случайная цитата
            </button>
            
            <form onSubmit={handleSubmit}>
                <input 
                    value={text} 
                    onChange={handleChange} 
                    placeholder="Введите цитату"
                />
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
}
```

---

### 📌 **Сравнение JSX и HTML**

```jsx
// HTML
<button onclick="alert('Hi')">Клик</button>
<input onchange="handleChange()">
<form onsubmit="handleSubmit()">

// JSX (React)
<button onClick={() => alert('Hi')}>Клик</button>
<input onChange={handleChange}>
<form onSubmit={handleSubmit}>
```

---

## 🎯 Шпаргалка

### Grid

| Свойство | Назначение |
|----------|------------|
| `display: grid` | Включить сетку |
| `grid-template-columns` | Колонки |
| `grid-template-rows` | Строки |
| `gap` | Отступы |
| `grid-column` | Позиция по колонкам |
| `grid-row` | Позиция по строкам |

### React события

| Событие | HTML | React |
|---------|------|-------|
| Клик | `onclick` | `onClick` |
| Изменение | `onchange` | `onChange` |
| Отправка | `onsubmit` | `onSubmit` |
| Наведение | `onmouseover` | `onMouseOver` |