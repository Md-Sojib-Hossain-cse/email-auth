import { NavLink } from "react-router-dom";

const Header = () => {
    const links = <>
        <NavLink to="/" className="hover:bg-slate-900 px-4 py-3 rounded-lg">Home</NavLink>
        <NavLink to="/login" className="hover:bg-slate-900 px-4 py-3 rounded-lg">Login</NavLink>
        <NavLink to="/register" className="hover:bg-slate-900 px-4 py-3 rounded-lg">Register</NavLink>
    </>
    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Email Auth</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex gap-6">
                    {links}
                </ul>
            </div>
        </div>
    );
};

export default Header;