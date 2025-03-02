document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    loadWorkouts();
    updateStatistics();

    // Проверяем состояние поля частоты при загрузке
    const weeklyTarget = getWeeklyTarget();
    const frequencyField = document.getElementById('frequency');
    if (weeklyTarget !== null) {
        frequencyField.disabled = true;
    }

    // Обработчик отправки формы
    document.getElementById('workoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addWorkout();
    });

    // Обработчик очистки всех тренировок
    document.getElementById('clearAll').addEventListener('click', clearAllWorkouts);

    // Обработчик фильтрации
    document.getElementById('filterType').addEventListener('change', filterWorkouts);

    // Получение целевого количества тренировок
    function getWeeklyTarget() {
        let target = localStorage.getItem('weeklyTarget');
        return target ? parseInt(target) : null;
    }

    // Функция добавления тренировки
    function addWorkout() {
        const weeklyTarget = getWeeklyTarget();
        
        // Если это первая тренировка, сохраняем целевое количество и блокируем поле
        if (weeklyTarget === null) {
            const frequency = parseInt(document.getElementById('frequency').value);
            localStorage.setItem('weeklyTarget', frequency);
            document.getElementById('frequency').disabled = true;
        }

        const workout = {
            id: Date.now(),
            name: document.getElementById('workoutName').value,
            type: document.getElementById('workoutType').value,
            duration: parseInt(document.getElementById('duration').value),
            intensity: document.querySelector('input[name="intensity"]:checked').value,
            frequency: parseInt(document.getElementById('frequency').value),
            comment: document.getElementById('comment').value
        };

        let workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));

        document.getElementById('workoutForm').reset();
        loadWorkouts();
        updateStatistics();
    }

    // Функция загрузки тренировок
    function loadWorkouts() {
        const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        const weeklyTarget = getWeeklyTarget();
        const workoutsList = document.getElementById('workoutsList');
        const filterType = document.getElementById('filterType').value;
        
        // Проверяем и устанавливаем состояние поля частоты
        const frequencyField = document.getElementById('frequency');
        if (weeklyTarget !== null) {
            frequencyField.disabled = true;
        } else {
            frequencyField.disabled = false;
        }

        workoutsList.innerHTML = '';

        workouts
            .filter(workout => filterType === 'all' || workout.type === filterType)
            .forEach(workout => {
                const card = createWorkoutCard(workout);
                workoutsList.appendChild(card);
            });
            
        updateStatistics();
    }

    // Функция создания карточки тренировки
    function createWorkoutCard(workout) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
            <div class="card workout-card">
                <div class="card-body">
                    <h5 class="card-title">${workout.name}</h5>
                    <p class="card-text">
                        <strong>Тип:</strong> ${workout.type}<br>
                        <strong>Длительность:</strong> ${workout.duration} мин<br>
                        <strong>Интенсивность:</strong> ${workout.intensity}<br>
                        
                    </p>
                    ${workout.comment ? `<p class="card-text"><small>${workout.comment}</small></p>` : ''}
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-danger btn-sm" onclick="deleteWorkout(${workout.id})">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        `;
        return col;
    }

    // Функция обновления статистики
    function updateStatistics() {
        const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        const weeklyTarget = getWeeklyTarget() || workouts[0]?.frequency || 7;
        
        const stats = {
            total: workouts.length,
            totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
            averageDuration: workouts.length ? 
                Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length) : 0,
            byType: {
                'Силовая': 0,
                'Кардио': 0,
                'Йога': 0,
                'Растяжка': 0
            }
        };

        workouts.forEach(workout => {
            if (stats.byType.hasOwnProperty(workout.type)) {
                stats.byType[workout.type]++;
            }
        });

        document.getElementById('statistics').innerHTML = `
            <h5>Статистика</h5>
            <p class="mb-1">Всего тренировок: ${stats.total}</p>
            <p class="mb-1">Общая продолжительность: ${stats.totalDuration} мин</p>
            <p class="mb-1">Средняя продолжительность: ${stats.averageDuration} мин</p>
            <hr>
            <p class="mb-1">По типам тренировок:</p>
            ${Object.entries(stats.byType)
                .filter(([_, count]) => count > 0)
                .map(([type, count]) => `
                    <p class="mb-1 ms-2">- ${type}: ${count} тренировок</p>
                `).join('')}
        `;

        updateProgressBar(workouts, weeklyTarget);
    }

    // Функция обновления прогресс-бара
    function updateProgressBar(workouts, weeklyTarget) {
        const totalWorkouts = workouts.length;
        const progressPercent = Math.min(100, (totalWorkouts / weeklyTarget) * 100);
        
        const circle = document.querySelector('.circle-progress');
        if (circle) {
            const circumference = 339.292;
            const offset = circumference - (progressPercent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }

        const progressText = document.getElementById('progress-percent');
        if (progressText) {
            progressText.textContent = `${Math.round(progressPercent)}%`;
        }

        const progressLabel = document.getElementById('progress-label');
        if (progressLabel) {
            progressLabel.textContent = `Тренировок: ${totalWorkouts} из ${weeklyTarget}`;
        }
    }

    // Глобальная функция удаления тренировки
    window.deleteWorkout = function(id) {
        if (confirm('Вы уверены, что хотите удалить эту тренировку?')) {
            let workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
            workouts = workouts.filter(w => w.id !== id);
            localStorage.setItem('workouts', JSON.stringify(workouts));
            loadWorkouts();
        }
    };

    // Функция очистки всех тренировок
    function clearAllWorkouts() {
        if (confirm('Вы уверены, что хотите удалить все тренировки?')) {
            localStorage.removeItem('workouts');
            localStorage.removeItem('weeklyTarget');
            document.getElementById('workoutsList').innerHTML = '';
            document.getElementById('frequency').disabled = false;
            updateStatistics();
        }
    }

    // Функция фильтрации тренировок
    function filterWorkouts() {
        loadWorkouts();
    }
});

// Код для переключения темы
const themeToggle = document.getElementById("theme-toggle");

function toggleTheme() {
    if (themeToggle.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

// Инициализация темы
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.setAttribute("data-theme", "dark");
    themeToggle.checked = true;
} else {
    document.documentElement.setAttribute("data-theme", "light");
    document.body.setAttribute("data-theme", "light");
    themeToggle.checked = false;
}

themeToggle.addEventListener("change", toggleTheme);