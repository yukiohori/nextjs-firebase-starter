import { Meta } from "src/layout/Meta";
import { Main } from "src/templates/Main";
import Title from "src/components/atoms/Title";

import { firestore } from "src/lib/firebase";
import { Todo } from "src/types/todo";
import { useEffect, useState } from "react";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    firestore.collection("todos").onSnapshot((collection) => {
      const data = collection.docs.map<Todo>((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        isComplete: doc.data().isComplete,
        date: doc.data().date.toDate(),
      }));
      setTodos(data);
    });
  }, []);

  console.log(todos);

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
    </Main>
  );
};

export default Index;
