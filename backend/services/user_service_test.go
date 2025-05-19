package services_test

import (
	"os"
	"testing"

	"backend/services"
)

func TestLoadUsersFromCSV(t *testing.T) {
	// Create temporary test CSV
	csvContent := `name,create_date,password_changed_date,last_access_date,mfa_enabled
Test User,Jan 1 2020,Jan 1 2021,Jan 1 2022,true`

	tmpFile := "test_users.csv"
	err := os.WriteFile(tmpFile, []byte(csvContent), 0644)
	if err != nil {
		t.Fatalf("Failed to write test CSV: %v", err)
	}
	defer os.Remove(tmpFile) // Clean up

	users, err := services.LoadUsersFromCSV(tmpFile)
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if len(users) != 1 {
		t.Errorf("Expected 1 user, got %d", len(users))
	}
	if users[0].Name != "Test User" {
		t.Errorf("Expected name 'Test User', got %s", users[0].Name)
	}
	if users[0].MFAEnabled != true {
		t.Errorf("Expected MFAEnabled to be true")
	}
	if users[0].DaysSinceLastAccess <= 0 {
		t.Errorf("Expected computed DaysSinceLastAccess > 0")
	}
}
