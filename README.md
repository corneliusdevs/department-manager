
---

```markdown
# **Department Manager – Frontend (Next.js + TypeScript)**

A modern frontend application built with **Next.js 14 App Router**, **TypeScript**, **Chakra UI (v3)**, **Apollo Client**, and **Lucide Icons**.  
This application manages organizational departments, supports authentication, and communicates with a GraphQL backend.

---

## 🌐 **Production Deployment**

➡️ **Live URL (Vercel):**  
**[ADD_PRODUCTION_LINK_HERE]**

---

## 🚀 Features

- 🔐 Secure login (GraphQL authentication)
- 🏢 Department management:
  - Create departments
  - Add optional sub-departments
  - Update department name (dialog modal)
  - Delete department (confirmation modal)
  - View hierarchical department structure
- 🧠 Apollo Client with token + error handling
- 🎨 Chakra UI v3 (for styling + dialogs)
- ✨ Lucide Icons
- ⚠️ Automatic logout on token expiration
- 📦 pnpm as the package manager

---

## 🛠 Tech Stack

| Technology         | Purpose |
|--------------------|---------|
| **Next.js 14**     | Framework & routing |
| **TypeScript**     | Type safety |
| **Chakra UI v3**   | UI components |
| **Apollo Client**  | GraphQL communication |
| **Lucide Icons**   | Icons |
| **pnpm**           | Fast package manager |

---

## 📁 Project Structure

```

src/
├── app/
│    ├── login/page.tsx
│    ├── departments/page.tsx
│    └── departments/create/page.tsx
├── components/
│    ├── UpdateDepartmentDialog.tsx
│    ├── DeleteConfirmationDialog.tsx
├── grapghql/
│    ├── mutations/
│    ├── queries/
├── types/
│    └── graphql.ts
├── common/
│    └── LoadingSpinner.tsx
└── apollo-client.ts

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <YOUR_REPO_URL>
cd <PROJECT_FOLDER>
````

### 2️⃣ Install dependencies

```bash
pnpm install
```

### 3️⃣ Environment Setup

Create a file:

```
.env.local
```

Add:

```
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:3000/graphql
```

Modify this if your backend uses another port.

---

## ▶️ Running the Project Locally

```bash
pnpm dev -- -p 3001
```

Open in browser:

👉 [http://localhost:3001](http://localhost:3001)

---

# 🔐 Authentication Flow

### ✔ Login Page

* Validates username and password
* Executes login mutation
* Stores token in `localStorage`
* Redirects user to `/departments`

### ✔ Auto-Redirect When Token Already Exists

```ts
useEffect(() => {
  const token = localStorage.getItem('accessToken');
  if (token) router.replace('/departments');
}, []);
```

---

# ⚠️ Global Session Expiration Handling

The app uses Apollo’s `ErrorLink` to handle expired/invalid tokens:

### When a `401` is detected:

1. Token is removed from localStorage
2. A Chakra toaster appears
3. User is redirected to `/login`

Example toast:

```ts
toaster.create({
  title: "Session expired",
  description: "Please log in again.",
  type: "warning",
});
```

---

# 🏢 Department Management

### ✔ Fetch Departments

* Using `GET_DEPARTMENTS` GraphQL query
* Displays hierarchy
* Shows update/delete buttons

### ✔ Create Department

Includes:

* Required department name
* Optional dynamic list of sub-departments

### ✔ Update Department

* Opens `UpdateDepartmentDialog`
* Only the **name** is editable
* Updates instantly with refetch

### ✔ Delete Department

* Confirmation modal (`DeleteConfirmationDialog`)
* UI refreshes on success

---

# 🎨 UI / User Experience

* Fully responsive (mobile → desktop)
* Clean, simple, intuitive layout
* Chakra UI dialogs for update/delete actions
* Loading spinner during GraphQL operations
* Toasts for feedback
* Icons via Lucide (`Pencil`, `Plus`, `Trash`)

---

# 🔧 Scripts

| Script                | Description              |
| --------------------- | ------------------------ |
| `pnpm dev -- -p 3001` | Start dev server on 3001 |
| `pnpm build`          | Build for production     |
| `pnpm start`          | Start production server  |
| `pnpm lint`           | Lint the code            |

---

## 📦 Deployment (Vercel)

### Steps:

1. Push project to GitHub or GitLab.
2. Import into **Vercel**.
3. Add environment variable:

```
NEXT_PUBLIC_GRAPHQL_URI=<YOUR_PRODUCTION_GRAPHQL_URL>
```

4. Deploy.

Add your link:

➡️ **[https://department-manager-cyan.vercel.app/](https://department-manager-cyan.vercel.app/)**


## 📄 License

MIT License
