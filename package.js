//!cscript
// Run a HTML5 app using a local nwjs runtime
/*
Copyright 2018 Vale

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

*** You can contribute to the main repository at: ***

https://github.com/pemn/file-form
*/

// Base url to where the remote apps are located
// complete url will be: base + name + .html
var sBaseUrl = "http://recursos01/sitepages/";
// Path to folder where the nwjs runtime is available
var sSourceDir = "\\\\recursos01\\html$\\libs\\";
// Filename of the nwjs runtime. It should be a zip file containing a single folder with the same name.
var sSourceZip = "nwjs-win-x64";

var ws = WScript.CreateObject("WScript.Shell");
var fso = WScript.CreateObject("Scripting.FileSystemObject");
var sTargetDir = ws.SpecialFolders("APPDATA");
var sBaseName = fso.GetBaseName(WScript.ScriptName);
var sBaseDir = fso.GetParentFolderName(WScript.ScriptFullName);

// compiles the command line
var sRun = sTargetDir + "\\" + sSourceZip + '\\nw.exe';
if (fso.FileExists(sBaseDir + "\\" + sBaseName + ".html")) {
  // local mode, where we call the current folder regardless of script name
  sRun += ' --nwapp=' + fso.GetParentFolderName(WScript.ScriptFullName);
} else {
  // remote mode, where we call a remote file with same name as this script
  sRun += ' --url=' + sBaseUrl + sBaseName + ".html";
}

// check if the nwjs runtime is already present on this machine
if (! fso.FolderExists(sTargetDir + "\\" + sSourceZip)) {
  // Create the required Shell objects
  var sa = WScript.CreateObject("Shell.Application");

  // Create a reference to the files and folders in the ZIP file
  var objSource = sa.NameSpace(sSourceDir + sSourceZip + ".zip").Items();

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

ws.Run(sRun, 0, 1);
