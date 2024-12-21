import { useState } from "react";
import { ColumnType, Task } from "./Board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface ColumnProps {
  column: ColumnType;
  onDeleteColumn: (id: string) => void;
  onAddTask: (columnId: string, task: Task) => void;
  onUpdateTask: (columnId: string, taskId: string, task: Task) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
}

export function Column({
  column,
  onDeleteColumn,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: ColumnProps) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    scheduledFor: "",
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      comments: [],
      createdAt: new Date().toISOString(),
      scheduledFor: newTask.scheduledFor || new Date().toISOString(),
    };
    
    onAddTask(column.id, task);
    setNewTask({ title: "", description: "", scheduledFor: "" });
  };

  return (
    <div className="column">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{column.title}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDeleteColumn(column.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {column.tasks.map((task) => (
        <div key={task.id} className="task-card">
          <div className="text-sm text-muted-foreground mb-1">
            {format(new Date(task.scheduledFor), "MMM d, yyyy")}
          </div>
          <h4 className="font-medium mb-2">{task.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
          <div className="text-xs text-muted-foreground">
            Created: {format(new Date(task.createdAt), "MMM d, yyyy")}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="mt-2"
            onClick={() => onDeleteTask(column.id, task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task title"
            />
            <Textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Task description"
            />
            <Input
              type="date"
              value={newTask.scheduledFor}
              onChange={(e) => setNewTask({ ...newTask, scheduledFor: e.target.value })}
            />
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}