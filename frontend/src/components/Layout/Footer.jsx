import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Job Hunt.</div>
      <div>
        <Link to={"https://www.facebook.com/Naukri"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/shorts/xM4CAkG9BHg"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/company/naukri.com"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/naukridotcom/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;