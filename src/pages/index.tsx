import { Meta } from "src/layout/Meta";
import { Main } from "src/templates/Main";

import Title from "src/components/atoms/Title";
import Spinner from "src/components/atoms/Spinner";
import TodoTable from "src/components/organisms/TodoTable";
import IconButton from "src/components/atoms/IconButton";
import Dialog from "src/components/molecules/Dialog";
import ConfirmDialog from "src/components/molecules/ConfirmDialog";
import Button from "src/components/atoms/Button";
import Checkbox from "src/components/atoms/Checkbox";

import { addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getCollection, getDocument, getBatch } from "src/lib/firebase";
import { getDocs } from "firebase/firestore";
import { TodoType } from "src/types/todo";
import { useEffect, useState } from "react";

const defaultTodo: TodoType = {
  todo: "",
  isComplete: false,
  date: "",
};

const Index = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [formTodo, setFormTodo] = useState<TodoType>(defaultTodo);
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    const snapshot = await getDocs(getCollection<TodoType>("todos"));
    const todoList = snapshot.docs.map((doc) => ({
      id: doc.id,
      todo: doc.data().todo,
      isComplete: doc.data().isComplete,
      date: doc.data().date.toDate(),
    }));
    todoList.sort((a, b) => {
      return new Date(b.date) > new Date(a.date) ? 1 : -1;
    });
    setTodos(todoList);
    setIsLoading(false);
  };

  const addUpdateTodo = (selectedTodo: TodoType | null = null) => {
    setFormTodo(selectedTodo || defaultTodo);
    setIsModalOpen(true);
  };

  const submitTodo = async (e: any) => {
    e.preventDefault();
    if (formTodo.todo.trim().length) {
      formTodo.date = serverTimestamp();
      if (formTodo.id) {
        const document = getDocument<TodoType>(`todos/${formTodo.id}`);
        await updateDoc(document, formTodo);
      } else {
        await addDoc(getCollection<TodoType>("todos"), formTodo);
      }
      await fetchTodoList();
      setIsModalOpen(false);
    }
  };

  const deleteTodo = async () => {
    const batch = getBatch();
    selectedTodos.map((target) => {
      const document = getDocument<TodoType>(`todos/${target}`);
      batch.delete(document);
    });
    await batch.commit();
    await fetchTodoList();
    setSelectedTodos([]);
    setIsConfirmOpen(false);
  };

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="-z-10 w-screen h-screen fixed inset-0 bg-gradient-to-tl from-gray-700 via-gray-900 to-black" />
      <div className="bg-white rounded-lg p-4 my-20">
        <Title>TODO LIST</Title>
        <div className="text-right">
          <IconButton
            onClick={() => addUpdateTodo()}
            icon={
              <svg
                className="animate-bounce w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                  fill="currentColor"
                />
              </svg>
            }
          />
        </div>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <TodoTable
            selectedTodos={selectedTodos}
            setSelectedTodos={setSelectedTodos}
            todoList={todos}
            addUpdateTodo={addUpdateTodo}
            deleteTodo={() => setIsConfirmOpen(true)}
          />
        )}
      </div>
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={submitTodo}>
          <h3 className="font-bold text-center text-3xl">
            {formTodo.id ? "UPDATE TODO" : "ADD TODO"}
          </h3>
          <div className="p-4">
            <span className="flex flex-row items-center space-x-4 justify-between w-full">
              <p>TODO:</p>
              <input
                value={formTodo.todo}
                onChange={(e) =>
                  setFormTodo({ ...formTodo, ...{ todo: e.target.value } })
                }
                className="border rounded px-2 py-1 w-full"
                type="text"
              />
            </span>
            {formTodo.id && (
              <span className="flex flex-row items-center space-x-4 w-full mt-2">
                <p>COMPLETE:</p>
                <Checkbox
                  checked={formTodo.isComplete}
                  onChange={(e: any) => {
                    setFormTodo({
                      ...formTodo,
                      ...{ isComplete: e.target.checked },
                    });
                  }}
                />
              </span>
            )}
          </div>
          <span className="w-full flex justify-center items-center">
            <Button
              backgroundColor="bg-gray-600"
              borderFormat="rounded-md"
              type="submit"
              label="SUBMIT"
              textFormat="text-white font-bold"
            />
          </span>
        </form>
      </Dialog>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirmSubmit={deleteTodo}
      >
        <p className="text-center">ARE YOU SURE?</p>
      </ConfirmDialog>
    </Main>
  );
};

export default Index;
