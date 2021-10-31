import { useRef } from "react";
import { Card } from "antd";
import { useDrop } from "react-dnd";

import TaskItem, { TaskItemProps, TASK_ITEM_KEY, DragItem } from "./TaskItem";

interface TaskCardProps {
  title: string;
  type: TaskItemType;
  items: TaskItems;
  move: (id: number, type: TaskItemType) => void;
}

export type TaskItemType = TaskItemProps["type"];

export type TaskItems = TaskItemProps[];

const TaskCard = ({ title, items, type, move }: TaskCardProps): JSX.Element => {
  const taskCardRef = useRef<HTMLDivElement>(null);

  const [, drag] = useDrop<DragItem, unknown, unknown>({
    accept: TASK_ITEM_KEY,
    hover: (item) => {
      move(item.id, type);
    },
  });

  drag(taskCardRef);

  return (
    <div ref={taskCardRef}>
      <Card
        title={title}
        style={{ width: "200px", height: "300px", margin: "20px" }}
      >
        {items.map(({ content, id, type }) => (
          <TaskItem key={id} id={id} content={content} type={type} />
        ))}
      </Card>
    </div>
  );
};

export default TaskCard;
