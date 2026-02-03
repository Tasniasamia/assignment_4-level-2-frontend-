"use client";

import { updateStatus } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { userType } from "@/types";
import { toast } from "sonner";

type StatusButtonProps = {
  userData: userType;
};

const StatusButton = ({ userData }: StatusButtonProps) => {
  const handleStatus = async () => {
    const { data, error } = await updateStatus({ id: userData.id });
    if (data?.success) {
      toast.success(data.message || "Status updated successfully");
      return;
    }

    toast.error(error?.error?.message || error?.message  || "Status update failed");
  };

  return (
    <Button
      onClick={handleStatus}
      className="cursor-pointer capitalize text-white bg-primary px-3 py-2"
    >
      {userData.status}
    </Button>
  );
};

export default StatusButton;
