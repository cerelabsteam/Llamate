import IconButton from "./buttons/IconButton";
import SidebarHeading from "./SidebarHeading";
import SystemMessageTemplate from "./SystemMessageTemplate";

const LeftSidebar = () => {
  const handleClick = () => {};
  return (
    <section className="flex flex-col w-1/5 p-6 shadow-lg gap-4 overflow-y-auto">
      <SidebarHeading handleClick={handleClick} headingText="Setup" />

      <IconButton
        iconSize={20}
        iconUrl="assets/save.png"
        onClick={() => {}}
        text="Save changes"
        classes="w-3/5"
      />
      <SystemMessageTemplate />
    </section>
  );
};

export default LeftSidebar;
