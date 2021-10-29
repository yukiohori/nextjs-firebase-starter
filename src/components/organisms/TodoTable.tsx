import type { TodoType } from "src/types/todo";

type Props = {
  todoList: TodoType[];
};

const Table = ({ todoList }: Props) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">TODO</th>
          <th className="px-4 py-2">STATUS</th>
          <th className="px-4 py-2">DATE</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map((todo) => {
          return (
            <tr key={todo.id}>
              <td className="border w-3/5 px-4 py-2">{todo.todo}</td>
              <td className="border w-1/4 px-4 py-2">
                {todo.isComplete ? "DONE" : "DOING"}
              </td>
              <td className="border w-1/4 px-4 py-2">
                {todo.date.toDateString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
