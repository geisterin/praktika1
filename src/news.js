document.addEventListener("DOMContentLoaded", () => {
    const newsData = [
        {
            title: "AI-Powered Coding Assistant Set to Revolutionize Software Development",
            category: "Tehnoloogia",
            description: "A cutting-edge AI coding assistant is making waves in the tech community by transforming the way developers write and debug code. Developed by a consortium of researchers and tech companies, the tool uses advanced machine learning and natural language processing to understand natural language comments and code context. Integrated into popular IDEs like Visual Studio Code and IntelliJ IDEA, it can suggest code completions, spot bugs in real time, and even refactor code automatically.",
            datetime: "2025-02-14",
            image: "image/ai.jpg"
        },
        {
            title: "Eesti määrdemehi kiitnud soomlanna MM-pronksist: olen sõnatu!",
            category: "Sport",
            description: "Laskesuusatamise maailmameistrivõistlustel Lenzerheides oli esimese individuaalvõistlusena kavas naiste 7,5 km sprint, kus медали арве avas Soome, kui Suvi Minkkinen võitis pronksi.",
            datetime: "2025-02-10",
            image: "image/sport.jpeg"
        },
        {
            title: "Мюнхенская конференция по безопасности.",
            category: "Poliitika",
            description: "Президент Германии Франк-Вальтер Штайнмайер, выступая с речью от имени принимающей страны, начал с того, что заверил в надежности своей страны, независимо от того, кого изберет народ на выборах.",
            datetime: "2025-02-08",
            image: "/image/politics.jpeg"
        },
        {
            title: "Uue muusika reede: Night Tapes, Drake, Sabrina Carpenter, SZA jpt",
            category: "Kultuur",
            description: "Artistid olid hästi kursis, et tänavu langeb sõbrapäev just reedele. Night Tapes võtab hoogу albumiks, varem ilmumata lugusid Sabrina Carpenterilt ja SZA-lt.",
            datetime: "2025-02-06",
            image: "image/music.jpeg"
        },
        {
            title: "В Китае полицейского корги «лишили годовой премии» за сон на работе",
            category: "Lemmikloomad",
            description: "Первый пес-полицейский породы корги в Китае лишился угощений по итогам года, потому что спал на работе.",
            datetime: "2025-01-27",
            image: "image/corgi.jpg"
        },
        {
            title: "Исследование: в 2024 году только 0,5% из топ-200 веб-сайтов мира используют валидный HTML",
            category: "Tehnoloogia",
            description: "Фронтенд-инженер, бывший сотрудник Google и Miro Йенс Оливер Мейерт провёл исследование, которое показало, что 199 из 200 самых популярных веб-сайтов используют неработающий HTML.",
            datetime: "2025-01-27",
            image: "image/html.jpg"
        }
    ];

    const newsContainer = document.getElementById("newsContainer");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    function displayNews(filteredNews) {
        newsContainer.innerHTML = "";
        filteredNews.forEach(news => {
            const newsCard = document.createElement("div");
            newsCard.classList.add("col-md-6", "col-lg-4", "mb-4");

            newsCard.innerHTML = `
                <div class="news-card">
                    <div class="news-image-container">
                        <img src="${news.image}" class="news-image" alt="${news.title}">
                    </div>
                    <div class="news-content">
                        <h3 class="card-title">${news.title}</h3>
                        <p class="card-text">${news.description.length > 100 ? news.description.slice(0, 100) + "..." : news.description}</p>
                        <div class="card-footer">
                            <span class="date">${news.datetime}</span>
                            <span class="category">${news.category}</span>
                        </div>
                    </div>
                </div>
            `;

            // Обработчик клика для увеличения карточки
            const card = newsCard.querySelector(".news-card");
            card.addEventListener("click", function() {
                const expanded = this.classList.contains("expanded");
                
                // Удаляем класс expanded со всех карточек
                document.querySelectorAll(".news-card").forEach(c => {
                    c.classList.remove("expanded");
                });

                // Удаляем все активные оверлеи
                document.querySelectorAll(".overlay").forEach(o => {
                    o.remove();
                });

                if (!expanded) {
                    // Создаем и добавляем оверлей
                    const overlay = document.createElement("div");
                    overlay.classList.add("overlay");
                    document.body.appendChild(overlay);
                    setTimeout(() => overlay.classList.add("active"), 0);

                    // Разворачиваем карточку
                    this.classList.add("expanded");
                    
                    // Обновляем содержимое развернутой карточки
                    const content = this.querySelector(".news-content");
                    content.querySelector(".card-text").textContent = news.description;
                }
            });

            newsContainer.appendChild(newsCard);
        });
    }

    function filterNews() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredNews = newsData.filter(news => {
            const matchesCategory = selectedCategory === "all" || news.category === selectedCategory;
            const matchesSearch = news.title.toLowerCase().includes(searchText) ||
                                news.description.toLowerCase().includes(searchText);
            return matchesCategory && matchesSearch;
        });

        displayNews(filteredNews);
    }

    // Закрытие развернутой карточки при клике на оверлей
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("overlay")) {
            document.querySelectorAll(".news-card").forEach(card => {
                card.classList.remove("expanded");
            });
            e.target.classList.remove("active");
            setTimeout(() => e.target.remove(), 300);
        }
    });

    searchInput.addEventListener("input", filterNews);
    categoryFilter.addEventListener("change", filterNews);

    displayNews(newsData);
});
