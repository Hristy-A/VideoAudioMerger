using ElectronNET.API;
using ElectronNET.API.Entities;
using VideoAudioMerger.Windows.Events;
using VideoAudioMerger.Windows.Interfaces;

namespace VideoAudioMerger.Windows;

public class MainWindow(IPageUrlResolver pageUrlResolver) : BaseWindow(pageUrlResolver), IWindow
{
    public static string PageName => "main";

    public override Task Open()
    {
        return Open(new BrowserWindowOptions
        {
            Height = 700,
            Width = 800,
            MinHeight = 700,
            MinWidth = 600,
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
            Electron.App.Quit();
        };
        
        var globalEvents = new GlobalEvents();
        globalEvents.RegisterEvents();
    }
}