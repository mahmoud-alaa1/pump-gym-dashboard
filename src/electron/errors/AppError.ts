export class AppError extends Error {
  public code?: string;
  public errors?: { field?: string; message: string }[];
  public status?: number;

  constructor(
    message: string,
    options?: {
      code?: string;
      errors?: { field?: string; message: string }[];
      status?: number;
    }
  ) {
    super(message);
    this.name = "AppError";
    this.code = options?.code;
    this.errors = options?.errors;
    this.status = options?.status;
  }
}

export const ErrorCodes = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

export type ErrorCodes = (typeof ErrorCodes)[keyof typeof ErrorCodes];
