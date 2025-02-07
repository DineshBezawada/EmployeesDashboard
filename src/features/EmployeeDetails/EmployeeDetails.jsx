import React from "react";
import Modal from "../../components/Modal";
import Img from "../../components/FallbackImg";
import "./employeeDetails.css";

const EmployeeDetails = ({
  isModalOpen,
  handleCloseModal,
  isLoading,
  employeeDetails,
}) => {
  console.log(handleCloseModal, "handleCloseModal");
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        employeeDetails={employeeDetails}
      >
        {isLoading && <h6>Loading ...</h6>}
        {!isLoading && employeeDetails?.id && (
          <div className="user_Info">
            <div className="user_ver">
              <Img
                lazy
                src={employeeDetails.avatar}
                alt="avatar"
                className={"emp_img"}
                fallbackSrc={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8D7EiZNqJsZh69o1HwqweT66YLoXVu-VTZKZxWNDtZTjUBeVtZAOLPw&s`}
              />
              <div className="role_details">
                <p>Role : {employeeDetails?.jobTitle}</p>
                <p>Age : {employeeDetails?.age}</p>
                <p>Joined : {employeeDetails?.dateJoined?.slice(0, 10)}</p>
              </div>
            </div>
            <div className="user_desc">
              <h4>
                {employeeDetails?.firstName} {employeeDetails?.lastName}
              </h4>
              <p>{employeeDetails?.bio}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default EmployeeDetails;
