"use client";

import React, { useState, useEffect } from 'react'
import { getCurrent } from "@/app/(auth)/actions";
import { redirect } from "next/navigation";
import {Component} from "../../components/luma-spin";
import WorkspaceCreatePage from "../../Features/workspaces/components/workspaceForm";
import { getWorkspaces } from "../workspaces/[workspaceId]/actions";

const DashboardPage = () => {

    const [isLoading , setIsLoading] = useState(true);
    const [user , setUser] = useState(null);
  
    useEffect(() => {
        
        const fetchUser = async () => {
            
            const user = await getCurrent();
            const workspaces = await getWorkspaces();

            if(!user){

                redirect("/sign-in");

            }

            if(workspaces.total === 0){

                redirect("/workspaces/create");

            }
        
            else{

                setUser(user);
                setIsLoading(false);
                redirect(`workspaces/${workspaces.documents[0].$id}`)

            }
        };

        fetchUser();

    }, []);

};

export default DashboardPage;