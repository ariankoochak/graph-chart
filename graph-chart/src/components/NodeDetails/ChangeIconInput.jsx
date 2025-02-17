"use client";

import getIconsList from "@/actions/getIconsList";
import { startTransition, useActionState, useEffect, useState } from "react";

export default function ChangeIconInput({ nodeId, nodeIconSrc ,nodeColor}) {
    console.log(nodeIconSrc);
    
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
                return <img key={iconSrc} src={iconSrc} style={'/icons/'+nodeIconSrc === iconSrc ? {background : nodeColor} : {} }/>;
            });
        }
    };

    if (isPending) return <span className="success">در حال بارگذاری...</span>;
    return (
        <div className="change-icon-input-container">
            <div className="icons-list">{renderIconsList()}</div>
        </div>
    );
}
