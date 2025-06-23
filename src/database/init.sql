-- Drop existing table if it exists
DROP TABLE IF EXISTS protocols;

-- Create new protocols table matching CSV structure
CREATE TABLE protocols (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    age_bracket TEXT NOT NULL,
    gender TEXT NOT NULL,
    primary_sport TEXT NOT NULL,
    training_frequency TEXT NOT NULL,
    training_intensity TEXT NOT NULL,
    coaching_sessions TEXT NOT NULL,
    years_of_practice TEXT NOT NULL,
    secondary_sport TEXT,
    training_frequency_secondary TEXT,
    training_intensity_secondary TEXT,
    coaching_sessions_secondary TEXT,
    years_of_practice_secondary TEXT,
    allergens TEXT,
    medical_history TEXT,
    handedness TEXT NOT NULL,
    target TEXT NOT NULL,
    recommended_stack TEXT,
    protocol TEXT,
    timing TEXT,
    dosage TEXT,
    nutrition_advice TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for fast searching
CREATE INDEX idx_protocols_lookup 
ON protocols(age_bracket, gender, primary_sport, training_frequency, training_intensity, target);