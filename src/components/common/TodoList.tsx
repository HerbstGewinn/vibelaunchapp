
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { useConfetti } from '@/hooks/useConfetti';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Circle } from 'lucide-react';

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
  category: string;
}

export const TodoList = ({ items, taskId, category }: TodoListProps) => {
  const { tasks, toggleTaskComplete } = useTaskProgress();
  const { triggerConfetti } = useConfetti();
  const { toast } = useToast();
  
  // Initialize todoItems with completed states from the database
  const [todoItems, setTodoItems] = React.useState<TodoItem[]>(() => {
    return items.map(item => {
      // Check if this task exists in the database and get its completed state
      const existingTask = tasks.find(t => 
        t.task_name === item.text && 
        t.category === category
      );
      
      return {
        id: existingTask?.id || uuidv4(),
        text: item.text,
        completed: existingTask?.completed || item.completed || false,
        task_id: taskId
      };
    });
  });

  // Update todoItems when tasks change
  React.useEffect(() => {
    setTodoItems(prevItems => 
      prevItems.map(item => {
        const existingTask = tasks.find(t => 
          t.task_name === item.text && 
          t.category === category
        );
        
        return {
          ...item,
          completed: existingTask?.completed || item.completed
        };
      })
    );
  }, [tasks, category]);

  const toggleTodo = async (index: number) => {
    const newTodoItems = [...todoItems];
    const isCompleting = !newTodoItems[index].completed;
    newTodoItems[index].completed = isCompleting;
    setTodoItems(newTodoItems);
    
    try {
      await toggleTaskComplete(
        newTodoItems[index].id, 
        isCompleting,
        category,
        newTodoItems[index].text
      );
      
      if (isCompleting) {
        triggerConfetti();
      }
      
      toast({
        title: isCompleting ? "Task completed!" : "Task marked as incomplete",
        description: newTodoItems[index].text,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      newTodoItems[index].completed = !isCompleting;
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
