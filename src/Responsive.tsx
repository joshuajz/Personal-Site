import React, { useEffect, useState } from "react";

const getIsMobile = () => {
    if (window.innerWidth < 640) return 'mobile'
    if (window.innerWidth < 768) return 'sm'
    if (window.innerWidth < 1024) return 'md'
    if (window.innerWidth < 1280) return 'lg'
    if (window.innerWidth < 1536) return 'xl'
    else return '2xl'};

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(getIsMobile());

    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile());
        }

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

    return isMobile;
}
