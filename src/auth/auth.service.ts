import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  register() {
    return { msg: 'register route' };
  }

  login() {
    return { msg: 'login route' };
  }
}
