import React, { useContext } from "react";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import { GlobalContext } from "../context/GlobalContext";
import PasswordModal from "../components/Reports/PasswordModal";

const Profile = () => {
  const { showModal, setShowModal, handleShowModal, isAuthenticated } =
    useContext(GlobalContext);
  return (
    <div>
      {isAuthenticated ? (
        <ProfilePage />
      ) : (
        <PasswordModal
          showModal={showModal}
          setShowModal={setShowModal}
          onclick={handleShowModal}
          url={"/profile"}
        />
      )}
    </div>
  );
};

export default Profile;
