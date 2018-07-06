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
Extract the files provided in runtime.7z directly on same folder as the package.* files.
The system should work, but using the default "everything on the same folder" mode.  
Now you can start to enable some convenience options:
 - Edit the form fields in the `package.csv` file.
 - Edit the path to the runtime zip in `package.js`. More details are provided there as comments.
 - Custom libs folder: default is the current folder. Add a "libs" setting to `package.json` with a URL.
 - Custom save folder: default is the current folder. Add a `save` setting to `package.json` with a UNC path.

 
## Field CSV specification
For each column, a field will be generated on the form. There are only two type of fields:
 - Text fields, with a list of one or more options.
 - File fields. Only the column name, without any options.
Each field type is determined based only whether there is a list of options below the header. So, even if you need a text field without any options you need to put at least one item. A good convention in this case is a dash `-`.

## License
Apache 2.0
