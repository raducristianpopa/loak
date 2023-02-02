import { zodResolver } from "@hookform/resolvers/zod";
import { type ComponentProps } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { type TypeOf, type ZodSchema } from "zod";

interface UseZodFormProps<T extends ZodSchema> extends UseFormProps<TypeOf<T>> {
  schema: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: ReturnType<SubmitHandler<T>>;
}

export const useZodForm = <T extends ZodSchema>({
  schema,
  ...props
}: UseZodFormProps<T>) => {
  return useForm({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    ...props,
  });
};

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="flex flex-col space-y-4"
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};
