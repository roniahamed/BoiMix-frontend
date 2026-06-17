import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, Resolver, UseFormProps } from "react-hook-form";
import { z } from "zod";

export function createFormOptions<TFieldValues extends FieldValues>(
  schema: z.ZodType<TFieldValues>,
  options?: Omit<UseFormProps<TFieldValues>, "resolver">,
): UseFormProps<TFieldValues> {
  const resolver = zodResolver(
    schema as never,
  ) as unknown as Resolver<TFieldValues>;

  return {
    mode: "onBlur",
    ...options,
    resolver,
  };
}

export function createFormOptionsFromSchema<
  TSchema extends z.ZodType<FieldValues>,
>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">,
): UseFormProps<z.infer<TSchema>> {
  const resolver = zodResolver(schema as never) as unknown as Resolver<
    z.infer<TSchema>
  >;

  return {
    mode: "onBlur",
    ...options,
    resolver,
  };
}
