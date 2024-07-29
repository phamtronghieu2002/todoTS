import "./sidebar.scss";
import Button from "../Button/Button";
export default function SideBar() {


  const main_buttons_action = [
    {
      icon: "fa-solid fa-compass",
      callback: () => console.log("Home"),
    },
    {
      icon: "fa-solid fa-star",
      callback: () => console.log("Home"),
    },
    {
      icon: "fa-solid fa-comment",
      callback: () => console.log("Home"),
    },
    {
      icon: "fa-solid fa-clipboard-list",
      callback: () => console.log("Home"),
    },
  ];
  const option_buttons_action = [
    {
      callback: () => {
        alert("Home");
      },
      icon: "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-meo-con-than-chet.jpg",
    },
    {
      callback: () => {
        console.log("Home");
      },
      icon: "https://img.freepik.com/free-vector/cute-koala-sleeping-cartoon-illustration_138676-2778.jpg?w=360",
    },
    {
      callback: () => {
        console.log("Home");
      },
      icon: "https://kiemtientuweb.com/ckfinder/userfiles/images/avt-cute/avatar-cute-1.jpg",
    },
  ];

  
  return (
    <div className="wp_sidebar_nav">
      <div className="main_actions">
        {main_buttons_action.map((button, index) => (
          <Button key={index} onClick={button.callback}>
            <i className={button.icon}></i>
          </Button>
        ))}
      </div>

      <div>
        <div className="option_sidebar">
          {option_buttons_action.map((button, index) => (
            <span key={index} className="icon">
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
                src={button.icon}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
