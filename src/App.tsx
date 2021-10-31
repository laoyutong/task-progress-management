import { useState } from "react";
import produce from "immer";

import TaskCard, { TaskItemType, TaskItems } from "./TaskCard";

const TASK_CARD_CONFIG: { type: TaskItemType; title: string }[] = [
  {
    type: 0,
    title: "未完成",
  },
  {
    type: 1,
    title: "进行中",
  },
  {
    type: 2,
    title: "已完成",
  },
];

function App() {
  const [taskList, setTaskList] = useState<TaskItems>(() => [
    {
      id: 0,
      type: 0,
      content: "吃饭",
    },
    {
      id: 1,
      type: 1,
      content: "睡觉",
    },
    {
      id: 2,
      type: 2,
      content: "发呆",
    },
  ]);

  const getTaskList = (type: TaskItemType) =>
    taskList.filter((i) => i.type === type);

  const moveCardItem = (id: number, type: TaskItemType) => {
    setTaskList(
      produce(taskList, (draft) => {
        for (let i = 0; i < draft.length; i++) {
          if (draft[i].id === id) {
            draft[i].type = type;
            const [item] = draft.splice(i, 1);
            draft.push(item);
            break;
          }
        }
      })
    );
  };

  return (
    <div className="App" style={{ display: "flex" }}>
      {TASK_CARD_CONFIG.map(({ title, type }) => (
        <TaskCard
          key={type}
          title={title}
          type={type}
          items={getTaskList(type)}
          move={moveCardItem}
        />
      ))}
    </div>
  );
}

export default App;
