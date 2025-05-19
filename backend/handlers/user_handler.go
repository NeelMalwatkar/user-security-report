package handlers

import (
	"encoding/json"
	"net/http"

	"backend/services"
)

func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	users, err := services.LoadUsersFromCSV("users.csv")
	if err != nil {
		http.Error(w, "Error loading user data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}
