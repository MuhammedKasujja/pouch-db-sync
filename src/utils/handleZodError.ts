import { ref } from "vue";
import { ZodError } from "zod";

export function generateErrorMap<T>(
  error: ZodError<T>
): Record<keyof T, string | undefined> {
  return error.errors.reduce((acc, err) => {
    if (err.path.length > 0) {
      const key = err.path[0] as keyof T;
      acc[key] = err.message;
    }
    return acc;
  }, {} as Record<keyof T, string | undefined>);
}

export const errorsMap = <T>(model: T) => {
  return ref<Record<keyof typeof model, string | undefined>>();
};
