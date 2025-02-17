"use client";

import getIconsList from "@/actions/getIconsList";
import { addChangeNodeViewRequest } from "@/lib/redux/slices/editGraphSlice";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ChangeIconInput({ nodeId, nodeIconSrc ,nodeColor}) {
    const dispatch = useDispatch();
    
    const [err, setErr] = useState("");

    const [iconsList, formAction, isPending] = useActionState(getIconsList);

    useEffect(() => {
        try {
            startTransition(() => {
                formAction();
            });
        } catch (error) {
            setErr(error.message);
        }
    }, []);

    const renderIconsList = () => {
        if (iconsList && !isPending) {
            return iconsList.map((iconSrc) => {                
                return <img key={iconSrc} src={iconSrc} style={'/icons/'+nodeIconSrc === iconSrc ? {background : nodeColor} : {} } onClick={handleClickIcon}/>;
            });
        }
    };


    const handleClickIcon = (e)=>{
        const iconSrc = e.target.src.split("/")[4];
        dispatch(addChangeNodeViewRequest({nodeId,newIcon : iconSrc}))
    }


    if (isPending) return <span className="success">در حال بارگذاری...</span>;
    return (
        <div className="change-icon-input-container">
            <div className="icons-list">{renderIconsList()}</div>
        </div>
    );
}
