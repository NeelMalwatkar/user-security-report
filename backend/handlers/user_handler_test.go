package handlers_test

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"backend/handlers"
)

func TestGetUsersHandler(t *testing.T) {
	// Prepare a test CSV
	csv := `name,create_date,password_changed_date,last_access_date,mfa_enabled
Test User,Jan 1 2020,Jan 1 2021,Jan 1 2022,true`
	err := os.WriteFile("users.csv", []byte(csv), 0644)
	if err != nil {
		t.Fatalf("could not create test users.csv: %v", err)
	}
	defer os.Remove("users.csv")

	req := httptest.NewRequest("GET", "/api/users", nil)
	rec := httptest.NewRecorder()

	handlers.GetUsersHandler(rec, req)

	resp := rec.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status 200 OK, got %d", resp.StatusCode)
	}
	contentType := resp.Header.Get("Content-Type")
	if contentType != "application/json" {
		t.Errorf("Expected Content-Type application/json, got %s", contentType)
	}
}
