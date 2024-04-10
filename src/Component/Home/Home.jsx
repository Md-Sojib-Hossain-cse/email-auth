import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex justify-center items-center gap-6 h-[calc(100vh-200px)]">
            <Link to="/login" className="px-3 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-950">Login</Link>
            <Link to="/register" className="px-3 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-950">Register</Link>
        </div>
    );
};

export default Home;