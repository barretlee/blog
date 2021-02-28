---
title: Xcode-select Error
categories:
  - 工具
tags:
  - mac
  - Xcode
  - Error
date: 2015-04-13 00:00:00
---


错误信息：

> xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance


解决方案：

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```
