import os
import zipfile
import re
import json

def get_docx_text(path):
    try:
        with zipfile.ZipFile(path) as docx:
            if 'word/document.xml' not in docx.namelist():
                return ""
            xml_content = docx.read('word/document.xml').decode('utf-8')
            # Extract text from XML tags
            text = re.sub(r'<[^>]+>', '', xml_content)
            return text
    except Exception as e:
        return f"Error reading {path}: {str(e)}"

docs_dir = os.path.join(os.getcwd(), 'docs_contexto')
if not os.path.exists(docs_dir):
    print(json.dumps({"error": "Directory not found"}))
    exit()

results = {}
for filename in os.listdir(docs_dir):
    if filename.endswith('.docx'):
        file_path = os.path.join(docs_dir, filename)
        content = get_docx_text(file_path)
        # Simple cleanup
        content = content.replace('\n', ' ').strip()
        results[filename] = content[:10000] # Limit size to avoid huge outputs

with open('context_output.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("Done")
