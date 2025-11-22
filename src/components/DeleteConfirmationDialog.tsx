"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Text,
  Portal,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { DELETE_DEPARTMENT, DeleteDepartmentMutationResponse } from "@/grapghql/mutations/departments.mutation"; 

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  department: { id: string; name: string } | null; 
  onDeleted: () => void;
}

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  department,
  onDeleted,
}: DeleteConfirmationDialogProps) {
  
  const [deleteDepartment, { loading }] = useMutation<
    DeleteDepartmentMutationResponse,
    { id: number }
  >(DELETE_DEPARTMENT);

  const handleDelete = async () => {
    if (!department) return;

    try {
      await deleteDepartment({
        variables: { id: Number(department.id) },
      });
      
      onDeleted(); 
      onClose(); 

      toast({
        title: "Department Deleted.",
        description: `The department "${department.name}" has been permanently removed.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Deletion Failed.",
        description: "Could not delete the department. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!department) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Trigger asChild>
        <Button display="none" />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="max-w-md p-6 bg-white shadow-xl rounded-lg">
            <Dialog.Header>
              <Dialog.Title className="text-xl font-bold text-red-600">
                Confirm Deletion: {department.name}
              </Dialog.Title>
            </Dialog.Header>
            
            <Dialog.Body>
              <Text className="text-gray-700 mb-4">
                Are you absolutely sure you want to delete the department <strong>
                    {department.name}</strong>? 
                <br />
                <span className="font-bold text-red-700">This action is irreversible</span> and may delete all associated records (sub-departments, employees, etc.).
              </Text>
            </Dialog.Body>
            
            <Dialog.Footer className="flex justify-end space-x-3 mt-4">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-50">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              
              <Button 
                onClick={handleDelete} 
                loading={loading}
                colorScheme="red"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Delete
              </Button>
            </Dialog.Footer>
            
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" className="absolute top-3 right-3" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; }) {
    throw new Error("Function not implemented.");
}
