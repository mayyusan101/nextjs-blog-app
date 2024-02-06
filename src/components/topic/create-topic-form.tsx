"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { createTopic } from "@/actions";
import { useFormState } from "react-dom";
import CreateButton from "../common/create-btn";

function CreateTopicForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formState, action] = useFormState(createTopic, {
    errors: {},
  });

  return (
    <>
      <Button onPress={onOpen}>Create Topic</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Your Topic
              </ModalHeader>
              <ModalBody>
                <form action={action}>
                  <Input
                    autoFocus
                    name="name"
                    label="Topic"
                    placeholder="Enter your topic name"
                    variant="bordered"
                    className="mb-3"
                    isInvalid={!!formState.errors.name}
                    errorMessage={formState.errors.name?.join(",")}
                  />
                  <Input
                    name="description"
                    label="Description"
                    placeholder="Enter your description"
                    variant="bordered"
                    className="mb-3"
                    isInvalid={!!formState.errors.description}
                    errorMessage={formState.errors.description?.join(", ")}
                  />

                  {formState.errors._form ? (
                    <div className="p-1 bg-red-200 border border-red-400 rounded">
                      {formState.errors._form?.join(", ")}
                    </div>
                  ) : null}

                  <div className="flex gap-1 my-3">
                    <Button
                      className="flex-1"
                      color="danger"
                      variant="light"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <CreateButton />
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTopicForm;
