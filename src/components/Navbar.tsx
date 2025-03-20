import { useState } from "react";
import { Link } from "react-router";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <div>
        <div>
          <Link to={"/"}>
            social<span>.media</span>
          </Link>

          {/* Desktop Links */}
          <div>
            <Link to={"/"}>Home</Link>
            <Link to={"/create"}>Create Post</Link>
            <Link to={"/communities"}>Communities</Link>
            <Link to={"/community/create"}>Create Community</Link>
          </div>

          {/* Mobile Menu Button */}
          <div>
            {" "}
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div>
              <Link to={"/"}>Home</Link>
              <Link to={"/create"}>Create Post</Link>
              <Link to={"/communities"}>Communities</Link>
              <Link to={"/community/create"}>Create Community</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
