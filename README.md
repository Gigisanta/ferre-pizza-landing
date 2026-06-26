# Ferre Pizza Landing

Landing estática, sin build y sin dependencias, para un pizzero con estética de barrio + Selección Argentina.

## Inspiration Brief

- Fuente primaria: imagen enviada por Gio, con OCR detectable: “Ferre”, “promoción por mundiales”, “cada día que juega nuestra querida Selección”, precio destacado `$30.000`.
- Corrección visual v2: salir del look oscuro/gimmick y pasar a una dirección editorial de pizzería: fondo crema, tipografía serif grande, rojo tomate, carbón, tarjetas limpias y una ilustración SVG propia más controlada.
- Inspiración de referencia: pizzerías modernas priorizan ordering claro, food visual potente, menú corto, promo destacada y marca con textura local; no orbs, no glassmorphism, no 3D innecesario.
- Conversion: CTA único a pedido por WhatsApp, con generador de mensaje editable.
- Constraints: standalone HTML/CSS/JS, sin dependencias ni CDN, responsive, `prefers-reduced-motion`, semantic HTML y contraste alto.

## Local

```bash
python3 -m http.server 4173
open http://localhost:4173
```

## Deploy

Deploy directo con Vercel CLI o vía GitHub una vez conectado el repo.
