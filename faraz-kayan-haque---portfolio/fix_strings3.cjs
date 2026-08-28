const fs = require('fs');
let code = fs.readFileSync('src/components/Companion.tsx', 'utf-8');

code = code.replace(/<pre>\{\`   \/\\\\_\/\\\\n  \( o\.o \)\\n   > \^ < \`\}<\/pre>/g, `<pre>{\`   /\\\\_/\\\\
  ( o.o )
   > ^ < \`}</pre>`);

code = code.replace(/<pre>\{\` \/\\\\_\/\\\\n\( o\.o \)\\n > \^ <\`\}<\/pre>/g, `<pre>{\` /\\\\_/\\\\
( o.o )
 > ^ <\`}</pre>`);

fs.writeFileSync('src/components/Companion.tsx', code);
