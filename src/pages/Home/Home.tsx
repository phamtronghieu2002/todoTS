import "./home.scss";
import { Header, Content } from "../../components";
import React from "react";
import Loading from "../../components/Loading/Loading";
 const Home: React.FC =()=>{
  return (
    <div className="wp_home_page">
    
      <Header />
      <Content />
    </div>
  );
}
export default Home;