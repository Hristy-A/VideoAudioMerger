<div align="center">
    <img src="https://raw.githubusercontent.com/Hristy-A/VideoAudioMerger/main/View/public/icon.png" alt="VideoAudioMerger icon" height="120">
    <h1 style="font-weight: bold">VideoAudioMerger</h1>
</div>

[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4)](https://docs.abblix.com/docs/technical-requirements)
[![language](https://img.shields.io/badge/language-C%23%2C%20TS-239120)](https://learn.microsoft.com/ru-ru/dotnet/csharp/tour-of-csharp/overview)
[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/Hristy-A/VideoAudioMerger?include_prereleases&label=release)](https://github.com/Yuvix25/ReHUD/releases/latest)

⭐ Star this project on GitHub please — it motivates a lot! 😊

## Table of Contents
- [About](#-about)
- [Stack](#-stack)
- [Commands](#-commands)
- [License](#-license)

## 🚀 About
VideoAudioMerger is a program for merging video and external audio. It uses ffmpeg for conversion and ffprobe to get information about the file.

## 📦 Stack
- Electron.NET - to create for desktop application 
- React - for UI
- FFmpeg - for merging files

## 💻 Commands
You can find all possible Electron.NET commands and options in the [main repository](https://github.com/ElectronNET/Electron.NET).
1. To get started, download the basic nuget package for Electron.NET:
```ps1
dotnet add package ElectronNET.API
```
or
```ps1
PM> Install-Package ElectronNET.API
```

2. Then install the "[ElectronNET.CLI](https://www.nuget.org/packages/ElectronNET.CLI/)" packages as global tool:

```sh
dotnet tool install ElectronNET.CLI -g
```

3. To start the application run the following:

```sh
electronize start
```

4. To build an application, the command:

```sh
electronize build /target win
```

## 📃 License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
