"use server";

import { prisma } from "../lib/script";
import { User, UserSchema } from "../types";

// create
export async function createUser(data: User) {
  const validatedData = UserSchema.parse(data);
  return prisma.user.create({
    data: validatedData,
  });
}

// read
export async function getUsers() {
  return prisma.user.findMany();
}

// delete
export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}
