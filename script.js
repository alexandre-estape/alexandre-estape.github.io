const darkModeButton = document.getElementById('dark-mode-btn');
const MyTitle = document.getElementById('title');
const MyText = document.getElementById('text');
const body = document.body;

function toggleDarkMode() {

    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    MyTitle.classList.toggle('light-mode');
    MyText.classList.toggle('light-mode');
}

darkModeButton.addEventListener('click', () => { // Dark Mode Button
    toggleDarkMode();
});