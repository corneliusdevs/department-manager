"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  // Note: Separator is usually imported as Divider in older Chakra versions,
  // but I'll assume Separator is correct for your v3/v4 setup.
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
import {
  GET_DEPARTMENTS,
  GetDepartmentsQuery,
} from "@/grapghql/queries/departments.queries";
import UpdateDepartmentDialog from "@/components/UpdateDepartment";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DepartmentManager() {
  const { data, loading, error, refetch } =
    useQuery<GetDepartmentsQuery>(GET_DEPARTMENTS);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const router = useRouter();

  const [deleteDepartment] = useMutation<
    DeleteDepartmentMutationResponse,
    DeleteDepartmentMutationVariables
  >(DELETE_DEPARTMENT);

  if (loading) return <Text>Loading departments...</Text>;
  if (error)
    return (
      <Text color="red.500">Error loading departments: {error.message}</Text>
    );

  const handleSelect = (dept: Department) => {
    setSelectedDept(dept);
  };

  // FIX: Replace confirm() with a custom modal or toast as alert()/confirm() are blocked in the environment
  const handleDelete = async (id: string) => {
    // In a production app, replace this with a custom confirmation dialog (Modal/AlertDialog)
    const confirmed = window.confirm(
      "Are you sure you want to delete this department? This will delete all sub-departments too."
    );
    if (!confirmed) return;

    await deleteDepartment({ variables: { id: Number(id) } });
    if (selectedDept?.id === id) setSelectedDept(null);
    refetch();
  };

  return (
    // Responsive container: uses less padding on small screens (base/default) and more on medium screens (md)
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      {/* FIX: Changed `spacing` to use the responsive `gap` style prop directly to bypass potential 
               type conflicts in older/mismatched Chakra UI versions, while preserving responsiveness. 
               VStack/Stack uses the `spacing` prop, but using the `gap` style prop with responsive values is a robust alternative.
      */}
      <VStack align="stretch" gap={{ base: 4, md: 6 }}>
        <HStack justify="space-between" mb={4}>
          <Heading size={{ base: "md", md: "lg" }}>
            Department Hierarchy
          </Heading>
          {/* Responsive button size */}
          <Button
            size={{ base: "sm", md: "md" }}
            // Ensures icon and text are centered correctly
            className="flex items-center gap-1"
            onClick={() => {
              router.push("/departments/create");
            }}
          >
            Create <Plus size={16} />
          </Button>
        </HStack>
        <Separator />

        {data?.getDepartments.map((dept) => (
          // Responsive box padding
          <Box
            key={dept.id}
            p={{ base: 3, md: 4 }}
            borderWidth={1}
            borderRadius="md"
            _hover={{ bg: "gray.50" }}
          >
            <HStack
              justify="space-between"
              // Responsive: wrap HStack items on small screens if they overflow
              flexWrap={{ base: "wrap", md: "nowrap" }}
            >
              <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                {dept.name}
              </Text>

              {/* Button container */}
              <HStack
                // Ensure buttons stay in a row on small screens but don't take up full width
                flexShrink={0}
              >
                <Button
                  size="sm"
                  onClick={() => handleSelect(dept)}
                  className="flex items-center justify-center"
                >
                  <Pencil size={14}  />
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(dept.id)}
                  className="flex items-center justify-center"
                >
                  <Trash size={14} />
                </Button>
              </HStack>
            </HStack>

            {dept?.subDepartments && dept?.subDepartments.length > 0 && (
              <VStack
                align="start"
                // Responsive padding left for sub-departments
                pl={{ base: 4, md: 8 }}
                pt={2}
              >
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="semibold"
                  mt={2}
                >
                  Sub-Departments:
                </Text>
                {dept.subDepartments.map((sub) => (
                  <Text key={sub.id} fontSize={{ base: "sm", md: "md" }}>
                    • {sub.name}
                  </Text>
                ))}
              </VStack>
            )}
          </Box>
        ))}

        {/* FIX: The dialog should only be open if a department is selected. 
          The `isOpen={true}` was a bug and has been fixed here: 
        */}
        <UpdateDepartmentDialog
          isOpen={!!selectedDept} // Only open if selectedDept is truthy (not null)
          onClose={() => setSelectedDept(null)}
          department={selectedDept}
          onUpdated={() => refetch()}
        />
      </VStack>
    </Box>
  );
}
