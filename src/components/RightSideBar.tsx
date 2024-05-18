import SidebarHeading from "./SidebarHeading";

const RightSideBar = () => {
  const handleClick = () => {};
  return (
    <section className="w-1/5 flex flex-col p-6 shadow-lg">
      <SidebarHeading handleClick={handleClick} headingText="Configuration" />
    </section>
  );
};

export default RightSideBar;
