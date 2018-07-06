# file-form

## Description
This system is a standalone way to create forms without a http backend. Uses standard CIFS/SMB shares.
The client is a html5 single page application, with two modes of operation:  
 - Executable mode, using a standalone nwjs runtime. This mode supports the copying of local files.
 - Http mode, where you host the client on a web server, but still without a backend.

## Features
 - Single click forms links, without any requisite steps by the user.
 - Form fields are defined in a csv file, without requiring any maintenance on the engine code.
 - Easy to deploy in new enviroments. Just copy the entire folder and send the corresponding link.
 - Inputed data is stored as files in a CIFS/SMB share. Default save path is the folder containing the script.

## Limitations
 - Currently a executable entry point is only available for Windows enviroments (WSH script).
 - In executable mode, requires one or more CIFS/SMB shares to store the script, the results and the nwjs runtime package.
 


