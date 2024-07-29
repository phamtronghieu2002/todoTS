import React, { createContext } from "react";

// Define the context type
interface TaskProviderType {
  taskid: number;
  taskName: string;
}


type TaskContextType = {
  task: TaskProviderType;
  setTask: React.Dispatch<React.SetStateAction<any>>;
};

// Create the context
export const taskContext = React.createContext<TaskContextType | null>(null);

// I18nProvider component
function TaskProvider({ children }: { children: React.ReactNode }) {
   const [task,setTask] = React.useState<any>({taskid:0,taskName:""});

  // Provide the i18n object to the context
  return (
    <taskContext.Provider value={{ task,setTask }}>{children}</taskContext.Provider>
  );
}

export default TaskProvider;
