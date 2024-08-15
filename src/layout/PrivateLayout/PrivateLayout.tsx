import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useWindowSize } from "@/global";

import Header from "@/layout/PrivateLayout/Header";
import Sidebar from "@/layout/PrivateLayout/Sidebar";

const PrivateLayout = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { width = 0 } = useWindowSize();

  useEffect(() => {
    if (width > 768) {
      setShowMenu(false);
    }
  }, [width]);

  return (
    <main className="grid min-h-dvh grid-cols-1 md:grid-cols-[auto_1fr]">
      <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
      <section className="min-w-full">
        <Header setShowMenu={setShowMenu} />
        <Outlet />
      </section>
    </main>
  );
};

export default PrivateLayout;
