const fs = require('fs');
const https = require('https');
const http = require('http');
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
    const numStr = i < 10 ? '0' + i : '' + i;
    filesToDownload.push(`img/war/war_wpn_images/${numStr}.png`);
}

for (let i = 1; i <= 19; i++) filesToDownload.push(`img/random/${i}.png`);
for (let i = 1; i <= 5; i++) filesToDownload.push(`img/random/vs/${i}.png`);

function fetchUrl(url, destPath, redirectCount, resolve) {
    if (redirectCount > 10) { process.stdout.write('✗(maxRedirect)'); resolve(); return; }
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
        if ([301, 302, 307, 308].includes(response.statusCode)) {
            const loc = response.headers['location'];
            response.resume();
            const nextUrl = loc.startsWith('http') ? loc : new URL(loc, url).href;
            fetchUrl(nextUrl, destPath, redirectCount + 1, resolve);
        } else if (response.statusCode === 200) {
            const file = fs.createWriteStream(destPath);
            response.pipe(file);
            file.on('finish', () => { file.close(); process.stdout.write('✓'); resolve(); });
        } else {
            response.resume();
            try { fs.unlinkSync(destPath); } catch (e) { }
            process.stdout.write(`✗(${response.statusCode})`);
            resolve();
        }
    }).on('error', () => { process.stdout.write('✗(err)'); resolve(); });
}

function downloadFile(urlPath, overwrite) {
    return new Promise((resolve) => {
        const fullUrl = baseUrl + urlPath;
        const destPath = path.join(publicDir, urlPath.replace(/\//g, path.sep));
        fs.mkdirSync(path.dirname(destPath), { recursive: true });

        if (!overwrite && fs.existsSync(destPath) && fs.statSync(destPath).size > 100) {
            process.stdout.write('.');
            resolve();
            return;
        }
        fetchUrl(fullUrl, destPath, 0, resolve);
    });
}

(async function () {
    console.log(`\nDownloading ${filesToDownload.length} files into public/ (with redirect support)...\n`);
    let i = 0;
    while (i < filesToDownload.length) {
        const batch = filesToDownload.slice(i, i + 10);
        await Promise.all(batch.map(f => downloadFile(f, true)));
        i += 10;
        console.log(`\n[${Math.min(i, filesToDownload.length)} / ${filesToDownload.length}] done`);
    }
    console.log('\n✅ ALL DOWNLOADS COMPLETE! Refresh your browser.');
})();
