import { Meta } from "src/layout/Meta";
import { Main } from "src/templates/Main";
import Title from "src/components/atoms/Title";
import Spinner from "src/components/atoms/Spinner";
import TodoTable from "src/components/organisms/TodoTable";

import { getCollection } from "src/lib/firebase";
import { getDocs } from "firebase/firestore";
import { TodoType } from "src/types/todo";
import { useEffect, useState } from "react";

const Index = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodoList = async () => {
      const snapshot = await getDocs(getCollection<TodoType>("todos"));
      const todoList = snapshot.docs.map((doc: any) => ({
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
      <Title>TODO LIST</Title>
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <TodoTable todoList={todos} />
      )}
    </Main>
  );
};

export default Index;
