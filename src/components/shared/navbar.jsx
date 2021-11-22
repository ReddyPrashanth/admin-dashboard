import React from 'react'

function NavBar({isOpen, onToggleDrawer, onCloseDrawer}) {
    const asideCl = "transform top-0 left-0 w-64 bg-gray-800 text-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30";
    const classes = isOpen ? `${asideCl} translate-x-0` : `${asideCl} -translate-x-full`;
    return (
        <nav className="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b-2 border-purple-700 z-10">
            <div className="flex items-center">
                <button className="mr-2" aria-label="Open Menu" onClick={onToggleDrawer}>
                    <svg 
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-8 h-8"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <h4 className="h-auto font-bold">ADMIN DASHBOARD</h4>
            </div>
            <div>
                <button className="font-semibold text-sm hover:bg-gray-200 px-4 py-2 rounded">Sign In</button>
                <button className="font-semibold text-sm hover:bg-gray-200 px-4 py-2 rounded">Sign Up</button>
            </div>
            <aside className={classes}>
                <span className="flex w-full justify-between p-5">
                    <h4 className="h-auto font-bold">ADMIN DASHBOARD</h4>
                    <button onClick={onToggleDrawer}>X</button>
                </span>
                <span className="flex items-center px-5 py-3 hover:bg-gray-700">
                    <button className="mr-2 text-sm font-semibold" onClick={onCloseDrawer}>HOME</button>
                </span>
                <span className="flex items-center px-5 py-3 hover:bg-gray-700">
                    <button className="mr-2 text-sm font-semibold" onClick={onCloseDrawer}>USERS</button>
                </span>
            </aside>
        </nav>
    )
}

export default NavBar;