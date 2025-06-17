import React, { useState } from "react";

const switcherStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "2rem 0",
    userSelect: "none"
};

const toggleContainer = {
    position: "relative",
    width: "120px",
    height: "40px",
    background: "#e0e7ef",
    borderRadius: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "background 0.3s"
};

const toggleCircle = (active) => ({
    position: "absolute",
    top: "4px",
    left: active === "signin" ? "4px" : "calc(100% - 36px)",
    width: "32px",
    height: "32px",
    background: "#0078d4",
    borderRadius: "50%",
    transition: "left 0.35s cubic-bezier(.68,-0.55,.27,1.55), background 0.2s",
    boxShadow: "0 2px 8px rgba(0,120,212,0.15)"
});

const labelStyle = (active, label) => ({
    flex: 1,
    textAlign: "center",
    zIndex: 1,
    color: active === label ? "#fff" : "#0078d4",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "color 0.2s"
});

const AuthSwitcher = ({ onSwitch }) => {
    const [active, setActive] = useState("signin");

    const handleSwitch = (page) => {
        if (page !== active) {
            setActive(page);
            onSwitch(page);
        }
    };

    return (
        <div style={switcherStyle}>
            <div style={toggleContainer} onClick={() => handleSwitch(active === "signin" ? "signup" : "signin")}>
                <span
                    style={labelStyle(active, "signin")}
                    onClick={e => { e.stopPropagation(); handleSwitch("signin"); }}
                >
                    Sign In
                </span>
                <span
                    style={labelStyle(active, "signup")}
                    onClick={e => { e.stopPropagation(); handleSwitch("signup"); }}
                >
                    Sign Up
                </span>
                <div style={toggleCircle(active)} />
            </div>
        </div>
    );
};

export default AuthSwitcher;
