import clsx from 'clsx';
import { Stylable } from '~/shared/types';
import { shortFileName } from '~/shared/utils';

interface FileItemProps extends Stylable {
  file: string;
  shortName?: boolean;
  disabled?: boolean;
  onRemove?: () => void;
}

export const FileItem = (props: FileItemProps) => {
  const { file, shortName = false, disabled, className, style, onRemove } = props;

  return (
    <div className={clsx('flex gap-2 justify-between items-center', className)} style={style}>
      <div
        className="flex-auto flex-grow-0 text-ellipsis overflow-hidden whitespace-nowrap"
        title={shortName ? shortFileName(file) : file}
      >
        {shortName ? shortFileName(file) : file}
      </div>
      {onRemove && (
        <button
          className="btn btn-square btn-outline btn-error btn-sm"
          disabled={disabled}
          onClick={onRemove}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
