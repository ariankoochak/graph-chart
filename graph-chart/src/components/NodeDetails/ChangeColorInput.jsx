"use client";

import { addChangeNodeViewRequest } from "@/lib/redux/slices/editGraphSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ChangeColorInput({ nodeId, nodeColor }) {
    const dispatch = useDispatch();

    const [color, setColor] = useState(nodeColor);

    const handleChangeThisNodeColor = () => {
        dispatch(addChangeNodeViewRequest({nodeId,newColor : color , newIcon : ''}))
    };

    useEffect(()=>{        
        setColor(nodeColor)
    },[nodeId])
    return (
        <div className="container">
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <button onClick={handleChangeThisNodeColor}>
                تغییر رنگ همین گره
            </button>
            <button>تغییر رنگ تمام گره های همرنگ</button>
        </div>
    );
}
