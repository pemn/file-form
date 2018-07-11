# file-form

## Description
This system is a standalone, data-driven, way to fill forms and copy files without a http backend. Uses standard CIFS/SMB shares in the local area network (A.k.a.: Windows Shares).
The client is a html5 single page application using the angular framework.  
There are two modes of operation:  
 - Executable mode. A custom WSH script calls a standalone nw.js runtime. This mode supports the copying of local files.
 - Http mode. Hosted on a web server with a custom REST backend (PHP, Sharepoint, WP, etc).

## Features
 - No HTTP server required in executable mode.
 - Single click executable forms links, without any setup or dependencies. Works in all Windows versions supported by nw.js.
 - Local file copy. Instead of files being uploaded, they are copied from folder to folder directly by the OS.
 - Data-driven. Form fields may be defined in a csv file, without requiring any maintenance on the engine code.
 - Easy to deploy in new enviroments. Just copy the entire folder and send the corresponding link.
 - Inputed data is stored as files in a LAN share. Default save path is the folder containing the script.
 - Executable. The client and runtime structure can be used as base for other custom serverless html5 applications.
 - On executable mode, does not rely on any installed browser. Uses a standalone chromium based runtime (nw.js).

## Limitations
 - Currently a executable entry point is only available for Windows enviroments (WSH script).
 - In executable mode, requires one or more CIFS/SMB shares to store the script, the results and the nwjs runtime package.
 
## Screenshot
![screenshot1](https://github.com/pemn/file-form/blob/master/assets/screenshot1.png)

## How to use
Extract the files provided in runtime.7z directly on same folder as the package.* files ("extract here"). *Do not* extract the file `nwjs-win-x64.zip`, its a packaged runtime required by the system. This file is just a standard nwjs distribution where the internal zip folder was renamed to remove the version number.
Extract the libs.7z package to a subfolder with the same name (`libs`). Dont "extract here" because this zip does not have a internal folder.  
The current folder should look like this:  
![screenshot2](https://github.com/pemn/file-form/blob/master/assets/screenshot2.png)  
The system should now work, but using the default "everything on the same folder" mode. To run the example form execute `package.js` (a Windows WSH script).  
To deploy, customize the form as detailed below. Then create a network share to this folder and send to the users which must fill the form a link with the UNC path to the `package.js` file. Ex.: `\\windowsbox001\sharename\package.js`.  

## Customize the form
 - Edit the form fields in the `package.csv` file.
 - Edit the path to the runtime zip in `package.js`. More details are provided there as comments.
 - Custom libs folder: default is the current folder. Add a "libs" setting to `package.json` with a URL.
 - Custom save folder: default is the current folder. Add a `save` setting to `package.json` with a UNC path.
 - Optional form definition: instead of using a csv you can hardcode the form in the json `form` setting.
 
## Field CSV specification
For each column, a field will be generated on the form.  
Below the column header, a list of options may be specified.  
The default behavior is to create a `<input type="text>` control, plus the list of options as a HTML5 `<datalist>`.  
Other controls may be specified by using a decorator ":" and the desired field type.  
Supported control types are:
 - text
   - Standard text control with a optional list of options
 - checkbox
   - Standard checkbox
 - date
   - HTML5 date control
 - files
   - Multiple local file system selection. Behavior is very different from standard `<input type="file">`.
 - link
   - Similar with text, but allows linked options filtered by the value of the previous control. Ex.: One control to select a country then another control to select one of its cities.

## CSV example
| title | date:date | check:checkbox | attachment:files | color | continent | country:link |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | red | America | America-US |
| | | | | green | Australia | America-Canada |
| | | | | blue | Africa | Africa-SA |
| | | | | | Asia | Asia-China |
| | | | | | Europe | Asia-Japan |
| | | | | | | Asia-SK |
| | | | | | | Asia-NK |
| | | | | | | Australia-Australia |
| | | | | | | Europe-Germany |
| | | | | | | Europe-France |

## License
Apache 2.0
