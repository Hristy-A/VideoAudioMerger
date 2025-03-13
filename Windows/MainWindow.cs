using ElectronNET.API;
using ElectronNET.API.Entities;
using VideoAudioMerger.Core;
using VideoAudioMerger.Events;
using VideoAudioMerger.Services;
using VideoAudioMerger.Windows.Interfaces;

namespace VideoAudioMerger.Windows;

public class MainWindow(IPageUrlResolver pageUrlResolver) : BaseWindow(pageUrlResolver), IWindow
{
    public static string PageName => "main";

    public override Task Open()
    {
        return Open(new BrowserWindowOptions
        {
            Width = 800,
            Height = 700,
            MinWidth = 700,
            MinHeight = 600,
            Center = true,
            Show = false,
        });
    }

    public override async Task Open(BrowserWindowOptions options)
    {
        await base.Open(options, PageUrlResolver.GetPageUrl(PageName));
        
        BrowserWindow?.RemoveMenu();
        
        RegisterEvents();
    }

    private void RegisterEvents()
    {
        BrowserWindow!.OnClosed += () =>
        {
            MediaManager.DisposeMediaManager();
            Electron.App.Quit();
        };
        
        var globalEvents = new GlobalEvents();
        globalEvents.RegisterEvents();
    }
}
