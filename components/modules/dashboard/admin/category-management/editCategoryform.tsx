"use client";
import { Button } from "@/components/ui/button";

import {
  Field,
//   FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import z from "zod";
import { useForm } from "@tanstack/react-form";

import { addCategory, editCategory } from "@/actions/category.action";
import { useRouter } from "next/navigation";

export function EditCategoryForm(datas?: { id?: string; name?: string }) {
    const {push}=useRouter();
  const formSchema = z.object({
    name: z.string(),
  });

  const form = useForm({
    defaultValues: {
      name: datas?.name || '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toatId = toast.loading(
        "Updating Category" 
      );
      try {
        const { name } = value;
         
          const { data, error } =
            await editCategory({ id:datas?.id as string, name: name });
            console.log("data ",data)
          if (data?.success) {
            toast.success(
              data?.message || "Category updated successfully"
            );
            push('/admin/category-management');
            return;
          }
         
         toast.error(
            error?.error?.message ||
            error?.message ||
              "Category update failed"
          );
          return;
  
  
      } catch (err: any) {
        toast.error(err?.message, { id: toatId });
      }
    },
  });

  return (
    <div>
      <form
        id="category-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    // defaultValue={data?.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Meal Category Name"
                    autoComplete="off"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <Button type="submit" form="category-form" className="cursor-pointer">
            Save
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
