import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-purple-200 flex justify-between items-center p-4">
      <div className="logo text-2xl font-bold">PassOp</div>
      <ul>
        <li className="flex gap-4 text-lg font-bold">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
