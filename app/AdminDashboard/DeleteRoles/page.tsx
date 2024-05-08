import AdminSidebar from "@/components/DashboardParts/AdminSidebar";
import DeleteRole from "@/components/DeleteRole/DeleteRole";

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
                <DeleteRole />
            </div>
        </>
    )
}
