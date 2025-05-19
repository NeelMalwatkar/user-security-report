package models

type User struct {
	Name                    string `json:"name"`
	CreateDate              string `json:"create_date"`
	PasswordChangedDate     string `json:"password_changed_date"`
	LastAccessDate          string `json:"last_access_date"`
	MFAEnabled              bool   `json:"mfa_enabled"`
	DaysSincePasswordChange int    `json:"days_since_password_change"`
	DaysSinceLastAccess     int    `json:"days_since_last_access"`
}
