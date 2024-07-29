import { FC } from "react";

import "./sskeleton.scss";
const Skeleton: FC = () => {
  return (
    <div className="row skeleton_container">
      <div className="col-lg-3 ">
        <div className="skeleton-item placeholder"></div>
      </div>
      <div className="col-lg-3 ">
        <div className="skeleton-item placeholder"></div>
      </div>
      <div className="col-lg-3 ">
        <div className="skeleton-item placeholder"></div>
      </div>
      <div className="col-lg-3 ">
        <div className="skeleton-item placeholder"></div>
      </div>
    </div>
  );
};
export default Skeleton;
