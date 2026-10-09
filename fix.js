const fs = require('fs');
let p = fs.readFileSync('src/app/forge/page.tsx', 'utf8');
p = p.replace(/import \{ weeks \} from/g, 'import { forgeWeeksData } from');
p = p.replace(/useState\(weeks\)/g, 'useState(forgeWeeksData)');
p = p.replace(/weeks\.map\(d =>/g, 'forgeWeeksData.map((d: any) =>');
p = p.replace(/const merged = weeks\.map/g, 'const merged = forgeWeeksData.map');
p = p.replace(/variant=\"outline\"/g, 'variant=\"ghost\"');
// Fix missing typing for maps:
p = p.replace(/weeks\.filter\(\(w\)/g, 'weeks.filter((w: any)');
p = p.replace(/weeks\.find\(\(w\)/g, 'weeks.find((w: any)');
p = p.replace(/weeks\[0\]/g, '(weeks as any)[0]');
fs.writeFileSync('src/app/forge/page.tsx', p);
