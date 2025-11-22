"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Heading,
  Separator,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  UpdateDepartmentMutationVariables,
  UpdateDepartmentMutationResponse,
  DeleteDepartmentMutationResponse,
  DeleteDepartmentMutationVariables,
} from "@/grapghql/mutations/departments.mutation";
import { Department } from "@/types/graphql";
import { GET_DEPARTMENTS, GetDepartmentsQuery } from "@/grapghql/queries/departments.queries";
import UpdateDepartmentDialog from "@/components/UpdateDepartment";

export default function DepartmentManager() {
  const { data, loading, error, refetch } = useQuery<GetDepartmentsQuery>(GET_DEPARTMENTS);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [newName, setNewName] = useState("");

  const [updateDepartment, { loading: updating }] = useMutation<
    UpdateDepartmentMutationResponse,
    UpdateDepartmentMutationVariables
  >(UPDATE_DEPARTMENT);

  const [deleteDepartment] = useMutation<
    DeleteDepartmentMutationResponse,
    DeleteDepartmentMutationVariables
  >(DELETE_DEPARTMENT);

  if (loading) return <Text>Loading departments...</Text>;
  if (error) return <Text color="red.500">Error loading departments: {error.message}</Text>;

  const handleSelect = (dept: Department) => {
    setSelectedDept(dept);
    setNewName(dept.name);
  };

  const handleUpdate = async () => {
    if (!selectedDept) return;

    if (newName.trim().length < 2) {
      alert("Department name must be at least 2 characters long");
      return;
    }

    await updateDepartment({
      variables: {
        id: selectedDept.id,
        input: { name: newName.trim() },
      },
    });
    setSelectedDept(null);
    setNewName("");
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department? This will delete all sub-departments too.")) return;
    await deleteDepartment({ variables: { id: Number(id) } });
    if (selectedDept?.id === id) setSelectedDept(null);
    refetch();
  };

  return (
    <VStack align="stretch"  p={6}>
      <Heading size="md">Department Hierarchy</Heading>
      <Separator />

      {data?.getDepartments.map((dept) => (
        <Box key={dept.id} p={4} borderWidth={1} borderRadius="md">
          <HStack justify="space-between">
            <Text fontWeight="bold">{dept.name}</Text>
            <HStack >
              <Button size="sm" onClick={() => handleSelect(dept)}>
                Update
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(dept.id)}
              >
                Delete
              </Button>
            </HStack>
          </HStack>

          {dept?.subDepartments && dept?.subDepartments.length > 0 && (
            <VStack align="start" pl={6} pt={2}>
              {dept.subDepartments.map((sub) => (
                <Text key={sub.id}>• {sub.name}</Text>
              ))}
            </VStack>
          )}
        </Box>
      ))}

      {
        selectedDept && <UpdateDepartmentDialog isOpen={true} onClose={() => setSelectedDept(null)} department={selectedDept} onUpdated={() => refetch()} />
      }

      {selectedDept && (
        <Box p={4} borderWidth={1} borderRadius="md">
          <Heading size="sm" mb={2}>
            Update Department: {selectedDept.name}
          </Heading>
          <HStack>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New Department Name"
            />
            <Button colorScheme="blue" onClick={handleUpdate} loading={updating}>
              Update
            </Button>
          </HStack>
        </Box>
      )}
    </VStack>
  );
}
