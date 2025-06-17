import React, { useState } from "react";
import AuthSwitcher from "../components/AuthSwitcher";
import Signin from "./Signin";
import Signup from "./Signup";

const AuthPage = () => {
    const [page, setPage] = useState("signin");

    return (
        <div>
            <AuthSwitcher onSwitch={setPage} />
            <div style={{
                minHeight: "350px",
                transition: "opacity 0.4s",
                opacity: 1
            }}>
                {page === "signin" ? <Signin /> : <Signup />}
            </div>
        </div>
    );
};

export default AuthPage;