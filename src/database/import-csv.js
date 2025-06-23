const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Paths
const dbPath = path.join(__dirname, 'protocols.db');
const csvPath = path.join(__dirname, '../../protocol.csv');
const sqlPath = path.join(__dirname, 'init.sql');

console.log('🚀 Starting database setup...');

// Remove existing database
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('🗑️  Removed existing database');
}

// Create new database
const db = new Database(dbPath);
console.log('📁 Created new database');

// Execute init SQL
const initSQL = fs.readFileSync(sqlPath, 'utf8');
db.exec(initSQL);
console.log('🏗️  Created table structure');

// Read and parse CSV
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

console.log('📊 CSV Headers:', headers);
console.log('📈 Found', lines.length - 1, 'data rows');

// Prepare insert statement
const insertSQL = `
INSERT INTO protocols (
  age_bracket, gender, primary_sport, training_frequency, training_intensity,
  coaching_sessions, years_of_practice, secondary_sport, training_frequency_secondary,
  training_intensity_secondary, coaching_sessions_secondary, years_of_practice_secondary,
  allergens, medical_history, handedness, target, recommended_stack, protocol,
  timing, dosage, nutrition_advice
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const insert = db.prepare(insertSQL);

// Process each data row
let imported = 0;
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  
  try {
    // Parse CSV row (handling quoted fields)
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // Last value
    
    // Clean values (remove quotes)
    const cleanValues = values.map(v => v.replace(/^"(.*)"$/, '$1'));
    
    if (cleanValues.length >= 16) {
      insert.run(...cleanValues);
      imported++;
    } else {
      console.log(`⚠️  Skipped row ${i}: insufficient columns (${cleanValues.length})`);
    }
  } catch (error) {
    console.error(`❌ Error processing row ${i}:`, error.message);
  }
}

console.log('✅ Imported', imported, 'protocols');

// Verify import
const count = db.prepare('SELECT COUNT(*) as count FROM protocols').get();
console.log('🔍 Database contains', count.count, 'records');

// Show a sample record
const sample = db.prepare('SELECT * FROM protocols LIMIT 1').get();
console.log('📋 Sample record:', sample);

db.close();
console.log('✨ Database setup complete!');