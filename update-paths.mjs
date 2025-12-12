import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'Home', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/src="\/home\/assets\/(.*?)"/g, (match, assetPath) => {
  return `src={new URL('./assets/${assetPath}', import.meta.url).href}`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated all asset paths!');
