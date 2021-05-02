# Project - Library Website Redevelopment

The library website for the Georgetown University in Qatar library is being redeveloped in the Spring of 2019. The existing version has become outdated and has problems with its responsiveness for mobile users. The projects introduces an opportunity to upgrade the website and use newer technologies such as modern Javascript, Bootstrap 4 CSS-Framework, and features from Drupal 8. Students and faculty make constant use of the website and it is essential for their success at the university.

### The Challenge

The previous version of the library website, which I was replacing in this project, made use of an older CSS Framework (Bootstrap 3) and other technologies, that needed to be replaced and updated. This required a process of inventorying the existing website content - updating or replacing - and rethinking the overall site logical structure. Once the information architecture was updated the next challenge was to develop logical and reproducible components that would ultimately be inserted into a Drupal production environment.

### The Solution

Although I don’t use all the features of Drupal, I do make use of the system of blocks to create regions on each page that are defined once and reproduced on several pages. Due to this feature, I choose to use a build system based on pug to replicate the same concept. In Pug, it’s possible to create content as includes that can be inserted into a layout for repeatable use. Unique content could then be developed for insertion into a content area for each page on the website.

The final build system chosen was Gulp. Using Gulp, tasks were run for Pug, Sass, as well as incorporation of Bootstrap 4. Running browser-sync also allowed for basic development testing and debugging.

## Content Inventory

Listed are all the content pages that exist on the website. Additional content is available, but as links to outside resources/locations, not as content pages within the website.

|   Name   |   Group   |   Type   |   URL   |
|----------|-----------|----------|---------|
|Home Page | n/a       | custom   | /       |
|Ask Us|forms|mixed|/ask|
|Print Journals and Newspapers|research|informational|/print|
|Other Libraries|research|informational|/libraries|
|Personal Librarian|research|informational|/courseLibrarians|
|Borrowing|services|informational|/accessServices|
|Interlibrary Loans|services|informational|/document|
|Course Reserves|services|informational|/course|
|Consultations|services|informational|/guqConsultations|
|Study Spaces|services|informational|/libraryExplorer|
|Assistive Technology|services|informational|/assistiveTechnology|
|Equipment & Software|services|informational|/digitalServices|
|Online Learning|services|informational|/onlinelearning|
|Scholarly Communication|services|informational|/ScholarlyCommunication|
|Alumni Borrower Form|forms|mixed|/alumni-card|
|Our Mission|about|informational|/mission|
|Collections & Policies|about|informational|/collections|
|Staff|about|informational|/staff|
|Hours|about|informational|/info|
|Directions|about|informational|/libraryDirections|
|Undergraduates|populations|links|/guqUndergraduates|
|Faculty|populations|links|/guqFaculty|
|Staff|populations|links|/guqStaff|
|Alumni|populations|links|/guqAlumni|
|Visitors|populations|links|/guqVisitors|
