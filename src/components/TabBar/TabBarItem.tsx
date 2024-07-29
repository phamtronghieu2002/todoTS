import "./tabbaritem.scss";
import { TabItemProps } from "../../dataTypes";
export default function TabBarItem({ icon, callback, title }: TabItemProps) {
  return (
    <div className="tab_bar_item" onClick={callback}>
      <i className={icon}></i>
      <span>{title}</span>
    </div>
  );
}
