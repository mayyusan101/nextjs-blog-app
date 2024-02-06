import { Button } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

function CreateButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      isLoading={pending}
      className="flex-1"
      color="primary"
      type="submit"
    >
      Create
    </Button>
  );
}

export default CreateButton;
