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
import { BadgeCheck, CircleCheckBig } from "lucide-react";
import { updateProfile } from "@/actions/user.action";
import { userType } from "@/types";

interface UserProfileFormProps {
  initialData?: userType;
}

export function UserProfileForm({ initialData }: UserProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userSchema = z.object({
    name: z.string(),

    email: z.string(),
    image: z.string(),
  });

  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      image: initialData?.image || null,
    },
    validators: {
      onSubmit: userSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const toastId = toast.loading("Updating profile...");
      try {
        // if (onSubmit) {
        //   await onSubmit({
        //     name: value.name,
        //     email: value.email,
        //     image: value.image,
        //   });
        // }
        const { name, email, image } = value;
        const { data, error } = await updateProfile({
          id: initialData?.id as string,
          name: name,
          image: image as string,
        });
        console.log("data",data);
        console.log("error",error);
        if(data?.success){
          toast.success(data?.message, { id: toastId });
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
        <CardTitle className="text-2xl">User Profile</CardTitle>
        <CardDescription>
          Manage your personal account information
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
                  <span className="font-semibold text-sm">Name:</span>
                  <p className="text-base">{initialData.name}</p>
                </div>
                <div>
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold text-sm">Email:</span>
                    <BadgeCheck size={16} />
                  </div>

                  <p className="text-base">{initialData.email}</p>
                </div>
                <div>
                  <span className="font-semibold text-sm">Role:</span>
                  <p className="text-base capitalize">{initialData.role}</p>
                </div>
                <div>
                  <span className="font-semibold text-sm">Status:</span>
                  <p className="text-base capitalize">{initialData.status}</p>
                </div>
                <div>
                  <span className="font-semibold text-sm">Created:</span>
                  <p className="text-base">
                    {new Date(initialData.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {/* Edit mode */}
            {isEditing && (
              <>
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="John Doe"
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
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          disabled={true}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="m@example.com"
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
                  name="image"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Profile Image URL
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value || ""}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value || null)
                          }
                          aria-invalid={isInvalid}
                          placeholder="https://example.com/image.jpg"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                        <FieldDescription>
                          Enter the URL of your profile image
                        </FieldDescription>
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
                Edit Profile
              </Button>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
