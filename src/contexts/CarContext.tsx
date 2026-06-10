import { createContext, useContext, type ReactNode } from 'react';
import carData from '../data/car.json';
import type { Car } from '../types/car';
import { CarModel } from '../models/CarModel';

interface CarContextValue {
  car: Car;
  model: CarModel;
}

const car = carData as Car;
const model = new CarModel(car);

const CarContext = createContext<CarContextValue>({ car, model });

export function CarProvider({ children }: { children: ReactNode }) {
  return (
    <CarContext.Provider value={{ car, model }}>
      {children}
    </CarContext.Provider>
  );
}

/** Access the car data and derived model anywhere in the tree. */
export function useCar(): CarContextValue {
  return useContext(CarContext);
}
