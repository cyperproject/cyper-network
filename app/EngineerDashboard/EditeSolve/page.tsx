import EngineerSidebar from "@/components/DashboardParts/EngineerSidebar";
import EditeSolve from "@/components/Solves/EditeSolve";

export default function page() {
    return (
        <>
            <EngineerSidebar />
            <div style={{
                width: "calc(100% - 240px)",
                height: "100vh",
                position: "absolute",
                left: "240px",
                padding: "0px",
                margin: "0px",
                boxSizing: "border-box",
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <EditeSolve />
            </div>
        </>
    )
}
