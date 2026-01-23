import { Sidebar } from "@/app/components/Dashboard/sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen">
            <div className="flex w-full h-full">
                <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                    <Sidebar/>
                </div>
                <div className="lg:pl-[264px]">
                    <div className="mx-auto max-w-screen-2xl h-full">
                        <main className="h-full p-6 flex flex-col">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
};