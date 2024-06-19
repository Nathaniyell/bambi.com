"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { signOut } from 'firebase/auth';
import { auth, db } from "@/config/firebase-config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/auth-context';
import Breadcrumbs from '@/components/Breadcrumbs';



const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (!user) {
          router.push("/auth/login");
      }
  }, [user, router]);
  
  const signOutFromApp = async () => {
    try {
        await signOut(auth);
        toast.success("Sign out successful");
        router.push("/")
    } catch (error) {
        console.error(error);
        toast.error("Sign out failed");
    }
  };

  const navLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <IoSpeedometerOutline />
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: <FaCartArrowDown />
    },
    {
      title: "Download",
      href: "/dashboard/download",
      icon: <FaCloudDownloadAlt />
    },
    {
      title: "Payment method",
      href: "/dashboard/payment-method",
      icon: <FaRegCreditCard />
    },
    {
      title: "Address",
      href: "/dashboard/address",
      icon: <FaLocationDot />
    },
    {
      title: "Account details",
      href: "/dashboard/account-details",
      icon: <FaUser />
    },
    {
      title: "Logout",
      href: "#",  // Use # for href to prevent navigation
      icon: <TbLogout />,
      onClick: signOutFromApp  // Add onClick event
    },
  ];

  return (
    <>
    <Breadcrumbs active="Dashboard" />
    <div className='my-6 p-6 md:p-10'>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          hideProgressBar={false}
      />
      <div className='w-[95%] md:w-[90%] mx-auto flex flex-col gap-8 md:flex-row'>
        <nav className='w-full lg:w-[40%] border'>
          <ul>
            {navLinks.map(link => (
              <li
                className={`p-4 border-b flex items-center gap-2 ${pathName === link.href ? "bg-primary text-white" : ""}`}
                key={link.title}
              >
                <span>{link.icon}</span>
                {link.title === "Logout" ? (
                  <button onClick={link.onClick} className='uppercase font-semibold border-0 border-none'>
                    {link.title}
                  </button>
                ) : (
                  <Link className='uppercase font-semibold' href={link.href}>
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <aside className='p-6 border size-full'>
              {children}
        </aside>
      </div>
    </div>
    </>
  );
};

export default Layout;
