import { useEffect, useState } from "react";
import { fromKebabCase } from "./helper"

function TemplatesApp() {
  const [templateIds, setTemplateIds] = useState<string[]>([]);
  useEffect(() => {
    fetch('/templates/index.json')
      .then((response) => response.json())
      .then((data) => {
        setTemplateIds(data);
      });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Templates</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {templateIds.map((templateId) => (
            <div key={templateId}>
              <div className="relative border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="relative h-72 w-full overflow-hidden">
                  <img alt={fromKebabCase(templateId)} src={`/templates/${templateId}/thumbnail.png`} className="border border-gray-100 size-full object-contain" />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-md font-bold text-gray-900">{fromKebabCase(templateId)}</h3>
                </div>
                <div className="mt-6">
                  <a
                    href={`/?template=${templateId}`}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Go to Designer
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TemplatesApp;
