import Form, { FormDataType } from "../../components/Form/Form";
import form from "../../utils/form";
import * as authService from "..//..//services/authService";
import { toast } from "react-toastify";
const Register: React.FC = () => {
  const handleRegister = async (data: FormDataType) => {
    try {
      const username = data.username;
      const password = data.password;
      const res = await authService.register({ username, password });
      if (res.data.errCode === 0) {
        toast.success("register success !!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      heading="Register"
      fields={form.registerFields}
      onSubmit={handleRegister}
    />
  );
};
export default Register;
