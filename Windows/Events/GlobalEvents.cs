using ElectronNET.API;
using ElectronNET.API.Entities;
using Newtonsoft.Json;

namespace VideoAudioMerger.Windows.Events;

public class GlobalEvents
{
    public void RegisterEvents()
    {
        Electron.IpcMain.On(GlobalEventsKeys.SelectDirectory, HandleSelectDirectoryEvent);
        Electron.IpcMain.On(GlobalEventsKeys.SelectFile, HandleSelectFileEvent);
        Electron.IpcMain.On(GlobalEventsKeys.SelectFiles, HandleSelectFilesEvent);
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
        throw new Exception("Some exceptions???");
       
        var options = new OpenDialogOptions { Properties = [OpenDialogProperty.openFile, OpenDialogProperty.multiSelections], Filters = e.Data.Filters };
        
        object[] files = await Electron.Dialog.ShowOpenDialogAsync(e.BrowserWindow, options);
        
        Electron.IpcMain.Send(e.BrowserWindow, GlobalEventsKeys.SelectFilesReply, files);
    }
}

internal class SelectFileOptions
{
    public FileFilter[]? Filters { get; set; }
}
