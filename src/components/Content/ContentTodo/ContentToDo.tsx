import useLang from "../../../hooks/useLang";
import Button from "../../Button/Button";
import TabBarItem from "../../TabBar/TabBarItem";
import Card from "./Card/Card";
import "./contentTodo.scss";
import { useContext, useEffect, useState } from "react";
import * as taskService from "../../../services/taskService";
import useAuth from "../../../hooks/useAuth";
import { taskContext } from "../../../providers/TaskProvider";
import Skeleton from "../../Skeleton/Skeleton";

export interface TaskType {
  id: number;
  name: string;
  taskColumnID: number;
  userID: number;
  position: number;
  desc: string;
  createdAt: string;
  updatedAt: string;
}
interface CoumnTaskType {
  id: number;
  title: string;
  color: string;
  tasks: TaskType[];
}

export default function ContentToDo() {
  const tabs = [
    {
      icon: "fa-solid fa-table-columns",
      callback: () => console.log("Back"),
      title: "Dashboard",
    },
    {
      icon: "fa-solid fa-notes-medical",
      callback: () => console.log("Back"),
      title: "Notes",
    },
    {
      icon: "fa-solid fa-envelope",
      callback: () => console.log("Back"),
      title: "emails",
    },
    {
      icon: "fa-solid fa-user",
      callback: () => console.log("Back"),
      title: "calendars",
    },
    {
      icon: "fa-solid fa-list-check",
      callback: () => console.log("Back"),
      title: "tasks",
    },
    {
      icon: "fa-solid fa-gear",
      callback: () => console.log("Back"),
      title: "settings",
    },
  ];
  const actions = [
    {
      icon: "fa-solid fa-plus",
      callback: () => console.log("add"),
    },
    {
      icon: "fa-solid fa-ellipsis-h",
      callback: () => console.log("more"),
    },
  ];

  const [taskColumn, setTaskColumn] = useState<CoumnTaskType[]>([]);
  const auth = useAuth();

  const [activeCard, setActiveCard] = useState<any>(null);

  const [OpenInput, setOpenInput] = useState<number>(0);

  const [taskInput, setTaskInput] = useState<string>("");
  const [loading, setLoading] = useState<number>(0);

  const { i18n } = useLang();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await taskService.getTaskByUserId(auth.user.id);
      setTaskColumn(res.data);
    };

    fetchTask();
  }, []);

  const handleSetOpenInput = (id: number) => {
    setOpenInput(id);
  };

  const handleSetActiveCard = (
    taskindex: number,
    columnid: number,
    taskid: number
  ) => {
    setActiveCard({ taskindex, columnid, taskid });
  };

  const DoneActions = () => {
    setTaskColumn([...taskColumn]);
    setTaskInput("");
    setOpenInput(0);
    setLoading(0);
  };

  const handleSaveTask = (idColumnTask: number, idloading: number) => {
    taskColumn.forEach(async (item) => {
      if (item.id === idColumnTask) {
        try {
          setLoading(idColumnTask);

          const res = await taskService.addTask({
            taskColumnid: idColumnTask,
            userid: auth.user.id,
            taskname: taskInput,
          });

          item.tasks.push(res.data);

          DoneActions();
          return;
        } catch (error) {
          console.log("error", error);
        }
      }
    });
  };

  const handleRemoveTask = (
    indextask: number,
    idTask: number,
    idColumnTask: number
  ) => {
    taskColumn.forEach(async (item) => {
      try {
        if (item.id === idColumnTask) {
          const newTasks = item.tasks.filter((task) => task.id !== idTask);
          item.tasks = newTasks;

          await taskService.removeTask({
            taskColumnid: idColumnTask,
            userid: auth.user.id,
            taskPosition: indextask,
          });
          DoneActions();
          return;
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleUpdateSameRow = async (
    taskColumnid: number,
    userid: number,
    taskid: number,
    fromPosition: number,
    toPosition: number
  ) => {
    try {
      await taskService.updatePositionSameRow({
        taskColumnid,
        userid,
        fromPosition,
        toPosition,
        taskid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDifferenceRow = async (
    fromTaskColumnid: number,
    toTaskColumnid: number,
    userid: number,
    fromPosition: number,
    toPosition: number,
    taskid: number
  ) => {
    try {
      await taskService.updatePositionDifferceRow({
        fromTaskColumnid,
        toTaskColumnid,
        userid,
        taskid,
        fromPosition,
        toPosition,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onDrop = async (id: number, index: number) => {
    try {
      //tìm cột di chuyển
      const taskColumnDrop = taskColumn.find(
        (item) => item.id === activeCard.columnid
      );

      console.log("index chuyển từ", activeCard.taskindex);
      console.log("index chuyển đến", index);

      //tìm task drop
      const taskDrop: TaskType | undefined =
        taskColumnDrop?.tasks[activeCard.taskindex];

      taskColumn.forEach(async (item) => {
        if (activeCard == null || activeCard == undefined) return;

        if (item.id === activeCard.columnid) {
          item.tasks.splice(activeCard.taskindex, 1);
        }

        if (item.id === id) {
          item.tasks.splice(index, 0, taskDrop!);
          return;
        }
      });

      if (activeCard.columnid == id) {
        await handleUpdateSameRow(
          id,
          auth.user.id,
          activeCard.taskid,
          activeCard.taskindex,
          index
        );
      } else {
        await handleUpdateDifferenceRow(
          activeCard.columnid,
          id,
          auth.user.id,
          activeCard.taskindex,
          index,
          activeCard.taskid
        );
      }

      setTaskColumn([...taskColumn]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="wp_content_to_do">
      <div className="wp_content">
        <div className="header">
          <div className="tab_bar">
            {tabs.map((action, index) => (
              <TabBarItem key={index} {...action} />
            ))}
          </div>
          <div className="actions">
            {actions.map((action, index) => (
              <Button key={index} onClick={action.callback}>
                <i className={action.icon}></i>
              </Button>
            ))}
          </div>
        </div>
        <div className="content mt-1">
          <div className="row">
            {taskColumn.length > 0 ? (
              taskColumn.map((item, index) => (
                <Card
                  loadingid={item.id}
                  loading={loading}
                  setTaskInput={setTaskInput}
                  OpenInput={OpenInput}
                  activeCard={activeCard}
                  setOpenInput={handleSetOpenInput}
                  setActiveCard={handleSetActiveCard}
                  onSaveTask={handleSaveTask}
                  onRemoveTask={handleRemoveTask}
                  onDrop={onDrop}
                  key={index}
                  {...item}
                />
              ))
            ) : (
              <Skeleton />
            )}
          </div>
        </div>
        <div className="wp_actions_change_langs d-flex justify-content-end gap-3">
          <Button onClick={() => console.log(i18n.changeLanguage("vi"))}>
            VN
          </Button>
          <Button onClick={() => i18n.changeLanguage("en")}>EN</Button>
        </div>
      </div>
    </div>
  );
}
