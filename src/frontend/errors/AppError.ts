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

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export function handleServiceError(err: unknown): AppError {
  if (isErrorObject(err)) {
    return new AppError(err.message, {
      code: err.code,
      errors: err.errors,
      status: err.status,
    });
  }
  console.error("Unhandled error", err);
  return new AppError("حدث خطأ غير متوقع");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorObject(err: any): err is AppError {
  console.log(err.code);
  console.log(err.name);
  console.log(err.message);
  return (
    err && typeof err === "object" && "name" in err && err.name === "AppError"
  );
}
