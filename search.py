import urllib.request
import re

try:
    html = urllib.request.urlopen('https://www.youtube.com/results?search_query=American+Dream+Mall+broll').read().decode('utf-8')
    ids = re.findall(r'\"videoId\":\"([^\"]+)\"', html)
    # Filter out common youtube short/UI ids
    unique_ids = list(set([vid for vid in ids if len(vid) == 11]))
    print(unique_ids[:5])
except Exception as e:
    print(e)
