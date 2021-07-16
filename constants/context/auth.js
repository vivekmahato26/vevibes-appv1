import React from "react";


const AuthContext = React.createContext(
    {
        authenticated: false,
        error:"",
        login: () => {},
        logout: () => {},
        location: ""
    }
);

export default AuthContext;