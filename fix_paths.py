from pathlib import Path
import re
p = Path(r'c:\Express Safari\index.html')
text = p.read_text(encoding='utf-8')
text = text.replace('href="../css/style.css"', 'href="css/style.css"')
text = text.replace('src="../assets/images/', 'src="assets/images/')
text = text.replace('src="../js/main.js"', 'src="js/main.js"')
text = re.sub(r'src="C:\\Express Safari\\assets\\([^"\\]+)"', r'src="assets/\\1"', text)
text = text.replace('\\', '/')
p.write_text(text, encoding='utf-8')
print('Updated index.html paths')
