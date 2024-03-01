import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const { status, data } = await axios.get(`/api/account`);

    expect(status).toBe(200);
    expect(data).toEqual({ id: 'test', name: 'test' });
  });
});
