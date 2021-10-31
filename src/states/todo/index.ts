import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { TodoType } from "src/types/todo";

const { persistAtom } = recoilPersist();

const todoListState = atom<TodoType[]>({
  key: "todoListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const todoLength = selector({
  key: "todoLength",
  get: ({ get }) => {
    const todoList = get(todoListState); // getの引数にstateを渡す。
    return todoList.length;
  },
});

export { todoListState, todoLength };
