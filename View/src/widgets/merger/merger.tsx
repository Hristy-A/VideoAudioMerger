import { useState } from 'react';
import {
  FileFilters,
  mergeVideoAudio,
  openDirectory,
  selectDirectory,
} from '~/shared/electron-api';
import { DelayButton } from '~/shared/ui/delay-button/delay-button';
import { Modal, useModal } from '~/shared/ui/modal';
import { shortFileName } from '~/shared/utils';
import { FileList } from '~/widgets/files-list';

export const Merger = () => {
  const [videoFiles, setVideoFiles] = useState<string[]>([]);
  const [audioFiles, setAudioFiles] = useState<string[]>([]);
  const [outputPath, setOutputPath] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<Record<string, number> | null>(null);

  const { modalId, open: showModal } = useModal();

  const handleSelectOutputPath = async () => {
    const path = await selectDirectory();

    if (path) {
      setOutputPath(path);
    }
  };

  const getHandleSelectFiles = (type: 'video' | 'audio') => (files: string[]) => {
    const updateFiles = (prevFiles: string[]) => {
      return [...prevFiles, ...files.filter((f) => !prevFiles.includes(f))].sort();
    };

    if (type === 'video') {
      setVideoFiles(updateFiles);
    } else {
      setAudioFiles(updateFiles);
    }
  };

  const getHandleRemoveFile = (type: 'video' | 'audio') => (file: string) => {
    const updateFiles = (prevFiles: string[]) => {
      return prevFiles.filter((f) => f !== file);
    };

    if (type === 'video') {
      setVideoFiles(updateFiles);
    } else {
      setAudioFiles(updateFiles);
    }
  };

  const handleMerge = async () => {
    const minLength = Math.min(videoFiles.length, audioFiles.length);
    setProcessing(true);
    setProgress(videoFiles.slice(0, minLength).reduce((acc, file) => ({ ...acc, [file]: 0 }), {}));

    try {
      await Promise.all(
        Array.from({ length: minLength }, (_, i) =>
          mergeVideoAudio(
            videoFiles[i],
            audioFiles[i],
            outputPath + `/merged-${shortFileName(videoFiles[i])}`,
            (progress) => {
              setProgress((prev) => ({ ...prev, [videoFiles[i]]: progress }));
            },
          ),
        ),
      );
    } finally {
      setProcessing(false);
      setProgress(null);
      showModal();
    }
  };

  const modalContent = (
    <div className="flex flex-col gap-4 select-none">
      <div>
        Файлы созданы по пути: <span className="text-primary">{outputPath}</span>
        <DelayButton
          className="btn btn-xs btn-neutral ml-2"
          delay={1500}
          getButtonProps={(copied) => ({
            className: copied ? 'btn-disabled' : '',
            disabled: copied,
          })}
          onClick={() => navigator.clipboard.writeText(outputPath)}
        >
          {(copied) => (copied ? 'скопировано' : 'копировать')}
        </DelayButton>
      </div>
      <button className="btn self-start" onClick={() => openDirectory(outputPath)}>
        Открыть
      </button>
    </div>
  );

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Modal modalId={modalId} title="Обработка завершена" content={modalContent} />
      <div className="flex justify-between gap-4 w-11/12 lg:mx-auto">
        <div className="w-5/12">
          <div className="text-lg font-bold text-center">Видео</div>
          <FileList
            className="mt-4"
            shortName
            label="Добавить"
            selectFileOptions={{ filters: [FileFilters.Videos] }}
            files={videoFiles}
            progress={progress}
            disabled={processing}
            onSelect={getHandleSelectFiles('video')}
            onRemove={getHandleRemoveFile('video')}
          />
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="w-5/12">
          <div className="text-lg font-bold text-center">Аудио</div>
          <FileList
            className="mt-4"
            shortName
            label="Добавить"
            selectFileOptions={{ filters: [FileFilters.Audios] }}
            files={audioFiles}
            disabled={processing}
            onSelect={getHandleSelectFiles('audio')}
            onRemove={getHandleRemoveFile('audio')}
          />
        </div>
      </div>
      {outputPath ? (
        <div className="flex flex-col gap-4 w-11/12 lg:mx-auto">
          <div className="mt-4">
            Путь сохранения: {outputPath}{' '}
            <button
              disabled={processing}
              className="btn btn-xs btn-outline"
              onClick={handleSelectOutputPath}
            >
              Изменить
            </button>
          </div>
        </div>
      ) : (
        <button className="btn mt-4" onClick={handleSelectOutputPath}>
          Сохранить в
        </button>
      )}
      {Boolean(videoFiles.length === 0 || audioFiles.length === 0 || !outputPath || processing) || (
        <button
          className="btn mt-4"
          disabled={videoFiles.length === 0 || audioFiles.length === 0 || !outputPath || processing}
          onClick={handleMerge}
        >
          Объединить
        </button>
      )}
    </div>
  );
};
