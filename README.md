# file-form

## Description
This system is a standalone way to create forms without a http backend. Uses standard CIFS/SMB shares (A.k.a.: Windows Shares).
The client is a html5 single page application, with two modes of operation:  
 - Executable mode, using a standalone nwjs runtime. This mode supports the copying of local files.
 - Http mode, where you host the client on a web server, but still without a backend.

## Features
 - Single click executable forms links, without any requisite steps by the user.
 - Form fields are defined in a csv file, without requiring any maintenance on the engine code.
 - Easy to deploy in new enviroments. Just copy the entire folder and send the corresponding link.
 - Inputed data is stored as files in a CIFS/SMB share. Default save path is the folder containing the script.
 - Executable entry point, client and runtime can be used as base for a custom serverless html5 application.
 - Editable and linkable selection lists.

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
| date:date | check:checkbox | color | continent | country |
| --- | --- | --- | --- | --- |
| | | Red | America | America-US |
| | | Green | Europe | America-Canada |
| | | Blue | Asia | Europe-Germany |
| | | | Africa | Europe-France |
| | | | Australia | Australia-Australia |
| | | | | Africa-SA |
| | | | | Asia-China |
| | | | | Asia-Japan |
| | | | | Asia-SK |
| | | | | Asia-NK |


## License
Apache 2.0
