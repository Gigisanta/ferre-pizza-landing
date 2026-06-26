from html.parser import HTMLParser
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
html = (root / 'index.html').read_text(encoding='utf-8')
css = (root / 'styles.css').read_text(encoding='utf-8')
js = (root / 'script.js').read_text(encoding='utf-8')

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set(); self.links = []; self.imgs = []; self.h1 = 0
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if 'id' in d: self.ids.add(d['id'])
        if tag == 'a' and 'href' in d: self.links.append(d['href'])
        if tag == 'img': self.imgs.append(d)
        if tag == 'h1': self.h1 += 1

p = Parser(); p.feed(html)
errors = []
if p.h1 != 1: errors.append(f'expected one h1, got {p.h1}')
for href in p.links:
    if href.startswith('#') and href[1:] not in p.ids:
        errors.append(f'broken anchor {href}')
for img in p.imgs:
    if not img.get('alt'):
        errors.append('image without alt')
for required in ['prefers-reduced-motion', '@media (max-width: 880px)', '.skip-link', 'IntersectionObserver']:
    if required not in (css + js + html):
        errors.append(f'missing {required}')
for path in ['assets/hero-pizza.svg','assets/promo-mundiales.jpg', 'assets/promo-mundiales.webp', 'assets/og-card.svg', 'assets/favicon.svg']:
    if not (root / path).exists():
        errors.append(f'missing asset {path}')
if re.search(r'https?://(fonts|cdn)\.', html + css + js):
    errors.append('unexpected CDN dependency')
if errors:
    raise SystemExit('\n'.join(errors))
print('ok: semantic anchors, images, assets, responsive hooks, reduced motion, no CDN dependencies')
