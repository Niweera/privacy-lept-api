export const AccessDeniedError = class AccessDeniedError {
  public message: any;
  constructor(message) {
    this.message = message;
  }
};

export const AuthenticationError = class AuthenticationError {
  public message: any;
  constructor(message) {
    this.message = message;
  }
};

export const NotFoundError = class NotFoundError {
  public message: any;
  constructor(message) {
    this.message = message;
  }
};

export const ValidationError = class ValidationError {
  public message: any;
  constructor(message) {
    this.message = message;
  }
};
