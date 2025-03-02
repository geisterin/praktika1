document.addEventListener('DOMContentLoaded', function() {
    // Создаем навигационную панель
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    
    // Определяем текущую страницу
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // HTML для навигации
    sidebar.innerHTML = `
        <ul class="nav-list">
            <li ${currentPage === 'index.html' ? 'class="active"' : ''}>
                <a href="index.html">
                    <span class="icon">🏠</span>
                    <span class="title">Главная</span>
                </a>
            </li>
            <li ${currentPage === 'roadmap.html' ? 'class="active"' : ''}>
                <a href="roadmap.html">
                    <span class="icon">🗺️</span>
                    <span class="title">Путь</span>
                </a>
            </li>
            <li ${currentPage === 'news.html' ? 'class="active"' : ''}>
                <a href="news.html">
                    <span class="icon">📰</span>
                    <span class="title">Новости</span>
                </a>
            </li>
            <li ${currentPage === 'sport.html' ? 'class="active"' : ''}>
                <a href="sport.html">
                    <span class="icon">💪</span>
                    <span class="title">Тренировки</span>
                </a>
            </li>
        </ul>
    `;
    
    // Вставляем навигацию в начало body
    document.body.insertBefore(sidebar, document.body.firstChild);
}); 