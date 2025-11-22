"use client";

import { useState, useEffect } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_DEPARTMENT } from "@/grapghql/mutations/departments.mutation";
import {
  UpdateDepartmentMutationResponse,
  UpdateDepartmentInput,
} from "@/types/graphql";

interface UpdateDepartmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  department: { id: string; name: string } | null;
  onUpdated: () => void;
}

export default function UpdateDepartmentDialog({
  isOpen,
  onClose,
  department,
  onUpdated,
}: UpdateDepartmentDialogProps) {
  const [newName, setNewName] = useState("");
  const [updateDepartment, { loading }] = useMutation<
    UpdateDepartmentMutationResponse,
    { id: number; input: UpdateDepartmentInput }
  >(UPDATE_DEPARTMENT);

  useEffect(() => {
    if (department) setNewName(department.name);
  }, [department]);

  const handleUpdate = async () => {
    if (!department) return;
    if (!newName.trim() || newName.trim().length < 2) return;

    try {
      await updateDepartment({
        variables: { id: Number(department.id), input: { name: newName.trim() } },
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!department) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Trigger asChild>
        <Button display="none" /> {/* Hidden trigger, controlled externally */}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Update Department: {department.name}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <HStack>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="New Department Name"
                  style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #CBD5E0" }}
                />
              </HStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleUpdate} loading={loading}>
                Update
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
