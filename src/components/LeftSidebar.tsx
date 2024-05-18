import SidebarHeading from "./SidebarHeading";
import SystemMessageTemplate from "./SystemMessageTemplate";

const LeftSidebar = () => {
  const handleClick = () => {};
  return (
    <section className="flex flex-col w-1/5 p-6 shadow-lg gap-4 overflow-y-auto">
      <SidebarHeading handleClick={handleClick} headingText="Setup" />

      <SystemMessageTemplate />
    </section>
  );
};

export default LeftSidebar;
