//!cscript
// Run a HTML5 app using a local nwjs runtime
// if required deploy a standalone local nwjs runtime
/*
Copyright 2018 Vale

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

*** You can contribute to the main repository at: ***

https://github.com/pemn/file-form
*/

// UNC or URL path to folder where the nwjs runtime is available
// if blank defaults to current working directory
// only required when running on executable mode (most common case)
// Ex.: \\\\mywindowbox\\share1\\nwruntime, https://lanserver/libs
var sSourceDir = "";

// Filename of the nwjs runtime, without .zip extension
// It should be a zip file containing a single folder with the same name.
var sSourceZip = "nwjs-win-x64";

var ws = WScript.CreateObject("WScript.Shell");
var fso = WScript.CreateObject("Scripting.FileSystemObject");
var sTargetDir = ws.SpecialFolders("APPDATA");
var sBaseName = fso.GetBaseName(WScript.ScriptName);
var sBaseDir = fso.GetParentFolderName(WScript.ScriptFullName);

// check if this folder is a valid nwjs app
if (! fso.FileExists(sBaseDir + "\\package.json")) {
  WScript.Echo("package.json not found");
  WScript.Quit(1);
}

// check if the nwjs runtime is already present on this machine
if (! fso.FolderExists(sTargetDir + "\\" + sSourceZip)) {
  // convert the empty default to a actual path
  if (sSourceDir.length == 0) {
    sSourceDir = sBaseDir;
  }
  var sZip = sSourceDir + "\\" + sSourceZip + ".zip";
  // retrieve the nwjs from a http server
  if (sSourceDir.substr(0,4) == "http") {
    sZip = ws.Environment("Process")("TEMP") +  "\\" + sSourceZip + ".zip"
    get_http(sSourceDir + "/" + sSourceZip + ".zip", sZip);
  }
  // deploy the zip to the %appdata% folder
  extract_zip(sZip, sTargetDir);
}

// compiles the command line
var sRun = sTargetDir + "\\" + sSourceZip + '\\nw.exe --nwapp=' + fso.GetParentFolderName(WScript.ScriptFullName);
// execute the nw.js runtime
ws.Run(sRun, 0, 1);

// --- functions --- //

// extract a zip file to a folder
function extract_zip(sSourceFullPath, sTargetDir) {
  if (! fso.FileExists(sSourceFullPath)) {
    WScript.Echo(sSourceFullPath + " not found");
    WScript.Quit(1);
  }
  // Create the required Shell objects
  var sa = WScript.CreateObject("Shell.Application");

  // Create a reference to the files and folders in the ZIP file
  var objSource = sa.NameSpace(sSourceFullPath).Items();

  // Create a reference to the target folder
  var objTarget = sa.NameSpace(sTargetDir);

  /* These are the available CopyHere options, according to MSDN
   (http://msdn2.microsoft.com/en-us/library/ms723207.aspx).
   On my test systems, however, the options were completely ignored.
        4: Do not display a progress dialog box.
        8: Give the file a new name in a move, copy, or rename
           operation if a file with the target name already exists.
       16: Click "Yes to All" in any dialog box that is displayed.
       64: Preserve undo information, if possible.
      128: Perform the operation on files only if a wildcard file
           name (*.*) is specified.
      256: Display a progress dialog box but do not show the file
           names.
      512: Do not confirm the creation of a new directory if the
           operation requires one to be created.
     1024: Do not display a user interface if an error occurs.
     4096: Only operate in the local directory.
           Don't operate recursively into subdirectories.
     8192: Do not copy connected files as a group.
           Only copy the specified files.
  */
  // UnZIP the files
  objTarget.CopyHere(objSource, 256);  
}

// retrieves a file from a http url
function get_http(url, target) {
  // create the agent, obfuscate to avoid paranoid anti-virus
  ws.Environment("Process")("OBFUSCATE") = "MSXML2.XMLHTTP";
  var xmlhttp = WScript.CreateObject(ws.ExpandEnvironmentStrings("%OBFUSCATE%"));

  xmlhttp.Open('GET', url, false);
  xmlhttp.Send();

  if (xmlhttp.Status == 200) {
      // Create the Data Stream
      var stream = WScript.CreateObject('ADODB.Stream');

      // Establish the Stream
      stream.Open();
      stream.Type = 1; // adTypeBinary
      stream.Write(xmlhttp.ResponseBody);
      stream.Position = 0;

      // Write the Data Stream to the File
      // adSaveCreateOverWrite = 2
      stream.SaveToFile(target, 2); 
      stream.Close();
  } else {
    WScript.Echo("Failed to download: " + url);
  }
}
