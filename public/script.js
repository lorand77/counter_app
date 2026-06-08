const counter = document.getElementById('counter');

function send(path, method) {
  fetch(path, { method })
    .then(r => r.text())
    .then(c => { counter.textContent = c; });
}

send('/count', 'GET');
document.getElementById('plus').addEventListener('click', () => { send('/plus', 'POST'); });
document.getElementById('minus').addEventListener('click', () => { send('/minus', 'POST'); });
