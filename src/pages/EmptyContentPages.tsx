import { useLocation } from "react-router-dom";

const EmptyContentPages: React.FC = () => {
  const location = useLocation();

  return (
    <div className="no-content">
      <h3 style={{color: "#e53e3e"}}>There is no content Yet for {location.pathname.substring(1)}</h3>
    </div>
  );
};

export default EmptyContentPages;
