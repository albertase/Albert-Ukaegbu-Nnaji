import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext, UserContextType } from "../../context/context";

import { BackIcon } from "../svgIcons";
import OtherUserInfo from "./OtherUserInfo";
import ProfileCard from "./ProfileCard";
import "./UserDetails.scss";

const UserDetails: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<number>(0);

  const { loading, users, userDetails, updateUser, getUser } = useContext(
    UserContext
  ) as UserContextType;

  useEffect(() => {
    getUser(Number(id));
  }, [id]);

  const handleAction = (val: "blacklisted" | "active", userId: string) => {
    updateUser(userId, users, val);
    navigate(-1);
  };

  return (
    <div className="userDetails">
      <div className="back">
        <button type="button" onClick={() => navigate(-1)}>
          <BackIcon /> Back to Users
        </button>
      </div>
      <div className="pageHead">
        <h3>User Details</h3>
        <div>
          <button
            type="button"
            onClick={() => handleAction("blacklisted", userDetails?.id as string)}
          >
            Blacklist User
          </button>
          <button
            type="button"
            onClick={() => handleAction("active", userDetails?.id as string)}
          >
            Activate User
          </button>
        </div>
      </div>
      <ProfileCard
        userDetails={userDetails}
        loading={loading}
        switchTab={(val: number) => setTab(val)}
        tab={tab}
      />
      <OtherUserInfo userDetails={userDetails} loading={loading} tab={tab} />
    </div>
  );
};

export default UserDetails;