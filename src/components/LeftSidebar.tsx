import { cn } from "@utils";

import IconButton from "./buttons/IconButton";
import SidebarHeading from "./SidebarHeading";
import SystemMessageTemplate from "./SystemMessageTemplate";

const LeftSidebar = ({
  toggleSidebarState,
}: {
  toggleSidebarState: () => void;
}) => {
  const responsiveClasses =
    " absolute sm:static z-20 top-0 left-0 min-w-[300px] md:w-2/5 lg:w-1/5 h-screen sm:h-auto shadow-none bg-white blur-none";
  return (
    <section
      className={cn(
        "flex flex-col p-6 sm:shadow-lg gap-4 overflow-y-auto " +
          responsiveClasses
      )}
    >
      <SidebarHeading handleClick={toggleSidebarState} headingText="Setup" />

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
