const fs = require('fs');
let code = fs.readFileSync('src/components/Companion.tsx', 'utf-8');

// Replace double slash n (\\n) with single slash n (\n) across all instances where it was mistakenly double escaped
code = code.replace(/\\\\n/g, '\\n');
// Fix the literal cat backslashes
code = code.replace(/\\\\_\\\\/g, '\\\\_/\\\\'); // Not exact, let's just do it directly:
fs.writeFileSync('src/components/Companion.tsx', code);
