import { ChangeEvent, useState } from "react";

import { deploymentModels } from "@config";
import { IDeploymentModel } from "@types";

import SidebarHeading from "./SidebarHeading";

const RightSideBar = () => {
  const [sessionCount, setSessionCount] = useState(1);
  const handleClick = () => {};

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSessionCount(+e.target.value);
  };

  const renderModelOptions = (models: IDeploymentModel[]) => {
    return models.map((model) => (
      <option key={model.id} value={model.id} className="p-0.5">
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
