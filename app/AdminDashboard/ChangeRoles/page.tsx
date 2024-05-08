import AdminSidebar from "@/components/DashboardParts/AdminSidebar";
import ChangeRole from "@/components/ChangeRole/ChangeRole";

export default function page() {
    return (
        <>
            <AdminSidebar />
            <div style={{
                width: "calc(100% - 240px)",
                height: "100%",
                position: "absolute",
                left: "240px",
                padding: "0px",
                margin: "0px",
                boxSizing: "border-box",
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ChangeRole />
            </div>
        </>
    )
}
