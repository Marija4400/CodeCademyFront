import React, { useEffect } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { codeCademy } from "../assets";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";
import { logout } from "../api/slices/authSlice";

const DashboardHeader = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
    openNavigation ? enablePageScroll() : disablePageScroll();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  tip korisnika iz localStorage
  const userType = localStorage.getItem("type");

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a
          className="block w-[12rem] xl:mr-8 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img src={codeCademy} width={190} height={40} alt="CodeCademy" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative flex flex-col items-center justify-center m-auto z-2 lg:flex-row">
            <div className="flex gap-8 py-6 uppercase font-code">
              {userType === "parent" && (
                <>
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/courses")}
                  >
                    Kursevi
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/settings")}
                  >
                    Podesavanja
                  </p>
                </>
              )}

              {userType === "child" && (
                <>
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/assignedCourses")}
                  >
                    Dodeljeni kursevi
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/codeQuiz")}
                  >
                    Kvizovi
                  </p>
                </>
              )}

              {userType === "admin" && (
                <>
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/accountTable")}
                  >
                    Accounts
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/createQuiz")}
                  >
                    Kreiraj kviz
                  </p>
                </>
              )}
            </div>
          </div>

          <HamburgerMenu />
        </nav>

        <div>
          <ArrowLeftEndOnRectangleIcon
            className="flex justify-end cursor-pointer w-7 h-7"
            onClick={() => dispatch(logout())}
          />
        </div>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};
export default DashboardHeader;
