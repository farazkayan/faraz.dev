const fs = require('fs');
let code = fs.readFileSync('src/components/Companion.tsx', 'utf-8');

code = code.replace(/<pre>\{\`   \/\\\\_\/\\\\/g, "<pre>{`   /\\\\\\\\_/\\\\\\\\");
code = code.replace(/<pre>\{\` \/\\\\_\/\\\\/g, "<pre>{` /\\\\\\\\_/\\\\\\\\");

fs.writeFileSync('src/components/Companion.tsx', code);
