import{r as i,j as e,f as o}from"./index-CJb8dl2p.js";function u(){const[d,t]=i.useState(""),[l,r]=i.useState(!1),c=async()=>{r(!0),t(`Testing...
`);const a={first_name:"Test",last_name:"User",email:`test${Date.now()}@example.com`,phone_number:"1234567890",password_hash:"test123",role:"User"};try{t(n=>n+`
Sending data:
${JSON.stringify(a,null,2)}

`);const s=await o.post("https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api/Users",a,{headers:{"Content-Type":"application/json"}});t(n=>n+`✅ SUCCESS!
Response: ${JSON.stringify(s.data,null,2)}`)}catch(s){console.error("Full error:",s),t(n=>n+`❌ ERROR:
Message: ${s.message}
Status: ${s.response?.status||"No status"}
Response Data: ${JSON.stringify(s.response?.data||"No response data",null,2)}
Request Config: ${JSON.stringify(s.config||{},null,2)}
`)}finally{r(!1)}},p=async()=>{r(!0),t(`Testing GET...
`);try{const a=await o.get("https://library-management-system-bqdmafdqfdamdefv.uaenorth-01.azurewebsites.net/api/Users");t(s=>s+`✅ GET Success!
Response: ${JSON.stringify(a.data,null,2)}`)}catch(a){t(s=>s+`❌ GET Error: ${a.message}
${JSON.stringify(a.response?.data||{},null,2)}`)}finally{r(!1)}};return e.jsxs("div",{className:"p-8 max-w-4xl mx-auto",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"API Test Page"}),e.jsxs("div",{className:"flex gap-4 mb-4",children:[e.jsx("button",{onClick:p,disabled:l,className:"bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50",children:"Test GET Users"}),e.jsx("button",{onClick:c,disabled:l,className:"bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50",children:"Test POST Signup"})]}),e.jsx("div",{className:"bg-gray-100 p-4 rounded",children:e.jsx("pre",{className:"whitespace-pre-wrap text-xs font-mono",children:d||"Click a button to test..."})}),e.jsxs("div",{className:"mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded",children:[e.jsx("h3",{className:"font-bold mb-2",children:"Instructions:"}),e.jsxs("ol",{className:"list-decimal ml-4 space-y-1 text-sm",children:[e.jsx("li",{children:'Click "Test GET Users" first - this should work'}),e.jsx("li",{children:'Click "Test POST Signup" - this will show the actual error'}),e.jsx("li",{children:"Open DevTools (F12) → Console tab to see detailed logs"}),e.jsx("li",{children:"Copy the error message and share it"})]})]})]})}export{u as default};
