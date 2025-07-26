#!/usr/bin/env node

/**
 * Structured Data Validation Script
 * This script validates structured data and ensures it meets Google's requirements
 */

const fs = require('fs');
const path = require('path');

// Define required properties for different structured data types
const COURSE_REQUIREMENTS = {
  required: ['@context', '@type', 'name', 'description', 'provider'],
  courseInstance: {
    required: ['@type', 'courseMode', 'inLanguage'],
    conditional: ['courseWorkload', 'courseSchedule'] // Either courseWorkload OR courseSchedule is required
  }
};

// Function to extract structured data from HTML/JS files
function extractStructuredData(content) {
  const scriptMatches = content.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  const structuredData = [];
  
  if (scriptMatches) {
    scriptMatches.forEach(match => {
      try {
        const jsonMatch = match.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
        if (jsonMatch && jsonMatch[1]) {
          const jsonContent = jsonMatch[1].trim();
          const data = JSON.parse(jsonContent);
          structuredData.push(data);
        }
      } catch (error) {
        console.warn('⚠️  Could not parse structured data:', error.message);
      }
    });
  }
  
  return structuredData;
}

// Function to validate course structured data
function validateCourseData(data) {
  const errors = [];
  const warnings = [];
  
  // Check if it's a Course type
  if (data['@type'] !== 'Course') {
    return { errors, warnings };
  }
  
  // Check required properties
  COURSE_REQUIREMENTS.required.forEach(prop => {
    if (!data[prop]) {
      errors.push(`Missing required property: ${prop}`);
    }
  });
  
  // Check hasCourseInstance
  if (data.hasCourseInstance) {
    const instance = data.hasCourseInstance;
    
    // Check required properties for CourseInstance
    COURSE_REQUIREMENTS.courseInstance.required.forEach(prop => {
      if (!instance[prop]) {
        errors.push(`Missing required property in hasCourseInstance: ${prop}`);
      }
    });
    
    // Check conditional properties (either courseWorkload OR courseSchedule)
    const hasWorkload = instance.courseWorkload;
    const hasSchedule = instance.courseSchedule;
    
    if (!hasWorkload && !hasSchedule) {
      errors.push('Either courseWorkload or courseSchedule must be specified in hasCourseInstance');
    }
    
    // Validate courseWorkload format if present
    if (hasWorkload && !hasWorkload.match(/^PT\d+[HMS]$/)) {
      warnings.push('courseWorkload should follow ISO 8601 duration format (e.g., PT120H for 120 hours)');
    }
    
    // Check provider structure
    if (data.provider && data.provider['@type'] !== 'Organization') {
      warnings.push('Provider should have @type: "Organization"');
    }
    
    if (data.provider && !data.provider.name) {
      errors.push('Provider must have a name');
    }
  } else {
    errors.push('Course must have hasCourseInstance property');
  }
  
  return { errors, warnings };
}

// Function to scan files for structured data
function scanFilesForStructuredData(directory) {
  const results = [];
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(filePath);
      } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html'))) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const structuredData = extractStructuredData(content);
          
          if (structuredData.length > 0) {
            results.push({
              file: filePath,
              structuredData
            });
          }
        } catch (error) {
          console.warn(`⚠️  Could not read file ${filePath}:`, error.message);
        }
      }
    });
  }
  
  scanDirectory(directory);
  return results;
}

// Main validation function
function validateStructuredData() {
  console.log('🔍 Validating structured data...\n');
  
  const clientDir = path.join(__dirname, '../client');
  const filesWithStructuredData = scanFilesForStructuredData(clientDir);
  
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalCourses = 0;
  
  filesWithStructuredData.forEach(fileResult => {
    console.log(`📁 File: ${fileResult.file}`);
    
    fileResult.structuredData.forEach((data, index) => {
      console.log(`  📄 Structured Data #${index + 1}:`);
      
      if (data['@type'] === 'Course') {
        totalCourses++;
        const validation = validateCourseData(data);
        
        if (validation.errors.length > 0) {
          console.log('    ❌ Errors:');
          validation.errors.forEach(error => {
            console.log(`      - ${error}`);
            totalErrors++;
          });
        }
        
        if (validation.warnings.length > 0) {
          console.log('    ⚠️  Warnings:');
          validation.warnings.forEach(warning => {
            console.log(`      - ${warning}`);
            totalWarnings++;
          });
        }
        
        if (validation.errors.length === 0 && validation.warnings.length === 0) {
          console.log('    ✅ Valid course structured data');
        }
      } else {
        console.log(`    ℹ️  Type: ${data['@type']} (not a course)`);
      }
    });
    
    console.log('');
  });
  
  console.log('📊 Validation Summary:');
  console.log('=====================');
  console.log(`📁 Files scanned: ${filesWithStructuredData.length}`);
  console.log(`📚 Course structured data found: ${totalCourses}`);
  console.log(`❌ Total errors: ${totalErrors}`);
  console.log(`⚠️  Total warnings: ${totalWarnings}`);
  
  if (totalErrors > 0) {
    console.log('\n💡 Recommendations:');
    console.log('  - Fix all errors to ensure proper Google Search Console compliance');
    console.log('  - Add missing courseWorkload or courseSchedule properties');
    console.log('  - Ensure all required properties are present');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('\n💡 Recommendations:');
    console.log('  - Consider fixing warnings for better structured data quality');
    console.log('  - Ensure courseWorkload follows ISO 8601 format');
  } else {
    console.log('\n🎉 All structured data is valid!');
  }
}

// Run validation
if (require.main === module) {
  validateStructuredData().catch(console.error);
}

module.exports = { validateStructuredData, validateCourseData, extractStructuredData }; 