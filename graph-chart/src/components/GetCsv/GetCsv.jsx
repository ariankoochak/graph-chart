'use client'

import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function GetCsv({onGetCsv}) {
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
                        onGetCsv(result.data);
                        setSuccessMessage('فایل با موفقیت بارگذاری شد')
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
            {err && <span className="error">{err}</span>}
            {successMessage && <span className="success">{successMessage}</span>}
        </>
    );
}
