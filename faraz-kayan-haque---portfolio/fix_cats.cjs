const fs = require('fs');
let code = fs.readFileSync('src/components/Companion.tsx', 'utf-8');

const regexNeofetch = /<pre>\{\`   \/\\\\_\/\\\\(\s*)\( o\.o \)(\s*)> \^ < \`\}<\/pre>/g;
code = code.replace(regexNeofetch, "<pre>{`   /\\\\_/\\\\\n  ( o.o )\n   > ^ < `}</pre>");

const regexSuki = /<pre>\{\` \/\\\\_\/\\\\n\( o\.o \)\\n > \^ <\`\}<\/pre>/g;
code = code.replace(regexSuki, "<pre>{` /\\\\_/\\\\\n( o.o )\n > ^ <`}</pre>");
code = code.replace(/<pre>\{\` \/\\\\_\/\\\\(\s*)\( o\.o \)(\s*)> \^ <\`\}<\/pre>/g, "<pre>{` /\\\\_/\\\\\n( o.o )\n > ^ <`}</pre>");

fs.writeFileSync('src/components/Companion.tsx', code);
