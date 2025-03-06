﻿namespace VideoAudioMerger.Windows.Events;

public static class GlobalEventsKeys
{
    public const string PREFIX = "global:";
    
    public const string RegisterWindowId = $"{PREFIX}register-window";
    
    public const string SelectDirectory = $"{PREFIX}select-directory";
    public const string SelectDirectoryReply = $"{PREFIX}select-directory-reply";
    
    public const string SelectFile = $"{PREFIX}select-file";
    public const string SelectFileReply = $"{PREFIX}select-file-reply";
    
    public const string SelectFiles = $"{PREFIX}select-files";
    public const string SelectFilesReply = $"{PREFIX}select-files-reply";
}
