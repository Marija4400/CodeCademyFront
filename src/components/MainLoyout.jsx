import DashboardHeader from "./DashboardHeader";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary-10 dark:bg-primary-20">
      {/* <Sidebar /> */}
      <div className="flex flex-col ">
        <DashboardHeader />
        <main className="flex-grow bg-primary-10 dark:bg-primary-20">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
