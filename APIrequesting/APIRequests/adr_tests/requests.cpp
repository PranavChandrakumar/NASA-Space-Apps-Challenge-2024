#include <iostream>
#include <string>
#include <curl/curl.h>
#include <nlohmann/json.hpp>
#include <fstream>

// Function to read environment variables
std::string get_env_var(const std::string& var) {
    const char* val = std::getenv(var.c_str());
    return val == nullptr ? "" : std::string(val);
}

// Function to handle curl response
size_t writeCallback(void* contents, size_t size, size_t nmemb, std::string* s) {
    size_t newLength = size * nmemb;
    s->append((char*)contents, newLength);
    return newLength;
}

int main() {
    // Load environment variables
    std::string user = get_env_var("NASA_USERNAME");
    std::string password = get_env_var("NASA_PASSWORD");

    // Initialize CURL for login
    CURL* curl = curl_easy_init();
    CURLcode res;
    std::string readBuffer;
    
    if(curl) {
        std::string api = "https://appeears.earthdatacloud.nasa.gov/api/login";
        
        curl_easy_setopt(curl, CURLOPT_URL, api.c_str());
        curl_easy_setopt(curl, CURLOPT_USERNAME, user.c_str());
        curl_easy_setopt(curl, CURLOPT_PASSWORD, password.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writeCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);

        // Perform request
        res = curl_easy_perform(curl);
        
        if(res != CURLE_OK)
            std::cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << std::endl;

        // Cleanup
        curl_easy_cleanup(curl);
    }

    // Parse JSON response to get the token
    nlohmann::json token_response = nlohmann::json::parse(readBuffer);
    std::string token = token_response["token"];

    // Create a task request using a JSON object
    nlohmann::json task = {
        {"task_type", "point"},
        {"task_name", "Landsat 8 and 9 SR Bands 1-7"},
        {"params", {
            {"dates", {{{"startDate", "01-01-2020"}, {"endDate", "01-31-2022"}}}},
            {"layers", {
                {{"layer", "SR_B1"}, {"product", "L09.002"}},
                {{"layer", "SR_B2"}, {"product", "L09.002"}},
                {{"layer", "SR_B3"}, {"product", "L09.002"}},
                {{"layer", "SR_B4"}, {"product", "L09.002"}},
                {{"layer", "SR_B5"}, {"product", "L09.002"}},
                {{"layer", "SR_B6"}, {"product", "L09.002"}},
                {{"layer", "SR_B7"}, {"product", "L09.002"}}
            }},
            {"coordinates", {{{"latitude", 43.58045658045632}, {"longitude", -79.65329465329421}}}}
        }}
    };

    // Print the task details
    std::cout << "Task created: " << task.dump(4) << std::endl;

    // Perform a GET request to retrieve task status
    curl = curl_easy_init();
    if(curl) {
        std::string task_url = "https://appeears.earthdatacloud.nasa.gov/api/task/5ee9917c-3b3d-4458-ba87-01fa7bc61392";
        readBuffer.clear();
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, ("Authorization: Bearer " + token).c_str());
        
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_URL, task_url.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writeCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);

        // Perform request
        res = curl_easy_perform(curl);
        
        if(res != CURLE_OK)
            std::cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << std::endl;
        
        // Cleanup
        curl_easy_cleanup(curl);
        curl_slist_free_all(headers);
    }

    // Parse the task response
    nlohmann::json task_response = nlohmann::json::parse(readBuffer);
    std::cout << "Task Response: " << task_response.dump(4) << std::endl;

    return 0;
}