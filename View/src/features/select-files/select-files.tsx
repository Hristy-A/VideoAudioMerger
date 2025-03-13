import { selectFiles } from '~/shared/electron-api';
import { SelectFileOptions } from '~/shared/electron-api/types';

interface SelectFilesProps {
  label?: string;
  selectFileOptions?: SelectFileOptions;
  disabled?: boolean;
  onSelect: (files: string[]) => void;
}

export const SelectFiles = (props: SelectFilesProps) => {
  const { label = 'Select files', selectFileOptions, disabled, onSelect } = props;

  const handleClick = () => {
    selectFiles(selectFileOptions).then(onSelect);
  };

  return (
    <button className="btn" disabled={disabled} onClick={handleClick}>
      {label}
    </button>
  );
};
