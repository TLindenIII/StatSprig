import re
import os

files_to_process = [
    '/Users/thomas/Documents/Projects/StatsTree/client/src/lib/statsData.ts',
    '/Users/thomas/Documents/Projects/StatsTree/client/src/lib/glossaryData.ts',
    '/Users/thomas/Documents/Projects/StatsTree/client/src/lib/wizardKeys.ts',
    '/Users/thomas/Documents/Projects/StatsTree/client/src/pages/Home.tsx',
    '/Users/thomas/Documents/Projects/StatsTree/client/src/pages/AllTests.tsx',
    '/Users/thomas/Documents/Projects/StatsTree/client/src/pages/Results.tsx'
]

output_file = 'website_words.txt'

def extract_strings(file_path, content):
    strings = set()
    
    # Common keys for TS/TSX data structures
    data_keys = [
        'title', 'label', 'description', 'term', 'definition', 
        'category', 'name', 'question', 'methodFamily',
        'placeholder', 'alt', 'whenToUse', 'assumptions'
    ]
    
    # 1. Capture content associated with keys: key: "value" or key: 'value'
    for key in data_keys:
        # Single quotes
        pattern_s = key + r'\s*[:=]\s*\'([^\']*)\''
        matches_s = re.findall(pattern_s, content)
        strings.update(matches_s)
        
        # Double quotes
        pattern_d = key + r'\s*[:=]\s*"([^"]*)"'
        matches_d = re.findall(pattern_d, content)
        strings.update(matches_d)
        
        # Backticks (for multiline strings in TS)
        pattern_bt = key + r'\s*[:=]\s*`([^`]*)`'
        matches_bt = re.findall(pattern_bt, content, re.DOTALL)
        strings.update([m.strip() for m in matches_bt])

    # 2. Capture array contents for specific keys (e.g. assumptions: ["A", "B"])
    # Simplified regex for array brackets [ ... ]
    # We look for a key followed by bracketed content
    array_keys = ['assumptions', 'whenToUse', 'rules', 'alternativeLinks', 'relatedTerms', 'tests']
    for key in array_keys:
        pattern = key + r'\s*[:=]\s*\[(.*?)\]'
        # re.DOTALL to match across lines
        matches = re.finditer(pattern, content, re.DOTALL)
        for match in matches:
            array_content = match.group(1)
            # Find all strings inside the array content
            items = re.findall(r'["\']([^"\']+)["\']', array_content)
            strings.update(items)
            items_bt = re.findall(r'`([^`]+)`', array_content)
            strings.update([i.strip() for i in items_bt])

    # 3. Capture JSX text content: >Some Text<
    # Exclude empty whitespace strings
    jsx_text_pattern = r'>\s*([^<>{}]+?)\s*<'
    matches_jsx = re.findall(jsx_text_pattern, content)
    strings.update([m.strip() for m in matches_jsx if m.strip()])
    
    return strings

all_extracted_words = set()

for file_path in files_to_process:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        print(f"Processing {file_path}...")
        extracted = extract_strings(file_path, content)
        
        # Filter out likely code identifiers and artifacts
        filtered = set()
        for s in extracted:
            s = s.strip()
            if not s: continue
            
            # Skip if only punctuation or digits
            if re.match(r'^[\d\s\.,;:\(\)\[\]\{\}\?\!]+$', s): continue
            
            # Skip code keywords and artifacts
            if s in ['null', 'true', 'false', 'undefined', 'useState', 'useEffect', 'useMemo', 'useCallback']: continue
            if s.startswith('const ') or s.startswith('import ') or s.startswith('export '): continue
            
            # Skip likely code snippets (containing mostly symbols or looking like function calls)
            if re.match(r'^[\w\.]+\(.*\)$', s): continue # function call like fn()
            if '=>' in s or '({' in s or '})' in s: continue
            
            # Filter out strings that are just "null" or "0" or "[]"
            if s in ['([])', '(null)', '({})']: continue
            
            # Additional heuristic: If it starts with non-letter, it's likely code artifact unless it's a number starting a sentence
            if not s[0].isalnum() and not s[0] in ['"', "'", '`']:
                 # Check if it's bullet point
                 if not s.startswith('- ') and not s.startswith('* '):
                     continue

            if len(s) < 2: continue
            
            filtered.add(s)
            
        all_extracted_words.update(filtered)
            
    except Exception as e:
        print(f"Error reading {file_path}: {e}")

with open(output_file, 'w', encoding='utf-8') as f:
    # Sort for readability
    for word in sorted(all_extracted_words, key=lambda s: s.lower()):
        f.write(word + '\n')

print(f"Extraction complete. Found {len(all_extracted_words)} unique text entries.")
