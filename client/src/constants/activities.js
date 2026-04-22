export const ACTIVITIES = {
  transport: [
    { id: "car_petrol", label: "Car (petrol, per km)", co2: 0.21, unit: "km" },
    { id: "car_diesel", label: "Car (diesel, per km)", co2: 0.17, unit: "km" },
    { id: "bus", label: "Bus (per km)", co2: 0.09, unit: "km" },
    { id: "train", label: "Train (per km)", co2: 0.04, unit: "km" },
    { id: "flight_short", label: "Short-haul flight (km)", co2: 0.26, unit: "km" },
    { id: "flight_long", label: "Long-haul flight (km)", co2: 0.19, unit: "km" },
    { id: "motorbike", label: "Motorbike (per km)", co2: 0.11, unit: "km" },
  ],
  food: [
    { id: "beef", label: "Beef (per 100g)", co2: 2.7, unit: "100g" },
    { id: "pork", label: "Pork (per 100g)", co2: 0.72, unit: "100g" },
    { id: "chicken", label: "Chicken (per 100g)", co2: 0.43, unit: "100g" },
    { id: "fish", label: "Fish (per 100g)", co2: 0.35, unit: "100g" },
    { id: "dairy", label: "Dairy milk (per 250ml)", co2: 0.27, unit: "250ml" },
    { id: "vegetables", label: "Vegetables (per 100g)", co2: 0.04, unit: "100g" },
    { id: "rice", label: "Rice (per 100g cooked)", co2: 0.16, unit: "100g" },
  ],
  energy: [
    { id: "electricity", label: "Electricity (kWh)", co2: 0.49, unit: "kWh" },
    { id: "gas", label: "Natural gas (kWh)", co2: 0.2, unit: "kWh" },
    { id: "coal", label: "Coal heating (kg)", co2: 2.42, unit: "kg" },
    { id: "ac", label: "Air conditioning (hr)", co2: 0.55, unit: "hr" },
    { id: "washing", label: "Washing machine (cycle)", co2: 0.6, unit: "cycle" },
  ],
};

export const ALL_ACTIVITIES = Object.values(ACTIVITIES).flat();
export const CATEGORY_COLORS = {
  transport: "#2563eb",
  food: "#3b82f6",
  energy: "#60a5fa",
};

export const TIPS = {
  transport: [
    "Combine trips to reduce total travel distance.",
    "Use public transport at least once a week.",
  ],
  food: [
    "Replace one high-emission meal each week.",
    "Plan meals to reduce food waste.",
  ],
  energy: [
    "Use efficient appliances and turn off idle devices.",
    "Adjust thermostat settings for lower energy use.",
  ],
};
