import Header from "./Header/header";
import SideBar from "./SideBar/sideBar";

function AdminLayouts({children}){
    return(
        <div>
            <Header />
            <div className="row flex max-h-full">
                <SideBar/>
                <div className=" bg-primary-adminPages w-full h-full">{children}</div>
            </div>
        </div>
    )
}
export default AdminLayouts;