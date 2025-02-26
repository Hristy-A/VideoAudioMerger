using ElectronNET.API;
using ElectronNET.API.Entities;
using VideoAudioMerger.Windows.Exceptions;
using VideoAudioMerger.Windows.Interfaces;

namespace VideoAudioMerger.Windows;

public abstract class BaseWindow : IWindow
{
    public BrowserWindow? BrowserWindow { get; protected set; }
    protected readonly IPageUrlResolver PageUrlResolver;

    public abstract Task Open();
    public abstract Task Open(BrowserWindowOptions options);

    protected BaseWindow(IPageUrlResolver pageUrlResolver)
    {
        PageUrlResolver = pageUrlResolver;
    }
    
    protected async Task Open(BrowserWindowOptions options, string pageUrl)
    {
        if (!HybridSupport.IsElectronActive)
        {
            throw new ElectronInactiveException();
        }

        if (BrowserWindow is not null)
        {
            throw new WindowAlreadyOpenException();
        }
        
        var win = await Electron.WindowManager.CreateWindowAsync(options, pageUrl);
        BrowserWindow = win;
        
        await win.WebContents.Session.ClearCacheAsync();

        win.WebContents.OnDidFinishLoad += () =>
        {
            win.Show();
        };
    }

    public void Close()
    {
        BrowserWindow?.Close();
        BrowserWindow = null;
    }
}