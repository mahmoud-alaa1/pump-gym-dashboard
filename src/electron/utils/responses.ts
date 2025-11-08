export function successResponse<T>(
  data: T,
  message: string = "تمت العملية بنجاح"
): ISuccessResponse<T> {
  return { success: true, data, message };
}

export function errorResponse(
  message: string,
  errors?: { field?: string; message: string }[],
  code?: string
): IErrorResponse {
  return { success: false, message, errors, code };
}
