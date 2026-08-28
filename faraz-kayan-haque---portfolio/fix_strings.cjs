const fs = require('fs');
let code = fs.readFileSync('src/components/Companion.tsx', 'utf-8');

code = code.replace(/<pre>\{\`   \/\\\\\\\\_\/\\\\\\\\\\\\n  \( o\.o \)\\\\n   > \^ < \`\}<\/pre>/g, `<pre>{\`   /\\\\_/\\\\\\n  ( o.o )\\n   > ^ < \`}</pre>`);
code = code.replace(/<pre>\{\` \/\\\\\\\\_\/\\\\\\\\\\\\n\( o\.o \)\\\\n > \^ <\`\}<\/pre>/g, `<pre>{\` /\\\\_/\\\\\\n( o.o )\\n > ^ <\`}</pre>`);

code = code.replace(/"If it works, don't touch it\.\\\\n\\\\nActually, that's terrible advice\.",/g, '"If it works, don\'t touch it.\\n\\nActually, that\'s terrible advice.",');

code = code.replace(/"SUKI\(1\)\\\\n\\\\nNAME\\\\n    suki — orange cat\\\\n\\\\nDESCRIPTION\\\\n    A highly qualified terminal supervisor\.\\\\n\\\\nBUGS\\\\n    Demands food\."/g, '"SUKI(1)\\n\\nNAME\\n    suki — orange cat\\n\\nDESCRIPTION\\n    A highly qualified terminal supervisor.\\n\\nBUGS\\n    Demands food."');

code = code.replace(/"MATRIX\(1\)\\\\n\\\\nNAME\\\\n    matrix — digital rain\\\\n\\\\nDESCRIPTION\\\\n    Take the red pill\.\\\\n\\\\nBUGS\\\\n    May contain agents\."/g, '"MATRIX(1)\\n\\nNAME\\n    matrix — digital rain\\n\\nDESCRIPTION\\n    Take the red pill.\\n\\nBUGS\\n    May contain agents."');

code = code.replace(/"SUDO\(8\)\\\\n\\\\nNAME\\\\n    sudo — execute a command as another user\\\\n\\\\nDESCRIPTION\\\\n    You have no power here\."/g, '"SUDO(8)\\n\\nNAME\\n    sudo — execute a command as another user\\n\\nDESCRIPTION\\n    You have no power here."');

code = code.replace(/"HACK\(1\)\\\\n\\\\nNAME\\\\n    hack — breach the mainframe\\\\n\\\\nDESCRIPTION\\\\n    Hollywood hacking simulator\."/g, '"HACK(1)\\n\\nNAME\\n    hack — breach the mainframe\\n\\nDESCRIPTION\\n    Hollywood hacking simulator."');

code = code.replace(/"Permission denied\.\\\\n\\\\nYou are not sandwich-certified\."/g, '"Permission denied.\\n\\nYou are not sandwich-certified."');

code = code.replace(/'GOT AN IDEA\?\\\\n\\\\nWhat should I build\?'/g, "'GOT AN IDEA?\\n\\nWhat should I build?'");

fs.writeFileSync('src/components/Companion.tsx', code);
