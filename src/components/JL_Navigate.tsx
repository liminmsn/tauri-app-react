import { useNavigate } from "react-router-dom";
function JLNavigate({ children, url }: JLNavigateType) {
    const navigate = useNavigate();

    function Go() {
        if (globalThis.location.href.lastIndexOf(url) < 0) {
            navigate(url);
        }
    }
    return <div onClick={Go}>
        {children}
    </div>
}

export default JLNavigate;
type JLNavigateType = {
    url: string;
    children: React.ReactNode;
};