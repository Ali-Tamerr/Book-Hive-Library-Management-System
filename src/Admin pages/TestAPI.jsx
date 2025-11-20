import { useState } from 'react';
import axios from 'axios';

function TestAPI() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testSignup = async () => {
    setLoading(true);
    setResult('Testing...\n');
    
    const testData = {
      first_name: 'Test',
      last_name: 'User',
      email: `test${Date.now()}@example.com`,
      phone_number: '1234567890',
      password_hash: 'test123',
      role: 'User'
    };

    try {
      setResult(prev => prev + `\nSending data:\n${JSON.stringify(testData, null, 2)}\n\n`);
      
      const response = await axios.post(
        'https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api/Users',
        testData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setResult(prev => prev + `✅ SUCCESS!\nResponse: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      console.error('Full error:', error);
      setResult(prev => prev + 
        `❌ ERROR:\n` +
        `Message: ${error.message}\n` +
        `Status: ${error.response?.status || 'No status'}\n` +
        `Response Data: ${JSON.stringify(error.response?.data || 'No response data', null, 2)}\n` +
        `Request Config: ${JSON.stringify(error.config || {}, null, 2)}\n`
      );
    } finally {
      setLoading(false);
    }
  };

  const testGetUsers = async () => {
    setLoading(true);
    setResult('Testing GET...\n');
    
    try {
      const response = await axios.get(
        'https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api/Users'
      );
      setResult(prev => prev + `✅ GET Success!\nResponse: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      setResult(prev => prev + `❌ GET Error: ${error.message}\n${JSON.stringify(error.response?.data || {}, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={testGetUsers}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Test GET Users
        </button>
        
        <button
          onClick={testSignup}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Test POST Signup
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <pre className="whitespace-pre-wrap text-xs font-mono">
          {result || 'Click a button to test...'}
        </pre>
      </div>

      <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
        <h3 className="font-bold mb-2">Instructions:</h3>
        <ol className="list-decimal ml-4 space-y-1 text-sm">
          <li>Click "Test GET Users" first - this should work</li>
          <li>Click "Test POST Signup" - this will show the actual error</li>
          <li>Open DevTools (F12) → Console tab to see detailed logs</li>
          <li>Copy the error message and share it</li>
        </ol>
      </div>
    </div>
  );
}

export default TestAPI;

