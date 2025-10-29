#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files and patterns to exclude from console.log removal
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.env',
  'package.json',
  'package-lock.json',
  'scripts/remove-console-logs.js', // Don't modify this script itself
  'public/sw.js', // Keep service worker logs for debugging
  'src/utils/performanceMonitor.ts', // Keep performance monitoring logs
  'src/utils/performanceTest.ts', // Keep performance test logs
  'src/utils/offlineManager.ts', // Keep offline manager logs for debugging
];

// Console methods to remove
const CONSOLE_METHODS = [
  'console.log',
  'console.info',
  'console.debug',
  'console.warn', // Keep some warnings for critical issues
  'console.error', // Keep errors for debugging
];

function shouldExcludeFile(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function removeConsoleLogs(content, filePath) {
  let modifiedContent = content;
  let removedCount = 0;

  // Remove console.log and console.info statements
  const consoleRegex = /^\s*console\.(log|info|debug)\s*\([^;]*\);\s*$/gm;
  
  modifiedContent = modifiedContent.replace(consoleRegex, (match) => {
    removedCount++;
    return ''; // Remove the entire line
  });

  // Remove inline console.log calls (but keep the rest of the line)
  const inlineConsoleRegex = /console\.(log|info|debug)\s*\([^)]*\)(?:,\s*)?/g;
  
  modifiedContent = modifiedContent.replace(inlineConsoleRegex, (match) => {
    // Only remove if it's not part of a larger expression
    if (!match.includes('&&') && !match.includes('||')) {
      removedCount++;
      return '';
    }
    return match;
  });

  if (removedCount > 0) {
    console.log(`Removed ${removedCount} console statements from ${filePath}`);
  }

  return { content: modifiedContent, removedCount };
}

function processFile(filePath) {
  if (shouldExcludeFile(filePath)) {
    return 0;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: modifiedContent, removedCount } = removeConsoleLogs(content, filePath);
    
    if (removedCount > 0) {
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
    }
    
    return removedCount;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return 0;
  }
}

function processDirectory(dirPath) {
  let totalRemoved = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        if (!shouldExcludeFile(itemPath)) {
          totalRemoved += processDirectory(itemPath);
        }
      } else if (stat.isFile()) {
        // Process TypeScript, JavaScript, and JSX files
        if (/\.(ts|tsx|js|jsx)$/.test(item)) {
          totalRemoved += processFile(itemPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
  
  return totalRemoved;
}

function main() {
  console.log('🧹 Starting console.log cleanup...');
  
  const projectRoot = path.resolve(__dirname, '..');
  const totalRemoved = processDirectory(projectRoot);
  
  console.log(`\n✅ Cleanup completed!`);
  console.log(`📊 Total console statements removed: ${totalRemoved}`);
  
  if (totalRemoved > 0) {
    console.log('\n⚠️  Note: Some console.warn and console.error statements were preserved for debugging.');
    console.log('📝 Review the changes and test your application before committing.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { removeConsoleLogs, processFile, processDirectory };