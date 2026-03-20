const SUPABASE_URL = 'https://cxneizyrxluczxfcicxr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_g15X72ZI5jySSgszXLZ41Q_biXzec1p';

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Dynamic Header Background on Scroll
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
        }
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mock Interaction Feedback
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .card-link-icon');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Action triggered: ' + btn.textContent.trim());
                
                // If it's the "Assinar Agora" button, scroll to newsletter
                if (btn.textContent.trim().toLowerCase().includes('assinar')) {
                    const newsletter = document.getElementById('newsletter');
                    if (newsletter) {
                        newsletter.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });

    // Supabase Integration for Lead Form
    const leadForm = document.getElementById('lead-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('btn-submit-lead');

    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // UI States
            submitBtn.classList.add('btn-loading');
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';

            const formData = new FormData(leadForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                source: 'landing_page'
            };

            try {
                const response = await fetch('https://cxneizyrxluczxfcicxr.supabase.co/rest/v1/leads', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': 'sb_publishable_g15X72ZI5jySSgszXLZ41Q_biXzec1p',
                        'Authorization': 'Bearer sb_publishable_g15X72ZI5jySSgszXLZ41Q_biXzec1p',
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    formFeedback.textContent = 'Inscrição realizada com sucesso! Bem-vindo.';
                    formFeedback.classList.add('success');
                    leadForm.reset();
                } else {
                    throw new Error('Falha na submissão');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formFeedback.textContent = 'Ocorreu um erro. Por favor, tente novamente.';
                formFeedback.classList.add('error');
            } finally {
                submitBtn.classList.remove('btn-loading');
            }
        });
    }

    // Dynamic Editions Loading
    async function fetchEditions() {
        try {
            // Buscamos da View 'v_editions' que já resolve o link da imagem (upload ou link fixo)
            const response = await fetch(`${SUPABASE_URL}/rest/v1/v_editions?order=date_published.desc`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            const editions = await response.json();
            renderEditions(editions);
        } catch (error) {
            console.error('Error fetching editions:', error);
            const grid = document.getElementById('editions-grid');
            if (grid) grid.innerHTML = '<p class="error">Erro ao carregar edições. Tente novamente mais tarde.</p>';
        }
    }

    function renderEditions(editions) {
        const grid = document.getElementById('editions-grid');
        if (!grid) return;

        grid.innerHTML = '';
        
        const featured = editions.find(e => e.is_featured);
        if (featured) {
            updateFeaturedHero(featured);
        }

        // Render non-featured editions in the grid
        const previousEditions = editions.filter(e => !e.is_featured);
        
        if (previousEditions.length === 0) {
            grid.innerHTML = '<p class="info">Nenhuma edição anterior encontrada.</p>';
            return;
        }

        previousEditions.forEach(ed => {
            const article = document.createElement('article');
            article.className = 'edition-card reveal';
            article.innerHTML = `
                <div class="card-media skeleton">
                    <img src="${ed.final_image_url}" 
                         alt="${ed.title}" 
                         loading="lazy"
                         onload="this.classList.add('loaded'); this.parentElement.classList.remove('skeleton');"
                         onerror="this.src='https://via.placeholder.com/400x500?text=Imagem+Indispon%C3%ADvel'; this.parentElement.classList.remove('skeleton');">
                </div>
                <div class="card-content">
                    <span class="card-date">${ed.date_published || ''}</span>
                    <h3 class="card-title">${ed.title}</h3>
                    <p class="card-executive">${ed.executive_name}${ed.executive_role ? ', ' + ed.executive_role : ''}</p>
                    <div class="card-links">
                        <a href="#" class="card-link">Visualizar</a>
                        <a href="${ed.video_url || '#'}" class="card-link-icon" target="_blank">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25a29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(article);
            
            // Re-observe for reveal animation
            revealObserver.observe(article);
        });
    }

    function updateFeaturedHero(ed) {
        const titleEl = document.getElementById('featured-title');
        const descEl = document.getElementById('featured-desc');
        const imgEl = document.getElementById('hero-image');
        const videoBtn = document.getElementById('btn-video-featured');

        if (titleEl) titleEl.innerHTML = `${ed.executive_name}: <br>${ed.title}`;
        if (descEl) descEl.textContent = ed.subtitle || '';
        
        if (imgEl) {
            imgEl.style.opacity = '0';
            imgEl.style.transition = 'opacity 0.8s ease';
            imgEl.src = ed.final_image_url;
            imgEl.onload = () => {
                imgEl.style.opacity = '1';
            };
        }
        
        if (videoBtn && ed.video_url && ed.video_url !== '#') {
            videoBtn.href = ed.video_url;
            videoBtn.style.display = 'flex';
        }
    }

    // Initial fetch
    fetchEditions();
});
