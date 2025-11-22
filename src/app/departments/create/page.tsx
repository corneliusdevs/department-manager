// // "use client";
// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   Input,
// //   VStack,
// //   Text,
// //   HStack,
// //   Field,
// // } from "@chakra-ui/react";
// // import { useMutation } from "@apollo/client/react";
// // import { CREATE_DEPARTMENT } from "@/grapghql/mutations/departments.mutation";
// // import {
// //   CreateDepartmentInput,
// //   CreateDepartmentMutationResponse,
// // } from "@/types/graphql";

// // export default function CreateDepartmentForm() {
// //   const [name, setName] = useState("");
// //   const [subNames, setSubNames] = useState<string[]>([]);
// //   const [validationError, setValidationError] = useState<string | null>(null);
// //   const [successMessage, setSuccessMessage] = useState<string | null>(null);

// //   const [createDepartment, { loading, error, data }] = useMutation<
// //     CreateDepartmentMutationResponse,
// //     { input: CreateDepartmentInput }
// //   >(CREATE_DEPARTMENT);


// //   const handleSubChange = (index: number, value: string) => {
// //     const updated = [...subNames];
// //     updated[index] = value;
// //     setSubNames(updated);
// //   };

// //   const removeSubDepartment = (index: number) => {
// //     setSubNames(subNames.filter((_, i) => i !== index));
// //   };

// //   const addSubDepartment = () => {
// //     if (subNames.length === 0 || subNames[subNames.length - 1].trim() !== "") {
// //       setSubNames([...subNames, ""]);
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setValidationError(null);
// //     setSuccessMessage(null);

// //     // Main department validation
// //     if (name.trim().length < 2) {
// //       setValidationError("Department name must be at least 2 characters long.");
// //       return;
// //     }

// //     // Sub-departments validation
// //     for (let i = 0; i < subNames.length; i++) {
// //       const sub = subNames[i].trim();
// //       if (sub.length < 2) {
// //         setValidationError(
// //           `Sub-department ${i + 1} must be at least 2 characters long.`
// //         );
// //         return;
// //       }
// //     }

// //     const input = {
// //       name: name.trim(),
// //       subDepartments:
// //         subNames.filter(Boolean).length > 0
// //           ? subNames.filter(Boolean).map((n) => ({ name: n.trim() }))
// //           : null,
// //     };

// //     try {
// //       await createDepartment({ variables: { input } });
// //       setName("");
// //       setSubNames([]);
// //       setValidationError(null);
// //       setSuccessMessage("Department created successfully!");
// //     } catch (err) {
// //       console.error("Mutation failed:", err);
// //     }
// //   };

// //   return (
// //     <Box p={6} borderWidth={1} borderRadius="md">
// //       <form onSubmit={handleSubmit}>
// //         <VStack align="stretch">
// //           {/* Main Department Name Field */}
// //           <Field.Root>
// //             <Field.Label>Department Name</Field.Label>
// //             <Field.RequiredIndicator />
// //             <Input value={name} onChange={(e) => setName(e.target.value)} />
// //           </Field.Root>

// //           {/* Sub-Department Fields */}
// //           {subNames.map((sub, i) => (
// //             <Field.Root key={i}>
// //               <Field.Label>Sub-Department {i + 1}</Field.Label>
// //               <HStack>
// //                 <Input
// //                   value={sub}
// //                   onChange={(e) => handleSubChange(i, e.target.value)}
// //                 />
// //                 <Button
// //                   onClick={() => removeSubDepartment(i)}
// //                   colorScheme="red"
// //                   variant="outline"
// //                   size="md"
// //                 >
// //                   Remove
// //                 </Button>
// //               </HStack>
// //             </Field.Root>
// //           ))}

// //           <Button type="button" onClick={addSubDepartment} variant="outline">
// //             Add Sub-Department
// //           </Button>

// //           <Button type="submit" colorScheme="blue" loading={loading}>
// //             Create Department
// //           </Button>

// //           {/* Validation & Server Errors */}
// //           {validationError && <Text color="red.500">{validationError}</Text>}
// //           {error && <Text color="red.500">Error: {error.message}</Text>}
// //           {successMessage && (
// //             <Text color="green.500">{successMessage}</Text>
// //           )}
// //         </VStack>
// //       </form>
// //     </Box>
// //   );
// // }



// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Input,
//   VStack,
//   Text,
//   HStack,
//   Field, 
// } from "@chakra-ui/react";
// import { useMutation } from "@apollo/client/react";
// import { CREATE_DEPARTMENT } from "@/grapghql/mutations/departments.mutation";
// import {
//   CreateDepartmentInput,
//   CreateDepartmentMutationResponse,
// } from "@/types/graphql";

// export default function CreateDepartmentForm() {
//   const [name, setName] = useState("");
//   const [subNames, setSubNames] = useState<string[]>([]);
//   const [validationError, setValidationError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const [createDepartment, { loading, error, data }] = useMutation<
//     CreateDepartmentMutationResponse,
//     { input: CreateDepartmentInput }
//   >(CREATE_DEPARTMENT);


//   const handleSubChange = (index: number, value: string) => {
//     const updated = [...subNames];
//     updated[index] = value;
//     setSubNames(updated);
//   };

//   const removeSubDepartment = (index: number) => {
//     setSubNames(subNames.filter((_, i) => i !== index));
//   };

//   const addSubDepartment = () => {
//     if (subNames.length === 0 || subNames[subNames.length - 1].trim() !== "") {
//       setSubNames([...subNames, ""]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setValidationError(null);
//     setSuccessMessage(null);

//     // Main department validation
//     if (name.trim().length < 2) {
//       setValidationError("Department name must be at least 2 characters long.");
//       return;
//     }

//     // Sub-departments validation
//     for (let i = 0; i < subNames.length; i++) {
//       const sub = subNames[i].trim();
//       if (sub.length < 2) {
//         setValidationError(
//           `Sub-department ${i + 1} must be at least 2 characters long.`
//         );
//         return;
//       }
//     }

//     const input = {
//       name: name.trim(),
//       subDepartments:
//         subNames.filter(Boolean).length > 0
//           ? subNames.filter(Boolean).map((n) => ({ name: n.trim() }))
//           : null,
//     };

//     try {
//       await createDepartment({ variables: { input } });
//       setName("");
//       setSubNames([]);
//       setValidationError(null);
//       setSuccessMessage("Department created successfully!");
//     } catch (err) {
//       console.error("Mutation failed:", err);
//     }
//   };

//   return (
//     // 1. Center the form on the page and set a max width (e.g., 500px) for responsiveness
//     <Box 
//       p={{ base: 4, md: 6 }} 
//       borderWidth={1} 
//       borderRadius="lg" // Increased radius for better visual appeal
//       maxWidth={{ base: "95%", sm: "80%", md: "500px" }} // Responsive width
//       mx="auto" // Center the box
//       boxShadow="lg" // Added shadow
//     >
//       <Text fontSize={{ base: "xl", md: "2xl" }} mb={4} fontWeight="bold">
//         Create New Department 🏢
//       </Text>
//       <form onSubmit={handleSubmit}>
//         <VStack align="stretch" >
//           {/* Main Department Name Field */}
//           <Field.Root>
//             <Field.Label>Department Name</Field.Label>
//             <Field.RequiredIndicator />
//             <Input 
//               value={name} 
//               onChange={(e) => setName(e.target.value)} 
//               size="lg" // Larger input on all devices
//             />
//           </Field.Root>

//           {/* Sub-Department Fields */}
//           {subNames.map((sub, i) => (
//             <Field.Root key={i}>
//               <Field.Label>Sub-Department {i + 1}</Field.Label>
//               {/* 2. Make the sub-department input/button responsive */}
//               <HStack 
//                 align="flex-start" // Align items at the start in case they wrap
//                 flexDir={{ base: "column", sm: "row" }} // Stacks vertically on small screens, horizontally otherwise
//               >
//                 <Input
//                   value={sub}
//                   onChange={(e) => handleSubChange(i, e.target.value)}
//                   flex={{ base: "none", sm: 1 }} // Input takes full width on small screens, expands on larger
//                 />
//                 <Button
//                   onClick={() => removeSubDepartment(i)}
//                   colorScheme="red"
//                   variant="outline"
//                   size={{ base: "sm", sm: "md" }} // Smaller button on mobile
//                   w={{ base: "100%", sm: "auto" }} // Full width on mobile, auto width on larger
//                 >
//                   Remove 🗑️
//                 </Button>
//               </HStack>
//             </Field.Root>
//           ))}

//           <Button 
//             type="button" 
//             onClick={addSubDepartment} 
//             variant="outline" 
//             size="md" 
//             w="100%"
//           >
//             ➕ Add Sub-Department
//           </Button>

//           <Button 
//             type="submit" 
//             colorScheme="blue" 
//             loading={loading} // Use isLoading prop for Chakra Button
//             size="lg" 
//             w="100%"
//           >
//             Create Department
//           </Button>

//           {/* Validation & Server Errors */}
//           {validationError && <Text color="red.500">{validationError}</Text>}
//           {error && <Text color="red.500">Error: {error.message}</Text>}
//           {successMessage && (
//             <Text color="green.500" fontWeight="semibold">
//               {successMessage} 🎉
//             </Text>
//           )}
//         </VStack>
//       </form>
//     </Box>
//   );
// }





"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  HStack,
  Center,
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
    <Center minHeight="100vh" p={{ base: 4, md: 8 }}> 
      <Box 
        p={{ base: 4, md: 6 }} 
        borderWidth={1} 
        borderRadius="lg" 
        maxWidth={{ base: "95%", sm: "80%", md: "500px" }} 
        mx="auto" 
        boxShadow="lg" 
      >
        <Text fontSize={{ base: "xl", md: "2xl" }} mb={4} fontWeight="bold">
          Create New Department 🏢
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack align="stretch" >
            {/* Main Department Name Field */}
            <Field.Root>
              <Field.Label>Department Name</Field.Label>
              <Field.RequiredIndicator />
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                size="lg" 
              />
            </Field.Root>

            {/* Sub-Department Fields */}
            {subNames.map((sub, i) => (
              <Field.Root key={i}>
                <Field.Label>Sub-Department {i + 1}</Field.Label>
                <HStack 
                  align="flex-start" 
                  flexDir={{ base: "column", sm: "row" }} 
                >
                  <Input
                    value={sub}
                    onChange={(e) => handleSubChange(i, e.target.value)}
                    flex={{ base: "none", sm: 1 }} 
                  />
                  <Button
                    onClick={() => removeSubDepartment(i)}
                    colorScheme="red"
                    variant="outline"
                    size={{ base: "sm", sm: "md" }} 
                    w={{ base: "100%", sm: "auto" }} 
                  >
                    Remove 🗑️
                  </Button>
                </HStack>
              </Field.Root>
            ))}

            <Button 
              type="button" 
              onClick={addSubDepartment} 
              variant="outline" 
              size="md" 
              w="100%"
            >
              ➕ Add Sub-Department
            </Button>

            <Button 
              type="submit" 
              colorScheme="blue" 
              loading={loading} 
              size="lg" 
              w="100%"
            >
              Create Department
            </Button>

            {/* Validation & Server Errors */}
            {validationError && <Text color="red.500">{validationError}</Text>}
            {error && <Text color="red.500">Error: {error.message}</Text>}
            {successMessage && (
              <Text color="green.500" fontWeight="semibold">
                {successMessage} 🎉
              </Text>
            )}
          </VStack>
        </form>
      </Box>
    </Center>
  );
}