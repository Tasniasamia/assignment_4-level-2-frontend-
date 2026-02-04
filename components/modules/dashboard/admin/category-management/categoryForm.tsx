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

export function CategoryForm() {
  const formSchema = z.object({
    name: z.string(),
  });

  const form = useForm({
    defaultValues: {
      name:'',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toatId = toast.loading(
        "Creating Category"
      );
      try {
        const { name } = value;
  
          const { data: categoryData, error: categoryError } =
            await addCategory({ name: name });
          if (categoryData?.success) {
            toast.success(
              categoryData.message || "Category created successfully",{ id: toatId }
            );
            return;
          }
         
         toast.error(
            categoryError?.error?.message ||
              categoryError?.message ||
              "Category Creation failed",{ id: toatId }
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
        id="category-form2"
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

          <Button type="submit" form="category-form2" className="cursor-pointer">
            Save
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
