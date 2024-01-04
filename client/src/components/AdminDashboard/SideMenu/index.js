import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaHome, FaSearch } from 'react-icons/fa'
import { FaMagento } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { FaBook } from 'react-icons/fa'
import { FaDesktop } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import SidebarMenu from './SidebarMenu'

const routes = [
    {
        path: '/dashboard',
        name: 'Home',
        icons: <FaHome />,
    },
    {
        path: '/staff',
        name: 'Staff',
        icons: <FaUser />,
        subRoutes: [
            {
                path: '/staff/addstaff',
                name: 'AddStaff',
                icons: <FaUser />,
            },
            {
                path: '/staff/editstaff',
                name: 'EditStaff',
                icons: <FaUser />,
            },
        ]
    },
    {
        path: '/courses',
        name: 'Courses',
        icons: <FaBook />,
        subRoutes: [
            {
                path: '/courses/addcourses',
                name: 'AddCourses',
                icons: <FaUser />,
            },
            {
                path: '/courses/editcourses',
                name: 'Editcourses',
                icons: <FaUser />,
            },
        ]
    },
    {
        path: '/holidays',
        name: 'News/Updates',
        icons: <FaHeart />,
    },
    {
        path: '/feedback',
        name: 'FeedBack',
        icons:<FaHeart/>
    }
]

const SideMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen)

    const inpuAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            }
        },
        show: {
            width: "100%",
            padding: "5px 15px",
            opacity: 1,
            transition: {
                duration: 0.2,
            }
        }
    }
    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.2,
            }
        },
        show: {
            width: "auto",
            opacity: 1,
            transition: {
                duration: 0.2,
            }
        }
    }

    return (
        <div className='main-container'>
            <motion.div animate={{
                width: isOpen ? '200px' : '65px', transition: {
                    duration: 0.2,
                    type: "spring",
                    damping: 9,
                }
            }} className='sidebar'>
                <div className="top_section">
                    {isOpen && <motion.h1 variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="logo">
                        Dashboard
                    </motion.h1>}
                    <div style={{ marginLeft: '15px' }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <div className="search">
                    <div style={{ margin: '0px auto' }} className="serach_icon">
                        <FaSearch />
                    </div>
                    <AnimatePresence>
                        {isOpen && <motion.input initial="hidden" animate="show" exit="hidden" variants={inpuAnimation} placeholder='search' />}
                    </AnimatePresence>
                </div>
                <section className='routes'>
                    {routes.map((route, index) => {
                        if (route.subRoutes) {
                            return <SidebarMenu showAnimation={showAnimation} isOpen={isOpen} route={route}
                                setIsOpen={setIsOpen}
                                key={route.name}
                            />;
                        }
                        return (
                            <NavLink activeClassName="active" to={route.path} key={index} className='link'>
                                <div className="icon">
                                    {route.icons}
                                </div>
                                <AnimatePresence>
                                    {isOpen && <motion.div variants={showAnimation}
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        className="link_text">
                                        {route.name}
                                    </motion.div>}
                                </AnimatePresence>
                            </NavLink>
                        )
                    })}
                </section>
            </motion.div>
            <main>
                {children}
            </main>
        </div>
    );
};


export default SideMenu