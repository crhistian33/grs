export namespace AuthActions {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(readonly email: string, readonly password: string) { }
  }

  export class Refresh {
    static readonly type = '[Auth] Refresh token';
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }

  export class getUserID {
    static readonly type = '[Auth] Get User ID';
  }

  export class Profile {
    static readonly type = '[Auth] Get Profile';
  }

  export class ClearAll {
    static readonly type = '[Auth] Clear All';
  }
}
