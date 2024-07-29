import { Link } from "react-router-dom";
import { useState } from "react";

type heading = "Login" | "Register";

export interface FieldType {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  icon: string;
}
export interface FormDataType {
  [key: string]: string;
}
interface FormProps {
  heading: heading;
  fields: FieldType[];
  onSubmit: (data: FormDataType) => void;
}

export default function Form({ heading, fields, onSubmit }: FormProps) {
  const [formData, setFormData] = useState<FormDataType>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <div className="wp_login_page">
      <div className="wp_content">
        <h3 className="text-light mb-4 text-center">{heading}</h3>
        <form action="" onClick={handleSubmit}>
          {fields.map((field, index) => (
            <div className="form-group position-relative" key={index}>
              <label htmlFor={field.type} className="text-light mb-1 fs-6">
                {field.label}
              </label>
              <input
                onChange={handleChange}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                className="form-control ps-5"
                placeholder={field.placeholder}
              />
              <i
                className={`fa-solid ${field.icon} position-absolute text-dark`}
                style={{ top: 37, left: 8 }}
              ></i>
            </div>
          ))}

          <div className="form-group d-flex justify-content-between">
            {heading === "Login" && (
              <Link to="/register" className="text-light">
                Register
              </Link>
            )}
            {heading === "Register" && (
              <Link to="/login" className="text-light">
                Login
              </Link>
            )}
            <button className="btn btn-primary text-light">{heading}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
