import { formatDate } from "../../../helpers/date";
interface commentType {
  avatar: string;
  id: number;
  content: string;
  taskid: number;
  timeStamp: string;
}
export default function Comment({
  avatar,
  id,
  content,
  taskid,
  timeStamp,
}: commentType) {


  return (
    <div className="comment mt-3 ps-3">
      <div className="comment_body">
        <div className="comment_content d-flex gap-3 align-items-center">
          <div className="comment_user f-flex">
            <img
              style={{ width: "35px", height: "35px", borderRadius: "50%" }}
              src={avatar || ""}
              alt="user"
              className="user_avatar"
            />
          </div>
          <div
            style={{
              borderRadius: "10px",
              backgroundColor: "#f1f1f1",
              display: "inline-block",
            }}
            className="comment_text d-flex justify-content-center align-items-center p-2 text-dark"
          >
            <p>{content || ""}</p>
          </div>
          <span className="time_stamp" style={{fontSize:"10px"}}>
            {formatDate(timeStamp) || new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
