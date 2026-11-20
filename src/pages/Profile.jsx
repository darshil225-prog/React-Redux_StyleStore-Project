import React, { useState } from 'react';

function Profile() {
  const defaultProfile = {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 349-2018',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
    memberSince: 'March 2026',
  };

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('stylestore_profile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    localStorage.setItem('stylestore_profile', JSON.stringify(formData));
    setIsEditing(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
                <div className="profile-header">
          <div className="profile-avatar">
            {profile.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)
              .toUpperCase()}
          </div>
          <div className="profile-header-info">
            <h1 className="profile-title">{profile.name}</h1>
            <p className="profile-subtitle">StyleStore Valued Customer</p>
            <span className="profile-badge">Member since {profile.memberSince}</span>
          </div>
          {!isEditing && (
            <button
              type="button"
              className="edit-profile-btn"
              onClick={() => {
                setFormData(profile);
                setIsEditing(true);
              }}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {savedMessage && (
          <div className="profile-alert-success">
            ✓ Profile changes saved successfully!
          </div>
        )}

                {isEditing ? (
          <form className="profile-form" onSubmit={handleSave}>
            <h2 className="profile-section-title">Edit Personal Information</h2>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="profile-form-actions">
              <button type="submit" className="save-profile-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-profile-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details-view">
            <h2 className="profile-section-title">Personal Information</h2>

            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="info-label">Full Name</span>
                <span className="info-value">{profile.name}</span>
              </div>

              <div className="profile-info-item">
                <span className="info-label">Email Address</span>
                <span className="info-value">{profile.email}</span>
              </div>

              <div className="profile-info-item">
                <span className="info-label">Phone Number</span>
                <span className="info-value">{profile.phone}</span>
              </div>

              <div className="profile-info-item full-width">
                <span className="info-label">Default Shipping Address</span>
                <span className="info-value">{profile.address}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

