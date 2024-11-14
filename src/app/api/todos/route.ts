import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/todos
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
  }
}

// POST /api/todos
export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    const todo = await prisma.todo.create({
      data: {
        title,
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Error creating todo' }, { status: 500 });
  }
}

// PATCH /api/todos
export async function PATCH(request: Request) {
  try {
    const { id, completed } = await request.json();
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Error updating todo' }, { status: 500 });
  }
}

// DELETE /api/todos
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.todo.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Error deleting todo' }, { status: 500 });
  }
}
