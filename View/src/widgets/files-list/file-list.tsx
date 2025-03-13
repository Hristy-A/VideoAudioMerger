import clsx from 'clsx';
import { SelectFiles } from '~/features/select-files';
import { SelectFileOptions } from '~/shared/electron-api/types';
import { Stylable } from '~/shared/types';
import { AnimatedProgress } from '~/shared/ui/animated-progress';
import { FileItem } from './file-item';

interface FilesListProps extends Stylable {
  label?: string;
  files: string[];
  shortName?: boolean;
  progress?: Record<string, number> | null;
  selectFileOptions?: SelectFileOptions;
  disabled?: boolean;
  onSelect: (files: string[]) => void;
  onRemove?: (file: string) => void;
}

export const FileList = (props: FilesListProps) => {
  const {
    label,
    files,
    shortName = false,
    progress,
    selectFileOptions,
    disabled,
    className,
    style,
    onSelect,
    onRemove,
  } = props;

  return (
    <div className={clsx('flex flex-col gap-4', className)} style={style}>
      {files.length > 0 &&
        files.map((file) => (
          <div key={file}>
            <FileItem
              key={file}
              file={file}
              shortName={shortName}
              disabled={disabled}
              onRemove={() => onRemove?.(file)}
            />
            {progress?.[file] != null && (
              <AnimatedProgress
                className="progress progress-primary w-full"
                value={progress?.[file]}
                max="100"
              />
            )}
          </div>
        ))}
      <SelectFiles
        label={label}
        selectFileOptions={selectFileOptions}
        disabled={disabled}
        onSelect={onSelect}
      />
    </div>
  );
};
