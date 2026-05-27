import { useState } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  // 1. Centralizamos la lectura de variables de entorno al inicio del componente
  const ASESOR_NAME = import.meta.env.VITE_ASESOR_NAME || 'Asesor SURA';
  const ASESOR_WHATSAPP = import.meta.env.VITE_ASESOR_WHATSAPP;
  const DEFAULT_CITY = import.meta.env.VITE_DEFAULT_CITY || 'Villavicencio';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Plan Global');
  const [isSending, setIsSending] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: DEFAULT_CITY // Usamos la ciudad del .env como estado inicial
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openQuoteModal = (planName) => {
    if (planName) setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSending(false);
  };

  // SERVICIO DE CORREO OPTIMIZADO
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Por favor, completa los campos obligatorios para el envío.');
      return;
    }

    setIsSending(true);

    const templateParams = {
      to_name: ASESOR_NAME, // Dinámico desde .env
      from_name: formData.fullName,
      phone_number: formData.phone,
      reply_to: formData.email,
      city_location: formData.city,
      selected_plan: selectedPlan
    };

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      console.log('¡Éxito absoluto en el servidor!:', response.status, response.text);
      alert(`¡Éxito! Solicitud de cotización enviada correctamente.`);
      closeModal();
    } catch (error) {
      console.error('Error devuelto por EmailJS:', error);
      alert('Hubo un problema al procesar el envío por correo.');
      setIsSending(false);
    }
  };

  // SERVICIO DE WHATSAPP OPTIMIZADO
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Por favor ingresa tu nombre y número telefónico.');
      return;
    }

    const fallbackMessage = `Hola ${ASESOR_NAME}, soy ${formData.fullName}. Deseo recibir una cotización del *${selectedPlan}* para la ciudad de ${formData.city}.`;
    const encodedMessage = encodeURIComponent(fallbackMessage);
    
    window.open(`https://wa.me/${ASESOR_WHATSAPP}?text=${encodedMessage}`, '_blank');
    closeModal();
  };

  return (
    <div className="landing-app">
      {/* Header */}
      <header className="main-header">
        <div className="container header-container">
          <div className="brand-wrapper">
            <h1 className="brand-title">Asesor <span>SURA</span></h1>
            <span className="brand-subtitle">{ASESOR_NAME}</span>
          </div>
          <button className="btn-primary" onClick={() => openQuoteModal('Plan Global')}>
            <i className="fa-solid fa-file-invoice-dollar"></i> Cotiza Ahora
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1>
              Hola, soy <strong>{ASESOR_NAME}</strong>, asesor exclusivo de <strong>Seguros SURA</strong> y esta es mi página web para poder llegar a más personas y familias.
            </h1>
            <p className="hero-disclaimer">
              <i className="fa-solid fa-shield-halved"></i> En ningún momento se solicitará dineros, brindamos asesoría y solo se solicita la información básica para realizar la cotización.
            </p>
            <div>
              <button className="btn-primary" onClick={() => openQuoteModal('Plan Global')}>
                Cotiza tu Póliza Ahora <i className="fa-solid fa-chevron-right" style={{fontSize: '12px'}}></i>
              </button>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
            <div className="illustration-placeholder">
              <div className="illustration-icon">
                <i className="fa-solid fa-user-nurse"></i>
              </div>
              <h3 style={{fontWeight: 600, fontSize: '18px'}}>Protección Integral Familiar</h3>
              <p style={{fontSize: '13px', opacity: 0.9, marginTop: '8px'}}>Tu salud custodiada por expertos de primer nivel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="section-title-block">
            <h2>Protege tu salud y la de tu familia con los mejores seguros SURA</h2>
            <p>Cotiza, compara y elige la mejor póliza de salud.</p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-box p-blue"><i className="fa-solid fa-map-location-dot"></i></div>
              <h3>Cobertura Nacional</h3>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon-box p-cyan"><i className="fa-solid fa-hospital"></i></div>
              <h3>Clínicas Aliadas</h3>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon-box p-red"><i className="fa-solid fa-heart-pulse"></i></div>
              <h3>Hospitalización y Cirugías</h3>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon-box p-orange"><i className="fa-solid fa-user-doctor"></i></div>
              <h3>Atención Especializada</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Pólizas */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title-block">
            <h2>Pólizas de Salud SURA</h2>
            <p>Estructuras de cobertura premium adaptadas a tus necesidades.</p>
          </div>

          <div className="plans-grid">
            <div className="plan-card">
              <div className="plan-header global">
                <h3>Plan Global</h3>
                <p>Completo y sin fronteras</p>
              </div>
              <div className="plan-body">
                <div className="plan-feature-highlight">Hospitalización + Especialistas</div>
                <div>
                  <div className="plan-price-label">Desde</div>
                  <div className="plan-price-value">$ XXX.XXX</div>
                </div>
                <button className="btn-plan-action" onClick={() => openQuoteModal('Plan Global')}>
                  Cotizar <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="plan-card">
              <div className="plan-header clasico">
                <h3>Plan Clásico</h3>
                <p>Equilibrio y tradición de respaldo</p>
              </div>
              <div className="plan-body">
                <div className="plan-feature-highlight">Consultas + Medicinas</div>
                <div>
                  <div className="plan-price-label">Desde</div>
                  <div className="plan-price-value">$ XXX.XXX</div>
                </div>
                <button className="btn-plan-action" onClick={() => openQuoteModal('Plan Clásico')}>
                  Cotizar <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="plan-card">
              <div className="plan-header todos">
                <h3>Plan de Salud para Todos</h3>
                <p>Preferencial (Anterior Plan Complementario)</p>
              </div>
              <div className="plan-body">
                <div className="plan-feature-highlight">Protección Integral Familiar</div>
                <div>
                  <div className="plan-price-label">Desde</div>
                  <div className="plan-price-value">$ XXX.XXX</div>
                </div>
                <button className="btn-plan-action" onClick={() => openQuoteModal('Plan de Salud para Todos')}>
                  Cotizar <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding section-bg-light">
        <div className="container">
          <div className="section-title-block">
            <h2>Beneficios de tu Seguro SURA</h2>
            <p>Valores agregados inmediatos al adquirir tu póliza.</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon" style={{color: '#0033a0'}}><i className="fa-solid fa-circle-plus"></i></div>
              <p>Red médica premium</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{color: '#00a3e0'}}><i className="fa-solid fa-kit-medical"></i></div>
              <p>Urgencias exclusivas</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{color: '#43b02a'}}><i className="fa-solid fa-hand-holding-medical"></i></div>
              <p>Salud preventiva</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{color: '#ff9e1b'}}><i className="fa-solid fa-tooth"></i></div>
              <p>Servicios odontología</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{color: '#0033a0'}}><i className="fa-solid fa-user-nurse"></i></div>
              <p>Ambulatorios particulares</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{color: '#da291c'}}><i className="fa-solid fa-microscope"></i></div>
              <p>Exámenes y laboratorios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="section-padding">
        <div className="container comparison-split-grid">
          <div className="vs-card">
            <h3 className="vs-title">Póliza de Salud vs Medicina Prepagada</h3>
            <p className="vs-description">
              Con la póliza de salud dependemos menos de las EPS, cubrimos más servicios y no tendremos límites hospitalarios.
            </p>
            <button className="btn-secondary" onClick={() => openQuoteModal('Comparativa Salud vs Prepagada')}>
              <i className="fa-solid fa-file-contract"></i> Quiero mi Cotización
            </button>
          </div>

          <div className="testimonials-stack">
            <div className="testimonial-bubble">
              <p className="testimonial-text">"Excelente atención. Fue rápido y claro."</p>
              <div className="testimonial-author">— Carla M.</div>
            </div>
            <div className="testimonial-bubble">
              <p className="testimonial-text">"El mejor seguro para mi familia."</p>
              <div className="testimonial-author">— Juan R.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container footer-content">
          <div className="footer-info">
            <h4>Asesor SURA - {ASESOR_NAME}</h4>
            <p>Asesoría exclusiva en soluciones de salud integral.</p>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* MODAL INTERACTIVO */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Solicitar Cotización</h3>
              <p>Estás cotizando: <strong>{selectedPlan}</strong></p>
              <button type="button" className="modal-close-btn" onClick={closeModal}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <form className="modal-body" onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input 
                  type="text" 
                  name="fullName"
                  className="form-control" 
                  placeholder="Ej. Juan Pérez" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Correo Electrónico *</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-control" 
                  placeholder="ejemplo@correo.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Celular / WhatsApp *</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="form-control" 
                  placeholder="Ej. 3101234567" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Ciudad</label>
                <input 
                  type="text" 
                  name="city"
                  className="form-control" 
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="service-actions-grid">
                <button 
                  type="button" 
                  className="btn-service-submit btn-whatsapp-submit"
                  onClick={handleWhatsAppSubmit}
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp
                </button>
                
                <button 
                  type="submit" 
                  className="btn-service-submit btn-email-submit"
                  disabled={isSending}
                >
                  <i className={isSending ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-envelope"}></i> 
                  {isSending ? ' Enviando...' : ' Enviar Correo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;