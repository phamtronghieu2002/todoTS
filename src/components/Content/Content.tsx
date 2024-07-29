import SideBar from "../Sidebar/SideBar";
import ContentInfor from "./ContentInfor/ContentInfor";
import ContentToDo from "./ContentTodo/ContentToDo";
import "./content.scss";
export default function Content() {
  return (
    <div className="main_content">
      <SideBar />
      <ContentInfor />
      <ContentToDo/>
    </div>
  );
}
