package main

import (
	"fmt"
	"net/http"

	"backend/handlers"
)

func main() {
	http.HandleFunc("/api/users/", handlers.GetUsersHandler)
	fmt.Println("Server running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
