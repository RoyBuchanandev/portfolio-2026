from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_read_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_read_projects():
    response = client.get("/api/projects")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    
    # Check schema of the first item
    project = data[0]
    assert "id" in project
    assert "title_key" in project
    assert "desc_key" in project
    assert "link" in project
