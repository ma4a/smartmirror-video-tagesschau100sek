#!/bin/bash
#part of 'SmartMirror Tagesschau in 100 Sekunden' Module

videoURL=$(curl -s https://www.tagesschau.de/100sekunden/|grep -oP 'http:\/\/download.media.tagesschau.de\/video\/[/A-Za-z0-9-]*.websm.h264.mp4')

echo Video: $videoURL

curl --connect-timeout 15 -sS $videoURL -o ./tagesschau.mp4

echo Video downloaded