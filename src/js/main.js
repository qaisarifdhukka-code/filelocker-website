// FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o=>{
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Headline scramble-to-resolve animation (one-time, on load)
  (function(){
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = document.getElementById('scrambleHeadline');
    if(!el || reduceMotion) return;

    const finalHTML = el.innerHTML;
    const finalText = el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let frame = 0;
    const totalFrames = 22;

    // Build plain text nodes to scramble, then restore markup at the end
    el.style.opacity = '0';
    requestAnimationFrame(()=>{
      el.style.transition = 'opacity .3s ease';
      el.style.opacity = '1';
      const interval = setInterval(()=>{
        frame++;
        const progress = frame / totalFrames;
        let out = '';
        for(let i=0;i<finalText.length;i++){
          const ch = finalText[i];
          if(ch === ' ' || ch === '\n'){ out += ch; continue; }
          if(i / finalText.length < progress){
            out += ch;
          } else {
            out += chars[Math.floor(Math.random()*chars.length)];
          }
        }
        el.textContent = out;
        if(frame >= totalFrames){
          clearInterval(interval);
          el.innerHTML = finalHTML;
        }
      }, 28);
    });
  })();