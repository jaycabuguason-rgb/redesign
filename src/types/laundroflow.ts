export type OrderStatus = 'Received' | 'Washing' | 'Drying' | 'Ready' | 'Claimed';

export type ServiceType =
  | 'Wash, Dry & Fold'
  | 'Wash Only'
  | 'Dry Clean'
  | 'Press Only'
  | 'Comforter'
  | 'Curtains';

export interface Order {
  id: string;
  ticket: string;
  customer: string;
  phone?: string;
  email?: string;
  service: ServiceType;
  weight: number;
  amount: number;
  status: OrderStatus;
  paymentStatus: 'Paid' | 'Unpaid';
  eta?: string;
  date: string;
  notes?: string;
  fabricSoftener?: boolean;
  fold?: boolean;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  email?: string;
  stamps: number;
  totalStamps: number;
  visits: number;
  kgWashed: number;
  rewards: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  member: string;
  isRedeemed: boolean;
  redeemedAt?: string;
}

export interface ServicePrice {
  type: ServiceType;
  pricePerKg: number;
  label: string;
}
