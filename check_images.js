const https = require('https');

const checkUrl = (url) => {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', () => {
            resolve({ url, status: 500 });
        });
    });
};

const icons = [
    "horse", "kangaroo", "cat", "dog", "spider", // Animals
    "clock", "gear", "tree", "palm", "apple", "hand" // Symbols
];

async function run() {
    for (const icon of icons) {
        const res = await checkUrl(`https://apps.loveligo.com/war/tobol/images/${icon}.png`);
        console.log(`${icon}.png: ${res.status}`);
    }
}

run();
