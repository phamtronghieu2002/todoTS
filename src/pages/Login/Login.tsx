import "./login.scss";
import Form, { FormDataType } from "../../components/Form/Form";
import * as authService from "..//..//services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import form from "../../utils/form";
import configs from "../../configs";



const Login: React.FC = () => {
  const handleLogin = async(data: FormDataType) => {
    try {
      const username=data.username;
      const password=data.password;
      const res=await authService.login({username,password});
      if(res.data.errCode===0){
        toast.success("Login success");
        window.location.href = configs.paths.home;
        console.log(res.data);
        
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
        console.log(error);

    }
      
  };
  return (
    <Form heading="Login" fields={form.loginFields} onSubmit={handleLogin} />
  );
};
export default Login;
