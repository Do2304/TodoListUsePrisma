import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const port = 3001;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Get all todos
app.get('/api/todos', async (req: Request, res: Response) => {
  try {
    const todos = await prisma.nhap123.findMany();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new todo
app.post('/api/todos', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newTodo = await prisma.nhap123.create({
      data: {
        name,
        iscompleted: false,
      },
    });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedTodo = await prisma.nhap123.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.nhap123.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/todos/:id/complete', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTodo = await prisma.nhap123.update({
      where: { id: Number(id) },
      data: { iscompleted: true },
    });
    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/todos/:id/incomplete', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTodo = await prisma.nhap123.update({
      where: { id: Number(id) },
      data: { iscompleted: false },
    });
    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});