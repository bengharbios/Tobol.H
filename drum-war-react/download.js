const fs = require('fs');
const https = require('https');
const path = require('path');

const baseUrl = 'https://apps.loveligo.com/war/tobol/';
const publicDir = path.join(__dirname, 'public');

const filesToDownload = [];

filesToDownload.push('img/bg.png', 'img/logo.png', 'img/settings.png', 'fonts/TIDO-B.otf');

const colors = ['red', 'pink', 'blue', 'sky', 'purple', 'orange', 'green', 'teal', 'yellow'];
colors.forEach(c => filesToDownload.push(`img/ligowar/buttons/back/${c}.png`));

const core = ['blue_score_back.png', 'red_score_back.png', 'progress_bar_empty.png', 'card.png', 'card_points_blue.png', 'card_points_red.png'];
core.forEach(c => filesToDownload.push(`img/ligowar/core/${c}`));

const icons = [
    'butterfly', 'pigeon', 'fish', 'giraffe', 'elephant', 'deer', 'camel', 'donkey', 'duck', 'frog', 'lion', 'mouse', 'scorbion', 'snail',
    'magnifier', 'camera', 'cressent', 'eye', 'heart', 'house', 'key', 'lamp', 'music', 'message', 'star', 'plane', 'phone', 'pencil',
    'cow', 'rabbit', '1', '2', '3', '4', '5', '6', 'bomb', 'case',
    'roaster', 'snake', '7', '8', '9', '10', '11', '12', 'feather', 'lock',
    'sparrow', 'turtle', '13', '14', '15', '16', '17', '18', 'magnet', 'globe'
];
icons.forEach(i => filesToDownload.push(`images/${i}.png`));

for (let i = 1; i <= 64; i++) {
    const numStr = i < 10 ? '0' + i : i;
    filesToDownload.push(`img/war/war_wpn_images/${numStr}.png`);
}

for (let i = 1; i <= 19; i++) {
    filesToDownload.push(`img/random/${i}.png`);
}

for (let i = 1; i <= 5; i++) {
    filesToDownload.push(`img/random/vs/${i}.png`);
}

function downloadFile(urlPath) {
    return new Promise((resolve, reject) => {
        const fullUrl = baseUrl + urlPath;
        const destPath = path.join(publicDir, urlPath.replace(/\//g, path.sep));

        fs.mkdirSync(path.dirname(destPath), { recursive: true });

        // Skip if already exists
        if (fs.existsSync(destPath)) {
            resolve();
            return;
        }

        const file = fs.createWriteStream(destPath);
        https.get(fullUrl, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                file.close();
                fs.unlink(destPath, () => { });
                console.log(`Failed to download ${fullUrl}: ${response.statusCode}`);
                resolve(); // Continue even if failed
            }
        }).on('error', (err) => {
            fs.unlink(destPath, () => { });
            console.error(`Error downloading ${fullUrl}: ${err.message}`);
            resolve();
        });
    });
}

(async function () {
    console.log('Downloading ' + filesToDownload.length + ' files...');
    let i = 0;
    while (i < filesToDownload.length) {
        const batch = filesToDownload.slice(i, i + 10);
        await Promise.all(batch.map(f => downloadFile(f)));
        i += 10;
        console.log(`Downloaded ${Math.min(i, filesToDownload.length)} / ${filesToDownload.length}`);
    }

    const tickUrl = "https://www.citypng.com/public/uploads/preview/tick-check-correct-true-done-mark-3d-green-icon-png-11664618654ho7xhidr5e.png";
    const tickDest = path.join(publicDir, 'images', 'tick.png');
    if (!fs.existsSync(tickDest)) {
        await new Promise((resolve) => {
            https.get(tickUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            }, (res) => {
                if (res.statusCode === 200) {
                    const f = fs.createWriteStream(tickDest);
                    res.pipe(f);
                    f.on('finish', resolve);
                } else {
                    console.log('Failed tick: ' + res.statusCode);
                    resolve();
                }
            }).on('error', resolve);
        });
    }

    console.log('ALL DOWNLOADS COMPLETE!');
})();
