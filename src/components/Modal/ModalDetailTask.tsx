import { useContext, useEffect, useRef, useState } from "react";
import { taskContext } from "../../providers/TaskProvider";
import { useDebounce } from "use-debounce";
import * as taskService from "../../services/taskService";
import * as commentService from "../../services/commentService";
import Comment from "./Comment/Comment";
import { toast } from "react-toastify";
interface commentType {
  id: number;
  content: string;
  taskid: number;
  timeStamp: string;
}

interface TaskType {
  id: number;
  name: string;
  taskColumnID: number;
  userID: number;
  position: number;
  desc: string;
  comments: commentType[];
}
export default function ModalDetailTask() {
  const { task } = useContext(taskContext) || {};
  const { setTask } = useContext(taskContext) || {};
  const taskid = task?.taskid;
  const [taskFetch, setTaskFetch] = useState<TaskType>();
  const [commentInput, setCommentInput] = useState<string>("");
  const [descInput, setDescInput] = useState<string>("");
  const [taskNameInput, setTaskNameInput] = useState<string>("");
  const [valueDesc] = useDebounce(descInput, 600);
  const [valueTaskName] = useDebounce(taskNameInput, 600);
  const inputRef = useRef<HTMLInputElement>(null);
  const changeRef = useRef<boolean>(false);
  const refName = useRef<string>("");
  console.log("task đây hihi >>>", task);

  useEffect(() => {
    const fetchData = async () => {
      if (taskid) {
        const response = await taskService.getTaskById(taskid);
        const task = response.data;

        setDescInput(task.desc);
        setTaskNameInput(task.name);
        refName.current = task.name;
        setTaskFetch(task);
        changeRef.current = false;
      }
    };
    fetchData();
  }, [taskid]);

  useEffect(() => {
    const updateDesc = async () => {
      try {
        if (taskid && changeRef.current) {
          const res = await taskService.updateDesc(taskid, valueDesc);
          toast.success("Update desc success !!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateDesc();
  }, [valueDesc]);

  useEffect(() => {
    const updateNameTask = async () => {
      try {
        if (taskid && changeRef.current && valueTaskName !== refName.current) {
          await taskService.updateTaskName(taskid, valueTaskName);
          if (setTask) {
            setTask({ ...task, taskName: valueTaskName });
          }
          toast.success("Update task name success !!");
          return;
        }
        console.log("refName.current >>", refName.current);
        
       
      } catch (error) {
        setTaskNameInput(refName.current);
        console.log(error);
      }
    };
    updateNameTask();
  }, [valueTaskName]);

  const handleAddComment = async () => {
    try {
      if (taskid) {
        const response = await commentService.addComment(taskid, commentInput);

        setTaskFetch((prevTask) => {
          if (!prevTask) return prevTask;
          const updatedComments = [...prevTask.comments, response.data];
          return { ...prevTask, comments: updatedComments };
        });
        setCommentInput("");
        inputRef.current?.focus();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
              Detail task
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="heading text-dark">
              <span>taskname:</span>
              <input
                className="form-control"
                type="text"
                value={taskNameInput}
                onChange={(e) => {
                  setTaskNameInput(e.target.value);
                  changeRef.current = true;
                }}
              />
            </div>
            <br />
            <div className="wp_desc">
              <h6 className="mb-2">description</h6>
              <div className="content">
                <textarea
                  style={{ minHeight: "150px" }}
                  onChange={(e) => {
                    setDescInput(e.target.value);
                  }}
                  value={descInput || ""}
                  className="form-control"
                  name=""
                  id=""
                ></textarea>
              </div>
            </div>
            <br />
            <div className="wp_comment">
              <h6 className="mb-3">comment</h6>
              <div className="comment_box_wp d-flex justify-content-center align-items-center gap-3">
                <div className="avatar">
                  <img
                    style={{
                      borderRadius: "50%",
                      height: "32px",
                      width: "32px",
                    }}
                    src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722124800&semt=ais_user"
                  />
                </div>
                <input
                  ref={inputRef}
                  value={commentInput}
                  onChange={(e) => {
                    setCommentInput(e.target.value);
                    changeRef.current = true;
                  }}
                  type="text"
                  className="form-control"
                  placeholder="add_comment"
                />
                <button onClick={handleAddComment} className="btn btn-primary">
                  send
                </button>
              </div>
              <div className="comment_box">
                {taskFetch?.comments.map((comment, index) => (
                  <Comment

                    key={index}
                    avatar="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722124800&semt=ais_user"
                    content={comment.content}
                    id={comment.id}
                    taskid={comment.taskid}
                    timeStamp={comment.timeStamp}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
