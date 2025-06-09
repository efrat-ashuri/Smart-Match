import React from "react";
import { NavLink } from "react-router-dom";
const navStyle = {
  background: "#1976d2",
  padding: "0 24px",
  height: 56,
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

const Navbar: React.FC = () => (
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
    <NavLink
      to="/users"
      style={({ isActive }) =>
        isActive ? { ...linkStyle, ...activeStyle } : linkStyle
      }
    >
      משתמשים
    </NavLink>
    <NavLink
      to="/jobs"
      style={({ isActive }) =>
        isActive ? { ...linkStyle, ...activeStyle } : linkStyle
      }
    >
      משרות
    </NavLink>
    <NavLink
      to="/skills"
      style={({ isActive }) =>
        isActive ? { ...linkStyle, ...activeStyle } : linkStyle
      }
    >
      כישורים
    </NavLink>
    <NavLink
      to="/managers"
      style={({ isActive }) =>
        isActive ? { ...linkStyle, ...activeStyle } : linkStyle
      }
    >
      מנהלים
    </NavLink>
    <NavLink
      to="/candidates"
      style={({ isActive }) =>
        isActive ? { ...linkStyle, ...activeStyle } : linkStyle
      }
    >
      מועמדים
    </NavLink>
    <NavLink
      to="/requirnments"
      style={({ isActive }) =>
        isActive ? { ...linkStyle, ...activeStyle } : linkStyle
      }
    >
      דרישות
    </NavLink>
  </nav>
);

export default Navbar;