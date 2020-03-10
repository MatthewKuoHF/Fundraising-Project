import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer
            style={{
                position: "fixed",
                width: "100%",
                bottom: "0",
                height: "2rem",
                marginBottom: "0px",
                background: "blue",
                textAlign: "center"
            }}
        >
            <a href="https://github.com/MatthewKuoHF/project" target="_blank">
                <i className="fa fa-github fa-2x white" aria-hidden="true"></i>
            </a>
            <a href="https://linkedin.com/in/matthewkuohf/" target="_blank">
                <i
                    className="fa fa-linkedin-square fa-2x white"
                    aria-hidden="true"
                ></i>
            </a>
            <a href="https://www.facebook.com/matthewKUOOOO" target="_blank">
                <i
                    className="fa fa-facebook-square fa-2x white"
                    aria-hidden="true"
                ></i>
            </a>
            <a href="https://www.instagram.com/matthewkuo/" target="_blank">
                <i
                    className="fa fa-instagram fa-2x white"
                    aria-hidden="true"
                ></i>
            </a>
        </footer>
    );
};

export default Footer;
