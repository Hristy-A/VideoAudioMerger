import { ipcRenderer } from 'electron';
import { nanoid } from 'nanoid';
import { Event } from '../event';

export interface MergeVideoAudioOptions {
  videoPath: string;
  audioPath: string;
  outputPath: string;
}

interface MergeVideoAudioEvent extends MergeVideoAudioOptions {
  taskId: string;
}

export const mergeVideoAudio = (
  videoPath: string,
  audioPath: string,
  outputPath: string,
  handleProgress?: (progress: number) => void,
) => {
  const taskId = nanoid();

  ipcRenderer.send(
    'global:merge-video-audio',
    new Event<MergeVideoAudioEvent>({ taskId, videoPath, audioPath, outputPath }),
  );

  return new Promise((resolve) => {
    const onProgress = (
      _: unknown,
      [progressTaskId, progress]: [progressTaskId: string, progress: number],
    ) => {
      if (progressTaskId === taskId) {
        handleProgress!(progress);
      }
    };

    const onFinish = (_: unknown, [doneTaskId]: [taskId: string]) => {
      if (taskId === doneTaskId) {
        ipcRenderer.off('global:merge-video-audio-reply', onFinish);
        if (handleProgress) {
          ipcRenderer.off('global:merge-video-audio-progress', onProgress);
        }
        resolve(true);
      }
    };

    ipcRenderer.on('global:merge-video-audio-reply', onFinish);
    if (handleProgress) {
      ipcRenderer.on('global:merge-video-audio-progress', onProgress);
    }
  });
};
