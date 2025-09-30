#!/usr/bin/env node

/**
 * Performance Budget Checker
 *
 * Validates that build output meets performance targets:
 * - Initial load: <100 KB
 * - Average page size: <50 KB uncompressed
 * - Gzipped pages: <20 KB
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

// Performance targets
const TARGETS = {
  maxPageSize: 100 * 1024, // 100 KB uncompressed
  maxGzipSize: 20 * 1024,  // 20 KB gzipped
  avgPageSize: 50 * 1024,  // 50 KB average
  maxTotalSize: 10 * 1024 * 1024 // 10 MB total site
};

console.log('🔍 Checking Performance Budget...\n');

// Check if dist exists
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist/ directory not found. Run `npm run build` first.');
  process.exit(1);
}

// Find all HTML files
function findHtmlFiles(dir) {
  const files = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

const htmlFiles = findHtmlFiles(distDir);

if (htmlFiles.length === 0) {
  console.error('❌ Error: No HTML files found in dist/');
  process.exit(1);
}

console.log(`📄 Found ${htmlFiles.length} HTML pages\n`);

// Analyze each file
const results = {
  pages: [],
  violations: [],
  totalSize: 0
};

for (const file of htmlFiles) {
  const relativePath = path.relative(distDir, file);
  const content = fs.readFileSync(file);
  const size = content.length;
  const gzippedSize = zlib.gzipSync(content).length;

  results.pages.push({
    path: relativePath,
    size,
    gzippedSize
  });

  results.totalSize += size;

  // Check violations
  if (size > TARGETS.maxPageSize) {
    results.violations.push({
      type: 'PAGE_SIZE',
      path: relativePath,
      size,
      limit: TARGETS.maxPageSize
    });
  }

  if (gzippedSize > TARGETS.maxGzipSize) {
    results.violations.push({
      type: 'GZIP_SIZE',
      path: relativePath,
      size: gzippedSize,
      limit: TARGETS.maxGzipSize
    });
  }
}

// Calculate statistics
const avgSize = results.totalSize / results.pages.length;
const maxPage = results.pages.reduce((max, page) =>
  page.size > max.size ? page : max
);
const minPage = results.pages.reduce((min, page) =>
  page.size < min.size ? page : min
);

// Format bytes
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// Display results
console.log('📊 Performance Metrics:\n');

console.log(`Total Pages: ${results.pages.length}`);
console.log(`Total Size: ${formatBytes(results.totalSize)}`);
console.log(`Average Size: ${formatBytes(avgSize)}`);
console.log(`Largest Page: ${maxPage.path} (${formatBytes(maxPage.size)})`);
console.log(`Smallest Page: ${minPage.path} (${formatBytes(minPage.size)})`);
console.log('');

// Top 5 largest pages
console.log('📈 Top 5 Largest Pages:\n');
const sortedPages = [...results.pages].sort((a, b) => b.size - a.size);
sortedPages.slice(0, 5).forEach((page, i) => {
  console.log(`${i + 1}. ${page.path}`);
  console.log(`   Uncompressed: ${formatBytes(page.size)}`);
  console.log(`   Gzipped: ${formatBytes(page.gzippedSize)}`);
  console.log('');
});

// Performance Budget Status
console.log('🎯 Performance Budget:\n');

const checks = [
  {
    name: 'Max Page Size',
    status: maxPage.size <= TARGETS.maxPageSize,
    actual: formatBytes(maxPage.size),
    target: formatBytes(TARGETS.maxPageSize)
  },
  {
    name: 'Average Page Size',
    status: avgSize <= TARGETS.avgPageSize,
    actual: formatBytes(avgSize),
    target: formatBytes(TARGETS.avgPageSize)
  },
  {
    name: 'Max Gzipped Size',
    status: maxPage.gzippedSize <= TARGETS.maxGzipSize,
    actual: formatBytes(maxPage.gzippedSize),
    target: formatBytes(TARGETS.maxGzipSize)
  },
  {
    name: 'Total Site Size',
    status: results.totalSize <= TARGETS.maxTotalSize,
    actual: formatBytes(results.totalSize),
    target: formatBytes(TARGETS.maxTotalSize)
  }
];

checks.forEach(check => {
  const icon = check.status ? '✅' : '❌';
  const comparison = check.status ? 'under' : 'OVER';
  console.log(`${icon} ${check.name}: ${check.actual} (${comparison} ${check.target} target)`);
});

console.log('');

// Display violations
if (results.violations.length > 0) {
  console.log('⚠️  Performance Budget Violations:\n');
  results.violations.forEach(v => {
    console.log(`❌ ${v.type}: ${v.path}`);
    console.log(`   ${formatBytes(v.size)} exceeds ${formatBytes(v.limit)} limit\n`);
  });
  process.exit(1);
} else {
  console.log('✅ All pages meet performance budget! 🎉\n');

  // Calculate how much under budget we are
  const underBudget = ((TARGETS.maxPageSize - maxPage.size) / TARGETS.maxPageSize * 100).toFixed(1);
  console.log(`💪 Largest page is ${underBudget}% under budget!`);
  console.log(`🚀 Average page is ${formatBytes(avgSize)} (${((1 - avgSize / TARGETS.avgPageSize) * 100).toFixed(1)}% under target)\n`);
}

process.exit(0);
