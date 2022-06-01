export type TUser = {
  email: string;
  id: number;
  name: string;
  phone: string;
  photo: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
}

export type TForm = {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: string;
};

export type TPosition = {
  id: number;
  name: string;
}

export type TPositionsResponse = {
  success: boolean;
  message?: string;
  positions?: TPosition[];
}