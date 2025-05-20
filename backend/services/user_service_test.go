package services_test

import (
	"os"
	"testing"

	"backend/services"
)

func TestLoadUsersFromCSV(t *testing.T) {
	csvContent := `name,create_date,password_changed_date,last_access_date,mfa_enabled
Test User,01/01/2022,01/01/2023,01/01/2024,true`

	tmpFile := "test_users.csv"
	if err := os.WriteFile(tmpFile, []byte(csvContent), 0644); err != nil {
		t.Fatalf("failed to write temp CSV: %v", err)
	}
	defer os.Remove(tmpFile)

	users, err := services.LoadUsersFromCSV(tmpFile)
	if err != nil {
		t.Fatalf("LoadUsersFromCSV returned error: %v", err)
	}

	if len(users) != 1 {
		t.Errorf("Expected 1 user, got %d", len(users))
	}

	u := users[0]
	if u.Name != "Test User" {
		t.Errorf("Expected name 'Test User', got %s", u.Name)
	}

	if !u.MFAEnabled {
		t.Errorf("Expected MFAEnabled = true")
	}

	if u.DaysSinceLastAccess <= 0 {
		t.Errorf("Expected DaysSinceLastAccess > 0, got %d", u.DaysSinceLastAccess)
	}
}
