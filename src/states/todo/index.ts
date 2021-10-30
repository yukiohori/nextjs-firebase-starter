import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { TodoType } from "src/types/todo";

const { persistAtom } = recoilPersist();

const todoListState = atom<TodoType[]>({
  key: "todoListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export { todoListState };
