"use client";

import React from 'react'
import { Loader2 } from "lucide-react";
import { Avatar , AvatarFallback , AvatarImage } from "../components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCurrent } from "@/hooks/use-current";
import { useLogout } from "@/hooks/use-logout";
import { DottedSeparator } from "@/components/Dotted-Seperator";
import { LogOutIcon } from 'lucide-react';

export const UserBtn = () => {

    const { data : user , isLoading } = useCurrent();
    const { mutate : logout } = useLogout();

    if(isLoading){
        return (
            <Button variant="ghost" className="p-0 h-10 w-10 rounded-full flex items-center justify-center" disabled>
                <Loader2 className="animate-spin w-5 h-5"/>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2 h-10 w-10 rounded-md">
                    <Avatar>
                        <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "User"}/>
                        <AvatarFallback>
                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto" align="end">
                <DropdownMenuLabel className="font-HG flex gap-3 justify-center items-center tracking-wider">
                    <Avatar className="rounded-md w-10 h-10">
                        <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "User"} className="rounded-md w-10 h-10" />
                        <AvatarFallback className="rounded-md w-10 h-10 flex items-center justify-center text-lg font-JBM font-extrabold">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className='font-bold text-md font-JBM' style={{wordSpacing: "-3px"}}>{user?.name.toUpperCase() || "User"}</span>
                        <span className='text-xs'>{user?.email || "User"}</span>
                    </div>              
                </DropdownMenuLabel>
                <DottedSeparator color="gray"></DottedSeparator>
                <DropdownMenuItem onClick={() => {() => logout()}} className="cursor-pointer">
                    <span className="flex items-center gap-2 font-HG">
                        <Loader2 className="mr-2 h-4 w-4" style={{display: "none"}}/>
                        <LogOutIcon size={4}></LogOutIcon> 
                        <button
                            className='text-red-700 font-bold tracking-wide bg-transparent border-none outline-none cursor-pointer'
                            onClick={async () => {
                                await logout(undefined, {
                                    onSuccess: () => {
                                        window.location.href = "/sign-in";
                                    }
                                });
                            }}
                            type="button">
                            Logout
                        </button>
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


