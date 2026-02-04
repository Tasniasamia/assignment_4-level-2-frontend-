"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { addMeal } from "@/actions/meal.action";
import { useRouter } from "next/navigation";

const menuItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive("Price must be greater than 0"),
  isAvailable: z.boolean(),
  // providerId: z.string().min(1, "Provider ID is required"),
  categoryId: z.string().min(1, "Category is required"),
  dietaryPreferences: z.string().min(1, "dietaryPreferences is required"),
  rating: z.number(),
});

interface MenuItemFormProps {
  categories?: Array<{ id: string; name: string }>;
  providerId?: string;
}

export function MenuItemForm({
  categories = [],
  providerId ='' ,
  
}: MenuItemFormProps) {

  const {push}=useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      isAvailable: true,
      categoryId: "",
      dietaryPreferences: "",
      rating: 0,
    },
    validators: {
      onSubmit: menuItemSchema,
    },
    onSubmit: async ({ value }) => {
      const toatId = toast.loading("Creating Menu Item");
      try {
        const {
          name,
          description,
          price,
          isAvailable,
          categoryId,
          dietaryPreferences,
          rating,
        } = value;
        const { data, error } = await addMeal({
          name: name,
          description: description,
          price: price,
          isAvailable: isAvailable,
          providerId: providerId,
          categoryId: categoryId,
          dietaryPreferences: dietaryPreferences,
          rating: rating,
        });
        if (data?.success) {
          toast.success(data.message || "Menu Item created successfully",{ id: toatId });
          push('/provider/meal-management');
          return;
        }

        toast.error(
          error?.error?.message || error?.message || "Menu Item Creation failed",{ id: toatId }
        );
        return;
      } catch (err: any) {
        toast.error(err?.message, { id: toatId });
      }
    },
  });

  return (
    <div className="w-full max-w-2xl">
      <form
        id="menu-item-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="space-y-6">
          {/* Name Field */}
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Item Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="e.g., Chicken Burger Cheesy"
                    autoComplete="off"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Description Field */}
          <form.Field
            name="description"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="e.g., Juicy grilled chicken burger with fresh veggies"
                    autoComplete="off"
                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Price Field */}
          <form.Field
            name="price"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(
                         Number(e.target.value)
                      )
                    }
                    aria-invalid={isInvalid}
                    placeholder="350"
                    // step="0.01"
                    // min="0"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Category Select */}
          <form.Field
            name="categoryId"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="cml2i4m1h0001w610cvc6fmxy" disabled>
                          Default Category
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="dietaryPreferences"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>DietaryPreferences</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="e.g., Chicken Burger Cheesy"
                    autoComplete="off"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Availability Toggle */}
          <form.Field
            name="isAvailable"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Available</FieldLabel>
                <div className="flex items-center gap-2">
                  <input
                    id={field.name}
                    name={field.name}
                    type="checkbox"
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="h-4 w-4 rounded border border-input"
                  />
                  <label htmlFor={field.name} className="text-sm font-medium">
                    This item is available
                  </label>
                </div>
              </Field>
            )}
          />

          {/* Rating Field */}
          <form.Field
            name="rating"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Rating (0-5)</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(
                         Number(e.target.value)
                      )
                    }
                    aria-invalid={isInvalid}
                    placeholder="0"
                    // step="0.1"
                    // min="0"
                    // max="5"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <Button
            type="submit"
            form="menu-item-form"
            className="cursor-pointer"
          >
            Create Menu Item
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
