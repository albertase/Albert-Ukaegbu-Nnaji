import React, { useState, ReactNode } from "react";
import Header from "../components/Header/Header";
import { OpenSideNav } from "../components/svgIcons";
import SideNavBar from "../components/SideNavBar/SideNavBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [sideBar, setSideBar] = useState<boolean>(false);

  const toggleSideBar = (): void => {
    setSideBar(!sideBar);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        className="openSideNavBtn"
        onClick={toggleSideBar}
      >
        <OpenSideNav />
      </button>
      <div className="layout">
        <div className={`sideNavWrap ${sideBar && "openSideNav"}`}>
          <SideNavBar closeSideNav={() => setSideBar(false)} />
        </div>
        <div className="contentsSection">{children}</div>
      </div>
    </div>
  );
};

export default Layout;