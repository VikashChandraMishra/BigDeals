import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/Gplus.png"

const Navbar = () => {

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }

    const location = useLocation();

    const toggleNav = (e) => {
        document.getElementById('menu').classList.toggle('hidden');
    }

    useEffect(() => {
    }, [location])

    if (location.pathname !== "/v/pt/pdf" && location.pathname !== "/ad/pt/pdf")
        return (
            <nav className="w-full" style={{ backgroundColor: 'rgb(160,195,54)' }}>
                <div className="max-w-8xl px-4">
                    <div className="flex justify-between md:justify-start">
                        <div className="flex flex-col md:flex-row justify-between w-full">
                            <img src={logo} alt="unavailable" className="w-24 h-8 md:w-32 md:h-12 mt-1 md:mb-1 md:pr-2" />

                            <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-1" id="menu">

                                <Link to="/" className="text-xs md:text-lg px-2 py-4 font-semibold hover:text-red-500 transition duration-300">Home</Link>
                                {
                                    localStorage.getItem('authToken') && localStorage.getItem('user') === 'admin' &&
                                    <Link to="/ad/dsh/" className="text-xs md:text-lg px-2 py-4 font-semibold hover:text-red-500 transition duration-300"
                                    >Dashboard</Link>
                                }
                                {/* {
                                    localStorage.getItem('authToken') && localStorage.getItem('user') === 'admin' &&
                                    <Link to="/ed/mou" className="text-xs md:text-lg px-2 py-4 font-semibold hover:text-red-500 transition duration-300"
                                    >EditMOU</Link>
                                } */}
                                {
                                    localStorage.getItem('user') !== 'admin' &&
                                    <Link to="/register" className="text-xs md:text-lg px-2 py-4 font-semibold hover:text-red-500 transition duration-300"
                                    >Register</Link>
                                }
                                {
                                    localStorage.getItem('authToken') && localStorage.getItem('user') === 'partner' &&
                                    <Link to="/v/tc" className="text-xs md:text-lg px-2 py-4 font-semibold hover:text-red-500 transition duration-300">Terms</Link>
                                }
                                {
                                    localStorage.getItem('authToken') && localStorage.getItem('user') === 'partner' &&
                                    <Link to="/ed/pr" className="text-xs md:text-lg px-2 py-4 font-semibold hover:text-red-500 transition duration-300">Shop</Link>
                                }
                                {
                                    localStorage.getItem('authToken') &&
                                    <Link to="/" className="text-xs md:text-lg px-2 py-4 font-semibold hover:text-red-500 transition duration-300" onClick={logout}
                                    >Log Out</Link>
                                }

                            </div>

                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="my-4 w-8 h-6 bg-slate-50 cursor-pointer md:hidden block" data-bs-toggle="collapse" data-bs-target="me" onClick={toggleNav}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </nav>
        )
}

export default Navbar;