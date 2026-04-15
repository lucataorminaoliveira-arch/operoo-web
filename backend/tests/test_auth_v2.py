"""
Backend API Tests for Operoo - Iteration 5
Tests: Registration assigns 'admin' role, Auth endpoints, Role verification
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials
ADMIN_EMAIL = "admin@operoo.com"
ADMIN_PASSWORD = "OperooAdmin123!"
STAFF_EMAIL = "giulia@operoo.com"
STAFF_PASSWORD = "Staff123!"


@pytest.fixture(scope="module")
def api_client():
    """Shared requests session with cookies"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


class TestHealthCheck:
    """Health check endpoint tests"""
    
    def test_api_root_returns_200(self, api_client):
        """Test API root endpoint is accessible"""
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Operoo API"
        print("✓ API root endpoint accessible")


class TestRegistrationAssignsAdminRole:
    """Test that new user registration assigns 'admin' role (NEW FEATURE)"""
    
    def test_register_new_user_gets_admin_role(self, api_client):
        """Test registering a new user assigns 'admin' role"""
        test_email = f"TEST_newadmin_{uuid.uuid4().hex[:8]}@operoo.com"
        
        response = api_client.post(f"{BASE_URL}/api/auth/register", json={
            "name": "New Admin User",
            "email": test_email,
            "password": "TestPassword123!"
        })
        assert response.status_code == 200, f"Registration failed: {response.text}"
        
        data = response.json()
        assert "user_id" in data
        assert data["email"] == test_email.lower()
        assert data["name"] == "New Admin User"
        # KEY TEST: Registration should now assign 'admin' role
        assert data["role"] == "admin", f"Expected role='admin', got role='{data.get('role')}'"
        print(f"✓ New user registration assigns 'admin' role: {data['email']}")
        
        # Verify via /auth/me that role persists
        me_response = api_client.get(f"{BASE_URL}/api/auth/me")
        assert me_response.status_code == 200
        me_data = me_response.json()
        assert me_data["role"] == "admin", f"Expected role='admin' in /auth/me, got '{me_data.get('role')}'"
        print("✓ /auth/me confirms admin role persisted")
    
    def test_register_duplicate_email_fails(self, api_client):
        """Test registering with existing email fails"""
        test_email = f"TEST_duplicate_{uuid.uuid4().hex[:8]}@operoo.com"
        
        # First registration
        response1 = api_client.post(f"{BASE_URL}/api/auth/register", json={
            "name": "First User",
            "email": test_email,
            "password": "TestPassword123!"
        })
        assert response1.status_code == 200
        
        # Second registration with same email
        response2 = api_client.post(f"{BASE_URL}/api/auth/register", json={
            "name": "Second User",
            "email": test_email,
            "password": "DifferentPassword123!"
        })
        assert response2.status_code == 400
        data = response2.json()
        assert "already registered" in data["detail"].lower()
        print("✓ Duplicate email registration returns 400")


class TestAdminLogin:
    """Admin login tests with seeded credentials"""
    
    def test_admin_login_success(self, api_client):
        """Test admin login with correct credentials"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        
        data = response.json()
        assert "user_id" in data
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        print(f"✓ Admin login successful: {data['email']}, role: {data['role']}")
    
    def test_auth_me_returns_admin_user(self, api_client):
        """Test /auth/me returns admin user data after login"""
        # Login first
        api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        
        me_response = api_client.get(f"{BASE_URL}/api/auth/me")
        assert me_response.status_code == 200
        
        data = me_response.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "password_hash" not in data
        print("✓ /auth/me returns correct admin user data")


class TestStaffLogin:
    """Staff login tests"""
    
    def test_staff_login_success(self, api_client):
        """Test staff login with correct credentials"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": STAFF_EMAIL,
            "password": STAFF_PASSWORD
        })
        assert response.status_code == 200, f"Staff login failed: {response.text}"
        
        data = response.json()
        assert data["email"] == STAFF_EMAIL
        assert data["role"] == "staff"
        print(f"✓ Staff login successful: {data['email']}, role: {data['role']}")
    
    def test_auth_me_returns_staff_user(self, api_client):
        """Test /auth/me returns staff user data after login"""
        # Login first
        api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": STAFF_EMAIL,
            "password": STAFF_PASSWORD
        })
        
        me_response = api_client.get(f"{BASE_URL}/api/auth/me")
        assert me_response.status_code == 200
        
        data = me_response.json()
        assert data["email"] == STAFF_EMAIL
        assert data["role"] == "staff"
        print("✓ /auth/me returns correct staff user data")


class TestLogout:
    """Logout functionality tests"""
    
    def test_logout_clears_session(self, api_client):
        """Test logout clears auth cookies"""
        # Login
        api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        
        # Logout
        logout_response = api_client.post(f"{BASE_URL}/api/auth/logout")
        assert logout_response.status_code == 200
        print("✓ Logout successful")


class TestProtectedRoutes:
    """Protected route access tests"""
    
    def test_auth_me_without_login_returns_401(self):
        """Test /auth/me without authentication returns 401"""
        fresh_session = requests.Session()
        fresh_session.headers.update({"Content-Type": "application/json"})
        
        response = fresh_session.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
        print("✓ /auth/me without auth returns 401")


class TestTokenRefresh:
    """Token refresh functionality tests"""
    
    def test_refresh_token_works(self, api_client):
        """Test token refresh endpoint"""
        # Login first
        api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        
        refresh_response = api_client.post(f"{BASE_URL}/api/auth/refresh")
        assert refresh_response.status_code == 200
        print("✓ Token refresh successful")


class TestInputValidation:
    """Input validation tests"""
    
    def test_login_missing_email(self, api_client):
        """Test login with missing email"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "password": "somepassword"
        })
        assert response.status_code == 422
        print("✓ Missing email returns 422")
    
    def test_login_missing_password(self, api_client):
        """Test login with missing password"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": "test@example.com"
        })
        assert response.status_code == 422
        print("✓ Missing password returns 422")
    
    def test_register_missing_name(self, api_client):
        """Test registration with missing name"""
        response = api_client.post(f"{BASE_URL}/api/auth/register", json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        })
        assert response.status_code == 422
        print("✓ Missing name returns 422")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
