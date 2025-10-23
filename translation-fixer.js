// translation-fixer.js
// Automatically fixes untranslated strings in your codebase
// Usage: node translation-fixer.js [--dry-run] [--file=path/to/file.tsx]

const fs = require('fs');
const path = require('path');

class TranslationFixer {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.targetFile = options.targetFile || null;
    this.fixes = [];
    this.errors = [];
    this.localesPath = path.join(__dirname, 'src', 'i18n', 'locales');
    this.srcPath = path.join(__dirname, 'src');
  }

  generateKey(text, section) {
    const cleaned = text
      .replace(/[^\w\s]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .substring(0, 40);
    
    return cleaned;
  }

  getSection(filePath) {
    const fileName = path.basename(filePath, path.extname(filePath));
    const dirName = path.basename(path.dirname(filePath));
    
    if (dirName === 'components') {
      return fileName.toLowerCase();
    } else if (dirName === 'pages') {
      return fileName.toLowerCase();
    }
    
    return 'common';
  }

  shouldProcess(line) {
    if (line.includes('{t(')) return false;
    if (line.trim().startsWith('import ') || 
        line.trim().startsWith('//') || 
        line.trim().startsWith('/*')) return false;
    if (/className=|alt=|src=|href=/.test(line)) return false;
    
    return true;
  }

  extractPatterns(line) {
    const patterns = [];
    
    const jsxTextRegex = />([A-Z][^<>{]*)</g;
    let match;
    while ((match = jsxTextRegex.exec(line)) !== null) {
      const text = match[1].trim();
      if (text.length > 2 && !/^\d+$/.test(text)) {
        patterns.push({
          type: 'jsx-text',
          text: text,
          original: match[0],
          needsBraces: true
        });
      }
    }
    
    const placeholderRegex = /placeholder=["']([^"']+)["']/g;
    while ((match = placeholderRegex.exec(line)) !== null) {
      patterns.push({
        type: 'placeholder',
        text: match[1],
        original: match[0],
        needsBraces: false
      });
    }
    
    const titleRegex = /title=["']([^"']+)["']/g;
    while ((match = titleRegex.exec(line)) !== null) {
      patterns.push({
        type: 'title',
        text: match[1],
        original: match[0],
        needsBraces: false
      });
    }
    
    const ariaRegex = /aria-label=["']([^"']+)["']/g;
    while ((match = ariaRegex.exec(line)) !== null) {
      patterns.push({
        type: 'aria-label',
        text: match[1],
        original: match[0],
        needsBraces: false
      });
    }
    
    return patterns;
  }

  fixLine(line, filePath, lineNumber) {
    if (!this.shouldProcess(line)) return line;
    
    const patterns = this.extractPatterns(line);
    if (patterns.length === 0) return line;
    
    let fixedLine = line;
    const section = this.getSection(filePath);
    
    patterns.forEach(pattern => {
      const key = this.generateKey(pattern.text, section);
      const fullKey = `${section}.${key}`;
      
      let replacement;
      if (pattern.type === 'jsx-text') {
        replacement = pattern.original.replace(pattern.text, `{t('${fullKey}')}`);
      } else {
        replacement = `${pattern.type}={t('${fullKey}')}`;
      }
      
      fixedLine = fixedLine.replace(pattern.original, replacement);
      
      this.fixes.push({
        file: path.relative(this.srcPath, filePath),
        line: lineNumber,
        type: pattern.type,
        original: pattern.text,
        key: fullKey,
        replacement: replacement
      });
      
      this.addToLocales(section, key, pattern.text);
    });
    
    return fixedLine;
  }

  addToLocales(section, key, englishText) {
    try {
      const enPath = path.join(this.localesPath, 'en.json');
      const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
      
      if (!enData[section]) enData[section] = {};
      enData[section][key] = englishText;
      
      if (!this.dryRun) {
        fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n');
      }
      
      const esPath = path.join(this.localesPath, 'es.json');
      const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));
      
      if (!esData[section]) esData[section] = {};
      esData[section][key] = `[TRANSLATE] ${englishText}`;
      
      if (!this.dryRun) {
        fs.writeFileSync(esPath, JSON.stringify(esData, null, 2) + '\n');
      }
    } catch (error) {
      this.errors.push({
        type: 'locale-update',
        message: error.message,
        section,
        key
      });
    }
  }

  ensureImport(content, filePath) {
    if (content.includes("import { useTranslation }")) {
      return content;
    }
    
    if (!content.includes('import React') && !content.includes("from 'react'")) {
      return content;
    }
    
    const lines = content.split('\n');
    let importAdded = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("from 'react'") || lines[i].includes('from "react"')) {
        lines.splice(i + 1, 0, "import { useTranslation } from 'react-i18next';");
        importAdded = true;
        break;
      }
    }
    
    if (importAdded) {
      this.fixes.push({
        file: path.relative(this.srcPath, filePath),
        line: 'import',
        type: 'add-import',
        original: '',
        key: 'useTranslation',
        replacement: "import { useTranslation } from 'react-i18next';"
      });
    }
    
    return lines.join('\n');
  }

  ensureTranslationHook(content, filePath) {
    if (content.includes('const { t }') || content.includes('const {t}')) {
      return content;
    }
    
    const componentRegex = /(?:const|function)\s+(\w+)\s*=?\s*\([^)]*\)\s*(?:=>)?\s*{/;
    const match = content.match(componentRegex);
    
    if (!match) return content;
    
    const lines = content.split('\n');
    let hookAdded = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(match[0])) {
        const indent = lines[i].match(/^\s*/)[0];
        lines.splice(i + 1, 0, `${indent}  const { t } = useTranslation();`);
        hookAdded = true;
        
        this.fixes.push({
          file: path.relative(this.srcPath, filePath),
          line: i + 2,
          type: 'add-hook',
          original: '',
          key: 't',
          replacement: 'const { t } = useTranslation();'
        });
        break;
      }
    }
    
    return lines.join('\n');
  }

  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      let modified = false;
      
      const fixedLines = lines.map((line, index) => {
        const fixedLine = this.fixLine(line, filePath, index + 1);
        if (fixedLine !== line) modified = true;
        return fixedLine;
      });
      
      if (modified) {
        content = fixedLines.join('\n');
        content = this.ensureImport(content, filePath);
        content = this.ensureTranslationHook(content, filePath);
        
        if (!this.dryRun) {
          fs.writeFileSync(filePath, content);
        }
      }
      
      return modified;
    } catch (error) {
      this.errors.push({
        file: path.relative(this.srcPath, filePath),
        type: 'file-process',
        message: error.message
      });
      return false;
    }
  }

  getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!['node_modules', 'dist', 'build', '.next'].includes(file)) {
          arrayOfFiles = this.getAllFiles(fullPath, arrayOfFiles);
        }
      } else {
        if (['.tsx', '.ts', '.jsx', '.js'].includes(path.extname(file))) {
          arrayOfFiles.push(fullPath);
        }
      }
    });
    
    return arrayOfFiles;
  }

  generateReport() {
    console.log('\n' + '='.repeat(70));
    console.log('🔧 TRANSLATION AUTO-FIXER REPORT');
    console.log('='.repeat(70) + '\n');
    
    if (this.dryRun) {
      console.log('⚠️  DRY RUN MODE - No files were actually modified\n');
    }
    
    console.log(`✅ Total fixes applied: ${this.fixes.length}\n`);
    
    const byType = {};
    this.fixes.forEach(fix => {
      if (!byType[fix.type]) byType[fix.type] = [];
      byType[fix.type].push(fix);
    });
    
    Object.keys(byType).forEach(type => {
      console.log(`📝 ${type}: ${byType[type].length} fixes`);
    });
    
    console.log('\n' + '-'.repeat(70) + '\n');
    
    console.log('Recent fixes:\n');
    this.fixes.slice(-10).forEach(fix => {
      console.log(`  ${fix.file}:${fix.line}`);
      console.log(`    "${fix.original}" → t('${fix.key}')`);
      console.log('');
    });
    
    if (this.errors.length > 0) {
      console.log('\n❌ Errors encountered:\n');
      this.errors.forEach(error => {
        console.log(`  ${error.file || error.type}: ${error.message}`);
      });
    }
    
    console.log('\n' + '='.repeat(70));
    console.log(`Summary: ${this.fixes.length} fixes, ${this.errors.length} errors`);
    console.log('='.repeat(70) + '\n');
    
    if (this.dryRun) {
      console.log('Run without --dry-run to apply these changes.\n');
    }
  }

  run() {
    console.log('🚀 Starting auto-fixer...\n');
    
    let files;
    if (this.targetFile) {
      files = [path.join(__dirname, this.targetFile)];
    } else {
      files = this.getAllFiles(this.srcPath);
    }
    
    let processedCount = 0;
    let modifiedCount = 0;
    
    files.forEach(file => {
      const wasModified = this.processFile(file);
      if (wasModified) modifiedCount++;
      processedCount++;
    });
    
    console.log(`📊 Processed ${processedCount} files, modified ${modifiedCount} files\n`);
    
    this.generateReport();
  }
}

const args = process.argv.slice(2);
const options = {
  dryRun: args.includes('--dry-run'),
  targetFile: args.find(arg => arg.startsWith('--file='))?.split('=')[1]
};

const fixer = new TranslationFixer(options);
fixer.run();
