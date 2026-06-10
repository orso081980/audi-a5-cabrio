// ── Icon names ────────────────────────────────────────────────────────────────
export type IconName =
  | 'display' | 'map' | 'wifi' | 'lightbulb' | 'speaker' | 'smartphone'
  | 'chair' | 'thermometer' | 'fire' | 'key' | 'sun' | 'wind' | 'palette'
  | 'shield' | 'parking' | 'camera' | 'arrow' | 'battery' | 'gauge'
  | 'wrench' | 'circle' | 'eye' | 'badge' | 'chevronDown' | 'chevronLeft' | 'chevronRight'
  | 'mail' | 'phone' | 'star' | 'menu' | 'x' | 'image' | 'check' | 'arrowRight'
  | 'info' | 'zap' | 'award' | 'heart' | 'clock' | 'play';

// ── Sub-models ────────────────────────────────────────────────────────────────
export interface CarEngine {
  code: string;
  displacement: string;
  power_kw: number;
  power_hp: number;
  torque_nm: number | null;
  cylinders: number;
  fiscal_hp: number;
  technology: string;
  transmission: string;
  emission_standard: string;
  fuel: string;
}

export interface CarPerformance {
  fuel_consumption_combined: string;
  co2_emissions_combined: string;
  fuel_tank_litres: number;
}

export interface CarExterior {
  color: string;
  color_code: string;
  roof: string;
  body: string;
  bumper: string;
  window_frames: string;
  right_mirror: string;
  roof_color: string;
  daytime_running_lights: boolean;
}

export interface CarInterior {
  seats: string;
  dashboard: string;
  carpet: string;
  headliner: string;
  seat_material: string;
  decorative_inserts: string;
}

// ── Root model ────────────────────────────────────────────────────────────────
export interface Car {
  make: string;
  model: string;
  mileage: number;
  variant: string;
  year: number;
  immatriculation: number;
  engine: CarEngine;
  performance: CarPerformance;
  exterior: CarExterior;
  interior: CarInterior;
}
