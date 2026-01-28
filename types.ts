
export interface WeightResponse {
  value: number;
  unit: string;
  stable: boolean;
  timestamp: string;
}

export interface DeviceInfo {
  manufacturer: string;
  model: string;
  protocol: string;
  note: string;
}

export enum SimulationState {
  STABLE = 'stable',
  UNSTABLE = 'unstable'
}
