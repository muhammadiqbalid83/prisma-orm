"use client";

import { useEffect, useState } from "react";
import { User, UserSchema } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser, deleteUser, getUsers } from "../actions/useraction";
import { revalidatePath } from "next/cache";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  async function fetchUsers() {
    const fetchUsers = await getUsers();
    setUsers(fetchUsers);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data: User) => {
    try {
      await createUser(data);
      reset();
      revalidatePath("/users");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="mb-4">
          <input
            {...register("name")}
            placeholder="Name"
            className="border p-2 w-full"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="Email"
            className="border p-2 w-full"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("age", { valueAsNumber: true })}
            placeholder="Age"
            type="number"
            className="border p-2 w-full"
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create User
        </button>
      </form>
      <br />
      <br />

      <ul>
        {users.map((user) => (
          <li className="mb-2 p-2 border">
            {user.name} - {user.email} - {user.age}
            <button
              onClick={() => handleDelete(user.id)}
              className="ml-2 bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
