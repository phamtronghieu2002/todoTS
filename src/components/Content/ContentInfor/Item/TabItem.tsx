import "./item.scss";
import { TabItemProps } from "../../../../dataTypes";
export default function TabItem({ icon, callback, title }: TabItemProps) {
  return (
    <div className="tab_item" onClick={callback}>
      <i className={icon}></i>
      <p>{title}</p>

      <div className="notice_icon_active"></div>
    </div>
  );
}
