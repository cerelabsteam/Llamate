import { useContext, useEffect, useState } from "react";

import { EMPTY_TEMPLATE_VALUE } from "@constants";
import AppContext from "@context";
import { IPromptExample } from "@types";

import IconButton from "./buttons/IconButton";
import SMForm from "./SMForm";

const SMExamples = () => {
  const appData = useContext(AppContext);

  const { _allExamples, isImported, templateId } = appData;

  const promptId = appData?.templateId;

  let existingExamples = _allExamples?.filter(
    (example) => example.pid == promptId
  );

  const examplesLength = existingExamples?.length;

  if (!isImported && templateId === EMPTY_TEMPLATE_VALUE) {
    existingExamples = [];
  }

  // first check if there are any examples or not
  if (
    appData.examples?.length === 0 &&
    appData.templateId !== EMPTY_TEMPLATE_VALUE
  ) {
    appData.setExamples(existingExamples ?? []);
  }

  const [currentExampleIndex, setCurrentExampleIndex] = useState<number | null>(
    examplesLength ? 0 : null
  );
  const [isAddButtonOn, setIsAddButtonOn] = useState(false);

  const handleSMFormSubmit = (user: string, assistant: string) => {
    const promptData: IPromptExample = {
      assistant,
      user,
      id: "PE" + Date.now().toString(),
      pid: promptId!,
    };

    appData.setAllExamples([..._allExamples!, promptData]);
    setIsAddButtonOn(false);
  };

  const handleDelete = (id: string) => {
    appData.setAllExamples(
      _allExamples?.filter((example) => example.id !== id) ?? []
    );
  };

  useEffect(() => {
    setCurrentExampleIndex(examplesLength ? 0 : null);
  }, [promptId, examplesLength]);

  // const isNavButtonDisabled =
  //   currentExampleIndex === null || examplesLength === 1;

  return (
    <div className="flex flex-col gap-2">
      <p>Examples</p>
      {/* {renderExistingExamples(existingExamples)} */}

      {currentExampleIndex !== null && currentExampleIndex < examplesLength! ? (
        existingExamples?.map((example) => (
          <div className="relative" key={example.id}>
            <SMForm
              handleSubmit={handleSMFormSubmit}
              isEditable={false}
              isDeletetable={true}
              handleDelete={handleDelete}
              prevData={example}
            />
          </div>
        ))
      ) : (
        <p>No example present for current template.</p>
      )}

      {/* add navigation button */}
      {/* <div className="flex items-center justify-between">
        <IconButton
          iconSize={13}
          text="Previous"
          iconUrl="assets/arrow-left.png"
          onClick={() => handleNavButtonClick("left")}
          disabled={isNavButtonDisabled}
        />
        <IconButton
          iconSize={13}
          text="Next"
          iconUrl="assets/arrow-right.png"
          onClick={() => handleNavButtonClick("right")}
          disabled={isNavButtonDisabled}
          classes="flex-row-reverse"
        />
      </div> */}

      {/* button to add new example */}
      {isAddButtonOn ? (
        <SMForm
          handleSubmit={handleSMFormSubmit}
          isEditable={true}
          handleCancel={() => setIsAddButtonOn(false)}
        />
      ) : (
        <IconButton
          iconSize={15}
          iconUrl="assets/plus.png"
          onClick={() => setIsAddButtonOn((prev) => !prev)}
          text="Add Example"
          classes="w-3/5"
        />
      )}
    </div>
  );
};

export default SMExamples;
