'use client'

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { addCsvDatas } from "@/lib/redux/slices/csvSlice";
import ExportCsv from "./ExportCsv";
import { clickNode } from "@/lib/redux/slices/selectedNodeSlice";

export default function GetCsv() {
    const dispatch = useDispatch();

    const [err,setErr] = useState('');
    const [successMessage,setSuccessMessage] = useState('');
        
    const handleGetCsvFile = (e)=>{

        const file = e.target.files[0];
        if(!file){
            setErr('فایل csv وجود ندارد')
        }

        try {
            const reader = new FileReader();
            reader.onload = ({ target }) => {
                Papa.parse(target.result, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        dispatch(addCsvDatas(result.data))
                        setSuccessMessage('فایل با موفقیت بارگذاری شد')
                        dispatch(clickNode(''));
                        setErr('')
                    },
                });
            };
            reader.readAsText(file);
        } 
        catch (error) {
            setErr('مشکلی در خواندن فایل آپلود شده پیش آمده . لطفا مجددا فایل خود را بارگذاری کنید')
        }
        
    }

    useEffect(()=>{
        if(successMessage !== ''){
            setTimeout(()=>{
                setSuccessMessage('')
            },5000)
        }
    },[successMessage])

    return (
        <>
            <label htmlFor="csv" className="btn upload-csv-btn">
                آپلود فایل csv
            </label>
            <input
                id="csv"
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleGetCsvFile}
            />
            <ExportCsv/>
            {err && <span className="error">{err}</span>}
            {successMessage && <span className="success">{successMessage}</span>}
        </>
    );
}
