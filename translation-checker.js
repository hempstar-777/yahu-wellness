// translation-checker.js
// Run this with: node translation-checker.js

const fs = require('fs');
const path = require('path');

class TranslationChecker {
  constructor() {
    this.issues = [];
    this.localesPath = path.join(__dirname, 'src', 'i18n', 'locales');
    this.srcPath = path.join(__dirname, 'src');
  }

  // Patterns to detect untranslated content
  patterns = [
    {
      name: 'Hardcoded JSX Text',
      regex: />[\s]*[A-Z][a-zA-Z\s]{2,}[\s]*</g,
      test: (line) => !line.includes('{t(') && !line.includes('className') && !line.includes('alt=')
    },
    {
      name: 'Placeholder without translation',
      regex: /placeholder=["'][^{][^"']*["']/g,
      test: () => true
    },
    {
      name: 'Title without translation',
      regex: /title=["'][^{][^"']*["']/g,
      test: () => true
    },
    {
      name: 'Aria-label without translation',
      regex: /aria-label=["'][^{][^"']*["']/g,
      test: () => true
    },
    {
      name: 'Button text without translation',
      regex: /<button[^>]*>[\s]*[A-Z][^<{]*</g,
      test: (line) => !line.includes('{t(')
    }
  ];

  shouldScanFile(filePath) {
    const ext = path.extname(filePath);
    return ['.tsx', '.ts', '.jsx', '.js'].includes(ext) && 
           !filePath.includes('node_modules') &&
           !filePath.includes('.test.');
  }

  getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = this.getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    });

    return arrayOfFiles;
  }

  scanFile(filePath) {
    if (!this.shouldScanFile(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      this.patterns.forEach(pattern => {
        const matches = line.match(pattern.regex);
        if (matches && pattern.test(line)) {
          matches.forEach(match => {
            this.issues.push({
              file: path.relative(this.srcPath, filePath),
              line: index + 1,
              type: pattern.name,
              content: match.trim(),
              fullLine: line.trim()
            });
          });
        }
      });
    });
  }

  checkTranslationFiles() {
    console.log('\n📚 Checking translation files...\n');

    const enPath = path.join(this.localesPath, 'en.json');
    const esPath = path.join(this.localesPath, 'es.json');

    if (!fs.existsSync(enPath) || !fs.existsSync(esPath)) {
      console.log('❌ Translation files not found!');
      return;
    }

    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

    const missingInSpanish = this.findMissingKeys(enData, esData, 'es');
    const missingInEnglish = this.findMissingKeys(esData, enData, 'en');

    if (missingInSpanish.length > 0) {
      console.log('❌ Missing in Spanish:');
      missingInSpanish.forEach(key => console.log(`   - ${key}`));
      console.log('');
    }

    if (missingInEnglish.length > 0) {
      console.log('❌ Missing in English:');
      missingInEnglish.forEach(key => console.log(`   - ${key}`));
      console.log('');
    }

    if (missingInSpanish.length === 0 && missingInEnglish.length === 0) {
      console.log('✅ All translation keys are present in both languages!');
    }
  }

  findMissingKeys(source, target, targetLang, prefix = '') {
    const missing = [];

    Object.keys(source).forEach(key => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (!(key in target)) {
        missing.push(fullKey);
      } else if (typeof source[key] === 'object' && source[key] !== null) {
        missing.push(...this.findMissingKeys(source[key], target[key] || {}, targetLang, fullKey));
      }
    });

    return missing;
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('🔍 TRANSLATION ISSUES REPORT');
    console.log('='.repeat(60) + '\n');

    if (this.issues.length === 0) {
      console.log('✅ No issues found! All text appears to be using translations.\n');
      return;
    }

    const byFile = {};
    this.issues.forEach(issue => {
      if (!byFile[issue.file]) byFile[issue.file] = [];
      byFile[issue.file].push(issue);
    });

    Object.keys(byFile).sort().forEach(file => {
      console.log(`\n📄 ${file} (${byFile[file].length} issues)`);
      console.log('-'.repeat(60));
      
      byFile[file].forEach(issue => {
        console.log(`   Line ${issue.line}: ${issue.type}`);
        console.log(`   Content: ${issue.content}`);
        console.log(`   Full: ${issue.fullLine.substring(0, 80)}...`);
        console.log('');
      });
    });

    console.log('\n' + '='.repeat(60));
    console.log(`Total issues found: ${this.issues.length}`);
    console.log('='.repeat(60) + '\n');
  }

  scan() {
    console.log('🚀 Starting translation scan...\n');
    
    const files = this.getAllFiles(this.srcPath);
    let scannedCount = 0;

    files.forEach(file => {
      if (this.shouldScanFile(file)) {
        this.scanFile(file);
        scannedCount++;
      }
    });

    console.log(`✅ Scanned ${scannedCount} files\n`);
    
    this.checkTranslationFiles();
    this.generateReport();
  }
}

const checker = new TranslationChecker();
checker.scan();
