"use client";

import generateCsv from "@/actions/generateCsv";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ExportCsv() {
    const [err,setErr] = useState('');

    const csvDatas = useSelector((state) => state.csvSlice.csvDatas); 
    const editedNodes = useSelector((state) => state.editGraphSlice.ChangesHistory);

    const [fileName, formAction, isPending] = useActionState(generateCsv);
    const handleClickDownloadCsvFile = () => {
        try {
            if (csvDatas.length > 0) {
                startTransition(() => {
                    formAction({ csvDatas, editedNodes });
                });
            }
        } catch (error) {
            setErr(error.message);
        }
    };

    useEffect(()=>{
        if(fileName && !isPending){
            const link = document.createElement("a");
            link.href = `${fileName}`;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },[fileName])
    return (
        <button className="upload-csv-btn" onClick={handleClickDownloadCsvFile}>
            دانلود فایل csv
        </button>
    );
}
