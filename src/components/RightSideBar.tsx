import { ChangeEvent, useContext } from "react";

import AppContext from "@context";
import { IDeploymentModel } from "@types";
import { cn } from "@utils";

import SidebarHeading from "./SidebarHeading";

const RightSideBar = ({
  toggleSidebarState,
}: {
  toggleSidebarState: () => void;
}) => {
  const appData = useContext(AppContext);

  const sessionCount = appData.chatParameters.pastMessagesToInclude;

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    appData.setPastMessagesToInclude(+e.target.value);
  };

  // set deployment model name
  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    appData.setDeploymentName(e.target.dataset?.modelname ?? "");
  };

  const renderModelOptions = (models: IDeploymentModel[]) => {
    return models.map((model) => (
      <option
        key={model.id}
        value={model.id}
        className="p-0.5"
        data-modelname={model.name}
        // selected={model.name === appData.chatParameters.deploymentName}
      >
        {model.name}
      </option>
    ));
  };

  const responsiveClasses =
    " absolute sm:static z-20 top-0 right-0 min-w-[300px] md:w-2/5 lg:w-1/5 h-screen sm:h-auto shadow-none bg-white blur-none";

  return (
    <section
      className={cn(
        "flex flex-col p-6 sm:shadow-lg gap-4 overflow-y-auto" +
          responsiveClasses
      )}
    >
      <SidebarHeading
        handleClick={toggleSidebarState}
        headingText="Configuration"
      />
      <div className="w-full flex flex-col gap-4">
        <div className="form-group">
          <p className="font-bold">Deployment</p>

          <select
            name="dep-model"
            id="dep-model"
            className="block w-full border border-solid border-gray-500 outline-none p-1 rounded-sm"
            onChange={handleModelChange}
            value={appData.chatParameters.deploymentName ?? ""}
          >
            {renderModelOptions(appData?.deployments ?? [])}
          </select>
        </div>

        <div className="form-group">
          <p className="font-bold">Session settings</p>
          <p>Past messages included</p>
          <div className="flex gap-2">
            <input
              type="range"
              name="session-count"
              id="session-count"
              min={1}
              max={10}
              value={sessionCount}
              className="w-4/5"
              onChange={handleRangeChange}
            />

            <input
              type="number"
              name="_session-count"
              id="_session-count"
              className="outline-none w-1/5 border border-solid border-gray-500 p-1"
              value={sessionCount}
              onChange={handleRangeChange}
              min={0}
              max={10}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
