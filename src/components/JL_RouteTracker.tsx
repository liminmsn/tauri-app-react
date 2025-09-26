import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { DataStatistice } from "../core/util/DataStatistice";

function JLRouteTracker() {
    const location = useLocation();
    useEffect(() => {
        // DataStatistice.I?.trackPageView(location.pathname, document.title)
        console.log('路由切换到：', location);
    }, [location.pathname]);

    return null;
}

export default JLRouteTracker;