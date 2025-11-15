export class AppError extends Error {
  public code?: string;
  public errors?: Record<string, string[]>;
  public status?: number;

  constructor(
    message: string,
    options?: {
      code?: string;
      errors?: Record<string, string[]>;
      status?: number;
    }
  ) {
    super(message);
    this.name = "AppError";
    this.code = options?.code;
    this.errors = options?.errors;
    this.status = options?.status;
  }
  serialize() {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
      errors: this.errors,
    };
  }
}

export const ErrorCodes = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

export type ErrorCodes = (typeof ErrorCodes)[keyof typeof ErrorCodes];
