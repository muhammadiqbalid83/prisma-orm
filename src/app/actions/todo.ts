"use server";

import { prisma } from "../lib/script";

// create
export async function createTodo(title: string, userId: number) {
  return prisma.todo.create({
    data: {
      title,
      userId,
    },
  });
}

// read
export async function getTodos(userId: number) {
  return prisma.todo.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// update
export async function updateTodo(id: number, completed: boolean) {
  return prisma.todo.update({
    where: { id },
    data: { completed },
  });
}

// delete
export async function deleteTodo(id: number) {
  return prisma.todo.delete({
    where: { id },
  });
}
