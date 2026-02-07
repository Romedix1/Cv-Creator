import React from 'react';

export const createLine = (isLastElement: boolean, userColor?: string) => {
    return (
        <div className="mr-4 mt-2 relative -left-2">
            <div className="bg-white w-1 h-1 ring-2 rounded-full z-20 relative" style={{ "--tw-ring-color": userColor } as React.CSSProperties}></div>
            {<div style={{ height: !isLastElement ? "calc(100% + 20px)" : "92%"}} className="bg-[#E5E7EB] w-1" />}
        </div>
    )
}