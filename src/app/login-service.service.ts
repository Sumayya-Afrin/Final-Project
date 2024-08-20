import { Injectable } from '@angular/core';
import { API } from '../../global';
export interface User {
  username: string;
  password: string;
}
export interface TokenResponse {
  msg: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor() {}

  async login(credentials: User): Promise<TokenResponse> {
    return fetch(`${API}/users/loginuser`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async signup(credentials: User): Promise<TokenResponse> {
    return fetch(`${API}/users/newuser`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  //   login(credentials: User): Promise<TokenResponse> {
  //     return fetch(`${API}/users/loginuser`, {
  //       method: 'POST',
  //       body: JSON.stringify(credentials),
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     }).then((res) => res.json());
  //   }
  // }
}
