"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  HStack,
  Field,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { CREATE_DEPARTMENT } from "@/grapghql/mutations/departments.mutation";
import {
  CreateDepartmentInput,
  CreateDepartmentMutationResponse,
} from "@/types/graphql";

export default function CreateDepartmentForm() {
  const [name, setName] = useState("");
  const [subNames, setSubNames] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [createDepartment, { loading, error, data }] = useMutation<
    CreateDepartmentMutationResponse,
    { input: CreateDepartmentInput }
  >(CREATE_DEPARTMENT);


  const handleSubChange = (index: number, value: string) => {
    const updated = [...subNames];
    updated[index] = value;
    setSubNames(updated);
  };

  const removeSubDepartment = (index: number) => {
    setSubNames(subNames.filter((_, i) => i !== index));
  };

  const addSubDepartment = () => {
    if (subNames.length === 0 || subNames[subNames.length - 1].trim() !== "") {
      setSubNames([...subNames, ""]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMessage(null);

    // Main department validation
    if (name.trim().length < 2) {
      setValidationError("Department name must be at least 2 characters long.");
      return;
    }

    // Sub-departments validation
    for (let i = 0; i < subNames.length; i++) {
      const sub = subNames[i].trim();
      if (sub.length < 2) {
        setValidationError(
          `Sub-department ${i + 1} must be at least 2 characters long.`
        );
        return;
      }
    }

    const input = {
      name: name.trim(),
      subDepartments:
        subNames.filter(Boolean).length > 0
          ? subNames.filter(Boolean).map((n) => ({ name: n.trim() }))
          : null,
    };

    try {
      await createDepartment({ variables: { input } });
      setName("");
      setSubNames([]);
      setValidationError(null);
      setSuccessMessage("Department created successfully!");
    } catch (err) {
      console.error("Mutation failed:", err);
    }
  };

  return (
    <Box p={6} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit}>
        <VStack align="stretch">
          {/* Main Department Name Field */}
          <Field.Root>
            <Field.Label>Department Name</Field.Label>
            <Field.RequiredIndicator />
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field.Root>

          {/* Sub-Department Fields */}
          {subNames.map((sub, i) => (
            <Field.Root key={i}>
              <Field.Label>Sub-Department {i + 1}</Field.Label>
              <HStack>
                <Input
                  value={sub}
                  onChange={(e) => handleSubChange(i, e.target.value)}
                />
                <Button
                  onClick={() => removeSubDepartment(i)}
                  colorScheme="red"
                  variant="outline"
                  size="md"
                >
                  Remove
                </Button>
              </HStack>
            </Field.Root>
          ))}

          <Button type="button" onClick={addSubDepartment} variant="outline">
            Add Sub-Department
          </Button>

          <Button type="submit" colorScheme="blue" loading={loading}>
            Create Department
          </Button>

          {/* Validation & Server Errors */}
          {validationError && <Text color="red.500">{validationError}</Text>}
          {error && <Text color="red.500">Error: {error.message}</Text>}
          {successMessage && (
            <Text color="green.500">{successMessage}</Text>
          )}
        </VStack>
      </form>
    </Box>
  );
}
