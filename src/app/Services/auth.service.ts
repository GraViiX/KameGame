import { EventEmitter, Injectable, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ITokenPayload } from '../Interface/itoken-payload';
import { IUser } from '../Interface/iuser';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';

  @Output() OnLoginSuccessful: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnLogoutSuccessful: EventEmitter<any> = new EventEmitter<any>();

  constructor(private api: UserService, private jwt: JwtHelperService) {
    let token = localStorage.getItem('token');

    if (token) {
      this.token = token;
      this.OnLoginSuccessful.emit();
    }
  }

  login(login: IUser): void {
    try {
      this.api.userLogin(login).subscribe(data => {
        this.token = data.token;
        sessionStorage.setItem('token', data.token);

        this.OnLoginSuccessful.emit();
      });
    } catch (error) {
      console.error(error);
    }
  }

  logout(): void {
      this.token = '';
      sessionStorage.removeItem('token');
      this.api.ProfileBehavior.next(false);
      this.OnLogoutSuccessful.emit();
  }

  private get package(): ITokenPayload | null {
    return this.jwt.decodeToken<ITokenPayload>(this.token);
  }

  get authenticated(): boolean {
    if (!this.package) return false;

    let current: Date = new Date();

    let exp: Date | undefined = this.package?.exp ? new Date(this.package?.exp * 1000) : undefined;
    let nbf: Date | undefined = this.package?.nbf ? new Date(this.package?.nbf * 1000) : undefined;

    if (exp && current > exp) return false;
    if (nbf && current < nbf) return false;

    return true;
  }

  get id(): number | null {
    return this.package && this.package.id ? this.package.id : null;
  }


  get userName(): string | null {
    return this.package && this.package.userName ? this.package.userName : null;
  }


}
