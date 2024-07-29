
import "./button.scss";
import { ButtonProps } from '../../dataTypes';
// Khai báo kiểu dữ liệu cho props


export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="btn_action" onClick={onClick}>
      {children}
    </button>
  );
}