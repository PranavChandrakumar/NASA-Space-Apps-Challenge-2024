'''
 This script, NSIDC_parse_HTML_BatchDL.py, defines an HTML parser to scrape data files from
 an earthdata HTTPS URL and bulk downloads all files to your working directory.

This code was adapted from https://wiki.earthdata.nasa.gov/display/EL/How+To+Access+Data+With+Python

 Last edited Sep 12, 2022
 Tested on Python 3

 ===============================================
 Technical Contact
 ===============================================

 NSIDC User Services
 National Snow and Ice Data Center
 CIRES, 449 UCB
 University of Colorado
 Boulder, CO 80309-0449  USA
 phone: +1 303.492.6199
 fax: +1 303.492.2468
 form: Contact NSIDC User Services
 e-mail: nsidc@nsidc.org

'''

# !/usr/bin/python
import urllib
import os
from http.cookiejar import CookieJar
from html.parser import HTMLParser

# Define a custom HTML parser to scrape the contents of the HTML data table


class MyHTMLParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.inLink = False
        self.dataList = []
        self.directory = '/'
        self.indexcol = ';'
        self.Counter = 0

    def handle_starttag(self, tag, attrs):
        self.inLink = False
        if tag == 'table':
            self.Counter += 1
        if tag == 'a':
            for name, value in attrs:
                if name == 'href':
                    if self.directory in value or self.indexcol in value:
                        break
                    else:
                        self.inLink = True
                        self.lasttag = tag

    def handle_endtag(self, tag):
        if tag == 'table':
            self.Counter += 1

    def handle_data(self, data):
        if self.Counter == 1:
            if self.lasttag == 'a' and self.inLink and data.strip():
                self.dataList.append(data)


parser = MyHTMLParser()

# Define function for batch downloading


def BatchJob(Files, cookie_jar):
    for dat in Files:
        print("downloading: ", dat)
        JobRequest = urllib.request.Request(url+dat)
        JobRequest.add_header('cookie', str(cookie_jar))  # Pass the saved cookie into additional HTTP request
        JobResponse = urllib.request.urlopen(JobRequest)

        JobRedirect_url = JobResponse.geturl() + '&app_type=401'
        # Request the resource at the modified redirect url
        Request = urllib.request.Request(JobRedirect_url)
        Response = urllib.request.urlopen(Request)
        f = open(dat, 'wb')
        f.write(Response.read())
        f.close()
        Response.close()
    print("Files downloaded to: ", os.path.dirname(os.path.realpath(__file__)))

# ===============================================================================
# The following code block is used for HTTPS authentication
# ===============================================================================

# The user credentials that will be used to authenticate access to the data


username = "rafaeltoameh"
password = "Fc2y2%u3!@t&,Tv"

# The FULL url of the directory which contains the files you would like to bulk download
url = "https://daacdata.apps.nsidc.org/pub/DOkhotskATASETS/nsidc0192_seaice_trends_climo_v3/total-ice-area-extent/nasateam/"  # Example URL

# Create a password manager to deal with the 401 reponse that is returned from
# Earthdata Login

password_manager = urllib.request.HTTPPasswordMgrWithDefaultRealm()
password_manager.add_password(None, "https://urs.earthdata.nasa.gov", username, password)

# Create a cookie jar for storing cookies. This is used to store and return
# the session cookie given to use by the data server (otherwise it will just
# keep sending us back to Earthdata Login to authenticate).  Ideally, we
# should use a file based cookie jar to preserve cookies between runs. This
# will make it much more efficient.

cookie_jar = CookieJar()

# Install all the handlers.
opener = urllib.request.build_opener(
    urllib.request.HTTPBasicAuthHandler(password_manager),
    # urllib.request.HTTPHandler(debuglevel=1),    # Uncomment these two lines to see
    # urllib.request.HTTPSHandler(debuglevel=1),   # details of the requests/responses
    urllib.request.HTTPCookieProcessor(cookie_jar))
urllib.request.install_opener(opener)

# Create and submit the requests. There are a wide range of exceptions that
# can be thrown here, including HTTPError and URLError. These should be
# caught and handled.

# ===============================================================================
# Open a requeset to grab filenames within a directory. Print optional
# ===============================================================================

DirRequest = urllib.request.Request(url)
DirResponse = urllib.request.urlopen(DirRequest)

# Get the redirect url and append 'app_type=401'
# to do basic http auth
DirRedirect_url = DirResponse.geturl()
DirRedirect_url += '&app_type=401'

# Request the resource at the modified redirect url
DirRequest = urllib.request.Request(DirRedirect_url)
DirResponse = urllib.request.urlopen(DirRequest)

DirBody = DirResponse.read()

# Uses the HTML parser defined above to pring the content of the directory containing data
parser.feed(str(DirBody))
Files = parser.dataList

# Display the contents of the python list declared in the HTMLParser class
# print Files #Uncomment to print a list of the files

# ===============================================================================
# Call the function to download all files in url
# ===============================================================================

BatchJob(Files, cookie_jar)  # Comment out to prevent downloading to your working directory
