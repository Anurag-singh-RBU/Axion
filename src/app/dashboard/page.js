"use client";

import React, { useState, useEffect } from 'react'
import { getCurrent } from "@/app/(auth)/actions";
import { redirect } from "next/navigation";
import CubeLoader from "../../components/cube-loader";
import { UserBtn } from "../../components/userBtn";

const DashboardPage = () => {

    const [isLoading , setIsLoading] = useState(true);
    const [user , setUser] = useState(null);

    useEffect(() => {

        const fetchUser = async () => {

            const user = await getCurrent();

            if(!user){

                redirect("/sign-in");

            } 
            
            else{

                setUser(user);
                setIsLoading(false);

            }
        };

        fetchUser();

    }, []);

    return (
        <section>
            {isLoading ? (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, background: "white" }}>
                    <CubeLoader/>
                </div>
            ) : (
                <div>

                </div>
            )}
        </section>
    );
};

export default DashboardPage;