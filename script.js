const fields = {
  customer: document.querySelector('#customer'),
  flavor: document.querySelector('#flavor'),
  qty: document.querySelector('#qty'),
  note: document.querySelector('#note'),
  message: document.querySelector('#message'),
  waBtn: document.querySelector('#waBtn'),
  copyBtn: document.querySelector('#copyBtn')
};

function buildMessage() {
  const name = fields.customer.value.trim();
  const flavor = fields.flavor.value;
  const qtyRaw = fields.qty.value.trim();
  const qty = Math.max(1, Number.parseInt(qtyRaw, 10) || 1);
  const note = fields.note.value.trim();
  const who = name ? `Soy ${name}. ` : '';
  const extra = note ? ` Nota: ${note}.` : '';
  return `Hola Ferre, ${who}quiero pedir ${qty} pizza${qty === 1 ? '' : 's'} ${flavor}.${extra}`;
}

function syncMessage() {
  const message = buildMessage();
  fields.message.textContent = message;
  fields.waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

['input', 'change'].forEach(evt => {
  document.querySelector('.order-form').addEventListener(evt, syncMessage);
});

fields.copyBtn.addEventListener('click', async () => {
  const message = buildMessage();
  try {
    await navigator.clipboard.writeText(message);
    fields.copyBtn.textContent = 'Copiado';
  } catch {
    fields.copyBtn.textContent = 'Seleccioná el mensaje';
  }
  setTimeout(() => fields.copyBtn.textContent = 'Copiar mensaje', 1600);
});

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.14 })
  : null;

document.querySelectorAll('.reveal').forEach((el) => {
  if (observer) observer.observe(el);
  else el.classList.add('is-visible');
});

syncMessage();
