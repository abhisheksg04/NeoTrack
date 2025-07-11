import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, TrendingUp, AlertTriangle, Droplet, Weight, PlusCircle, Calendar, ChevronDown, ChevronUp, Zap, Ruler, PersonStanding, Activity, Baby, Loader } from 'lucide-react';

// --- DATA (Milk, Fortifier, ESPGHAN) ---
// This section contains the nutritional data for various milk types, formulas, and fortifiers,
// as well as the ESPGHAN guidelines for preterm infant nutrition.

const milkData = {
  pretermMilkEarly: { name: "Preterm Milk (Early)", energy: 69.5, protein: 1.6, fat: 4.0, carbs: 7.0, linoleicAcid: 700, alphaLinolenicAcid: 85, dha: 12.5, ara: 20, epa: 2.5, sodium: 22.5, potassium: 62.5, chloride: 45, calcium: 30, phosphorus: 14, magnesium: 3.5, iron: 0.065, zinc: 0.45, copper: 40, selenium: 1.75, manganese: 3.5, iodine: 12.5, vitaminA: 225, vitaminD: 2.5, vitaminE: 0.35, vitaminK: 2, vitaminC: 4, thiamine: 17.5, riboflavin: 35, niacin: 0.175, vitaminB6: 15, folicAcid: 7.5, vitaminB12: 0.04, pantothenicAcid: 0.25, biotin: 0.75 },
  pretermMilkMature: { name: "Preterm Milk (Mature)", energy: 69.5, protein: 1.1, fat: 4.0, carbs: 7.0, linoleicAcid: 700, alphaLinolenicAcid: 85, dha: 12.5, ara: 20, epa: 2.5, sodium: 22.5, potassium: 62.5, chloride: 45, calcium: 30, phosphorus: 14, magnesium: 3.5, iron: 0.065, zinc: 0.3, copper: 40, selenium: 1.75, manganese: 3.5, iodine: 12.5, vitaminA: 225, vitaminD: 2.5, vitaminE: 0.35, vitaminK: 2, vitaminC: 4, thiamine: 17.5, riboflavin: 35, niacin: 0.175, vitaminB6: 15, folicAcid: 7.5, vitaminB12: 0.04, pantothenicAcid: 0.25, biotin: 0.75 },
};
const formulaData = {
  none: { name: "None", energy: 0, protein: 0, fat: 0, carbs: 0, linoleicAcid: 0, alphaLinolenicAcid: 0, dha: 0, ara: 0, epa: 0, sodium: 0, potassium: 0, chloride: 0, calcium: 0, phosphorus: 0, magnesium: 0, iron: 0, zinc: 0, copper: 0, selenium: 0, manganese: 0, iodine: 0, vitaminA: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminC: 0, thiamine: 0, riboflavin: 0, niacin: 0, vitaminB6: 0, folicAcid: 0, vitaminB12: 0, pantothenicAcid: 0, biotin: 0 },
  preNAN: { name: "Nestle PreNAN (Feed)", energy: 80, protein: 2.73, fat: 3.94, carbs: 8.4, linoleicAcid: 535.5, alphaLinolenicAcid: 53.5, ara: 146, dha: 146, sodium: 50.46, potassium: 77.89, chloride: 76.26, calcium: 98.98, phosphorus: 49.49, magnesium: 6.0, iron: 1.44, zinc: 1.1, copper: 73, manganese: 0.81, selenium: 3.89, iodine: 12.17, vitaminA: 292, vitaminD: 153, vitaminE: 1.2, vitaminK: 13.79, vitaminC: 14.6, thiamine: 104, riboflavin: 146, niacin: 1.38, vitaminB6: 75, folicAcid: 30.83, vitaminB12: 0.187, pantothenicAcid: 0.45, biotin: 2.03 },
  aptamilPreterm: { name: "Aptamil Preterm (Feed)", energy: 80, protein: 2.6, fat: 4.4, carbs: 7.3, linoleicAcid: 567, alphaLinolenicAcid: 95, ara: 26.7, dha: 154, sodium: 66.4, potassium: 66.4, chloride: 87.9, calcium: 102, phosphorus: 51, magnesium: 6.4, iron: 1.62, zinc: 1.02, copper: 82.6, manganese: 8.2, selenium: 4.37, iodine: 16.2, vitaminA: 345.7, vitaminD: 108.5, vitaminE: 2.14, vitaminK: 20.3, vitaminC: 21.8, thiamine: 165.8, riboflavin: 213.3, niacin: 3.4, vitaminB6: 121.5, folicAcid: 377.5, vitaminB12: 0.34, pantothenicAcid: 1.0, biotin: 4.3, epa: 39.4 },
  neosure: { name: "Similac Neosure (Feed)", energy: 74, protein: 2.41, fat: 3.46, carbs: 8.29, linoleicAcid: 454.8, alphaLinolenicAcid: 53.38, ara: 16.22, dha: 10.15, sodium: 51.7, potassium: 93.4, chloride: 77.9, calcium: 101.1, phosphorus: 53.06, magnesium: 6.53, iron: 1.47, zinc: 1.07, copper: 74.7, manganese: 0.77, selenium: 3.68, iodine: 15.16, vitaminA: 951, vitaminD: 90.6, vitaminE: 2.8, vitaminK: 14.5, vitaminC: 18.2, thiamine: 104, riboflavin: 148, niacin: 1.74, vitaminB6: 78.5, folicAcid: 28.8, vitaminB12: 0.26, pantothenicAcid: 0.54, biotin: 5.9 },
};
const fortifierData = {
    none: { name: "None", energy: 0, protein: 0, fat: 0, carbs: 0, sodium: 0, potassium: 0, chloride: 0, calcium: 0, phosphorus: 0, magnesium: 0, iron: 0, zinc: 0, copper: 0, selenium: 0, manganese: 0, iodine: 0, vitaminA: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminC: 0, thiamine: 0, riboflavin: 0, niacin: 0, vitaminB6: 0, folicAcid: 0, vitaminB12: 0, pantothenicAcid: 0, biotin: 0, linoleicAcid: 0, alphaLinolenicAcid: 0, ara: 0, dha: 0, epa: 0 },
    lactodexHMF: { name: "Lactodex HMF", energy: 3.37, protein: 0.27, fat: 0.04, carbs: 0.49, sodium: 0, potassium: 9, chloride: 9.5, calcium: 15.8, phosphorus: 7.9, magnesium: 1.75, iron: 0.3, zinc: 0.04, copper: 14.3, manganese: 1.7, vitaminA: 200, vitaminD: 132.8, vitaminE: 0.84, vitaminK: 1.1, vitaminC: 5, thiamine: 25, riboflavin: 20, niacin: 0.23, vitaminB6: 18.5, folicAcid: 12.5, vitaminB12: 0.05, pantothenicAcid: 0.1, biotin: 0.5 },
    preNANPowder: { name: "PreNAN Powder", energy: 4.93, protein: 0.168, fat: 0.243, carbs: 0.518, linoleicAcid: 33.0, alphaLinolenicAcid: 3.0, ara: 9.0, dha: 9.0, sodium: 3.11, potassium: 4.8, chloride: 4.7, calcium: 6.1, phosphorus: 3.05, magnesium: 0.37, iron: 0.089, zinc: 0.0675, copper: 450, manganese: 5.0, selenium: 0.24, iodine: 0.75, vitaminA: 18, vitaminD: 1.5, vitaminE: 0.12, vitaminK: 1.606, vitaminC: 0.9, thiamine: 64, riboflavin: 90, niacin: 0.85, vitaminB6: 46, folicAcid: 19.0, vitaminB12: 0.115, pantothenicAcid: 0.28, biotin: 1.25 },
    aptamilPretermPowder: { name: "Aptamil Preterm Powder", energy: 4.87, protein: 0.16, fat: 0.27, carbs: 0.452, linoleicAcid: 360, alphaLinolenicAcid: 60, ara: 17.0, dha: 95.0, epa: 25.0, sodium: 41.0, potassium: 41.0, chloride: 53.0, calcium: 63.0, phosphorus: 31.5, magnesium: 4.0, iron: 0.1, zinc: 0.63, copper: 51.0, manganese: 5.0, selenium: 2.7, iodine: 10.0, vitaminA: 213.4, vitaminD: 67.0, vitaminE: 1.3, vitaminK: 12.5, vitaminC: 13.5, thiamine: 102.4, riboflavin: 131.7, niacin: 2.1, vitaminB6: 75.0, folicAcid: 233.0, vitaminB12: 0.21, pantothenicAcid: 0.6, biotin: 2.7 },
    neosurePowder: { name: "Similac Neosure Powder", energy: 4.88, protein: 0.159, fat: 0.228, carbs: 0.547, linoleicAcid: 300, alphaLinolenicAcid: 35.2, ara: 10.7, dha: 6.7, sodium: 34.1, potassium: 61.6, chloride: 51.4, calcium: 66.7, phosphorus: 35.0, magnesium: 4.31, iron: 0.973, zinc: 0.704, copper: 51, manganese: 0.493, selenium: 2.43, iodine: 9.73, vitaminA: 627.9, vitaminD: 60, vitaminE: 1.85, vitaminK: 9.64, vitaminC: 6.0, thiamine: 68.7, riboflavin: 97.5, niacin: 1.15, vitaminB6: 52.0, folicAcid: 19.0, vitaminB12: 0.17, pantothenicAcid: 0.36, biotin: 3.93 },
};
const esphganGuidelines = {
  fluid: { label: "Fluid", unit: "ml/kg/day", min: 150, max: 180 }, energy: { label: "Energy", unit: "kcal/kg/day", min: 115, max: 140 }, protein: { label: "Protein", unit: "g/kg/day", min: 3.5, max: 4.0 }, fat: { label: "Fat", unit: "g/kg/day", min: 4.8, max: 8.1 }, carbs: { label: "Carbohydrates", unit: "g/kg/day", min: 11, max: 15 }, linoleicAcid: { label: "Linoleic Acid", unit: "mg/kg/day", min: 385, max: 1540 }, alphaLinolenicAcid: { label: "α-Linolenic Acid", unit: "mg/kg/day", min: 55, max: Infinity }, dha: { label: "DHA", unit: "mg/kg/day", min: 30, max: 65 }, ara: { label: "ARA", unit: "mg/kg/day", min: 30, max: 100 }, epa: { label: "EPA", unit: "mg/kg/day", min: 0, max: 20 }, sodium: { label: "Sodium", unit: "mg/kg/day", min: 69, max: 115 }, potassium: { label: "Potassium", unit: "mg/kg/day", min: 90, max: 180 }, chloride: { label: "Chloride", unit: "mg/kg/day", min: 106, max: 177 }, calcium: { label: "Calcium", unit: "mg/kg/day", min: 120, max: 200 }, phosphorus: { label: "Phosphorus", unit: "mg/kg/day", min: 68, max: 115 }, magnesium: { label: "Magnesium", unit: "mg/kg/day", min: 9.7, max: 12.1 }, iron: { label: "Iron", unit: "mg/kg/day", min: 2, max: 3 }, zinc: { label: "Zinc", unit: "mg/kg/day", min: 2, max: 3 }, copper: { label: "Copper", unit: "µg/kg/day", min: 120, max: 230 }, selenium: { label: "Selenium", unit: "µg/kg/day", min: 7, max: 10 }, manganese: { label: "Manganese", unit: "µg/kg/day", min: 1, max: 15 }, iodine: { label: "Iodine", unit: "µg/kg/day", min: 11, max: 55 }, vitaminA: { label: "Vitamin A", unit: "IU/kg/day", min: 1333, max: 3300 }, vitaminD: { label: "Vitamin D", unit: "IU/kg/day", min: 400, max: 700 }, vitaminE: { label: "Vitamin E", unit: "mg/kg/day", min: 2.2, max: 11 }, vitaminK: { label: "Vitamin K", unit: "µg/kg/day", min: 4.4, max: 28 }, vitaminC: { label: "Vitamin C", unit: "mg/kg/day", min: 17, max: 43 }, thiamine: { label: "Thiamine (B1)", unit: "µg/kg/day", min: 140, max: 290 }, riboflavin: { label: "Riboflavin (B2)", unit: "µg/kg/day", min: 200, max: 430 }, niacin: { label: "Niacin", unit: "mg/kg/day", min: 1.1, max: 5.7 }, vitaminB6: { label: "Vitamin B6", unit: "µg/kg/day", min: 70, max: 290 }, folicAcid: { label: "Folic Acid", unit: "µg/kg/day", min: 23, max: 100 }, vitaminB12: { label: "Vitamin B12", unit: "µg/kg/day", min: 0.1, max: 0.6 }, pantothenicAcid: { label: "Pantothenic Acid", unit: "mg/kg/day", min: 0.6, max: 2.2 }, biotin: { label: "Biotin", unit: "µg/kg/day", min: 3.5, max: 15 },
};
const guidelineCategories = {
  "Nutrition": ['fluid', 'energy', 'protein', 'fat', 'carbs', 'linoleicAcid', 'alphaLinolenicAcid', 'dha', 'ara', 'epa'],
  "Minerals": ['sodium', 'potassium', 'chloride', 'calcium', 'phosphorus', 'magnesium', 'iron', 'zinc', 'copper', 'selenium', 'manganese', 'iodine'],
  "Vitamins": ['vitaminA', 'vitaminD', 'vitaminE', 'vitaminK', 'vitaminC', 'thiamine', 'riboflavin', 'niacin', 'vitaminB6', 'folicAcid', 'vitaminB12', 'pantothenicAcid', 'biotin']
};
const velocityTargets = {
    "22-27": { "male": { "p3": 21.3, "p50": 20.8, "p97": 20.8 }, "female": { "p3": 20.6, "p50": 21.2, "p97": 21.0 } },
    "28-31": { "male": { "p3": 17.1, "p50": 15.9, "p97": 17.1 }, "female": { "p3": 16.8, "p50": 16.6, "p97": 17.6 } },
    "32-36": { "male": { "p3": 13.5, "p50": 13.2, "p97": 12.4 }, "female": { "p3": 13.7, "p50": 13.3, "p97": 12.9 } },
    "37-40": { "male": { "p3": 9.5, "p50": 9.1, "p97": 8.7 }, "female": { "p3": 9.0, "p50": 8.7, "p97": 8.9 } },
    "41-44": { "male": { "p3": 7.5, "p50": 7.3, "p97": 7.0 }, "female": { "p3": 7.0, "p50": 6.5, "p97": 5.9 } },
    "45-49": { "male": { "p3": 6.1, "p50": 6.0, "p97": 5.9 }, "female": { "p3": 5.6, "p50": 5.4, "p97": 5.2 } },
};

// --- FENTON 2025 LMS DATA ---
// NOTE: The external fetch for this data was failing. The data is now embedded directly
// into the app to prevent network errors. This is a placeholder with sample data.
// For full accuracy, this should be replaced with the complete fenton_2025_lms.csv dataset.
const fentonData = [
    { gender: 'f', measure: 'weight', age: '22', l: '1.484', m: '510.8', s: '0.1287' },
    { gender: 'f', measure: 'weight', age: '23', l: '1.484', m: '582.3', s: '0.1287' },
    { gender: 'f', measure: 'length', age: '22', l: '1', m: '28.1', s: '0.0763' },
    { gender: 'f', measure: 'length', age: '23', l: '1', m: '29.2', s: '0.0763' },
    { gender: 'f', measure: 'head_circ', age: '22', l: '1', m: '19.1', s: '0.075' },
    { gender: 'f', measure: 'head_circ', age: '23', l: '1', m: '20.1', s: '0.075' },
    { gender: 'm', measure: 'weight', age: '22', l: '1.484', m: '515.2', s: '0.1287' },
    { gender: 'm', measure: 'weight', age: '23', l: '1.484', m: '592.1', s: '0.1287' },
    { gender: 'm', measure: 'length', age: '22', l: '1', m: '28.2', s: '0.0763' },
    { gender: 'm', measure: 'length', age: '23', l: '1', m: '29.3', s: '0.0763' },
    { gender: 'm', measure: 'head_circ', age: '22', l: '1', m: '19.2', s: '0.075' },
    { gender: 'm', measure: 'head_circ', age: '23', l: '1', m: '20.2', s: '0.075' },
    // ... Add the rest of the fenton_2025_lms.csv data here
];


// --- Z-Score Calculation Logic (NO LONGER USED FOR NEW REQUIREMENTS) ---
// Kept for reference but the Z-score calculation itself will not be called for display.
const getLMS = (sex, measurement, gestWeek, fentonData) => {
    if (!fentonData) return null;
    const genderKey = sex === 'male' ? 'm' : 'f';
    const chart = fentonData.filter(row => row.gender === genderKey && row.measure === measurement);
    if (chart.length === 0) return null;

    const exactWeekData = chart.find(d => parseFloat(d.age) === gestWeek);
    if (exactWeekData) return { L: parseFloat(exactWeekData.l), M: parseFloat(exactWeekData.m), S: parseFloat(exactWeekData.s) };
    
    if (gestWeek < 22 || gestWeek > 50) return null;

    let week1Data = null;
    let week2Data = null;

    for(let i = chart.length - 1; i >= 0; i--) {
        if(parseFloat(chart[i].age) <= gestWeek) {
            week1Data = chart[i];
            week2Data = chart[i+1];
            break;
        }
    }

    if (!week1Data || !week2Data) return null;

    const fraction = (gestWeek - parseFloat(week1Data.age)) / (parseFloat(week2Data.age) - parseFloat(week1Data.age));
    const L = parseFloat(week1Data.l) + (parseFloat(week2Data.l) - parseFloat(week1Data.l)) * fraction;
    const M = parseFloat(week1Data.m) + (parseFloat(week2Data.m) - parseFloat(week1Data.m)) * fraction;
    const S = parseFloat(week1Data.s) + (parseFloat(week2Data.s) - parseFloat(week1Data.s)) * fraction;
    
    return { L, M, S };
};

const calculateZScore = (sex, measurement, gestWeek, value, fentonData) => {
    if (!value || value <= 0 || !sex || !gestWeek || !fentonData) return null;
    const lms = getLMS(sex, measurement, gestWeek, fentonData);
    if (!lms) return null;
    const { L, M, S } = lms;
    if (L === 0) {
        return Math.log(value / M) / S;
    }
    return (Math.pow((value / M), L) - 1) / (L * S);
};

// --- HELPER & UI COMPONENTS ---
// Reusable components for building the user interface, such as input fields, selectors, and accordions.

const InputField = ({ label, value, onChange, unit, icon, placeholder, min, max }) => (
  <div className="w-full">
    <label className="text-sm font-medium text-gray-600 flex items-center mb-1">{icon}<span className="ml-2">{label}</span></label>
    <div className="relative">
      <input type="number" value={value} min={min} max={max} onChange={onChange} placeholder={placeholder} className="w-full p-3 pl-4 pr-12 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
      {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{unit}</span>}
    </div>
  </div>
);

const Selector = ({ label, value, onChange, options, icon }) => (
  <div>
    <label className="text-sm font-medium text-gray-600 flex items-center mb-1">{icon}<span className="ml-2">{label}</span></label>
    <select value={value} onChange={onChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
      {Object.keys(options).map(key => (<option key={key} value={key}>{options[key].name || key}</option>))}
    </select>
  </div>
);

const Accordion = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-5 text-left">
                <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
                {isOpen ? <ChevronUp className="w-6 h-6 text-blue-500" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
            </button>
            {isOpen && <div className="p-5 pt-0">{children}</div>}
        </div>
    );
};


// --- VIEW COMPONENTS ---
// These components define the different sections (tabs) of the application UI.

const PatientDataView = ({ patientData, setPatientData }) => {
    const { sex, gestationalAgeWeeks, gestationalAgeDays, currentMeasurements, previousMeasurements } = patientData;
    const { setSex, setGestationalAgeWeeks, setGestationalAgeDays, setCurrentMeasurements, setPreviousMeasurements } = setPatientData;
    
    const handleDaysChange = (value) => {
        const num = parseInt(value, 10);
        if (value === "" || (num >= 0 && num <= 6)) {
            setGestationalAgeDays(value);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Baby's Details</h2>
                <Selector label="Sex" value={sex} onChange={(e) => setSex(e.target.value)} options={{'female': {name: 'Female'}, 'male': {name: 'Male'}}} icon={<PersonStanding className="w-4 h-4 text-blue-500" />} />
                <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center mb-1"><Calendar className="w-4 h-4 text-blue-500" /><span className="ml-2">Gestational Age at Birth</span></label>
                    <div className="flex gap-4">
                        <InputField label="Weeks" value={gestationalAgeWeeks} onChange={(e) => setGestationalAgeWeeks(e.target.value)} unit="weeks" icon={<span/>} />
                        <InputField label="Days" value={gestationalAgeDays} onChange={(e) => handleDaysChange(e.target.value)} unit="days" icon={<span/>} min="0" max="6" />
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Current Measurements</h2>
                <InputField label="Postnatal Age" value={currentMeasurements.age} onChange={(e) => setCurrentMeasurements({...currentMeasurements, age: e.target.value})} unit="days" icon={<Calendar className="w-4 h-4 text-gray-500" />} />
                <InputField label="Weight" value={currentMeasurements.weight} onChange={(e) => setCurrentMeasurements({...currentMeasurements, weight: e.target.value})} unit="grams" icon={<Weight className="w-4 h-4 text-gray-500" />} />
                <InputField label="Length" value={currentMeasurements.length} onChange={(e) => setCurrentMeasurements({...currentMeasurements, length: e.target.value})} unit="cm" icon={<Ruler className="w-4 h-4 text-gray-500" />} />
                <InputField label="Head Circumference" value={currentMeasurements.hc} onChange={(e) => setCurrentMeasurements({...currentMeasurements, hc: e.target.value})} unit="cm" icon={<Ruler className="w-4 h-4 text-gray-500" />} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Previous Measurements</h2>
                <InputField label="Postnatal Age" value={previousMeasurements.age} onChange={(e) => setPreviousMeasurements({...previousMeasurements, age: e.target.value})} unit="days" icon={<Calendar className="w-4 h-4 text-gray-500" />} />
                <InputField label="Weight" value={previousMeasurements.weight} onChange={(e) => setPreviousMeasurements({...previousMeasurements, weight: e.target.value})} unit="grams" icon={<Weight className="w-4 h-4 text-gray-500" />} />
                <InputField label="Length" value={previousMeasurements.length} onChange={(e) => setPreviousMeasurements({...previousMeasurements, length: e.target.value})} unit="cm" icon={<Ruler className="w-4 h-4 text-gray-500" />} />
                <InputField label="Head Circumference" value={previousMeasurements.hc} onChange={(e) => setPreviousMeasurements({...previousMeasurements, hc: e.target.value})} unit="cm" icon={<Ruler className="w-4 h-4 text-gray-500" />} />
            </div>
        </div>
    );
};

// Updated GrowthView to display gain per week instead of Z-scores
const GrowthView = ({ weightVelocity, targetVelocity, lengthGainPerWeek, hcGainPerWeek }) => (
    <div className="space-y-8">
        {weightVelocity ? (<VelocityCard value={weightVelocity} targets={targetVelocity} />) : (<div className="text-center py-10 bg-white rounded-lg shadow-sm border"><p className="text-gray-500">Enter valid measurements for weight velocity.</p></div>)}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">Growth Gains</h2>
            <MeasurementGainCard title="Length Gain" value={lengthGainPerWeek} unit="cm/week" />
            <MeasurementGainCard title="Head Circumference Gain" value={hcGainPerWeek} unit="cm/week" />
        </div>
    </div>
);

const NutritionView = ({ nutritionData, setNutritionData, nutritionResults }) => {
    const { breastMilkVolume, selectedBreastMilk, formulaVolume, selectedFormula, fortifierGrams, selectedFortifier } = nutritionData;
    const { setBreastMilkVolume, setSelectedBreastMilk, setFormulaVolume, setSelectedFormula, setFortifierGrams, setSelectedFortifier } = setNutritionData;

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Enteral Nutrition Details</h2>
                
                <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold my-3 text-gray-600">Breast Milk</h3>
                    <Selector label="Type" value={selectedBreastMilk} onChange={(e) => setSelectedBreastMilk(e.target.value)} options={milkData} icon={<Droplet className="w-4 h-4 text-pink-500" />} />
                    <InputField label="Volume" value={breastMilkVolume} onChange={(e) => setBreastMilkVolume(e.target.value)} unit="ml/day" icon={<Droplet className="w-4 h-4 text-pink-500" />} />
                </div>

                <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold my-3 text-gray-600">Formula</h3>
                    <Selector label="Type" value={selectedFormula} onChange={(e) => setSelectedFormula(e.target.value)} options={formulaData} icon={<Droplet className="w-4 h-4 text-blue-500" />} />
                    <InputField label="Volume" value={formulaVolume} onChange={(e) => setFormulaVolume(e.target.value)} unit="ml/day" icon={<Droplet className="w-4 h-4 text-blue-500" />} />
                </div>

                <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold my-3 text-gray-600">Fortification</h3>
                    <Selector label="Fortifier Type" value={selectedFortifier} onChange={(e) => setSelectedFortifier(e.target.value)} options={fortifierData} icon={<Zap className="w-4 h-4 text-orange-500" />} />
                    <InputField label="Fortifier Amount" value={fortifierGrams} onChange={(e) => setFortifierGrams(e.target.value)} unit="grams/day" icon={<PlusCircle className="w-4 h-4 text-orange-500" />} />
                </div>
            </div>
            {nutritionResults ? (
                Object.entries(guidelineCategories).map(([category, keys]) => (
                    <Accordion key={category} title={category} defaultOpen={category === "Nutrition"}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {keys.map(key => {
                                const guideline = esphganGuidelines[key];
                                const result = nutritionResults[key];
                                if (!guideline || !result) return null;
                                return ( <ResultCard key={key} title={guideline.label} value={result.value} unit={guideline.unit} guideline={`${guideline.min}-${guideline.max === Infinity ? '∞' : guideline.max}`} status={result.status} /> );
                            })}
                        </div>
                    </Accordion>
                ))
            ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm border">
                    <p className="text-gray-500">Enter patient weight to see nutrition calculations.</p>
                </div>
            )}
        </div>
    );
};


// --- MAIN APP COMPONENT ---
// This is the root component of the application. It manages the overall state,
// fetches necessary data, performs all calculations, and renders the main layout.

const App = () => {
  const [activeTab, setActiveTab] = useState('patientData');
  
  // Centralized State for user inputs
  const [sex, setSex] = useState('female');
  const [gestationalAgeWeeks, setGestationalAgeWeeks] = useState('32');
  const [gestationalAgeDays, setGestationalAgeDays] = useState('0');
  const [currentMeasurements, setCurrentMeasurements] = useState({ age: '28', weight: '1800', length: '42', hc: '30' });
  const [previousMeasurements, setPreviousMeasurements] = useState({ age: '7', weight: '1500', length: '39', hc: '28' });
  
  const [breastMilkVolume, setBreastMilkVolume] = useState('150');
  const [selectedBreastMilk, setSelectedBreastMilk] = useState('pretermMilkEarly');
  const [formulaVolume, setFormulaVolume] = useState('0');
  const [selectedFormula, setSelectedFormula] = useState('none');
  const [fortifierGrams, setFortifierGrams] = useState('4');
  const [selectedFortifier, setSelectedFortifier] = useState('lactodexHMF');

  // State for calculated results
  const [nutritionResults, setNutritionResults] = useState(null);
  // Removed zScoreResults state
  const [weightVelocity, setWeightVelocity] = useState(null);
  const [targetVelocity, setTargetVelocity] = useState(null);
  const [lengthGainPerWeek, setLengthGainPerWeek] = useState(null); // New state for length gain
  const [hcGainPerWeek, setHcGainPerWeek] = useState(null); // New state for head circumference gain


  // Bundling state and setters for easier prop passing
  const patientData = { sex, gestationalAgeWeeks, gestationalAgeDays, currentMeasurements, previousMeasurements };
  const setPatientData = { setSex, setGestationalAgeWeeks, setGestationalAgeDays, setCurrentMeasurements, setPreviousMeasurements };
  const nutritionData = { breastMilkVolume, selectedBreastMilk, formulaVolume, selectedFormula, fortifierGrams, selectedFortifier };
  const setNutritionData = { setBreastMilkVolume, setSelectedBreastMilk, setFormulaVolume, setSelectedFormula, setFortifierGrams, setSelectedFortifier };

  // --- Main Calculation Effect ---
  // This effect runs whenever any input data changes. It recalculates nutrition,
  // growth velocity, and the new length and HC gains.
  useEffect(() => {
    const numGestAgeWeeks = parseInt(gestationalAgeWeeks, 10) || 0;
    const numGestAgeDays = parseInt(gestationalAgeDays, 10) || 0;
    const numGestAgeBirth = numGestAgeWeeks + (numGestAgeDays / 7);

    const currentWeightG = parseFloat(currentMeasurements.weight) || 0;
    const previousWeightG = parseFloat(previousMeasurements.weight) || 0;
    const numBreastMilkVol = parseFloat(breastMilkVolume) || 0;
    const numFormulaVol = parseFloat(formulaVolume) || 0;
    const numFortifierGrams = parseFloat(fortifierGrams) || 0;

    // --- Nutrition Calculation ---
    if (currentWeightG > 0) {
        const currentWeightKg = currentWeightG / 1000;
        const breastMilkInfo = milkData[selectedBreastMilk];
        const formulaInfo = formulaData[selectedFormula];
        const fortifierInfo = fortifierData[selectedFortifier];
        const calculatedResults = {};
        Object.keys(esphganGuidelines).forEach(key => {
            const guideline = esphganGuidelines[key];
            let totalIntake = 0;
            if (key === 'fluid') {
                totalIntake = numBreastMilkVol + numFormulaVol;
            } else {
                const fromBreastMilk = (numBreastMilkVol * (breastMilkInfo[key] || 0) / 100);
                const fromFormula = (numFormulaVol * (formulaInfo[key] || 0) / 100);
                const fromFortifier = numFortifierGrams * (fortifierInfo[key] || 0);
                totalIntake = fromBreastMilk + fromFormula + fromFortifier;
            }
            const intakePerKg = totalIntake / currentWeightKg;
            const getStatus = (value, g) => (value < g.min) ? 'low' : (value > g.max) ? 'high' : 'normal';
            calculatedResults[key] = { value: intakePerKg.toFixed(1), status: getStatus(intakePerKg, guideline) };
        });
        setNutritionResults(calculatedResults);
    } else {
        setNutritionResults(null);
    }

    // --- Growth Velocity Calculation (Weight) ---
    const daysBetween = (parseFloat(currentMeasurements.age) || 0) - (parseFloat(previousMeasurements.age) || 0);
    if (currentWeightG > 0 && previousWeightG > 0 && daysBetween > 0) {
        const weightDiffG = currentWeightG - previousWeightG;
        const avgWeightKg = ((currentWeightG + previousWeightG) / 2) / 1000;
        const velocityGKgDay = (weightDiffG / avgWeightKg) / daysBetween;
        setWeightVelocity(velocityGKgDay.toFixed(1));

        const pmaAtPrevious = numGestAgeBirth + ((parseFloat(previousMeasurements.age) || 0) / 7);
        let targetRange = null;
        if (pmaAtPrevious >= 22 && pmaAtPrevious < 28) targetRange = velocityTargets["22-27"];
        else if (pmaAtPrevious >= 28 && pmaAtPrevious < 32) targetRange = velocityTargets["28-31"];
        else if (pmaAtPrevious >= 32 && pmaAtPrevious < 37) targetRange = velocityTargets["32-36"];
        else if (pmaAtPrevious >= 37 && pmaAtPrevious < 41) targetRange = velocityTargets["37-40"];
        else if (pmaAtPrevious >= 41 && pmaAtPrevious < 45) targetRange = velocityTargets["41-44"];
        else if (pmaAtPrevious >= 45 && pmaAtPrevious <= 50) targetRange = velocityTargets["45-49"];
        setTargetVelocity(targetRange ? targetRange[sex] : null);

    } else {
        setWeightVelocity(null);
        setTargetVelocity(null);
    }

    // --- Length and Head Circumference Gain Calculation ---
    const currentLength = parseFloat(currentMeasurements.length) || 0;
    const previousLength = parseFloat(previousMeasurements.length) || 0;
    const currentHc = parseFloat(currentMeasurements.hc) || 0;
    const previousHc = parseFloat(previousMeasurements.hc) || 0;

    if (currentLength > 0 && previousLength > 0 && daysBetween > 0) {
        const lengthDiff = currentLength - previousLength;
        const weeksBetween = daysBetween / 7;
        const gainPerWeek = lengthDiff / weeksBetween;
        setLengthGainPerWeek(gainPerWeek.toFixed(1));
    } else {
        setLengthGainPerWeek(null);
    }

    if (currentHc > 0 && previousHc > 0 && daysBetween > 0) {
        const hcDiff = currentHc - previousHc;
        const weeksBetween = daysBetween / 7;
        const gainPerWeek = hcDiff / weeksBetween;
        setHcGainPerWeek(gainPerWeek.toFixed(1));
    } else {
        setHcGainPerWeek(null);
    }

    // Removed Z-score calculation from here
    // setZScoreResults(null); 

  }, [sex, gestationalAgeWeeks, gestationalAgeDays, currentMeasurements, previousMeasurements, breastMilkVolume, selectedBreastMilk, formulaVolume, selectedFormula, fortifierGrams, selectedFortifier]);

  const TabButton = ({ id, label, icon }) => {
    const isActive = activeTab === id;
    return (
        <button 
            onClick={() => setActiveTab(id)}
            className={`flex-1 sm:flex-none sm:w-auto flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
                ${isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
            {icon}
            <span className="ml-2 hidden sm:inline">{label}</span>
        </button>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">NeoTrack</h1>
          <p className="text-md text-gray-500 mt-2">A comprehensive clinical calculator for preterm growth & nutrition</p>
        </header>

        <div className="sticky top-4 z-10 bg-slate-50/80 backdrop-blur-lg p-2 rounded-xl border shadow-sm mb-8 flex flex-wrap items-center justify-center gap-2">
            <TabButton id="patientData" label="Patient Data" icon={<Baby size={20} />} />
            <TabButton id="growth" label="Growth & Gains" icon={<TrendingUp size={20} />} /> {/* Updated label */}
            <TabButton id="nutrition" label="Enteral Nutrition" icon={<Activity size={20} />} />
        </div>

        <main>
            {activeTab === 'patientData' && <PatientDataView patientData={patientData} setPatientData={setPatientData} />}
            {activeTab === 'growth' && <GrowthView weightVelocity={weightVelocity} targetVelocity={targetVelocity} lengthGainPerWeek={lengthGainPerWeek} hcGainPerWeek={hcGainPerWeek} />}
            {activeTab === 'nutrition' && <NutritionView nutritionData={nutritionData} setNutritionData={setNutritionData} nutritionResults={nutritionResults} />}
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm space-y-4">
            <div>
                <p className="font-semibold">Created by - Dr Abhishek SG, DM Resident Neonatology</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg border">
                 <h3 className="text-md font-bold text-gray-700 mb-2">References</h3>
                 <ul className="text-left text-xs space-y-2">
                     <li>
                         1. <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/ppe.70035" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Fenton, T. R., Elmrayed, S., & Alshaikh, B. N. (2025). The 2025 Fenton Preterm Growth Standard. *Paediatric and Perinatal Epidemiology*, 1–13.</a>
                     </li>
                     <li>
                         2. <a href="https://pubmed.ncbi.nlm.nih.gov/36705703/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Embleton, N. D., et al. (2023). Enteral Nutrition in Preterm Infants (2022): A Position Paper From the ESPGHAN Committee on Nutrition and Invited Experts. *Journal of Pediatric Gastroenterology and Nutrition*, 76(2), 248-268.</a>
                     </li>
                 </ul>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
              <AlertTriangle className="inline w-4 h-4 mr-2" />
              <strong>Disclaimer:</strong> This tool is for informational purposes and not a substitute for professional medical advice. Calculations are based on provided data.
            </div>
        </footer>
      </div>
    </div>
  );
};


// --- UI HELPER COMPONENTS ---
// These components are used to display the calculated results in a visually appealing way.

const ResultCard = ({ title, value, unit, guideline, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'high': return 'text-orange-500';
      case 'low': return 'text-yellow-500';
      case 'normal': return 'text-green-500';
      default: return 'text-gray-800';
    }
  };
  const getStatusIcon = () => {
    if (!status) return null;
    switch (status) {
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'low': return <AlertTriangle className="w-5 h-5" />;
      case 'normal': return <ShieldCheck className="w-5 h-5" />;
      default: return null;
    }
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col justify-between h-full">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-3xl font-bold mt-1 ${getStatusColor()}`}>{value}<span className="text-lg ml-1 font-medium">{unit}</span></p>
      </div>
      {guideline && <div className="text-xs text-gray-400 mt-2 flex justify-between items-center">
        <span>ESPGHAN: {guideline}</span>
        <div className={`flex items-center gap-1 ${getStatusColor()}`}>{getStatusIcon()}</div>
      </div>}
    </div>
  );
};

// New component for displaying measurement gains
const MeasurementGainCard = ({ title, value, unit }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-md font-semibold text-gray-700 mb-2">{title}</p>
            <p className="text-2xl font-bold text-blue-600">
                {value !== null ? `${value}` : 'N/A'} <span className="text-lg font-medium">{unit}</span>
            </p>
        </div>
    );
};


const VelocityCard = ({ value, targets }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg shadow-md border border-blue-200 text-center">
    <h3 className="text-lg font-semibold text-blue-800 flex items-center justify-center"><TrendingUp className="w-6 h-6 mr-2" />Weight Gain Velocity</h3>
    <p className="text-5xl font-bold text-blue-600 my-3">{value} <span className="text-2xl font-medium">g/kg/day</span></p>
    {targets && <div className="text-xs text-blue-600 border-t border-blue-200 pt-3">
        <p className="font-semibold mb-1">Target Velocity (g/kg/day) for Post-Menstrual Age (Fenton 2025):</p>
        <div className="flex justify-around">
            <div><span className="font-bold">{targets.p3}</span><br/>3rd</div>
            <div><span className="font-bold">{targets.p50}</span><br/>50th</div>
            <div><span className="font-bold">{targets.p97}</span><br/>97th</div>
        </div>
    </div>}
  </div>
);

export default App;
