import useAuth from "../../../hooks/useAuth";
import Button from "../../Button/Button";
import TabItem from "./Item/TabItem";
import "./contentinfor.scss";

export default function ContentInfor() {
  const options = [
    {
      icon: "fa-solid fa-user",
      callback: () => console.log("Back"),
    },
    {
      icon: "fa-solid fa-ellipsis-h",
      callback: () => console.log("Next"),
    },
  ];
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

  const auth=useAuth()
  return (
    <div className="wp_content_infor">
      <div className="header">
        {options.map((option, index) => (
          <Button key={index} onClick={option.callback}>
            <i className={option.icon}></i>
          </Button>
        ))}
      </div>
      <div className="information">
        <div className="avatar_wp">
          <img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722124800&semt=ais_user" />
        </div>
        <div className="detail">
          <p> {auth.user.username} </p>
         
        </div>
      </div>

      <div className="tab_container d-flex">
        {tabs.map((tab, index) => (
          <TabItem key={index} {...tab} />
        ))}
      </div>
      <div className="footer">
        <div className="contacts">
          <span className="icon animate-scale" style={{ color: "#ff5d36" }}>
            <i className="fas fa-phone-alt"></i>
          </span>

          <span className="icon animate-scale" style={{ color: "#24cd3e" }}>
            <i className="fas fa-envelope"></i>
          </span>

          <span className="icon animate-scale" style={{ color: "#8833ff" }}>
            <i className="fas fa-sms"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
