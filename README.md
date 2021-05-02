# Liberty University 2021 Capstone Project for Christian Aid

## Steps to complete once downloading from GitHub

### Setting up the database
  Ensure You are Using SQL Server Management Studio 18 to gain access to the database required for the application.
  Follow this guide if you have not already done so: https://docs.microsoft.com/en-us/sql/database-engine/install-windows/upgrade-to-a-different-edition-of-sql-server-setup?view=sql-server-ver15.
  If you do not have SQL server Managment Studio Installed, follow this guide: https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15.
  Place the database backup file (ending with ".bak" into your system's SQL database backup folder (EX: C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\Backup).
  Once SSMS 18 has been installed on your machine connect to (either locally or to a server).
  Once connected, open the navigation until you see "Databases". Right-Click on Databases, and select "Restore Database".
  In the restore menu, select the Device Button, then click the "..." symbol on the right side of the screen.
  Click the "Add" Button on the right side of the screen.
  Select the "LUCapstone-CAM_GitHub_5220.bak" File and click "OK" at the bottom of the window.
  Click "OK" at the bottom of the window once more.
  Finally, click "OK" at the bottom of the final window.
  Once the database has been restored, you are ready for the next steps and the application should be able to run and connect without issue.
  
### For the API
  For this to run properly, you will need Visual Studio 2019 installed on your machine.
  To install this, go to this link (https://visualstudio.microsoft.com/downloads/) and install the community version.
  Once the installer is up, install the .NET CORE packages.
  Once that's done Open the CapstoneAPI2.sln file in Visual Studio 2019.
  Navigate to the "appsettings.json" file
  Where it says Data Source=".;" change the "." to the connection you used to connect to the database in SSMS.
  Save the project.
  open command line and navigate to the project folder (EX: cd C:\Users\{Username}\Documents\GitHub\capstone\CapstoneAPI2\CapstoneAPI2).
  next in command prompt/terminal type "dotnet run" to start the API.
  Alternatively, click the run button inside Visual Studio 2019 to run the project.
  A new tab will appear in your default browser, but this can be ignored.
  
### For the Angular Project
  To view the project code, you will also need visual studio code. to install visual studio code, follow this link (https://code.visualstudio.com/download) and download and install the appropriate version.
  Once installed, navigate to the project folder in a command prompt (EX: cd C:\Users\{Username}\Documents\GitHub\capstone\capstoneAngular).
  type "code ." in the command prompt and it will launch visual studio code.
  In order to run the project, you will need NPM installed on your machine.
  To install NPM, follow this link (https://nodejs.org/en/).
  Download the recommended version.
  Double click the installer and follow the instructions.
  Open a command line and navigate to the project folder (EX: cd C:\Users\{Username}\Documents\GitHub\capstone\capstoneAngular).
  in the command prompt type "npm update" to update the packages necessary.
  to run the project in your browser, in that same command prompt type "ng s --o" (or ng serve --open).
  This will open a tab in your default browser displaying the project.
  
## For full connectivity, ensure the API is running before you start the angular project so the data from the database can load
  
  
  
  
