// Game State
let currentTurn = 'red'; // 'red' or 'blue'
let scores = {
    red: 350,
    blue: 350
};
const maxScore = 350;

// Card Database
const cards = [
    { name: "العنقاء الأسطورية", min: 5, max: 10, type: "attack", desc: "هجوم أسطوري من الجو يدمر العدو" },
    { name: "طائرة مسيرة بدون طيار", min: 10, max: 15, type: "attack", desc: "طائرة استطلاع وهجوم دقيقة" },
    { name: "انقلاب الحرس الوطني", min: 15, max: 25, type: "trap", desc: "خيانة من الداخل وتدمير للقوات (فخ)" },
    { name: "القنبلة النووية", min: 35, max: 50, type: "attack", desc: "دمار شامل يمحو قوات العدو" },
    { name: "التنين الأسطوري", min: 7, max: 12, type: "attack", desc: "نيران ضخمة تحرق قوات الخصم" },
    { name: "سلاح الفرسان", min: 4, max: 8, type: "attack", desc: "هجوم سريع ومباغت" },
    { name: "ارتفاع الروح المعنوية", min: 8, max: 14, type: "attack", desc: "ضربة قوية مستلهمة من الحماس" },
    { name: "مقاتلة F-16", min: 12, max: 18, type: "attack", desc: "قصف جوي دقيق" },
    { name: "حاملة الطائرات", min: 13, max: 22, type: "attack", desc: "دعم لوجستي وقصف ثقيل" },
    { name: "بركان مدمر", min: 18, max: 28, type: "attack", desc: "سلاح الطبيعة القاتل" },
    { name: "عصابة مرتزقة", min: 6, max: 12, type: "attack", desc: "مقاتلون محترفون" },
    { name: "مضاد طائرات", min: 9, max: 14, type: "attack", desc: "إسقاط الطيران المعادي" },
    { name: "صاروخ موجه", min: 10, max: 16, type: "attack", desc: "ضربة بعيدة المدى" },
    { name: "قرش مدمر", min: 12, max: 17, type: "attack", desc: "هجوم بحري ضارٍ" },
    { name: "قلعة حصينة", min: 8, max: 15, type: "attack", desc: "هجوم دفاعي ارتدادي" },
    { name: "تسمم غذائي", min: 5, max: 15, type: "trap", desc: "انتشار المرض في صفوف جيشك (فخ)" },
    { name: "عاصفة رملية", min: 3, max: 8, type: "trap", desc: "إعاقة تحركات قواتك (فخ)" },
    { name: "فرقة كوماندوز", min: 15, max: 20, type: "attack", desc: "إنزال خلف خطوط العدو" },
    { name: "قناص محترف", min: 5, max: 9, type: "attack", desc: "إصابات مباشرة للقادة" },
    { name: "لغم أرضي", min: 10, max: 18, type: "trap", desc: "جيشك يقع في حقل ألغام (فخ)" }
];

// Emojis for Buttons
const animalIcons = ["🐴", "🦋", "🦆", "🕊️", "🐸", "🐠", "🦘", "🦒", "🐘", "🦏", "🐁", "🐈", "🦂", "🐫", "🐌", "🐪", "🐇", "🐂", "🐍", "🐓", "🐢", "🐦", "🐕", "🕷️"];
const symbolIcons = ["💡", "🔍", "🎵", "📸", "✉️", "🌙", "⭐", "🕒", "✈️", "⚙️", "📞", "❤️", "🌴", "🏠", "✏️", "🔑", "💼", "💣", "🔒", "🌿", "🌍", "🧲", "🍎", "✋"];

// Background Images for Main Screen
const mainBackgrounds = [
    "#0a192f", "#1b112c", "#0f251c", "#2c1111", "#212121", "#331800"
];

// Initialize Game
function init() {
    generateButtons();
    updateUI();
    updateScoresFromInputs();
    
    // Listen to manual score changes
    document.getElementById('redTeamScore').addEventListener('change', updateScoresFromInputs);
    document.getElementById('blueTeamScore').addEventListener('change', updateScoresFromInputs);
}

function updateScoresFromInputs() {
    scores.red = parseInt(document.getElementById('redTeamScore').value) || 0;
    scores.blue = parseInt(document.getElementById('blueTeamScore').value) || 0;
    updateProgressBars();
}

function generateButtons() {
    const rightPanel = document.getElementById('rightPanel');
    const leftPanel = document.getElementById('leftPanel');
    const bottomPanel = document.getElementById('bottomPanel');

    // Right Panel - Animals (Red borders)
    animalIcons.forEach((icon, i) => {
        const btn = document.createElement('button');
        btn.className = 'game-btn btn-animal';
        btn.innerHTML = icon;
        btn.onclick = () => handleButtonClick(btn);
        rightPanel.appendChild(btn);
    });

    // Left Panel - Symbols (Blue borders)
    symbolIcons.forEach((icon, i) => {
        const btn = document.createElement('button');
        btn.className = 'game-btn btn-symbol';
        btn.innerHTML = icon;
        btn.onclick = () => handleButtonClick(btn);
        leftPanel.appendChild(btn);
    });

    // Bottom Panel - Numbers (Colors mix)
    for (let i = 1; i <= 24; i++) {
        const btn = document.createElement('button');
        btn.className = 'game-btn btn-number';
        if (i % 3 === 0) btn.classList.add('green');
        else if (i % 2 === 0) btn.classList.add('yellow');
        btn.innerHTML = i;
        btn.onclick = () => handleButtonClick(btn);
        bottomPanel.appendChild(btn);
    }
}

function handleButtonClick(btn) {
    if (btn.classList.contains('clicked')) return;
    
    // Mark as clicked
    btn.classList.add('clicked');
    
    // Get a random card
    const card = cards[Math.floor(Math.random() * cards.length)];
    
    // Calculate points
    const points = Math.floor(Math.random() * (card.max - card.min + 1)) + card.min;
    
    // Apply logic
    let targetMsg = "";
    let isGood = true;
    let cardColor = "";
    
    const opponent = currentTurn === 'red' ? 'blue' : 'red';
    const currentName = document.getElementById(currentTurn + 'TeamName').value;
    const opponentName = document.getElementById(opponent + 'TeamName').value;

    if (card.type === 'attack') {
        scores[opponent] -= points;
        document.getElementById(opponent + 'TeamScore').value = scores[opponent];
        targetMsg = `هجوم ناجح! تم خصم ${points} من ${opponentName}`;
        cardColor = currentTurn === 'red' ? 'linear-gradient(to right, #b71c1c, #ff5252)' : 'linear-gradient(to right, #0d47a1, #448aff)';
    } else {
        // Trap
        scores[currentTurn] -= points;
        document.getElementById(currentTurn + 'TeamScore').value = scores[currentTurn];
        targetMsg = `لقد وقعت في فخ! تم خصم ${points} من جيشك (${currentName})`;
        isGood = false;
        cardColor = '#333';
    }

    // Update Progress Bars
    updateProgressBars();

    // Show Modal
    showCard(card, points, targetMsg, isGood, cardColor);
}

function showCard(card, points, targetMsg, isGood, cardColor) {
    const modal = document.getElementById('cardModal');
    
    document.getElementById('cardHeader').style.background = cardColor;
    document.getElementById('weaponName').innerText = card.name;
    document.getElementById('weaponPoints').innerText = points;
    document.getElementById('weaponDesc').innerText = card.desc;
    
    // Diamonds Color (Team Color)
    const diamonds = currentTurn === 'red' ? '🔴🔴' : '🔵🔵';
    document.getElementById('cardDiamonds').innerText = diamonds;

    const actionBox = document.getElementById('weaponAction');
    actionBox.innerText = targetMsg;
    actionBox.className = 'weapon-action ' + (isGood ? 'action-good' : 'action-bad');

    modal.style.display = 'flex';
}

function closeCard() {
    document.getElementById('cardModal').style.display = 'none';
    
    // Check Win Condition
    if (scores.red <= 0 || scores.blue <= 0) {
        showWinModal();
        return;
    }

    // Switch Turn
    currentTurn = currentTurn === 'red' ? 'blue' : 'red';
    updateUI();
}

function updateUI() {
    const redBox = document.getElementById('redTeamBox');
    const blueBox = document.getElementById('blueTeamBox');
    
    if (currentTurn === 'red') {
        redBox.classList.add('active-turn');
        blueBox.classList.remove('active-turn');
    } else {
        blueBox.classList.add('active-turn');
        redBox.classList.remove('active-turn');
    }
}

function updateProgressBars() {
    // Initial max is 350, but it might be changed. We'll base percentage on initial 350, capped at 100%
    const redPct = Math.max(0, Math.min(100, (scores.red / 350) * 100));
    const bluePct = Math.max(0, Math.min(100, (scores.blue / 350) * 100));
    
    document.getElementById('redProgressFill').style.width = redPct + '%';
    document.getElementById('blueProgressFill').style.width = bluePct + '%';
}

function showWinModal() {
    const modal = document.getElementById('winModal');
    const winnerDisplay = document.getElementById('winnerName');
    
    let winnerId = scores.red > 0 ? 'red' : 'blue';
    let winnerName = document.getElementById(winnerId + 'TeamName').value;
    
    winnerDisplay.innerText = winnerName;
    winnerDisplay.style.color = winnerId === 'red' ? '#ff5252' : '#448aff';
    
    modal.style.display = 'flex';
}

function setForceTurn(team) {
    currentTurn = team;
    updateUI();
}

function changeMainImage() {
    const screen = document.getElementById('mainScreen');
    const currentBg = screen.style.backgroundColor;
    
    let nextBg = mainBackgrounds[Math.floor(Math.random() * mainBackgrounds.length)];
    while (nextBg === currentBg) {
        nextBg = mainBackgrounds[Math.floor(Math.random() * mainBackgrounds.length)];
    }
    
    screen.style.backgroundColor = nextBg;
}

// Start
init();
