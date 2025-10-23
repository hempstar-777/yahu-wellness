// translation-coverage.js
// Shows translation coverage statistics

const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'i18n', 'locales', 'en.json');
const esPath = path.join(__dirname, 'src', 'i18n', 'locales', 'es.json');

if (!fs.existsSync(enPath) || !fs.existsSync(esPath)) {
  console.log('❌ Translation files not found!');
  console.log(`Looking for:\n  - ${enPath}\n  - ${esPath}`);
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

function countKeys(obj, depth = 0) {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      count += countKeys(obj[key], depth + 1);
    } else {
      count++;
    }
  }
  return count;
}

function findUntranslated(obj, prefix = '') {
  const untranslated = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'string' && (obj[key].includes('[NEEDS TRANSLATION]') || obj[key].includes('[TRANSLATE]'))) {
      untranslated.push({ key: fullKey, text: obj[key] });
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      untranslated.push(...findUntranslated(obj[key], fullKey));
    }
  }
  return untranslated;
}

const enCount = countKeys(en);
const esCount = countKeys(es);
const untranslated = findUntranslated(es);
const translated = esCount - untranslated.length;
const coveragePercent = esCount > 0 ? Math.round((translated / esCount) * 100) : 0;

console.log('\n📊 Translation Coverage Report\n');
console.log('='.repeat(60));
console.log(`English keys:     ${enCount}`);
console.log(`Spanish keys:     ${esCount}`);
console.log(`Translated:       ${translated}`);
console.log(`Untranslated:     ${untranslated.length}`);
console.log(`Coverage:         ${coveragePercent}%`);
console.log('='.repeat(60));

if (untranslated.length > 0) {
  console.log('\n⚠️  Keys needing translation:\n');
  untranslated.forEach(item => {
    console.log(`   - ${item.key}`);
    console.log(`     Current: ${item.text.substring(0, 60)}...`);
  });
} else {
  console.log('\n✅ All keys are translated!');
}

console.log('');
