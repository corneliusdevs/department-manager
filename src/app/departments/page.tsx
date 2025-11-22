"use client";
import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  Separator,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client/react";
import { Department } from "@/types/graphql";
import {
  GET_DEPARTMENTS,
  GetDepartmentsQuery,
} from "@/grapghql/queries/departments.queries";
import UpdateDepartmentDialog from "@/components/UpdateDepartment";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/common/LoadingSpinner";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

export default function DepartmentManager() {
  const { data, loading, error, refetch } =
    useQuery<GetDepartmentsQuery>(GET_DEPARTMENTS);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState<Department | null>(null);

  const router = useRouter();

  if (loading) return <LoadingScreen />;
  if (error)
    return (
      <Box display="flex" justifyContent="center" w="100%" mt={10}>
        <Text color="red.500">Error loading departments: {error.message}</Text>
      </Box>
    );

  const handleSelect = (dept: Department) => {
    setSelectedDept(dept);
  };

  const handleDelete = (dept: Department) => {
    setDeptToDelete(dept);
    setIsDeleteOpen(true);
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <VStack align="stretch" gap={{ base: 4, md: 6 }}>
        <HStack justify="space-between" mb={4}>
          <Heading size={{ base: "md", md: "lg" }}>
            Department Hierarchy
          </Heading>

          <HStack>
            <Button size={{ base: "sm", md: "md" }} onClick={() => refetch()}>
              Refetch
            </Button>

            <Button
              size={{ base: "sm", md: "md" }}
              className="flex items-center gap-1"
              onClick={() => {
                router.push("/departments/create");
              }}
            >
              Create <Plus size={16} />
            </Button>
          </HStack>
        </HStack>
        <Separator />

        {data?.getDepartments.map((dept) => (
          <Box
            key={dept.id}
            p={{ base: 3, md: 4 }}
            borderWidth={1}
            borderRadius="md"
            _hover={{ bg: "gray.50" }}
          >
            <HStack
              justify="space-between"
              flexWrap={{ base: "wrap", md: "nowrap" }}
            >
              <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                {dept.name}
              </Text>

              <HStack flexShrink={0}>
                <Button
                  size="sm"
                  onClick={() => handleSelect(dept)}
                  className="flex items-center justify-center"
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(dept)} // 🔥 OPEN DELETE DIALOG
                  className="flex items-center justify-center"
                >
                  <Trash size={14} />
                </Button>
              </HStack>
            </HStack>

            {dept?.subDepartments && dept?.subDepartments.length > 0 && (
              <VStack align="start" pl={{ base: 4, md: 8 }} pt={2}>
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

        <UpdateDepartmentDialog
          isOpen={!!selectedDept}
          onClose={() => setSelectedDept(null)}
          department={selectedDept}
          onUpdated={() => refetch()}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          department={deptToDelete}
          onDeleted={() => {
            refetch();
            setIsDeleteOpen(false);
            setDeptToDelete(null);
          }}
        />
      </VStack>
    </Box>
  );
}
