// import { useState } from "react";
// import Router from "./routes/Router";
// import InitializedAuth from "./auth/InitializedAuth";

// function App() {
//   // ניהול סוג המשתמש במצב גלובלי
//   const [userType, setUserType] = useState<"none" | "manager" | "candidate">("none");

//   return (
//     <>
//       <InitializedAuth />
//       <Router userType={userType} setUserType={setUserType} />
//     </>
//   );
// }

// export default App;
// Updated App.tsximport { useEffect, useState } from "react";
 import { useEffect } from "react";
import { useAppSelector } from "./redux/store";
import { selectAuth } from "./redux/auth/auth.selector";
import Router from "./routes/Router";
import InitializedAuth from "./auth/InitializedAuth";

function App() {
  const { isInitialized } = useAppSelector(selectAuth);

  return (
    <>
      <InitializedAuth />
      {isInitialized ? (
        <Router /> 
      ) : (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h3>טוען נתוני התחברות...</h3>
        </div>
      )}
    </>
  );
}

export default App;
