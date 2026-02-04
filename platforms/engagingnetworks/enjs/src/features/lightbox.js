export function Lightbox() {
  return {
    id: 'lightbox',
    register({ on, emit }) {
      on('enjs:ready', () => {
        emit('enjs:lightbox:api', {
          open(html) {
            const o = document.createElement('div');
            o.className = 'enjs-lightbox';
            o.innerHTML = '<div class="bg"></div><div class="panel">' + html + '</div>';
            o.onclick = (e) => e.target.className === 'bg' && o.remove();
            document.body.appendChild(o);
          }
        });
      });
    }
  };
}
