import { useState } from 'react';
import { SelectFiles } from '~/features/select-files';
export const WorkingList = () => {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="h-full flex justify-center flex-col gap-4 mx-8 lg:mx-auto max-w-screen-2xl">
      {files.length > 0 && (
        <div className="flex flex-col gap-4">
          {files.map((file) => (
            <div key={file}>{file}</div>
          ))}
        </div>
      )}
      {files.length === 0 && (
        <div className="w-fit m-auto">
          <SelectFiles onSelect={setFiles} />
        </div>
      )}
    </div>
  );
};
