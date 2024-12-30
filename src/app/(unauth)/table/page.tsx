"use client";
import { graphqlAction } from "@/actions";
import { DynamicTable } from "@/components/table/DynamicTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
};

const query = `query {
  employees {
    id
    name
    position
    department
  }
}`;

export default function TableComponent() {
  const data: Employee[] = [
    {
      id: "0",
      name: "John Doe",
      email: "john@gmail.com",
      position: "Software Engineer",
      department: "Engineering",
    },
    {
      id: "1",
      name: "Jane Smith",
      email: "jane@gmail.com",
      position: "Product Manager",
      department: "Product",
    },
    {
      id: "2",
      name: "Alice Johnson",
      email: "alice@gmail.com",
      position: "HR Manager",
      department: "HR",
    },
    {
      id: "3",
      name: "Bob Brown",
      email: "bob@gmail.com",
      position: "QA Engineer",
      department: "Engineering",
    },
    {
      id: "4",
      name: "Charlie Davis",
      email: "charlie@gamil.com",
      position: "Data Analyst",
      department: "Data",
    },
    {
      id: "5",
      name: "David Lee",
      email: "david@gmail.com",
      position: "Software Engineer",
      department: "Engineering",
    },
    {
      id: "6",
      name: "Eve Wilson",
      email: "eve@gmail.com",
      position: "Product Manager",
      department: "Product",
    },
    {
      id: "7",
      name: "Frank Miller",
      email: "frank@gmail.com",
      position: "HR Manager",
      department: "HR",
    },
    {
      id: "8",
      name: "Grace Brown",
      email: "grace@gmail.com",
      position: "QA Engineer",
      department: "Engineering",
    },
    {
      id: "9",
      name: "Helen Johnson",
      email: "helen@gmail.com",
      position: "Data Analyst",
      department: "Data",
    },
    {
      id: "10",
      name: "Ivy Davis",
      email: "ivy@gmail.com",
      position: "Software Engineer",
      department: "Engineering",
    },
  ];

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.original.id}</span>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }) => <span>{row.original.position}</span>,
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => <span>{row.original.department}</span>,
    },
    {
      accessorKey: "action",
      enableSorting: false,
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(row.original.id)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
            Delete
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleView(row.original.id)}>
            View
          </Button>
        </div>
      ),
    },
  ];
  const [allEmployees, setAllEmployees] = useState<Employee[]>(data);
  const [isLoading, setIsLoading] = useState(true);
  // Handler for editing an employee
  const handleEdit = (id: string) => {
    const employee = allEmployees.find((emp) => emp.id === id);
    if (employee) {
      alert(`Edit Employee: ${JSON.stringify(employee, null, 2)}`);
      // Add your edit logic here
    }
  };

  // Handler for deleting an employee
  const handleDelete = (id: string) => {
    const confirmed = confirm(`Are you sure you want to delete employee ID: ${id}?`);
    if (confirmed) {
      setAllEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  // Handler for viewing an employee's details
  const handleView = (id: string) => {
    const employee = allEmployees.find((emp) => emp.id === id);
    if (employee) {
      alert(`View Employee Details: ${JSON.stringify(employee, null, 2)}`);
      // Add your view logic here (e.g., open a modal)
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result: { employees: Employee[] } = await graphqlAction({ query });
      // setData(result.employees || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Sortable Employee Table</h1>
      <DynamicTable<Employee>
        caption="Employee Details"
        columns={columns}
        data={allEmployees}
        isLoading={false}
      />
    </div>
  );
}
