"use server";

import AppError from "@/modules/AppError/AppError";

import fs from "fs";
import path from "path";

async function getIconsList() {
    try {        
        const iconsPath = path.join(process.cwd(), "public/icons");
        const files = fs.readdirSync(iconsPath);
        
        return files.map((file) => {
            return `/icons/${file}`;
        });
    } catch (error) {
        throw new AppError("مشکلی در سرور پیش آمده", 500);
    }
}

export default getIconsList;
