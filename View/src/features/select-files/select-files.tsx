import { FileFilters, selectFiles } from '~/shared/electron-api';

interface SelectFilesProps {
  onSelect: (files: string[]) => void;
}

export const SelectFiles = (props: SelectFilesProps) => {
  const { onSelect } = props;

  const handleClick = () => {
    selectFiles({ filters: [FileFilters.Videos] }).then(onSelect);
  };

  return (
    <button className="btn" onClick={handleClick}>
      Select files
    </button>
  );
};
