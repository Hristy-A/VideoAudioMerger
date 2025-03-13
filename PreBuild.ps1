$ffmpegDir = "ffmpeg"
$zipUrl = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl-shared.zip"
$zipFile = "ffmpeg-master-latest-win64-gpl-shared.zip"
$tempExtractDir = "ffmpeg-master-latest-win64-gpl-shared"

if (-Not (Test-Path $ffmpegDir)) {
    Write-Output "ffmpeg not found, downloading..."

    Invoke-WebRequest -Uri $zipUrl -OutFile $zipFile

    Write-Output "ffmpeg downloaded, extracting..."

    Expand-Archive -Path $zipFile -DestinationPath . -Force

    Write-Output "extracting done"

    if (-Not (Test-Path $ffmpegDir)) {
        New-Item -ItemType Directory -Path $ffmpegDir | Out-Null
    }

    Move-Item -Path "$tempExtractDir\bin\*" -Destination $ffmpegDir -Force

    Remove-Item $zipFile -Force
    Remove-Item $tempExtractDir -Recurse -Force

    Write-Output "done: ffmpeg installed"
} else {
    Write-Output "ffmpeg already exists, skip stage"
}
