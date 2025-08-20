// Xibo API Client
class XiboApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.authToken = null;
  }

  async login(username, password) {
    const response = await fetch(`${this.baseUrl}/api/authorize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();
    this.authToken = data.token;
    return data;
  }

  async getLayouts() {
    if (!this.authToken) throw new Error('Not authenticated');
    
    const response = await fetch(`${this.baseUrl}/api/layout`, {
      headers: { 'Authorization': `Bearer ${this.authToken}` }
    });

    if (!response.ok) throw new Error('Failed to fetch layouts');
    return await response.json();
  }

  async getSchedule(displayId) {
    if (!this.authToken) throw new Error('Not authenticated');
    
    const response = await fetch(`${this.baseUrl}/api/schedule/${displayId}`, {
      headers: { 'Authorization': `Bearer ${this.authToken}` }
    });

    if (!response.ok) throw new Error('Failed to fetch schedule');
    return await response.json();
  }

  async getMedia(mediaId) {
    if (!this.authToken) throw new Error('Not authenticated');
    
    const response = await fetch(`${this.baseUrl}/api/media/${mediaId}`, {
      headers: { 'Authorization': `Bearer ${this.authToken}` }
    });

    if (!response.ok) throw new Error('Failed to fetch media');
    return await response.blob();
  }
}

export default XiboApiClient;