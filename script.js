const daysContainer = document.getElementById('daysContainer');
const monthYearLabel = document.getElementById('monthYear');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const datePicker = document.getElementById('datePicker');

let currentDate = new Date();
let selectedDay = null; // Variável para armazenar o dia selecionado

// Função para renderizar o calendário
function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Atualiza o título do mês e ano
    monthYearLabel.textContent = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

    // Limpa os dias anteriores
    daysContainer.innerHTML = `
        <div class="day-name">Dom</div>
        <div class="day-name">Seg</div>
        <div class="day-name">Ter</div>
        <div class="day-name">Qua</div>
        <div class="day-name">Qui</div>
        <div class="day-name">Sex</div>
        <div class="day-name">Sáb</div>
    `;

    // Obtém o primeiro dia do mês e o número de dias no mês
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    const startingDay = firstDay.getDay();

    // Adiciona espaços em branco para o primeiro dia
    for (let i = 0; i < startingDay; i++) {
        daysContainer.innerHTML += `<div class="day"></div>`;
    }

    // Adiciona os dias do mês
    for (let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;

        // Adiciona evento de clique nos dias
        dayElement.addEventListener('click', () => {
            // Remove a classe do dia selecionado anterior
            if (selectedDay) {
                selectedDay.classList.remove('selected-day');
            }
            // Adiciona a classe de dia selecionado ao dia clicado
            selectedDay = dayElement;
            selectedDay.classList.add('selected-day');
        });

        daysContainer.appendChild(dayElement);
    }
}

// Navegação entre meses
prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Função para lidar com a seleção de data
datePicker.addEventListener('change', (event) => {
    const selectedDate = new Date(event.target.value);
    currentDate = selectedDate; // Atualiza a data atual com a data selecionada
    renderCalendar();

    // Seleciona o dia correspondente no calendário
    const dayElements = document.querySelectorAll('.day');
    dayElements.forEach(dayElement => {
        if (parseInt(dayElement.textContent) === selectedDate.getDate()) {
            if (selectedDay) {
                selectedDay.classList.remove('selected-day'); // Remove seleção anterior
            }
            selectedDay = dayElement;
            selectedDay.classList.add('selected-day'); // Adiciona a nova seleção
        }
    });
});

// Renderiza o calendário pela primeira vez
renderCalendar();
