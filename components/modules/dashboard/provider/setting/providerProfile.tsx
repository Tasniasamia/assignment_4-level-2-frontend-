"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { providerType, userType } from "@/types";
import { updateProvider } from "@/actions/provider.action";

// interface ProviderData {
//   id: string;
//   userId: string;
//   restaurantName: string;
//   description: string;
//   phone: string;
//   address: string;
//   openingTime: string;
//   closingTime: string;
//   isOpen: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

interface ProviderProfileFormProps {
  propData?: providerType;
}

export function ProviderProfileForm({
  propData,

}: ProviderProfileFormProps) {
  const initialData=propData;
  console.log("initialData",initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const providerSchema = z.object({
    restaurantName: z
      .string()
      .min(2, "Restaurant name must be at least 2 characters.")
      .max(100, "Restaurant name must be at most 100 characters."),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters.")
      .max(500, "Description must be at most 500 characters."),
    phone: z
      .string()
      .regex(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Please enter a valid phone number."
      ),
    address: z
      .string()
      .min(10, "Address must be at least 10 characters.")
      .max(200, "Address must be at most 200 characters."),
    openingTime: z.string().regex(/^\d{2}:\d{2}\s[AP]M$/, "Use HH:MM AM/PM format"),
    closingTime: z.string().regex(/^\d{2}:\d{2}\s[AP]M$/, "Use HH:MM AM/PM format"),
    isOpen: z.boolean(),
  });

  const form = useForm({
    defaultValues: {
      restaurantName: initialData?.restaurantName || "",
      description: initialData?.description || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      openingTime: initialData?.openingTime || "10:00 AM",
      closingTime: initialData?.closingTime || "11:00 PM",
      isOpen: initialData?.isOpen || false,
    },
    validators: {
      onSubmit: providerSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const toastId = toast.loading("Updating restaurant profile...");
      try {
        const { restaurantName,
          description,
          phone,
          address,
          openingTime,
          closingTime,
          isOpen}=await value;
        const payload = {
          id: initialData?.id as string, // ensure id exists
          restaurantName:restaurantName,
          description:description,
          phone:phone,
          address:address,
          openingTime:openingTime,
          closingTime:closingTime,
          isOpen:isOpen
        };
        const {data,error}=await updateProvider(payload);
        if(data?.success){
          toast.success(data?.message, {
            id: toastId,
          });
          setIsEditing(false);
          return;
        }
      
        toast.error(error?.error?.message || error?.message, { id: toastId });
      } catch (err: any) {
        toast.error(err?.message || "Failed to update profile", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Restaurant Profile</CardTitle>
        <CardDescription>
          Manage your restaurant business information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Display mode */}
            {!isEditing && initialData && (
              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-semibold text-sm">
                    Restaurant Name:
                  </span>
                  <p className="text-base">{initialData.restaurantName}</p>
                </div>
                <div>
                  <span className="font-semibold text-sm">Description:</span>
                  <p className="text-base">{initialData.description}</p>
                </div>
                <div>
                  <span className="font-semibold text-sm">Phone:</span>
                  <p className="text-base">{initialData.phone}</p>
                </div>
                <div>
                  <span className="font-semibold text-sm">Address:</span>
                  <p className="text-base">{initialData.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-sm">Opening Time:</span>
                    <p className="text-base">{initialData.openingTime}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Closing Time:</span>
                    <p className="text-base">{initialData.closingTime}</p>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-sm">Status:</span>
                  <p className="text-base">
                    {initialData.isOpen ? "🟢 Open" : "🔴 Closed"}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-sm">Last Updated:</span>
                  <p className="text-base">
                    
                    {initialData?.updatedAt && new Date(initialData?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {/* Edit mode */}
            {isEditing && (
              <>
                <form.Field
                  name="restaurantName"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Restaurant Name
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                          aria-invalid={isInvalid}
                          placeholder="Foodies Hub"
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="description"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Description
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                          aria-invalid={isInvalid}
                          placeholder="The best fast food restaurant in Dhaka"
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                        <FieldDescription>
                          Brief description of your restaurant (10-500 characters)
                        </FieldDescription>
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="phone"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Phone Number
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                          aria-invalid={isInvalid}
                          placeholder="01712345678"
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="address"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                          aria-invalid={isInvalid}
                          placeholder="Dhanmondi 32, Dhaka"
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <div className="grid grid-cols-2 gap-4">
                  <form.Field
                    name="openingTime"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Opening Time
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
                            aria-invalid={isInvalid}
                            placeholder="10:00 AM"
                            required
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <form.Field
                    name="closingTime"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Closing Time
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
                            aria-invalid={isInvalid}
                            placeholder="11:00 PM"
                            required
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>

                <form.Field
                  name="isOpen"
                  children={(field) => {
                    return (
                      <Field>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={field.name}
                            name={field.name}
                            checked={field.state.value}
                            onChange={(e) =>
                              field.handleChange(e.target.checked)
                            }
                            className="cursor-pointer"
                          />
                          <FieldLabel htmlFor={field.name} className="mb-0">
                            Restaurant is currently open
                          </FieldLabel>
                        </div>
                      </Field>
                    );
                  }}
                />

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      form.reset();
                    }}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}

            {/* Toggle button */}
            {!isEditing && (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="cursor-pointer"
              >
                Edit Restaurant Info
              </Button>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
