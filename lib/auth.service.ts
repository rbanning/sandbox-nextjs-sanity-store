import { UserDTO } from "@/types/user.model";

export interface LoginArgs {
  email: string;
  password: string;
}
export type LoginResult = UserDTO | null;

export class AuthService {

  async login(args: LoginArgs): Promise<LoginResult>;
  async login(email: string, password: string): Promise<LoginResult>;
  async login(arg1: LoginArgs | string, arg2?: string): Promise<LoginResult>{
    //simulate an async login process
    return await (new Promise((resolve, reject) => {
      setTimeout(() => {
        const {email, password} = typeof(arg1) === 'string' ? { email: arg1, password: arg2 } : arg1;
        if (email === password) {
          const name = email.split('@')[0].split('.')[0]
                        .split('')
                        .map((ch, index) => index === 0 ? ch.toLocaleUpperCase() : ch.toLocaleLowerCase())
                        .join('');
          resolve({
            id: `${name.toLocaleLowerCase()}-${email.length}`,
            name,
            email
          });
        } else {
          reject('Invalid email and/or password');
        }    
      }, 1000);
    }));
  }

  async logout(): Promise<boolean> {
    //simulate an async logout process
    return await (new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    }));
  }
}