import "./card.scss";
import React, { useContext } from "react";
import DropArea from "../../../DropArea/DropArea";
import { TaskType } from "../ContentToDo";
import { taskContext } from "../../../../providers/TaskProvider";
import { Audio } from "react-loader-spinner";
export interface ToDoProps {
  activeCard: any;
  tasks: TaskType[];
  setActiveCard: (indexTask: number, columnid: number, taskid: number) => void;
  setOpenInput: (id: number) => void;
  color: string;
  onDrop: (id: number, index: number) => void;
  OpenInput: number;
  setTaskInput: React.Dispatch<React.SetStateAction<string>>;
  onSaveTask: (id: number,idloading:number) => void;
  title: string;
  onRemoveTask: (
    indexTask: number,
    idTask: number,
    idColumnTask: number
  ) => void;
  id: number;
  loading: number;
  loadingid: number;
}

export default function Card({
  id,
  title,
  color,
  tasks,
  setActiveCard,
  onDrop,
  setOpenInput,
  OpenInput,
  setTaskInput,
  onSaveTask,
  onRemoveTask,
  activeCard,
  loading,
  loadingid,
}: ToDoProps) {
  const { setTask } = useContext(taskContext) || {};
  const { task: t } = useContext(taskContext) || {};
  console.log("t >>>", t);

  return (
    <div className="todo_container col-xl-3 col-md-6 col-sm-12 text-light mb-3">
      <div className="main_todo">
        <div className="todo_header">
          <span style={{ backgroundColor: color }}></span>
          <span className="todo_title">{title}</span>
          <span className="todo_numberTask">({tasks.length})</span>
        </div>
        <div className="content">
          <DropArea
            onDrop={() => {
              onDrop(id, 0);
            }}
          />

          {tasks.map((task, index) => (
            <React.Fragment key={index}>
              <div className="task_container">
                <div
                  onClick={() => {
                    if (setTask) {
                      setTask({
                        taskid: task.id,
                        taskName: task.name,
                      });
                    }
                  }}
                  typeof="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  draggable
                  onDragStart={() => {
                    setActiveCard(index, id, task?.id);
                  }}
                  onDragEnd={() => {
                    setActiveCard(index, id, task?.id);
                  }}
                  key={task?.id}
                  className="task btn text-light"
                >
                  <span>
                    {(t?.taskid == task.id && t.taskName) || task?.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onRemoveTask(index, task?.id, id);
                  }}
                  className="btn_remove"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>

              <DropArea
                onDrop={() => {
                  let indexPass = index + 1;

                  if (activeCard.columnid == id) {
                    if (activeCard.taskindex < index) {
                      indexPass = index;
                    }
                  }
                  onDrop(id, indexPass);
                }}
              />
            </React.Fragment>
          ))}

          {OpenInput == id && OpenInput != 0 ? (
            <input
              autoFocus
              onChange={(e) => {
                setTaskInput(e.target.value);
              }}
              type="text"
              className="input_addtask"
              placeholder="add new task"
            />
          ) : (
            <>
               
              <button
                onClick={() => {
                  setOpenInput(id);
                }}
                className="btn_add_task_to_view"
              >
                <i className="fa-solid fa-plus"></i>
                add new task
              </button>
            </>
          )}
        </div>
        <div className="footer">
          {OpenInput == id && OpenInput != 0 && (
            <div className="btn_actions">
              {loading == loadingid &&  (
                <Audio
                  height="50"
                  width="50"
        
                  color="blue"
                  ariaLabel="loading"
                />
              )}
              <button
                onClick={() => {
                  onSaveTask(OpenInput,loadingid);
                  setTaskInput("");
                }}
                className="btn_save_task"
              >
                save task
              </button>
              <button
                onClick={() => {
                  setOpenInput(0);
                }}
                className="btn_cancel_task"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
