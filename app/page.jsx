import { PrismaClient } from '@prisma/client';
import addTodo from './actions/addTodo';
import deleteTodo from './actions/deleteTodo';

const prisma = new PrismaClient();

export default async function Home() {
  const todos = await prisma.todo.findMany();
  return (
    <main className="p-10 bg-black">
      <h1 className="text-center mb-10">Todo main</h1>
      <form action={addTodo}>
        <input
          className="border p-2"
          name="title"
          type="text"
          placeholder="Add a new todo"
        />
        <button
          type="submit"
          className="border p-2 text-white bg-blue-700 rounded-tr-md"
        >
          Add Todo
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <>
            <li key={todo.id} className='text-white flex justify-between mt-2'>
              <span>{todo.title}</span>
              <form action={deleteTodo}>
                <input type="hidden" name="id" value={todo.id} />
                <button className='border p-2 semibold text-red-600' type="submit">Delete</button>
              </form>
            </li>
          </>
        ))}
      </ul>
    </main>
  );
}
