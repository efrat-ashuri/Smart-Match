// import React from "react";
// import { NavLink } from "react-router-dom";

// const navStyle = {
//   background: "#1976d2",
//   padding: "0 24px",
//   height: 56,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   boxShadow: "0 2px 8px #0002",
//   marginBottom: 32,
// };

// const linkStyle: React.CSSProperties = {
//   color: "#fff",
//   textDecoration: "none",
//   fontWeight: "bold",
//   fontSize: 17,
//   padding: "8px 18px",
//   borderRadius: 6,
//   margin: "0 4px",
//   transition: "background 0.2s",
//   display: "inline-block",
// };

// const activeStyle: React.CSSProperties = {
//   background: "#1565c0",
//   color: "#fff",
// };

// type UserType = "none" | "manager" | "candidate";

// interface NavbarProps {
//   userType: UserType;
//   setUserType: React.Dispatch<React.SetStateAction<UserType>>;
// }

// const Navbar: React.FC<NavbarProps> = ({ userType, setUserType }) => {
//   // קובע את דף הבית לפי סוג המשתמש
//   let homePath = "/";
//   if (userType === "manager") {
//     homePath = "/homeManPage";
//   } else if (userType === "candidate") {
//     homePath = "/home-client";
//   }

//   return (
//     <nav style={navStyle}>
//       <NavLink
//         to={homePath}
//         style={({ isActive }) =>
//           isActive ? { ...linkStyle, ...activeStyle } : linkStyle
//         }
//         end
//       >
//         דף הבית
//       </NavLink>
//       {userType === "manager" && (
//         <>
//           <NavLink
//             to="/users"
//             style={({ isActive }) =>
//               isActive ? { ...linkStyle, ...activeStyle } : linkStyle
//             }
//           >
//             משתמשים
//           </NavLink>
//           <NavLink
//             to="/jobs"
//             style={({ isActive }) =>
//               isActive ? { ...linkStyle, ...activeStyle } : linkStyle
//             }
//           >
//             משרות
//           </NavLink>
//           <NavLink
//             to="/skills"
//             style={({ isActive }) =>
//               isActive ? { ...linkStyle, ...activeStyle } : linkStyle
//             }
//           >
//             כישורים
//           </NavLink>
//           <NavLink
//             to="/managers"
//             style={({ isActive }) =>
//               isActive ? { ...linkStyle, ...activeStyle } : linkStyle
//             }
//           >
//             מנהלים
//           </NavLink>
//           <NavLink
//             to="/candidates"
//             style={({ isActive }) =>
//               isActive ? { ...linkStyle, ...activeStyle } : linkStyle
//             }
//           >
//             מועמדים
//           </NavLink>
//           <NavLink
//             to="/requirnments"
//             style={({ isActive }) =>
//               isActive ? { ...linkStyle, ...activeStyle } : linkStyle
//             }
//           >
//             דרישות
//           </NavLink>
//         </>
//       )}
//       {userType === "candidate" && (
//         <>
//           <NavLink
//             to="/candidates"
//             style={({ isActive }) =>
//               isActive ? { ...linkStyle, ...activeStyle } : linkStyle
//             }
//           >
//             מועמדים
//           </NavLink>
//           <NavLink
//             to="/jobs"
//             style={({ isActive }) =>
//               isActive ? { ...linkStyle, ...activeStyle } : linkStyle
//             }
//           >
//             משרות
//           </NavLink>
//         </>
//       )}
//       <button
//         onClick={() => setUserType("none")}
//         style={{
//           marginRight: 16,
//           background: "#fff",
//           color: "#1976d2",
//           border: "none",
//           borderRadius: 6,
//           padding: "8px 18px",
//           fontWeight: "bold",
//           fontSize: 17,
//           cursor: "pointer",
//         }}
//       >
//         התנתק
//       </button>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/auth/auth.selector";
import logo from "../assets/logo.png.png"; 

const navStyle = {
  background: "#1976d2",
  padding: "0 24px",
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px #0002",
  marginBottom: 32,
};

const linkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: 17,
  padding: "8px 18px",
  borderRadius: 6,
  margin: "0 4px",
  transition: "background 0.2s",
  display: "inline-block",
};

const activeStyle: React.CSSProperties = {
  background: "#1565c0",
  color: "#fff",
};

const Navbar: React.FC = () => {
  const { user, isInitialized } = useAppSelector(selectAuth);

  if (!isInitialized || !user) return null;

  const userType =
    user.role === "admin"
      ? "manager"
      : user.role === "user"
      ? "candidate"
      : "none";

  return (
    <>
      {/* ✅ לוגו בראש הדף */}
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <img
          src={logo}
          alt="Smart-Match Logo"
          style={{ maxWidth: "300px", height: "auto" }}
        />
      </div>

      {/* 🔵 שורת ניווט */}
      <nav style={navStyle}>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
          end
        >
          דף הבית
        </NavLink>
        {/* כאן אפשר להוסיף עוד כפתורים בעתיד */}
      </nav>
    </>
  );
};

export default Navbar;
