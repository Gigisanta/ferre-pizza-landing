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
  const who = name ? `soy ${name} y ` : '';
  const extra = note ? ` Nota: ${note}.` : '';
  return `Hola Ferre, ${who}quiero pedir ${qty} pizza${qty === 1 ? '' : 's'} ${flavor}.${extra}`;
}

function syncMessage() {
  const message = buildMessage();
  fields.message.textContent = message;
  fields.waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

const orderForm = document.querySelector('.order-form');
['input', 'change'].forEach((eventName) => {
  orderForm.addEventListener(eventName, syncMessage);
});

fields.copyBtn.addEventListener('click', async () => {
  const message = buildMessage();
  try {
    await navigator.clipboard.writeText(message);
    fields.copyBtn.textContent = 'Mensaje copiado';
  } catch {
    fields.copyBtn.textContent = 'Copialo del recuadro';
  }
  setTimeout(() => {
    fields.copyBtn.textContent = 'Copiar mensaje';
  }, 1600);
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.menu-order').forEach((button) => {
  button.addEventListener('click', () => {
    fields.flavor.value = button.dataset.flavor || fields.flavor.value;
    syncMessage();
    document.querySelector('#pedido').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    fields.qty.focus({ preventScroll: true });
  });
});

const observer = !prefersReducedMotion && 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' })
  : null;

document.querySelectorAll('.reveal').forEach((el) => {
  if (observer) observer.observe(el);
  else el.classList.add('is-visible');
});

syncMessage();
