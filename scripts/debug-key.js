const fs = require('fs');
const path = require('path');

function debugKey() {
    // If not passed via --env-file, try to read manually just in case
    if (!process.env.GOOGLE_PRIVATE_KEY) {
        try {
            const envPath = path.resolve(process.cwd(), '.env.local');
            const envContent = fs.readFileSync(envPath, 'utf8');
            const match = envContent.match(/GOOGLE_PRIVATE_KEY=(.*)/);
            if (match) {
                process.env.GOOGLE_PRIVATE_KEY = match[1];
            }
        } catch (e) {
            console.log('Error reading .env.local manually:', e.message);
        }
    }

    const key = process.env.GOOGLE_PRIVATE_KEY;

    if (!key) {
        console.error('❌ GOOGLE_PRIVATE_KEY is missing');
        return;
    }

    console.log('--- Key Debug Info ---');
    console.log(`Total Length: ${key.length}`);
    console.log(`Starts with quote: ${key.startsWith('"')}`);
    console.log(`Ends with quote: ${key.endsWith('"')}`);
    console.log(`Contains literal newline characters (\\n): ${key.includes('\n')}`);
    console.log(`Contains escaped newline characters (\\\\n): ${key.includes('\\n')}`);

    let processedKey = key;
    if (processedKey.startsWith('"') && processedKey.endsWith('"')) {
        console.log('Detected wrapping quotes, stripping them...');
        processedKey = processedKey.slice(1, -1);
    }

    const hasLiteralNewlines = processedKey.includes('\n');
    const hasEscapedNewlines = processedKey.includes('\\n');

    console.log(`Processed - Contains literal newline characters: ${hasLiteralNewlines}`);
    console.log(`Processed - Contains escaped newline characters: ${hasEscapedNewlines}`);

    // Simulate the replacement logic
    let replacedKey = processedKey.replace(/\\n/g, '\n');
    console.log(`Replaced (\\\\n -> \\n) - Contains literal newline characters: ${replacedKey.includes('\n')}`);
    console.log(`Replaced Key Length: ${replacedKey.length}`);

    // Check start and end
    const header = 'BEGIN PRIVATE KEY';
    const footer = 'END PRIVATE KEY';

    console.log(`Contains Header ('${header}'): ${replacedKey.includes(header)}`);
    console.log(`Contains Footer ('${footer}'): ${replacedKey.includes(footer)}`);

    if (!replacedKey.includes(header)) {
        console.log('WARNING: Header missing or malformed');
        console.log('First 50 chars of processed key:', processedKey.substring(0, 50));
    }
}

debugKey();
