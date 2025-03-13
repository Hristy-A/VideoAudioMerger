using ElectronNET.API;
using ElectronNET.API.Entities;
using VideoAudioMerger.Core;

namespace VideoAudioMerger.Events;

public class GlobalEvents
{
    public void RegisterEvents()
    {
        Electron.IpcMain.On(GlobalEventsKeys.SelectDirectory, HandleSelectDirectoryEvent);
        Electron.IpcMain.On(GlobalEventsKeys.SelectFile, HandleSelectFileEvent);
        Electron.IpcMain.On(GlobalEventsKeys.SelectFiles, HandleSelectFilesEvent);

        Electron.IpcMain.On(GlobalEventsKeys.OpenDirectory, HandleOpenDirectoryEvent);
        
        Electron.IpcMain.On(GlobalEventsKeys.MergeVideoAudio, HandleMergeVideoAudio);
    }

    private async void HandleSelectDirectoryEvent(object obj)
    {
        var e = new Event(obj);
        var options = new OpenDialogOptions { Properties = [OpenDialogProperty.openDirectory] };
        
        object[] directory = await Electron.Dialog.ShowOpenDialogAsync(e.BrowserWindow, options);
        
        Electron.IpcMain.Send(e.BrowserWindow, GlobalEventsKeys.SelectDirectoryReply, directory);
    }

    private async void HandleSelectFileEvent(object obj)
    {
        var e = new Event<SelectFileOptions>(obj);
        var options = new OpenDialogOptions { Properties = [OpenDialogProperty.openFile], Filters = e.Data.Filters };
        
        object[] file = await Electron.Dialog.ShowOpenDialogAsync(e.BrowserWindow, options);
        
        Electron.IpcMain.Send(e.BrowserWindow, GlobalEventsKeys.SelectFileReply, file);
    }
    
    private async void HandleSelectFilesEvent(object obj)
    {
        var e = new Event<SelectFileOptions>(obj);
        var options = new OpenDialogOptions { Properties = [OpenDialogProperty.openFile, OpenDialogProperty.multiSelections], Filters = e.Data.Filters };
        
        object[] files = await Electron.Dialog.ShowOpenDialogAsync(e.BrowserWindow, options);
        
        Electron.IpcMain.Send(e.BrowserWindow, GlobalEventsKeys.SelectFilesReply, files);
        
    }
    
    private async void HandleOpenDirectoryEvent(object obj)
    {
        var e = new Event<OpenDirectoryOptions>(obj);

        await Electron.Shell.OpenPathAsync(e.Data.Path);
        
        Electron.IpcMain.Send(e.BrowserWindow, GlobalEventsKeys.OpenDirectoryReply);
    }
    
    private async void HandleMergeVideoAudio(object obj)
    {
        var e = new Event<MergeVideoAudioOptions>(obj);
        var data = e.Data;

        var handleProgress = (double progress) =>
        {
            Electron.IpcMain.Send(e.BrowserWindow, GlobalEventsKeys.MergeVideoAudioProgress,
                [data.TaskId, progress]);
        };

        await MediaManager.MergeVideoWithAudio(data.VideoPath, data.AudioPath, data.OutputPath, handleProgress);
        
        Electron.IpcMain.Send(e.BrowserWindow, GlobalEventsKeys.MergeVideoAudioReply, data.TaskId);
    }
}

internal class SelectFileOptions
{
    public FileFilter[]? Filters { get; set; }
}

internal class OpenDirectoryOptions
{
    public string Path { get; set; } = null!;
}

internal class MergeVideoAudioOptions
{
    public string TaskId { get; set; } = null!;
    public string VideoPath { get; set; } = null!;
    public string AudioPath { get; set; } = null!;
    public string OutputPath { get; set; } = null!;
}
