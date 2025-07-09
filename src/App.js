import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, TrendingUp, AlertTriangle, Droplet, Weight, PlusCircle, Calendar, ChevronDown, ChevronUp, Zap, Ruler, PersonStanding, Activity, Baby } from 'lucide-react';

// --- DATA (Milk, Fortifier, ESPGHAN, Fenton) ---
const milkData = {
  pretermMilkEarly: { name: "Preterm Milk (Early)", energy: 69.5, protein: 1.6, fat: 4.0, carbs: 7.0, linoleicAcid: 700, alphaLinolenicAcid: 85, dha: 12.5, ara: 20, epa: 2.5, sodium: 22.5, potassium: 62.5, chloride: 45, calcium: 30, phosphorus: 14, magnesium: 3.5, iron: 0.065, zinc: 0.45, copper: 40, selenium: 1.75, manganese: 3.5, iodine: 12.5, vitaminA: 225, vitaminD: 2.5, vitaminE: 0.35, vitaminK: 2, vitaminC: 4, thiamine: 17.5, riboflavin: 35, niacin: 0.175, vitaminB6: 15, folicAcid: 7.5, vitaminB12: 0.04, pantothenicAcid: 0.25, biotin: 0.75 },
  pretermMilkMature: { name: "Preterm Milk (Mature)", energy: 69.5, protein: 1.1, fat: 4.0, carbs: 7.0, linoleicAcid: 700, alphaLinolenicAcid: 85, dha: 12.5, ara: 20, epa: 2.5, sodium: 22.5, potassium: 62.5, chloride: 45, calcium: 30, phosphorus: 14, magnesium: 3.5, iron: 0.065, zinc: 0.3, copper: 40, selenium: 1.75, manganese: 3.5, iodine: 12.5, vitaminA: 225, vitaminD: 2.5, vitaminE: 0.35, vitaminK: 2, vitaminC: 4, thiamine: 17.5, riboflavin: 35, niacin: 0.175, vitaminB6: 15, folicAcid: 7.5, vitaminB12: 0.04, pantothenicAcid: 0.25, biotin: 0.75 },
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
const fenton_data = {
    "male": { "weight": [ { "week": 22, "L": -1.334, "M": 519.8, "S": 0.1248 }, { "week": 23, "L": -1.13, "M": 600.3, "S": 0.1264 }, { "week": 24, "L": -0.93, "M": 690.6, "S": 0.128 }, { "week": 25, "L": -0.74, "M": 791.5, "S": 0.1296 }, { "week": 26, "L": -0.55, "M": 903.8, "S": 0.1312 }, { "week": 27, "L": -0.37, "M": 1028.3, "S": 0.1328 }, { "week": 28, "L": -0.19, "M": 1165.8, "S": 0.1344 }, { "week": 29, "L": -0.01, "M": 1317.2, "S": 0.136 }, { "week": 30, "L": 0.16, "M": 1483.2, "S": 0.1376 }, { "week": 31, "L": 0.33, "M": 1664.6, "S": 0.1392 }, { "week": 32, "L": 0.49, "M": 1862.2, "S": 0.1408 }, { "week": 33, "L": 0.64, "M": 2076.8, "S": 0.1424 }, { "week": 34, "L": 0.78, "M": 2309.2, "S": 0.144 }, { "week": 35, "L": 0.91, "M": 2559.8, "S": 0.1456 }, { "week": 36, "L": 1.03, "M": 2829.2, "S": 0.1472 }, { "week": 37, "L": 1.13, "M": 3117.8, "S": 0.1488 }, { "week": 38, "L": 1.22, "M": 3425.8, "S": 0.1504 }, { "week": 39, "L": 1.29, "M": 3753.6, "S": 0.152 }, { "week": 40, "L": 1.34, "M": 4101.4, "S": 0.1536 }, { "week": 41, "L": 1.37, "M": 4469.4, "S": 0.1552 }, { "week": 42, "L": 1.38, "M": 4857.6, "S": 0.1568 }, { "week": 43, "L": 1.37, "M": 5266, "S": 0.1584 }, { "week": 44, "L": 1.34, "M": 5694.4, "S": 0.16 }, { "week": 45, "L": 1.29, "M": 6142.6, "S": 0.1616 }, { "week": 46, "L": 1.23, "M": 6610.4, "S": 0.1632 }, { "week": 47, "L": 1.15, "M": 7097.4, "S": 0.1648 }, { "week": 48, "L": 1.06, "M": 7603.4, "S": 0.1664 }, { "week": 49, "L": 0.95, "M": 8127.8, "S": 0.168 }, { "week": 50, "L": 0.83, "M": 8670.2, "S": 0.1696 } ], "length": [ { "week": 22, "L": 0.99, "M": 28.1, "S": 0.051 }, { "week": 23, "L": 1, "M": 29.3, "S": 0.051 }, { "week": 24, "L": 1.01, "M": 30.5, "S": 0.051 }, { "week": 25, "L": 1.02, "M": 31.7, "S": 0.051 }, { "week": 26, "L": 1.03, "M": 32.9, "S": 0.051 }, { "week": 27, "L": 1.04, "M": 34.1, "S": 0.051 }, { "week": 28, "L": 1.05, "M": 35.3, "S": 0.051 }, { "week": 29, "L": 1.06, "M": 36.5, "S": 0.051 }, { "week": 30, "L": 1.07, "M": 37.7, "S": 0.051 }, { "week": 31, "L": 1.08, "M": 38.9, "S": 0.051 }, { "week": 32, "L": 1.09, "M": 40.1, "S": 0.051 }, { "week": 33, "L": 1.1, "M": 41.3, "S": 0.051 }, { "week": 34, "L": 1.11, "M": 42.5, "S": 0.051 }, { "week": 35, "L": 1.12, "M": 43.7, "S": 0.051 }, { "week": 36, "L": 1.13, "M": 44.9, "S": 0.051 }, { "week": 37, "L": 1.14, "M": 46.1, "S": 0.051 }, { "week": 38, "L": 1.15, "M": 47.3, "S": 0.051 }, { "week": 39, "L": 1.16, "M": 48.5, "S": 0.051 }, { "week": 40, "L": 1.17, "M": 49.7, "S": 0.051 }, { "week": 41, "L": 1.18, "M": 50.9, "S": 0.051 }, { "week": 42, "L": 1.19, "M": 52.1, "S": 0.051 }, { "week": 43, "L": 1.2, "M": 53.3, "S": 0.051 }, { "week": 44, "L": 1.21, "M": 54.5, "S": 0.051 }, { "week": 45, "L": 1.22, "M": 55.7, "S": 0.051 }, { "week": 46, "L": 1.23, "M": 56.9, "S": 0.051 }, { "week": 47, "L": 1.24, "M": 58.1, "S": 0.051 }, { "week": 48, "L": 1.25, "M": 59.3, "S": 0.051 }, { "week": 49, "L": 1.26, "M": 60.5, "S": 0.051 }, { "week": 50, "L": 1.27, "M": 61.7, "S": 0.051 } ], "hc": [ { "week": 22, "L": 1.23, "M": 20.1, "S": 0.05 }, { "week": 23, "L": 1.23, "M": 21.1, "S": 0.05 }, { "week": 24, "L": 1.23, "M": 22.1, "S": 0.05 }, { "week": 25, "L": 1.23, "M": 23.1, "S": 0.05 }, { "week": 26, "L": 1.23, "M": 24.1, "S": 0.05 }, { "week": 27, "L": 1.23, "M": 25.1, "S": 0.05 }, { "week": 28, "L": 1.23, "M": 26.1, "S": 0.05 }, { "week": 29, "L": 1.23, "M": 27.1, "S": 0.05 }, { "week": 30, "L": 1.23, "M": 28.1, "S": 0.05 }, { "week": 31, "L": 1.23, "M": 29.1, "S": 0.05 }, { "week": 32, "L": 1.23, "M": 30.1, "S": 0.05 }, { "week": 33, "L": 1.23, "M": 31.1, "S": 0.05 }, { "week": 34, "L": 1.23, "M": 32.1, "S": 0.05 }, { "week": 35, "L": 1.23, "M": 33.1, "S": 0.05 }, { "week": 36, "L": 1.23, "M": 34.1, "S": 0.05 }, { "week": 37, "L": 1.23, "M": 35.1, "S": 0.05 }, { "week": 38, "L": 1.23, "M": 36.1, "S": 0.05 }, { "week": 39, "L": 1.23, "M": 37.1, "S": 0.05 }, { "week": 40, "L": 1.23, "M": 38.1, "S": 0.05 }, { "week": 41, "L": 1.23, "M": 39.1, "S": 0.05 }, { "week": 42, "L": 1.23, "M": 40.1, "S": 0.05 }, { "week": 43, "L": 1.23, "M": 41.1, "S": 0.05 }, { "week": 44, "L": 1.23, "M": 42.1, "S": 0.05 }, { "week": 45, "L": 1.23, "M": 43.1, "S": 0.05 }, { "week": 46, "L": 1.23, "M": 44.1, "S": 0.05 }, { "week": 47, "L": 1.23, "M": 45.1, "S": 0.05 }, { "week": 48, "L": 1.23, "M": 46.1, "S": 0.05 }, { "week": 49, "L": 1.23, "M": 47.1, "S": 0.05 }, { "week": 50, "L": 1.23, "M": 48.1, "S": 0.05 } ] },
    "female": { "weight": [ { "week": 22, "L": -1.334, "M": 488.2, "S": 0.1248 }, { "week": 23, "L": -1.13, "M": 564.8, "S": 0.1264 }, { "week": 24, "L": -0.93, "M": 650.4, "S": 0.128 }, { "week": 25, "L": -0.74, "M": 745.8, "S": 0.1296 }, { "week": 26, "L": -0.55, "M": 851.8, "S": 0.1312 }, { "week": 27, "L": -0.37, "M": 969.2, "S": 0.1328 }, { "week": 28, "L": -0.19, "M": 1098.8, "S": 0.1344 }, { "week": 29, "L": -0.01, "M": 1241.4, "S": 0.136 }, { "week": 30, "L": 0.16, "M": 1397.8, "S": 0.1376 }, { "week": 31, "L": 0.33, "M": 1568.8, "S": 0.1392 }, { "week": 32, "L": 0.49, "M": 1755.2, "S": 0.1408 }, { "week": 33, "L": 0.64, "M": 1957.8, "S": 0.1424 }, { "week": 34, "L": 0.78, "M": 2177.4, "S": 0.144 }, { "week": 35, "L": 0.91, "M": 2414.6, "S": 0.1456 }, { "week": 36, "L": 1.03, "M": 2669.8, "S": 0.1472 }, { "week": 37, "L": 1.13, "M": 2943.6, "S": 0.1488 }, { "week": 38, "L": 1.22, "M": 3236.4, "S": 0.1504 }, { "week": 39, "L": 1.29, "M": 3548.6, "S": 0.152 }, { "week": 40, "L": 1.34, "M": 3880.4, "S": 0.1536 }, { "week": 41, "L": 1.37, "M": 4232.2, "S": 0.1552 }, { "week": 42, "L": 1.38, "M": 4604, "S": 0.1568 }, { "week": 43, "L": 1.37, "M": 4995.8, "S": 0.1584 }, { "week": 44, "L": 1.34, "M": 5407.4, "S": 0.16 }, { "week": 45, "L": 1.29, "M": 5838.6, "S": 0.1616 }, { "week": 46, "L": 1.23, "M": 6289.2, "S": 0.1632 }, { "week": 47, "L": 1.15, "M": 6758.8, "S": 0.1648 }, { "week": 48, "L": 1.06, "M": 7247.2, "S": 0.1664 }, { "week": 49, "L": 0.95, "M": 7753.8, "S": 0.168 }, { "week": 50, "L": 0.83, "M": 8278.2, "S": 0.1696 } ], "length": [ { "week": 22, "L": 0.99, "M": 27.5, "S": 0.051 }, { "week": 23, "L": 1, "M": 28.7, "S": 0.051 }, { "week": 24, "L": 1.01, "M": 29.9, "S": 0.051 }, { "week": 25, "L": 1.02, "M": 31.1, "S": 0.051 }, { "week": 26, "L": 1.03, "M": 32.3, "S": 0.051 }, { "week": 27, "L": 1.04, "M": 33.5, "S": 0.051 }, { "week": 28, "L": 1.05, "M": 34.7, "S": 0.051 }, { "week": 29, "L": 1.06, "M": 35.9, "S": 0.051 }, { "week": 30, "L": 1.07, "M": 37.1, "S": 0.051 }, { "week": 31, "L": 1.08, "M": 38.3, "S": 0.051 }, { "week": 32, "L": 1.09, "M": 39.5, "S": 0.051 }, { "week": 33, "L": 1.1, "M": 40.7, "S": 0.051 }, { "week": 34, "L": 1.11, "M": 41.9, "S": 0.051 }, { "week": 35, "L": 1.12, "M": 43.1, "S": 0.051 }, { "week": 36, "L": 1.13, "M": 44.3, "S": 0.051 }, { "week": 37, "L": 1.14, "M": 45.5, "S": 0.051 }, { "week": 38, "L": 1.15, "M": 46.7, "S": 0.051 }, { "week": 39, "L": 1.16, "M": 47.9, "S": 0.051 }, { "week": 40, "L": 1.17, "M": 49.1, "S": 0.051 }, { "week": 41, "L": 1.18, "M": 50.3, "S": 0.051 }, { "week": 42, "L": 1.19, "M": 51.5, "S": 0.051 }, { "week": 43, "L": 1.2, "M": 52.7, "S": 0.051 }, { "week": 44, "L": 1.21, "M": 53.9, "S": 0.051 }, { "week": 45, "L": 1.22, "M": 55.1, "S": 0.051 }, { "week": 46, "L": 1.23, "M": 56.3, "S": 0.051 }, { "week": 47, "L": 1.24, "M": 57.5, "S": 0.051 }, { "week": 48, "L": 1.25, "M": 58.7, "S": 0.051 }, { "week": 49, "L": 1.26, "M": 59.9, "S": 0.051 }, { "week": 50, "L": 1.27, "M": 61.1, "S": 0.051 } ], "hc": [ { "week": 22, "L": 1.23, "M": 19.5, "S": 0.05 }, { "week": 23, "L": 1.23, "M": 20.5, "S": 0.05 }, { "week": 24, "L": 1.23, "M": 21.5, "S": 0.05 }, { "week": 25, "L": 1.23, "M": 22.5, "S": 0.05 }, { "week": 26, "L": 1.23, "M": 23.5, "S": 0.05 }, { "week": 27, "L": 1.23, "M": 24.5, "S": 0.05 }, { "week": 28, "L": 1.23, "M": 25.5, "S": 0.05 }, { "week": 29, "L": 1.23, "M": 26.5, "S": 0.05 }, { "week": 30, "L": 1.23, "M": 27.5, "S": 0.05 }, { "week": 31, "L": 1.23, "M": 28.5, "S": 0.05 }, { "week": 32, "L": 1.23, "M": 29.5, "S": 0.05 }, { "week": 33, "L": 1.23, "M": 30.5, "S": 0.05 }, { "week": 34, "L": 1.23, "M": 31.5, "S": 0.05 }, { "week": 35, "L": 1.23, "M": 32.5, "S": 0.05 }, { "week": 36, "L": 1.23, "M": 33.5, "S": 0.05 }, { "week": 37, "L": 1.23, "M": 34.5, "S": 0.05 }, { "week": 38, "L": 1.23, "M": 35.5, "S": 0.05 }, { "week": 39, "L": 1.23, "M": 36.5, "S": 0.05 }, { "week": 40, "L": 1.23, "M": 37.5, "S": 0.05 }, { "week": 41, "L": 1.23, "M": 38.5, "S": 0.05 }, { "week": 42, "L": 1.23, "M": 39.5, "S": 0.05 }, { "week": 43, "L": 1.23, "M": 40.5, "S": 0.05 }, { "week": 44, "L": 1.23, "M": 41.5, "S": 0.05 }, { "week": 45, "L": 1.23, "M": 42.5, "S": 0.05 }, { "week": 46, "L": 1.23, "M": 43.5, "S": 0.05 }, { "week": 47, "L": 1.23, "M": 44.5, "S": 0.05 }, { "week": 48, "L": 1.23, "M": 45.5, "S": 0.05 }, { "week": 49, "L": 1.23, "M": 46.5, "S": 0.05 }, { "week": 50, "L": 1.23, "M": 47.5, "S": 0.05 } ] }
};

const guidelineCategories = {
  "Nutrition": ['fluid', 'energy', 'protein', 'fat', 'carbs', 'linoleicAcid', 'alphaLinolenicAcid', 'dha', 'ara', 'epa'],
  "Minerals": ['sodium', 'potassium', 'chloride', 'calcium', 'phosphorus', 'magnesium', 'iron', 'zinc', 'copper', 'selenium', 'manganese', 'iodine'],
  "Vitamins": ['vitaminA', 'vitaminD', 'vitaminE', 'vitaminK', 'vitaminC', 'thiamine', 'riboflavin', 'niacin', 'vitaminB6', 'folicAcid', 'vitaminB12', 'pantothenicAcid', 'biotin']
};

// --- Z-Score Calculation Logic ---
const getLMS = (sex, measurement, gestWeek) => {
    const chart = fenton_data[sex]?.[measurement];
    if (!chart) return null;
    const exactWeekData = chart.find(d => d.week === gestWeek);
    if (exactWeekData) return { L: exactWeekData.L, M: exactWeekData.M, S: exactWeekData.S };
    if (gestWeek < 22 || gestWeek > 50) return null;
    const week1 = Math.floor(gestWeek);
    const week2 = week1 + 1;
    const data1 = chart.find(d => d.week === week1);
    const data2 = chart.find(d => d.week === week2);
    if (!data1 || !data2) return null;
    const fraction = gestWeek - week1;
    const L = data1.L + (data2.L - data1.L) * fraction;
    const M = data1.M + (data2.M - data1.M) * fraction;
    const S = data1.S + (data2.S - data1.S) * fraction;
    return { L, M, S };
};

const calculateZScore = (sex, measurement, gestWeek, value) => {
    if (!value || value <= 0 || !sex || !gestWeek) return null;
    const lms = getLMS(sex, measurement, gestWeek);
    if (!lms) return null;
    const { L, M, S } = lms;
    const z = (Math.pow((value / M), L) - 1) / (L * S);
    return z;
};

// --- HELPER & UI COMPONENTS ---
const InputField = ({ label, value, onChange, unit, icon, placeholder }) => (
  <div className="w-full">
    <label className="text-sm font-medium text-gray-600 flex items-center mb-1">{icon}<span className="ml-2">{label}</span></label>
    <div className="relative">
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full p-3 pl-4 pr-12 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
      {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{unit}</span>}
    </div>
  </div>
);

const Selector = ({ label, value, onChange, options, icon }) => (
  <div>
    <label className="text-sm font-medium text-gray-600 flex items-center mb-1">{icon}<span className="ml-2">{label}</span></label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
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

const PatientDataView = ({ patientData, setPatientData }) => {
    const { sex, gestationalAgeAtBirth, currentMeasurements, previousMeasurements } = patientData;
    const { setSex, setGestationalAgeAtBirth, setCurrentMeasurements, setPreviousMeasurements } = setPatientData;

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Baby's Details</h2>
                <Selector label="Sex" value={sex} onChange={(e) => setSex(e.target.value)} options={{'female': {name: 'Female'}, 'male': {name: 'Male'}}} icon={<PersonStanding className="w-4 h-4 text-blue-500" />} />
                <InputField label="Gestational Age at Birth" value={gestationalAgeAtBirth} onChange={(val) => setGestationalAgeAtBirth(val)} unit="weeks" icon={<Calendar className="w-4 h-4 text-blue-500" />} placeholder="e.g., 32" />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Current Measurements</h2>
                <InputField label="Postnatal Age" value={currentMeasurements.age} onChange={value => setCurrentMeasurements({...currentMeasurements, age: value})} unit="days" icon={<Calendar className="w-4 h-4 text-gray-500" />} />
                <InputField label="Weight" value={currentMeasurements.weight} onChange={value => setCurrentMeasurements({...currentMeasurements, weight: value})} unit="grams" icon={<Weight className="w-4 h-4 text-gray-500" />} />
                <InputField label="Length" value={currentMeasurements.length} onChange={value => setCurrentMeasurements({...currentMeasurements, length: value})} unit="cm" icon={<Ruler className="w-4 h-4 text-gray-500" />} />
                <InputField label="Head Circumference" value={currentMeasurements.hc} onChange={value => setCurrentMeasurements({...currentMeasurements, hc: value})} unit="cm" icon={<Ruler className="w-4 h-4 text-gray-500" />} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Previous Measurements</h2>
                <InputField label="Postnatal Age" value={previousMeasurements.age} onChange={value => setPreviousMeasurements({...previousMeasurements, age: value})} unit="days" icon={<Calendar className="w-4 h-4 text-gray-500" />} />
                <InputField label="Weight" value={previousMeasurements.weight} onChange={value => setPreviousMeasurements({...previousMeasurements, weight: value})} unit="grams" icon={<Weight className="w-4 h-4 text-gray-500" />} />
                <InputField label="Length" value={previousMeasurements.length} onChange={value => setPreviousMeasurements({...previousMeasurements, length: value})} unit="cm" icon={<Ruler className="w-4 h-4 text-gray-500" />} />
                <InputField label="Head Circumference" value={previousMeasurements.hc} onChange={value => setPreviousMeasurements({...previousMeasurements, hc: value})} unit="cm" icon={<Ruler className="w-4 h-4 text-gray-500" />} />
            </div>
        </div>
    );
};

const GrowthView = ({ zScoreResults, weightVelocity }) => (
    <div className="space-y-8">
        {weightVelocity ? (<VelocityCard value={weightVelocity} />) : (<div className="text-center py-10 bg-white rounded-lg shadow-sm border"><p className="text-gray-500">Enter valid measurements for velocity.</p></div>)}
        {zScoreResults ? (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-4">
                <h2 className="text-2xl font-bold text-gray-700">Anthropometry & Z-Scores</h2>
                <ZScoreResultCard title="Weight Z-Score" {...zScoreResults.weight} />
                <ZScoreResultCard title="Length Z-Score" {...zScoreResults.length} />
                <ZScoreResultCard title="Head Circ. Z-Score" {...zScoreResults.hc} />
            </div>
        ) : (<div className="text-center py-10 bg-white rounded-lg shadow-sm border"><p className="text-gray-500">Enter measurements for Z-Scores.</p></div>)}
    </div>
);

const NutritionView = ({ nutritionData, setNutritionData, nutritionResults }) => {
    const { feedVolume, fortifierGrams, selectedMilk, selectedFortifier } = nutritionData;
    const { setFeedVolume, setFortifierGrams, setSelectedMilk, setSelectedFortifier } = setNutritionData;

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Enteral Nutrition Details</h2>
                <Selector label="Base Milk / Formula" value={selectedMilk} onChange={(e) => setSelectedMilk(e.target.value)} options={milkData} icon={<Droplet className="w-4 h-4 text-blue-500" />} />
                <InputField label="Total Feed Volume" value={feedVolume} onChange={setFeedVolume} unit="ml/day" icon={<Droplet className="w-4 h-4 text-blue-500" />} />
                <Selector label="Fortifier Type" value={selectedFortifier} onChange={(e) => setSelectedFortifier(e.target.value)} options={fortifierData} icon={<Zap className="w-4 h-4 text-orange-500" />} />
                <InputField label="Fortifier Amount" value={fortifierGrams} onChange={setFortifierGrams} unit="grams/day" icon={<PlusCircle className="w-4 h-4 text-orange-500" />} />
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
const App = () => {
  const [activeTab, setActiveTab] = useState('patientData');
  
  // Centralized State
  const [sex, setSex] = useState('female');
  const [gestationalAgeAtBirth, setGestationalAgeAtBirth] = useState('32');
  const [currentMeasurements, setCurrentMeasurements] = useState({ age: '28', weight: '1800', length: '42', hc: '30' });
  const [previousMeasurements, setPreviousMeasurements] = useState({ age: '7', weight: '1500', length: '39', hc: '28' });
  
  const [feedVolume, setFeedVolume] = useState('150');
  const [fortifierGrams, setFortifierGrams] = useState('4');
  const [selectedMilk, setSelectedMilk] = useState('pretermMilkEarly');
  const [selectedFortifier, setSelectedFortifier] = useState('lactodexHMF');

  // Calculated Results State
  const [nutritionResults, setNutritionResults] = useState(null);
  const [zScoreResults, setZScoreResults] = useState(null);
  const [weightVelocity, setWeightVelocity] = useState(null);
  
  const patientData = { sex, gestationalAgeAtBirth, currentMeasurements, previousMeasurements };
  const setPatientData = { setSex, setGestationalAgeAtBirth, setCurrentMeasurements, setPreviousMeasurements };
  const nutritionData = { feedVolume, fortifierGrams, selectedMilk, selectedFortifier };
  const setNutritionData = { setFeedVolume, setFortifierGrams, setSelectedMilk, setSelectedFortifier };

  // --- Main Calculation Effect ---
  useEffect(() => {
    const numGestAgeBirth = parseFloat(gestationalAgeAtBirth) || 0;
    const currentWeightG = parseFloat(currentMeasurements.weight) || 0;
    const previousWeightG = parseFloat(previousMeasurements.weight) || 0;
    const numFeedVolume = parseFloat(feedVolume) || 0;
    const numFortifierGrams = parseFloat(fortifierGrams) || 0;

    // --- Nutrition ---
    if (currentWeightG > 0) {
        const currentWeightKg = currentWeightG / 1000;
        const baseMilkInfo = milkData[selectedMilk];
        const fortifierInfo = fortifierData[selectedFortifier];
        const calculatedResults = {};
        Object.keys(esphganGuidelines).forEach(key => {
            const guideline = esphganGuidelines[key];
            let totalIntake = 0;
            if (key === 'fluid') {
                totalIntake = numFeedVolume;
            } else {
                const milkValue = baseMilkInfo[key] || 0;
                const fortifierValue = fortifierInfo[key] || 0;
                totalIntake = (numFeedVolume * (milkValue / 100)) + (numFortifierGrams * fortifierValue);
            }
            const intakePerKg = totalIntake / currentWeightKg;
            const getStatus = (value, g) => (value < g.min) ? 'low' : (value > g.max) ? 'high' : 'normal';
            calculatedResults[key] = { value: intakePerKg.toFixed(1), status: getStatus(intakePerKg, guideline) };
        });
        setNutritionResults(calculatedResults);
    } else {
        setNutritionResults(null);
    }

    // --- Growth Velocity ---
    const daysBetween = (parseFloat(currentMeasurements.age) || 0) - (parseFloat(previousMeasurements.age) || 0);
    if (currentWeightG > 0 && previousWeightG > 0 && daysBetween > 0) {
        const weightDiff = currentWeightG - previousWeightG;
        const avgWeightKg = ((currentWeightG + previousWeightG) / 2) / 1000;
        if (avgWeightKg > 0) {
            const velocity = (weightDiff / avgWeightKg) / daysBetween;
            setWeightVelocity(velocity.toFixed(1));
        }
    } else {
        setWeightVelocity(null);
    }

    // --- Z-Scores ---
    const calculateAllZScores = (measurements) => {
        const postNatalWeeks = (parseFloat(measurements.age) || 0) / 7;
        const correctedGestAge = numGestAgeBirth + postNatalWeeks;
        if (correctedGestAge < 22 || correctedGestAge > 50) return { weight: null, length: null, hc: null };
        const weightZ = calculateZScore(sex, 'weight', correctedGestAge, parseFloat(measurements.weight));
        const lengthZ = calculateZScore(sex, 'length', correctedGestAge, parseFloat(measurements.length));
        const hcZ = calculateZScore(sex, 'hc', correctedGestAge, parseFloat(measurements.hc));
        return { weight: weightZ, length: lengthZ, hc: hcZ };
    };
    const currentZ = calculateAllZScores(currentMeasurements);
    const previousZ = calculateAllZScores(previousMeasurements);
    const formatZ = (z) => z !== null ? z.toFixed(2) : null;
    const calcChange = (current, prev) => (current !== null && prev !== null) ? (current - prev).toFixed(2) : null;
    setZScoreResults({
        weight: { current: formatZ(currentZ.weight), previous: formatZ(previousZ.weight), change: calcChange(currentZ.weight, previousZ.weight) },
        length: { current: formatZ(currentZ.length), previous: formatZ(previousZ.length), change: calcChange(currentZ.length, previousZ.length) },
        hc: { current: formatZ(currentZ.hc), previous: formatZ(previousZ.hc), change: calcChange(currentZ.hc, previousZ.hc) },
    });

  }, [sex, gestationalAgeAtBirth, currentMeasurements, previousMeasurements, feedVolume, fortifierGrams, selectedMilk, selectedFortifier]);

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
            <TabButton id="growth" label="Growth & Z-Scores" icon={<TrendingUp size={20} />} />
            <TabButton id="nutrition" label="Enteral Nutrition" icon={<Activity size={20} />} />
        </div>

        <main>
            {activeTab === 'patientData' && <PatientDataView patientData={patientData} setPatientData={setPatientData} />}
            {activeTab === 'growth' && <GrowthView zScoreResults={zScoreResults} weightVelocity={weightVelocity} />}
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
                        1. <a href="https://pubmed.ncbi.nlm.nih.gov/36705703/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ESPGHAN/ESPEN/ESPR/CSPEN guidelines on pediatric parenteral nutrition: Neonates.</a> Embleton, N. D., et al. (2023). *Clinical Nutrition*, 42(9), 1583-1602.
                     </li>
                     <li>
                        2. <a href="https://bmcpediatr.biomedcentral.com/articles/10.1186/1471-2431-13-59" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">A systematic review and meta-analysis to revise the Fenton growth chart for preterm infants.</a> Fenton, T. R., & Kim, J. H. (2013). *BMC pediatrics*, 13(1), 1-13.
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

const ZScoreResultCard = ({ title, current, previous, change }) => {
    const getChangeColor = (val) => {
        if (val === null || val === undefined) return 'text-gray-500';
        if (val < -0.5) return 'text-red-500';
        if (val > 0.5) return 'text-green-500';
        return 'text-gray-700';
    }
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-md font-semibold text-gray-700 mb-2">{title}</p>
            <div className="grid grid-cols-3 gap-2 items-center">
                <div>
                    <p className="text-xs text-gray-400">Previous</p>
                    <p className="text-xl font-bold text-gray-600">{previous ?? 'N/A'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">Current</p>
                    <p className="text-2xl font-bold text-blue-600">{current ?? 'N/A'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">Change (ΔZ)</p>
                    <p className={`text-xl font-bold ${getChangeColor(change)}`}>{change ?? 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

const VelocityCard = ({ value }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg shadow-md border border-blue-200 text-center">
    <h3 className="text-lg font-semibold text-blue-800 flex items-center justify-center"><TrendingUp className="w-6 h-6 mr-2" />Weight Gain Velocity</h3>
    <p className="text-5xl font-bold text-blue-600 my-3">{value}</p>
    <p className="text-sm text-blue-700">g / kg / day</p>
    <p className="text-xs text-blue-500 mt-2">Recommended: 15-20 g/kg/day</p>
  </div>
);

export default App;
