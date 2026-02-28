export interface User {
  id: string;
  email: string;
  athleteFullName: string;
  parentName: string;
  dateOfBirth: string;
  city: string;
  state: string;
  gradYear: number;
  position: string;
  height: string;
  weight: string;
  school: string;
  gpa: number;
  imgUrl: string;
  role: "admin" | "user";
  subscribeStatus: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

export interface RegisterResponse {
  data: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

export interface LoginSessionsResponse {
  // define based on actual API
}
