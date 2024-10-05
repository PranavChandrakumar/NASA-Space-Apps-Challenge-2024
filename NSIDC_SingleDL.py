'''
 This script, NSIDC_SingleDL.py, grabs a singular file from a complete HTTPS URL.

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

# ===============================================================================
#  The following code block is used for authentication for HTTPS server
# ===============================================================================

#  The user credentials that will be used to authenticate access to the data
username = ""
password = "YOUR_PASSWORD"

#  The FULL url of the file we wish to retrieve
url = "https://daacdata.apps.nsidc.org/pub/DATASETS/nsidc0192_seaice_trends_climo_v3/total-ice-area-extent/nasateam/gsfc.nasateam.month.anomaly.area.1978-2021.s"  # Example URL

#  Strip the filename from the URL
file_name = url.split('/')[-1]

#  Create a password manager to deal with the 401 reponse that is returned from
#  Earthdata Login

password_manager = urllib.request.HTTPPasswordMgrWithDefaultRealm()
password_manager.add_password(None, "https://urs.earthdata.nasa.gov", username, password)

#  Create a cookie jar for storing cookies. This is used to store and return
#  the session cookie given to use by the data server (otherwise it will just
#  keep sending us back to Earthdata Login to authenticate).  Ideally, we
# should use a file based cookie jar to preserve cookies between runs. This
# will make it much more efficient.

cookie_jar = CookieJar()

# Install all the handlers.
opener = urllib.request.build_opener(
    urllib.request.HTTPBasicAuthHandler(password_manager),
    # urllib.request.HTTPHandler(debuglevel=1),    #  Uncomment these two lines to see
    # urllib.request.HTTPSHandler(debuglevel=1),   #  details of the requests/responses
    urllib.request.HTTPCookieProcessor(cookie_jar))
urllib.request.install_opener(opener)

# Create and submit the requests. There are a wide range of exceptions that
# can be thrown here, including HTTPError and URLError. These should be
# caught and handled.

# ===============================================================================
#  Open a request for the data, and download a specific file
# ===============================================================================

DataRequest = urllib.request.Request(url)
DataRequest.add_header('Cookie', str(cookie_jar))  # Passthe saved cookie into a second HTTP request
DataResponse = urllib.request.urlopen(DataRequest)

# Get the redirect url and append 'app_type=401'
# to do basic http auth
DataRedirect_url = DataResponse.geturl()
DataRedirect_url += '&app_type=401'

# Request the resource at the modified redirect url
DataRequest = urllib.request.Request(DataRedirect_url)
DataResponse = urllib.request.urlopen(DataRequest)

# Print out the result (not a good idea with binary data!)
DataBody = DataResponse.read()

# Save file to working directory
file_ = open(file_name, 'wb')
file_.write(DataBody)
file_.close()

print("Your file, ", file_name, " has downloaded to ", os.path.dirname(os.path.realpath(__file__)))
