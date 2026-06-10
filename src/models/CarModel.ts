import type { Car } from '../types/car';

/**
 * CarModel — encapsulates all business logic and data access for the Car entity.
 * Follows the Model layer in MVC: pure data + derived computations, no side-effects.
 */
export class CarModel {
  constructor(private readonly data: Car) {}

  // ── Identity ──────────────────────────────────────────────────────────────
  get make(): string { return this.data.make; }
  get model(): string { return this.data.model; }
  get variant(): string { return this.data.variant; }
  get year(): number { return this.data.year; }
  get immatriculation(): number { return this.data.immatriculation; }
  get mileage(): number { return this.data.mileage; }
  get fullName(): string { return `${this.data.make} ${this.data.model}`; }

  // ── Engine ────────────────────────────────────────────────────────────────
  get powerDisplay(): string { return `${this.data.engine.power_hp} CV`; }
  get powerKwDisplay(): string { return `${this.data.engine.power_kw} kW`; }
  get engineCode(): string { return this.data.engine.code; }
  get technology(): string { return this.data.engine.technology; }
  get transmissionShort(): string { return this.data.engine.transmission.split('(')[0].trim(); }
  get fuelType(): string { return this.data.engine.fuel; }
  get emissionStandard(): string { return this.data.engine.emission_standard; }

  // ── Performance ───────────────────────────────────────────────────────────
  get consumption(): string { return this.data.performance.fuel_consumption_combined; }
  get co2(): string { return this.data.performance.co2_emissions_combined; }
  get tankLitres(): number { return this.data.performance.fuel_tank_litres; }

  // ── Exterior ──────────────────────────────────────────────────────────────
  get exteriorColor(): string { return this.data.exterior.color; }
  get roofDescription(): string { return this.data.exterior.roof; }
  get bodyType(): string { return this.data.exterior.body; }

  // ── Interior ──────────────────────────────────────────────────────────────
  get seatMaterial(): string { return this.data.interior.seat_material; }
  get seatsDescription(): string { return this.data.interior.seats; }

  // ── Derived display strings ───────────────────────────────────────────────
  get mileageFormatted(): string {
    return this.data.mileage.toLocaleString('it-IT') + ' km';
  }

  /** Raw data access — use sparingly in components */
  get raw(): Car { return this.data; }
}
