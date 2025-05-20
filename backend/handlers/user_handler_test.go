package handlers_test

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"backend/handlers"
)

func TestGetUsersHandler(t *testing.T) {
	// Create a minimal test CSV for handler
	csv := `name,create_date,password_changed_date,last_access_date,mfa_enabled
Test User,01/01/2022,01/01/2023,01/01/2024,true`
	err := os.WriteFile("users.csv", []byte(csv), 0644)
	if err != nil {
		t.Fatalf("failed to write test CSV: %v", err)
	}
	defer os.Remove("users.csv")

	req := httptest.NewRequest("GET", "/api/users", nil)
	w := httptest.NewRecorder()

	handlers.GetUsersHandler(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status 200 OK, got %d", resp.StatusCode)
	}
}
