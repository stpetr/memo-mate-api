import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcryptjs';

import { UsersService } from 'users/users.service';
import { getUserProfile } from 'users/dto/user-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      console.log('No user with email:', email);
      throw new UnauthorizedException();
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      throw new UnauthorizedException();
    }

    const payload = { email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: getUserProfile(user),
    };
  }

  async signUp(email: string, password: string): Promise<any> {
    const user = await this.usersService.create({
      email,
      password,
    });

    return getUserProfile(user);
  }
}
