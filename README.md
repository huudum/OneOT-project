# OneOT-project
Project made as a demo for OneOT canditature.
Frontend built using React and ReactBootstrap.
Backend built using SpringBoot and Rest API.
Project will be built using gradle wrapper.

# Running the build
1.  Clone the repository from https://github.com/huudum/OneOT-project 
    OR
    Download the repository as a zip from dropbox link: https://www.dropbox.com/s/wq1hxyr9edc8obt/OneOT-project-master.zip?dl=0

2.  After either cloning or downloading & unpacking the project, you will need to open the folder in your terminal. 
    The terminal should be open at the root of the project: on the folder "OneOT-project"

3. Use the packaged gradle wrapper to build the project.
   On Windows the input would be: "./gradlew bootRun"
   This will proceed to build and then run the project. 
   It might take a small amount of time, as it needs to download all dependancies for both SpringBoot and React application.
   The run will be successful on "80%", it will stay here.
   
 4. The React webapp will be hosted on "localhost:8080". 
    If this port is already occupied during bootRun, the process will fail.
    The REST api itself is hosted on localhost:8080/forecasts. Visiting this url will return a json file.
    
 # NOTES
   The React webapp is located in OneOT-project\src\main\resources\static folder using a built version. 
   The source code for the React app can be wound within: OneOT-project\src\main\java\com\OneOT\webapp\1ot-app\src
   
# AUTHOR
 This project was created by Hugo Rene Udumäe.
