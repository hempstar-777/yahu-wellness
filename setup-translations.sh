#!/bin/bash

echo "🚀 Setting up translation system..."

# Install husky
echo "📦 Installing husky..."
npm install --save-dev husky

# Initialize husky
echo "🔧 Initializing husky..."
npx husky init

# Create pre-commit hook
echo "🪝 Creating pre-commit hook..."
echo "npm run check:translations" > .husky/pre-commit
chmod +x .husky/pre-commit

# Add scripts to package.json
echo "📝 Adding NPM scripts..."
npm pkg set scripts.check:translations="node translation-checker.js"
npm pkg set scripts.fix:translations="node translation-fixer.js"
npm pkg set scripts.coverage:translations="node translation-coverage.js"

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm run check:translations"
echo "2. Run: npm run fix:translations --dry-run"
echo "3. Run: npm run fix:translations"
echo "4. Run: npm run coverage:translations"
