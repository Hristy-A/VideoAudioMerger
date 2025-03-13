using FFMpegCore;

namespace VideoAudioMerger.Core;

public class MediaManager
{
    private static CancellationTokenSource _cancellationTokenSource;

    private static SemaphoreSlim _semaphoreSlim = new (Environment.ProcessorCount, Environment.ProcessorCount);
    
    static MediaManager()
    {
        GlobalFFOptions.Configure(new FFOptions 
        { 
            BinaryFolder = "./ffmpeg",
            TemporaryFilesFolder = "./temp"
        });
        
        _cancellationTokenSource = new CancellationTokenSource();
    }

    public static void CancelAllJobs()
    {
        _cancellationTokenSource.Cancel();
        _cancellationTokenSource = new CancellationTokenSource();
    }
    
    public static void DisposeMediaManager()
    {
        CancelAllJobs();
    }
    
    public static async Task MergeVideoWithAudio(string videoPath, string audioPath, string outputPath, Action<double>? progressHandler = null)
    {
        try
        {
            await _semaphoreSlim.WaitAsync();

            var argumentProcessor = FFMpegArguments
                .FromFileInput(videoPath)
                .AddFileInput(audioPath)
                .OutputToFile(outputPath, true, options => options
                    .WithVideoCodec("copy")
                    .WithCustomArgument("-map 0:v:0 -map 1:a:0")
                    .UsingShortest(false)
                );

            if (progressHandler is not null)
            {
                var media = FFProbe.Analyse(videoPath);
                argumentProcessor = argumentProcessor.NotifyOnProgress(progressHandler, media.Duration);
            }
        
            await argumentProcessor
                .CancellableThrough(_cancellationTokenSource.Token)
                .ProcessAsynchronously();
        }
        finally
        {
            _semaphoreSlim.Release();
        }
    }
}
