# file-form

## Description
This system is a standalone way to create forms without a http backend. Uses standard CIFS/SMB shares.
The client is a html5 single page application, with two modes of operation:  
 - Executable mode, using a standalone nwjs runtime. This mode supports the copying of local files.
 - Http mode, where you host the client on a web server, but still without a backend.

## Features
 - Single click executable forms links, without any requisite steps by the user.
 - Form fields are defined in a csv file, without requiring any maintenance on the engine code.
 - Easy to deploy in new enviroments. Just copy the entire folder and send the corresponding link.
 - Inputed data is stored as files in a CIFS/SMB share. Default save path is the folder containing the script.
 - Executable entry point, client and runtime can be used as base for a custom serverless html5 application.

## Limitations
 - Currently a executable entry point is only available for Windows enviroments (WSH script).
 - In executable mode, requires one or more CIFS/SMB shares to store the script, the results and the nwjs runtime package.
 
## Screenshot
![screenshot](https://github.com/pemn/file-form/blob/master/assets/screenshot1.png)

## How to use
First, you need to edit two constants in the following file:
 - package.js
More details in the actual file comments.
Now the system should be working. Now you can start to enable some convenience options:
 - Edit the form fields: Edit the package.csv file.
 - Custom save folder: default is the current folder. Add a `save` setting to `package.json` with a UNC path.
 - Custom libs folder: default is the current folder. Add a "libs" setting to `package.json` with a URL.
 
## Field CSV specification
For each column, a field will be generated on the form. THere are only 

