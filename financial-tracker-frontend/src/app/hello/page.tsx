"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Hello() {
    // State to store the API response
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Construct the request config object
        const requestConfig = {
            method: 'post',
            url: 'http://localhost:8080/login', // Adjust the URL to your backend setup
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                username: "red", // Replace with actual username
                password: "green"  // Replace with actual password
            }
        };

        axios(requestConfig)
            .then((response) => {
                // handle success
                console.log("Response from Java API:", response.data);
                setData(response.data); // Store the response data in state
                // Save the JWT token to local storage
                localStorage.setItem('jwtToken', response.data); // Adjust property name based on your API response
            })
            .catch((error) => {
                // handle error
                console.error("Error calling Java API:", error);
                setError(error); // Store the error in state
            });
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Render the stored response or error message
    return (
        <div>
            <h1>Response from API:</h1>
            {error ? (
                <p>Error: {error}</p> // Display error message if any
            ) : data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre> // Format and display the response data
            ) : (
                <p>
                    Loading...
                    </p> // Display a loading message while fetching data
            )}
        </div>
    );
}
