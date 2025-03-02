document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".roadmap-btn");
    const roadmapContainer = document.getElementById("roadmap-container");
    const techModal = document.getElementById("techModal");
    const techVideo = document.getElementById("techVideo");
    const overlay = document.getElementById('overlay');

    // Останавливаем видео при закрытии модального окна
    techModal.addEventListener("hidden.bs.modal", function () {
        techVideo.src = "";
    });

    // Функция инициализации карточек
    function initializeTechCards() {
        const techCards = document.querySelectorAll('.tech-card');
        techCards.forEach(card => {
            // Удаляем старые обработчики
            card.replaceWith(card.cloneNode(true));
        });

        // Добавляем новые обработчики для всех карточек
        document.querySelectorAll('.tech-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!card.classList.contains('expanded') && !e.target.classList.contains('close-btn')) {
                    closeAllCards();
                    card.classList.add('expanded');
                    overlay.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });

            // Добавляем обработчик для кнопки закрытия
            const closeBtn = card.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    closeAllCards();
                });
            }
        });
    }

    // Закрытие по клику на оверлей
    overlay.addEventListener('click', closeAllCards);

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllCards();
        }
    });

    function closeAllCards() {
        document.querySelectorAll('.tech-card').forEach(card => card.classList.remove('expanded'));
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    function createBackendCards() {
        const technologies = [
            {
                title: "Python",
                description: "Python - высокоуровневый язык программирования общего назначения. Его философия дизайна подчеркивает читаемость кода. Отлично подходит для начинающих разработчиков.",
                icon: "icons/python.png",
                video: "https://www.youtube.com/embed/rfscVS0vtbw",
                links: [
                    { url: "https://www.python.org/", text: "Официальный сайт Python" },
                    { url: "https://docs.python.org/", text: "Документация Python" }
                ]
            },
            {
                title: "PostgreSQL",
                description: "PostgreSQL - мощная система управления базами данных с открытым исходным кодом. Поддерживает сложные запросы и большие объемы данных.",
                icon: "icons/postgresql.png",
                video: "https://www.youtube.com/embed/qw--VYLpxG4",
                links: [
                    { url: "https://www.postgresql.org/", text: "Официальный сайт PostgreSQL" },
                    { url: "https://www.postgresql.org/docs/", text: "Документация PostgreSQL" }
                ]
            },
            {
                title: "Django",
                description: "Django - высокоуровневый веб-фреймворк на Python. Предоставляет множество готовых компонентов для быстрой разработки.",
                icon: "icons/django.png",
                video: "https://www.youtube.com/embed/F5mRW0jo-U4",
                links: [
                    { url: "https://www.djangoproject.com/", text: "Официальный сайт Django" },
                    { url: "https://docs.djangoproject.com/", text: "Документация Django" }
                ]
            },
            {
                title: "RESTful API",
                description: "REST API - архитектурный стиль для создания веб-сервисов. Основан на простых HTTP-методах и широко используется в современной разработке.",
                icon: "icons/api.png",
                video: "https://www.youtube.com/embed/lsMQRaeKNDk",
                links: [
                    { url: "https://restfulapi.net/", text: "Руководство по REST API" },
                    { url: "https://swagger.io/", text: "Swagger - инструмент для API" }
                ]
            },
            {
                title: "Git & GitHub",
                description: "Git - система контроля версий, GitHub - платформа для хостинга кода. Необходимы для работы в команде и управления проектами.",
                icon: "icons/git.png",
                video: "https://www.youtube.com/embed/RGOj5yH7evk",
                links: [
                    { url: "https://git-scm.com/", text: "Официальный сайт Git" },
                    { url: "https://github.com/", text: "GitHub" }
                ]
            },
            {
                title: "Docker",
                description: "Docker - платформа для работы с контейнерами. Позволяет упаковывать приложения со всеми зависимостями и развертывать их где угодно.",
                icon: "icons/docker.png",
                video: "https://www.youtube.com/embed/fqMOX6JJhGo",
                links: [
                    { url: "https://www.docker.com/", text: "Официальный сайт Docker" },
                    { url: "https://docs.docker.com/", text: "Документация Docker" }
                ]
            }
        ];

        // Создаем контейнер для технологий
        const techGrid = document.createElement('div');
        techGrid.className = 'tech-grid';

        // Создаем основную карточку Backend
        const backendCard = document.createElement('div');
        backendCard.className = 'tech-card main-card';
        backendCard.innerHTML = `
            <button class="close-btn">&times;</button>
            <div class="tech-content">
                <div class="tech-header">
                    <img src="icons/backend.png" alt="Backend" class="tech-icon">
                    <h3 class="tech-title">Backend Development Path</h3>
                </div>
                <div class="tech-description">
                    <p>Путь Backend разработчика начинается с изучения основ программирования. Вот ключевые шаги:</p>
                    <ul>
                        <li>Изучение языка программирования (Python, Java, Go и др.)</li>
                        <li>Освоение пакетного менеджера выбранного языка</li>
                        <li>Изучение основ реляционных баз данных</li>
                        <li>Практика CRUD операций</li>
                        <li>Выбор и изучение веб-фреймворка</li>
                        <li>Создание RESTful API</li>
                        <li>Внедрение аутентификации/авторизации</li>
                        <li>Освоение Git и GitHub</li>
                    </ul>
                    <div style="margin-top: 20px;">
                        <a href="https://roadmap.sh/backend" target="_blank" style="color: #FFD700; text-decoration: underline;">
                            Посмотреть полную интерактивную карту →
                        </a>
                    </div>
                </div>
                <div class="video-section">
                    <h4>Полезные видео:</h4>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/jBzwzrDvZ18" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        `;

        technologies.forEach(tech => {
            const techCard = document.createElement('div');
            techCard.className = 'tech-card';
            techCard.innerHTML = `
                <button class="close-btn">&times;</button>
                <div class="tech-content">
                    <div class="tech-header">
                        <img src="${tech.icon}" alt="${tech.title}" class="tech-icon">
                        <h3 class="tech-title">${tech.title}</h3>
                    </div>
                    <div class="tech-description">
                        <p>${tech.description}</p>
                    </div>
                    <div class="video-section">
                        <h4>Полезные видео:</h4>
                        <div class="video-container">
                            <iframe src="${tech.video}" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="links-section">
                        <h4>Полезные ссылки:</h4>
                        <ul class="links-list">
                            ${tech.links.map(link => `
                                <li><a href="${link.url}" target="_blank">${link.text}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
            techGrid.appendChild(techCard);
        });

        return { mainCard: backendCard, techGrid: techGrid };
    }

    function createFrontendCards() {
        const technologies = [
            {
                title: "HTML",
                description: "HTML (HyperText Markup Language) - основа веб-разработки. Это язык разметки, который определяет структуру и содержание веб-страниц.",
                icon: "icons/html.png",
                video: "https://www.youtube.com/embed/qz0aGYrrlhU",
                links: [
                    { url: "https://developer.mozilla.org/ru/docs/Web/HTML", text: "MDN Web Docs - HTML" },
                    { url: "https://www.w3schools.com/html/", text: "W3Schools HTML Tutorial" }
                ]
            },
            {
                title: "CSS",
                description: "CSS (Cascading Style Sheets) отвечает за визуальное оформление веб-страниц. С его помощью создаются красивые и отзывчивые интерфейсы.",
                icon: "icons/css.png",
                video: "https://www.youtube.com/embed/1PnVor36_40",
                links: [
                    { url: "https://developer.mozilla.org/ru/docs/Web/CSS", text: "MDN Web Docs - CSS" },
                    { url: "https://css-tricks.com/", text: "CSS-Tricks" }
                ]
            },
            {
                title: "JavaScript",
                description: "JavaScript - мощный язык программирования, который делает веб-страницы интерактивными. Это основной инструмент frontend-разработчика.",
                icon: "icons/javascript.png",
                video: "https://www.youtube.com/embed/PkZNo7MFNFg",
                links: [
                    { url: "https://developer.mozilla.org/ru/docs/Web/JavaScript", text: "MDN Web Docs - JavaScript" },
                    { url: "https://javascript.info/", text: "JavaScript.info" }
                ]
            },
            {
                title: "React",
                description: "React - популярная JavaScript библиотека для создания пользовательских интерфейсов. Разработана Facebook, широко используется в современной веб-разработке.",
                icon: "icons/react.png",
                video: "https://www.youtube.com/embed/w7ejDZ8SWv8",
                links: [
                    { url: "https://react.dev/", text: "Официальный сайт React" },
                    { url: "https://react.dev/learn", text: "Документация React" }
                ]
            },
            {
                title: "TypeScript",
                description: "TypeScript - типизированное надмножество JavaScript, добавляющее статическую типизацию. Помогает писать более надёжный и поддерживаемый код.",
                icon: "icons/typescript.png",
                video: "https://www.youtube.com/embed/BwuLxPH8IDs",
                links: [
                    { url: "https://www.typescriptlang.org/", text: "Официальный сайт TypeScript" },
                    { url: "https://www.typescriptlang.org/docs/", text: "Документация TypeScript" }
                ]
            },
            {
                title: "Git & GitHub",
                description: "Git - система контроля версий, GitHub - платформа для хостинга кода. Необходимы для работы в команде и управления проектами.",
                icon: "icons/git.png",
                video: "https://www.youtube.com/embed/RGOj5yH7evk",
                links: [
                    { url: "https://git-scm.com/", text: "Официальный сайт Git" },
                    { url: "https://github.com/", text: "GitHub" }
                ]
            }
        ];

        // Создаем контейнер для технологий
        const techGrid = document.createElement('div');
        techGrid.className = 'tech-grid';

        // Создаем основную карточку Frontend
        const frontendCard = document.createElement('div');
        frontendCard.className = 'tech-card main-card';
        frontendCard.innerHTML = `
            <button class="close-btn">&times;</button>
            <div class="tech-content">
                <div class="tech-header">
                    <img src="icons/frontend.png" alt="Frontend" class="tech-icon">
                    <h3 class="tech-title">Frontend Development Path</h3>
                </div>
                <div class="tech-description">
                    <p>Путь Frontend разработчика начинается с изучения основ веб-технологий. Вот ключевые шаги:</p>
                    <ul>
                        <li>Изучение HTML (структура и семантика)</li>
                        <li>Освоение CSS (стили и адаптивный дизайн)</li>
                        <li>Изучение JavaScript (логика и интерактивность)</li>
                        <li>Работа с DOM и событиями</li>
                        <li>Изучение современного фреймворка (React/Vue/Angular)</li>
                        <li>Освоение инструментов разработки</li>
                        <li>Изучение TypeScript</li>
                        <li>Работа с Git и GitHub</li>
                    </ul>
                    <div style="margin-top: 20px;">
                        <a href="https://roadmap.sh/frontend" target="_blank" style="color: #FFD700; text-decoration: underline;">
                            Посмотреть полную интерактивную карту →
                        </a>
                    </div>
                </div>
                <div class="video-section">
                    <h4>Полезные видео:</h4>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/0pThnRneDjw" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        `;

        technologies.forEach(tech => {
            const techCard = document.createElement('div');
            techCard.className = 'tech-card';
            techCard.innerHTML = `
                <button class="close-btn">&times;</button>
                <div class="tech-content">
                    <div class="tech-header">
                        <img src="${tech.icon}" alt="${tech.title}" class="tech-icon">
                        <h3 class="tech-title">${tech.title}</h3>
                    </div>
                    <div class="tech-description">
                        <p>${tech.description}</p>
                    </div>
                    <div class="video-section">
                        <h4>Полезные видео:</h4>
                        <div class="video-container">
                            <iframe src="${tech.video}" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="links-section">
                        <h4>Полезные ссылки:</h4>
                        <ul class="links-list">
                            ${tech.links.map(link => `
                                <li><a href="${link.url}" target="_blank">${link.text}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
            techGrid.appendChild(techCard);
        });

        return { mainCard: frontendCard, techGrid: techGrid };
    }

    function createFullStackCards() {
        const technologies = [
            {
                title: "Linux Basics",
                description: "Linux - основа большинства серверов. Важно знать базовые команды терминала, управление процессами, работу с файловой системой и основы администрирования.",
                icon: "icons/linux.png",
                video: "https://www.youtube.com/embed/v_1zB2WNN14",
                links: [
                    { url: "https://linuxjourney.com/", text: "Linux Journey - интерактивный курс" },
                    { url: "https://ubuntu.com/tutorials", text: "Ubuntu Tutorials" }
                ]
            },
            {
                title: "HTML/CSS",
                description: "Основа веб-разработки. HTML отвечает за структуру, а CSS за стилизацию веб-страниц. Full Stack разработчик должен уверенно владеть обеими технологиями.",
                icon: "icons/htmlcss.png",
                video: "https://www.youtube.com/embed/G3e-cpL7ofc",
                links: [
                    { url: "https://developer.mozilla.org/ru/docs/Web", text: "MDN Web Docs" },
                    { url: "https://www.w3schools.com/", text: "W3Schools Tutorials" }
                ]
            },
            {
                title: "JavaScript",
                description: "JavaScript используется как на фронтенде, так и на бэкенде (Node.js). Это делает его незаменимым для Full Stack разработчика.",
                icon: "icons/javascript.png",
                video: "https://www.youtube.com/embed/PkZNo7MFNFg",
                links: [
                    { url: "https://javascript.info/", text: "JavaScript.info" },
                    { url: "https://developer.mozilla.org/ru/docs/Web/JavaScript", text: "MDN JavaScript Guide" }
                ]
            },
            {
                title: "Python",
                description: "Python - универсальный язык программирования, отлично подходящий для бэкенд-разработки. Простой синтаксис и богатая экосистема делают его отличным выбором.",
                icon: "icons/python.png",
                video: "https://www.youtube.com/embed/rfscVS0vtbw",
                links: [
                    { url: "https://www.python.org/", text: "Официальный сайт Python" },
                    { url: "https://docs.python.org/", text: "Документация Python" }
                ]
            },
            {
                title: "React",
                description: "React - популярная JavaScript библиотека для создания пользовательских интерфейсов. Необходима для разработки современных веб-приложений.",
                icon: "icons/react.png",
                video: "https://www.youtube.com/embed/w7ejDZ8SWv8",
                links: [
                    { url: "https://react.dev/", text: "Официальный сайт React" },
                    { url: "https://react.dev/learn", text: "Документация React" }
                ]
            },
            {
                title: "PostgreSQL",
                description: "PostgreSQL - мощная система управления базами данных. Full Stack разработчик должен уметь проектировать базы данных и писать эффективные запросы.",
                icon: "icons/postgresql.png",
                video: "https://www.youtube.com/embed/qw--VYLpxG4",
                links: [
                    { url: "https://www.postgresql.org/", text: "Официальный сайт PostgreSQL" },
                    { url: "https://www.postgresql.org/docs/", text: "Документация PostgreSQL" }
                ]
            },
            {
                title: "Django",
                description: "Django - мощный веб-фреймворк на Python. Предоставляет всё необходимое для быстрой разработки безопасных и масштабируемых веб-приложений.",
                icon: "icons/django.png",
                video: "https://www.youtube.com/embed/F5mRW0jo-U4",
                links: [
                    { url: "https://www.djangoproject.com/", text: "Официальный сайт Django" },
                    { url: "https://docs.djangoproject.com/", text: "Документация Django" }
                ]
            },
            {
                title: "Git & GitHub",
                description: "Система контроля версий Git и платформа GitHub необходимы для работы в команде и управления кодом проекта.",
                icon: "icons/git.png",
                video: "https://www.youtube.com/embed/RGOj5yH7evk",
                links: [
                    { url: "https://git-scm.com/", text: "Официальный сайт Git" },
                    { url: "https://github.com/", text: "GitHub" }
                ]
            },
            {
                title: "Docker",
                description: "Docker позволяет упаковывать приложения со всеми зависимостями в контейнеры. Необходим для развертывания и масштабирования приложений.",
                icon: "icons/docker.png",
                video: "https://www.youtube.com/embed/fqMOX6JJhGo",
                links: [
                    { url: "https://www.docker.com/", text: "Официальный сайт Docker" },
                    { url: "https://docs.docker.com/", text: "Документация Docker" }
                ]
            },
            {
                title: "TypeScript",
                description: "TypeScript добавляет статическую типизацию в JavaScript, что делает код более надёжным и легче поддерживаемым.",
                icon: "icons/typescript.png",
                video: "https://www.youtube.com/embed/BwuLxPH8IDs",
                links: [
                    { url: "https://www.typescriptlang.org/", text: "Официальный сайт TypeScript" },
                    { url: "https://www.typescriptlang.org/docs/", text: "Документация TypeScript" }
                ]
            }
        ];

        // Создаем контейнер для технологий
        const techGrid = document.createElement('div');
        techGrid.className = 'tech-grid';

        // Создаем основную карточку Full Stack
        const fullStackCard = document.createElement('div');
        fullStackCard.className = 'tech-card main-card';
        fullStackCard.innerHTML = `
            <button class="close-btn">&times;</button>
            <div class="tech-content">
                <div class="tech-header">
                    <img src="icons/fullstack.png" alt="Full Stack" class="tech-icon">
                    <h3 class="tech-title">Full Stack Development Path</h3>
                </div>
                <div class="tech-description">
                    <p>Full Stack разработчик должен владеть как frontend, так и backend технологиями. Вот основные этапы обучения:</p>
                    <ul>
                        <li>Изучение основ Linux и работы с терминалом</li>
                        <li>Освоение HTML, CSS и JavaScript</li>
                        <li>Изучение React для frontend-разработки</li>
                        <li>Освоение Python и Django для backend</li>
                        <li>Работа с базами данных (PostgreSQL)</li>
                        <li>Изучение TypeScript для улучшения качества кода</li>
                        <li>Освоение Git для контроля версий</li>
                        <li>Работа с Docker для развертывания приложений</li>
                    </ul>
                    <div style="margin-top: 20px;">
                        <a href="https://roadmap.sh/full-stack" target="_blank" style="color: #FFD700; text-decoration: underline;">
                            Посмотреть полную интерактивную карту →
                        </a>
                    </div>
                </div>
                <div class="video-section">
                    <h4>Полезные видео:</h4>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/7k7ETzqOxn8" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        `;

        technologies.forEach(tech => {
            const techCard = document.createElement('div');
            techCard.className = 'tech-card';
            techCard.innerHTML = `
                <button class="close-btn">&times;</button>
                <div class="tech-content">
                    <div class="tech-header">
                        <img src="${tech.icon}" alt="${tech.title}" class="tech-icon">
                        <h3 class="tech-title">${tech.title}</h3>
                    </div>
                    <div class="tech-description">
                        <p>${tech.description}</p>
                    </div>
                    <div class="video-section">
                        <h4>Полезные видео:</h4>
                        <div class="video-container">
                            <iframe src="${tech.video}" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="links-section">
                        <h4>Полезные ссылки:</h4>
                        <ul class="links-list">
                            ${tech.links.map(link => `
                                <li><a href="${link.url}" target="_blank">${link.text}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
            techGrid.appendChild(techCard);
        });

        return { mainCard: fullStackCard, techGrid: techGrid };
    }

    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            const roadmapType = button.dataset.roadmap;
            
            if (roadmapType === 'backend') {
                roadmapContainer.innerHTML = '';
                const { mainCard, techGrid } = createBackendCards();
                roadmapContainer.appendChild(mainCard);
                roadmapContainer.appendChild(techGrid);
                initializeTechCards();
            } else if (roadmapType === 'frontend') {
                roadmapContainer.innerHTML = '';
                const { mainCard, techGrid } = createFrontendCards();
                roadmapContainer.appendChild(mainCard);
                roadmapContainer.appendChild(techGrid);
                initializeTechCards();
            } else if (roadmapType === 'fullstack') {
                roadmapContainer.innerHTML = '';
                const { mainCard, techGrid } = createFullStackCards();
                roadmapContainer.appendChild(mainCard);
                roadmapContainer.appendChild(techGrid);
                initializeTechCards();
            } else {
                const response = await fetch("data/roadmap.json");
                const data = await response.json();
                const roadmap = data[roadmapType];

                roadmapContainer.innerHTML = `
                    <div class="roadmap-content ${roadmapType}-bg">
                        <div class="roadmap-columns">
                            <div class="roadmap-column" id="left-column">
                                <h4>Alused</h4>
                                <ul id="alused-list"></ul>
                            </div>
                            <div class="roadmap-divider"></div>  
                            <div class="roadmap-column" id="right-column">
                                <h4>Keeled</h4>
                                <ul id="keeled-list"></ul>
                            </div>
                        </div>
                        <div class="roadmap-link"> 
                            <img src="icons/www.png" class="roadmap-icon">
                            <a href="https://roadmap.sh/${roadmapType}" target="_blank">
                                Vaata roadmapi
                            </a>
                        </div>
                    </div>
                `;

                const alusedList = document.getElementById("alused-list");
                const keeledList = document.getElementById("keeled-list");

                for (const category in roadmap.categories) {
                    roadmap.categories[category].forEach(tech => {
                        let listItem = document.createElement("li");
                        listItem.innerHTML = `
                            <img src="icons/youtube.png" class="roadmap-icon youtube-icon" data-video="${tech.video}">
                            <a href="#" class="tech-link" data-name="${tech.name}" data-description="${tech.description}" data-video="${tech.video}">
                                ${tech.name}
                            </a>
                        `;

                        if (category === "Alused") {
                            alusedList.appendChild(listItem);
                        } else {
                            keeledList.appendChild(listItem);
                        }
                    });
                }

                // Обработчики кликов для видео
                document.querySelectorAll(".tech-link, .youtube-icon").forEach(element => {
                    element.addEventListener("click", (e) => {
                        e.preventDefault();
                        document.getElementById("techTitle").textContent = element.dataset.name || "YouTube Video";
                        document.getElementById("techDescription").textContent = element.dataset.description || "Vaata videot allpool.";
                        techVideo.src = element.dataset.video;
                        new bootstrap.Modal(techModal).show();
                    });
                });
            }
        });
    });

    // Инициализируем карточки при загрузке страницы
    initializeTechCards();
});
