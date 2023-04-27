import React from "react";
import { IUser } from "../../context/context";
import { ProfileAvatar, RatingFill, RatingIcon } from "../svgIcons";
import loader from "../../assets/images/load-loading.gif";

interface Props {
  userDetails: IUser | null;
  loading: boolean;
  switchTab: (val: number) => void;
  tab: number;
}

const ProfileCard: React.FC<Props> = ({
  userDetails,
  loading,
  switchTab,
  tab,
}) => {
  const renderLoader = () => (
    <div className="loading">
      <img src={loader} alt="" />
    </div>
  );

  const renderProfileData = () => (
    <div className="profileData">
      <div>
        <span className="avatar">
          {userDetails?.profile?.avatar ? (
            <img src={userDetails.profile.avatar} alt="" />
          ) : (
            <ProfileAvatar />
          )}
        </span>
        <div>
          <h3>{userDetails?.profile?.firstName}</h3>
          <p>{userDetails?.profile?.lastName}</p>
        </div>
      </div>
      <div>
        <p>User’s Tier</p>
        <div className="ratings">
          <RatingFill />
          <RatingIcon />
          <RatingIcon />
        </div>
      </div>
      <div>
        <h3>₦{userDetails?.accountBalance}</h3>
        <p>{userDetails?.accountNumber}</p>
      </div>
    </div>
  );

  const renderUserDetailsNav = () => (
    <div className="userDetailsNav">
      <ul>
        <li className={tab === 0 ? "active" : ""} onClick={() => switchTab(0)}>
          General Details
        </li>
        <li className={tab === 1 ? "active" : ""} onClick={() => switchTab(1)}>
          Documents
        </li>
        <li className={tab === 2 ? "active" : ""} onClick={() => switchTab(2)}>
          Bank Details
        </li>
        <li className={tab === 3 ? "active" : ""} onClick={() => switchTab(3)}>
          Loans
        </li>
        <li className={tab === 4 ? "active" : ""} onClick={() => switchTab(4)}>
          Savings
        </li>
        <li className={tab === 5 ? "active" : ""} onClick={() => switchTab(5)}>
          App and System
        </li>
      </ul>
    </div>
  );

  return (
    <div className="profileCard">
      {loading ? renderLoader() : null}
      {!loading ? renderProfileData() : null}
      {renderUserDetailsNav()}
    </div>
  );
};

export default ProfileCard;