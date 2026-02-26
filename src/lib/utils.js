import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateInviteCode(length){

  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let code = "";

  for(let i = 0 ; i < length ; i++){

    code = code + chars.charAt(Math.floor(Math.random() * chars.length));

  }

  return code;

}
