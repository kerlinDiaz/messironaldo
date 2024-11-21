const setupSection = document.getElementById('setup');
const participantCountInput = document.getElementById('participantCount');
const startInputButton = document.getElementById('startInput');

const nameInputSection = document.getElementById('nameInputSection');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');

const spinButton = document.getElementById('spinButton');
const spinner = document.querySelector('.spinner');
const resultDisplay = document.getElementById('result').querySelector('span');
const resultSection = document.getElementById('result');

let names = [];
let totalParticipants = 0;

// Configurar la cantidad de participantes
startInputButton.addEventListener('click', () => {
    const count = parseInt(participantCountInput.value, 10);
    if (count >= 3) {
        totalParticipants = count;
        setupSection.style.display = 'none';
        nameInputSection.style.display = 'block';
    } else {
        alert('Debe haber al menos 3 participantes.');
    }
});

// Manejar la adición de nombres
nameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    if (name && names.length < totalParticipants) {
        names.push(name);
        updateNameList();
        nameInput.value = '';

        if (names.length === totalParticipants) {
            nameInputSection.style.display = 'none';
            document.querySelector('.wheel').style.display = 'block';
            spinButton.style.display = 'block';
            resultSection.style.display = 'block';
            spinButton.disabled = false; // Habilitar el botón de girar
            updateSpinner();
        }
    } else if (names.length >= totalParticipants) {
        alert('Ya se ingresaron todos los nombres.');
    }
});

// Actualizar la lista de nombres
function updateNameList() {
    nameList.innerHTML = '';
    names.forEach((name) => {
        const li = document.createElement('li');
        li.textContent = name;
        nameList.appendChild(li);
    });
}

// Actualizar los colores de la ruleta dinámicamente
function updateSpinner() {
    const segmentDegree = 360 / names.length;
    const colors = ['#ff5733', '#33ff57', '#3357ff', '#f1c40f', '#9b59b6', '#e74c3c'];
    let gradient = names.map((_, i) => {
        const color = colors[i % colors.length];
        return `${color} ${i * segmentDegree}deg ${(i + 1) * segmentDegree}deg`;
    });
    spinner.style.background = `conic-gradient(${gradient.join(', ')})`;
}

// Girar la ruleta
spinButton.addEventListener('click', () => {
    if (names.length === 0) return;

    spinButton.disabled = true;

    const randomDegree = Math.floor(Math.random() * 360 + 720); // Al menos 2 giros completos
    const selectedIndex = Math.floor(((randomDegree % 360) / (360 / names.length))); // Calcular el índice

    spinner.style.transform = `rotate(${randomDegree}deg)`;

    // Mostrar el resultado
    setTimeout(() => {
        spinButton.disabled = false;
        resultDisplay.textContent = names[selectedIndex];
    }, 4000); // Duración de la animación
});
