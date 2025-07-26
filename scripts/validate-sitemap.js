#!/usr/bin/env node

/**
 * Sitemap Validation Script
 * This script validates the sitemap.xml and checks for broken links
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SITEMAP_PATH = path.join(__dirname, '../client/public/sitemap.xml');
const BASE_URL = 'https://acmyx.com';

// Read and parse sitemap
function readSitemap() {
  try {
    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
    
    if (!urlMatches) {
      console.error('No URLs found in sitemap');
      return [];
    }
    
    return urlMatches.map(match => {
      const url = match.replace(/<\/?loc>/g, '');
      return url;
    });
  } catch (error) {
    console.error('Error reading sitemap:', error.message);
    return [];
  }
}

// Check if URL is accessible
function checkUrl(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'HEAD',
      timeout: 10000,
      headers: {
        'User-Agent': 'Sitemap-Validator/1.0'
      }
    };
    
    const req = https.request(options, (res) => {
      resolve({
        url,
        status: res.statusCode,
        statusText: res.statusMessage,
        valid: res.statusCode >= 200 && res.statusCode < 400
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url,
        status: 0,
        statusText: error.message,
        valid: false
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        statusText: 'Timeout',
        valid: false
      });
    });
    
    req.end();
  });
}

// Main validation function
async function validateSitemap() {
  console.log('🔍 Validating sitemap.xml...\n');
  
  const urls = readSitemap();
  
  if (urls.length === 0) {
    console.log('❌ No URLs found in sitemap');
    return;
  }
  
  console.log(`📋 Found ${urls.length} URLs in sitemap\n`);
  
  const results = [];
  
  for (const url of urls) {
    process.stdout.write(`Checking ${url}... `);
    const result = await checkUrl(url);
    results.push(result);
    
    if (result.valid) {
      console.log(`✅ ${result.status}`);
    } else {
      console.log(`❌ ${result.status} - ${result.statusText}`);
    }
  }
  
  console.log('\n📊 Validation Results:');
  console.log('=====================');
  
  const validUrls = results.filter(r => r.valid);
  const invalidUrls = results.filter(r => !r.valid);
  
  console.log(`✅ Valid URLs: ${validUrls.length}`);
  console.log(`❌ Invalid URLs: ${invalidUrls.length}`);
  
  if (invalidUrls.length > 0) {
    console.log('\n❌ Invalid URLs:');
    invalidUrls.forEach(result => {
      console.log(`  - ${result.url} (${result.status} - ${result.statusText})`);
    });
  }
  
  console.log(`\n📈 Success Rate: ${((validUrls.length / results.length) * 100).toFixed(1)}%`);
  
  if (invalidUrls.length > 0) {
    console.log('\n💡 Recommendations:');
    console.log('  - Remove or fix invalid URLs from sitemap.xml');
    console.log('  - Check server configuration for redirect issues');
    console.log('  - Verify all routes are properly implemented in React app');
    process.exit(1);
  } else {
    console.log('\n🎉 All URLs are valid!');
  }
}

// Run validation
if (require.main === module) {
  validateSitemap().catch(console.error);
}

module.exports = { validateSitemap, readSitemap, checkUrl }; 