import { useState } from "react";
import { Column } from "./Column";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface Task {
  id: string;
  title: string;
  description: string;
  comments: string[];
  createdAt: string;
  scheduledFor: string;
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: Task[];
}

export function Board() {
  const [columns, setColumns] = useState<ColumnType[]>([
    { id: "1", title: "To Do", tasks: [] },
    { id: "2", title: "In Progress", tasks: [] },
    { id: "3", title: "Done", tasks: [] },
  ]);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const addColumn = () => {
    if (!newColumnTitle.trim()) return;
    setColumns([
      ...columns,
      {
        id: Date.now().toString(),
        title: newColumnTitle,
        tasks: [],
      },
    ]);
    setNewColumnTitle("");
  };

  const deleteColumn = (columnId: string) => {
    setColumns(columns.filter((col) => col.id !== columnId));
  };

  const addTask = (columnId: string, task: Task) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, task] }
          : col
      )
    );
  };

  const updateTask = (columnId: string, taskId: string, updatedTask: Task) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? updatedTask : task
              ),
            }
          : col
      )
    );
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
          : col
      )
    );
  };

  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onDeleteColumn={deleteColumn}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      ))}
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-full min-w-[300px]">
            <Plus className="mr-2 h-4 w-4" /> Add Column
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Column</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Input
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Column title"
            />
            <Button onClick={addColumn}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}