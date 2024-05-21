import { ChangeEvent, useContext, useState } from "react";

import { deploymentModels } from "@config";
import AppContext from "@context";
import { IDeploymentModel } from "@types";

import SidebarHeading from "./SidebarHeading";

const RightSideBar = () => {
  const appData = useContext(AppContext);

  const [sessionCount, setSessionCount] = useState(
    appData.chatParameters.pastMessagesToInclude
  );
  const handleClick = () => {};

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSessionCount(+e.target.value);
    appData.setPastMessagesToInclude(+e.target.value);
  };

  // set deployment model name
  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    appData.setDeploymentName(e.target.dataset?.modelname ?? "");
  };

  // when intially no selected model set the first one
  if (!appData.chatParameters.deploymentName) {
    if (deploymentModels.length) {
      appData.setDeploymentName(deploymentModels[0].name);
    }
  }

  const renderModelOptions = (models: IDeploymentModel[]) => {
    return models.map((model) => (
      <option
        key={model.id}
        value={model.id}
        className="p-0.5"
        data-modelname={model.name}
      >
        {model.name}
      </option>
    ));
  };
  return (
    <section className="w-1/5 flex flex-col p-6 shadow-lg overflow-auto">
      <SidebarHeading handleClick={handleClick} headingText="Configuration" />
      <div className="w-full flex flex-col gap-4">
        <div className="form-group">
          <p className="font-bold">Deployment</p>

          <select
            name="dep-model"
            id="dep-model"
            className="block w-full border border-solid border-gray-500 outline-none p-1 rounded-sm"
            onChange={handleModelChange}
          >
            {renderModelOptions(deploymentModels)}
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
