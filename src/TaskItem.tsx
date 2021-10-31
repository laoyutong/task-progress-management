import { useRef } from "react";
import { Alert, AlertProps } from "antd";
import { useDrag } from "react-dnd";

export interface TaskItemProps {
  content: string;
  type: 0 | 1 | 2;
  id: number;
}

export interface DragItem {
  id: number;
}

interface DragCollect {
  opacity: number;
}

const TYPE_LIST: Array<AlertProps["type"]> = ["warning", "info", "success"];

export const TASK_ITEM_KEY = "TASK_ITEM_KEY";

const TaskItem = ({ content, type, id }: TaskItemProps): JSX.Element => {
  const TaskItemRef = useRef<HTMLDivElement>(null);

  const [{ opacity }, drag] = useDrag<DragItem, unknown, DragCollect>({
    type: TASK_ITEM_KEY,
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  drag(TaskItemRef);

  return (
    <div ref={TaskItemRef} style={{ opacity }}>
      <Alert
        message={content}
        type={TYPE_LIST[type]}
        style={{ margin: "10px 0" }}
      />
    </div>
  );
};

export default TaskItem;
