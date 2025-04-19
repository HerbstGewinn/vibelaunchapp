
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { useConfetti } from '@/hooks/useConfetti';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Circle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  task_id: string;
}

interface TodoListProps {
  items: {
    text: string;
    completed?: boolean;
  }[];
  taskId: string;
}

export const TodoList = ({ items, taskId }: TodoListProps) => {
  const { toggleTaskComplete } = useTaskProgress();
  const { triggerConfetti } = useConfetti();
  const { toast } = useToast();
  const location = useLocation();
  
  // Extract category from the current path
  const getCategory = () => {
    const path = location.pathname.split('/');
    return path[path.length - 1];
  };

  const [todoItems, setTodoItems] = React.useState<TodoItem[]>(
    items.map(item => ({
      id: uuidv4(),
      text: item.text,
      completed: item.completed || false,
      task_id: taskId
    }))
  );

  const toggleTodo = async (index: number) => {
    const newTodoItems = [...todoItems];
    const isCompleting = !newTodoItems[index].completed;
    newTodoItems[index].completed = isCompleting;
    setTodoItems(newTodoItems);
    
    try {
      await toggleTaskComplete(
        newTodoItems[index].id, 
        newTodoItems[index].completed,
        getCategory()
      );
      
      if (isCompleting) {
        triggerConfetti();
      }
      
      toast({
        title: newTodoItems[index].completed ? "Task completed!" : "Task marked as incomplete",
        description: newTodoItems[index].text,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      newTodoItems[index].completed = !newTodoItems[index].completed;
      setTodoItems(newTodoItems);
      toast({
        title: "Failed to update task",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {todoItems.map((item, index) => (
        <div 
          key={item.id} 
          className="flex items-start space-x-2 p-2 rounded-md hover:bg-launch-dark/50 transition-colors cursor-pointer"
          onClick={() => toggleTodo(index)}
        >
          <div className="mt-1">
            {item.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-500" />
            )}
          </div>
          <span className={`${item.completed ? "text-gray-400 line-through" : "text-white"}`}>
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};
