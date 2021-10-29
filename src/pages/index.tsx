import { Meta } from "src/layout/Meta";
import { Main } from "src/templates/Main";
import Title from "src/components/atoms/Title";
import Spinner from "src/components/atoms/Spinner";
import TodoTable from "src/components/organisms/TodoTable";

import { firestore } from "src/lib/firebase";
import { TodoType } from "src/types/todo";
import { useEffect, useState } from "react";

const Index = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    firestore.collection("todos").onSnapshot((collection) => {
      const data = collection.docs.map<TodoType>((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        isComplete: doc.data().isComplete,
        date: doc.data().date.toDate(),
      }));
      console.log(data);

      setTodos(data);
      setIsLoading(false);
    });
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
