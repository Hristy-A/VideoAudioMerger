using ElectronNET.API;
using VideoAudioMerger.Windows.Interfaces;

namespace VideoAudioMerger.Services;

public class HttpPageUrlResolver : IPageUrlResolver
{
    public readonly string BaseUrl = $"http://localhost:{BridgeSettings.WebPort}/pages";

    public string GetPageUrl(string page)
    {
        return $"{BaseUrl}/{page}.html";
    }
}