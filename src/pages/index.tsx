import { Meta } from "src/layout/Meta";
import { Main } from "src/templates/Main";

import Title from "src/components/atoms/Title";
import Spinner from "src/components/atoms/Spinner";
import TodoTable from "src/components/organisms/TodoTable";
import IconButton from "src/components/atoms/IconButton";

import { getCollection } from "src/lib/firebase";
import { getDocs } from "firebase/firestore";
import { TodoType } from "src/types/todo";
import { useEffect, useState } from "react";

const Index = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodoList = async () => {
      const snapshot = await getDocs(getCollection<TodoType>("todos"));
      const todoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        isComplete: doc.data().isComplete,
        date: doc.data().date.toDate(),
      }));
      setTodos(todoList);
      setIsLoading(false);
    };
    fetchTodoList();
  }, []);

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
      <div className="bg-white rounded-lg p-4 mt-20">
        <Title>TODO LIST</Title>
        <div className="text-right">
          <IconButton
            onClick={() => setIsModalOpen(true)}
            Icon={
              <svg
                className="w-6 h-6"
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
          <TodoTable todoList={todos} />
        )}
      </div>
    </Main>
  );
};

export default Index;
