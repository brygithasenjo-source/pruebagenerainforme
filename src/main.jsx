import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Brain, ClipboardList, FileText, Activity, Sparkles, UserRound, School, Home, Download, Copy, AlertTriangle, BarChart3, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import './styles.css';

const LEVELS = [
  { id: 0, name: 'Nivel 0 · Línea base', desc: 'Observación inicial, habilidad ausente o información insuficiente.' },
  { id: 1, name: 'Nivel 1 · Inicial', desc: 'La habilidad aparece con apoyo intenso o en momentos muy puntuales.' },
  { id: 2, name: 'Nivel 2 · Básico', desc: 'La habilidad aparece con apoyo físico, verbal o visual frecuente.' },
  { id: 3, name: 'Nivel 3 · Intermedio', desc: 'La habilidad aparece con apoyo moderado y mayor consistencia.' },
  { id: 4, name: 'Nivel 4 · Avanzado', desc: 'La habilidad es más independiente y puede generalizarse.' },
];

const AREAS = {
  conducta: {
    title: 'Modificación de conducta',
    icon: '🧩', color: 'purple',
    fields: ['Conducta objetivo', 'Frecuencia', 'Intensidad', 'Duración aproximada', 'Detonantes', 'Consecuencias actuales', 'Función probable de la conducta', 'Estrategias usadas', 'Tolerancia a la espera', 'Seguimiento de instrucciones', 'Conducta alternativa a enseñar'],
    objectives: [
      ['Observar línea base de la conducta objetivo.', 'Identificar detonantes y consecuencias frecuentes.', 'Registrar frecuencia, duración e intensidad.'],
      ['Reducir intensidad de la conducta con apoyo directo.', 'Aceptar una instrucción simple con apoyo.', 'Iniciar una conducta alternativa con guía del adulto.'],
      ['Permanecer en actividad estructurada por periodos breves.', 'Esperar turnos con apoyo visual o temporizador.', 'Pedir ayuda, pausa o cambio mediante conducta alternativa.'],
      ['Seguir instrucciones de dos pasos con menor apoyo.', 'Tolerar pequeñas demoras sin crisis intensa.', 'Usar estrategias de calma con guía verbal.'],
      ['Autorregularse ante frustraciones leves.', 'Generalizar conductas adaptativas en casa y colegio.', 'Elegir una conducta alternativa adecuada ante el detonante.']
    ]
  },
  lenguaje: {
    title: 'Terapia de lenguaje', icon: '💬', color: 'blue',
    fields: ['Tipo de comunicación actual', 'Comprensión de instrucciones', 'Expresión de necesidades', 'Vocabulario funcional', 'Contacto visual comunicativo', 'Imitación verbal', 'Imitación motora', 'Respuesta al nombre', 'Intención comunicativa', 'Comunicación espontánea', 'Turnos conversacionales', 'Articulación', 'Apoyos visuales usados'],
    objectives: [
      ['Observar forma actual de comunicación: llanto, gesto, mirada, palabra o pictograma.', 'Registrar respuesta al nombre y señales comunicativas.', 'Identificar apoyos que facilitan la comunicación.'],
      ['Responder al nombre con apoyo del adulto.', 'Imitar sonidos, gestos o movimientos simples.', 'Comunicar necesidades mediante gesto, señalamiento o pictograma.'],
      ['Comprender instrucciones simples de un paso.', 'Solicitar ayuda, descanso u objeto deseado.', 'Aumentar vocabulario funcional de objetos, acciones y necesidades.'],
      ['Seguir instrucciones de dos pasos.', 'Usar frases cortas para expresar necesidades o preferencias.', 'Participar en turnos comunicativos breves.'],
      ['Mantener intercambios conversacionales simples.', 'Expresar emociones, ideas y experiencias.', 'Generalizar habilidades comunicativas en casa, colegio y espacios sociales.']
    ]
  },
  cognitiva: {
    title: 'Terapia cognitiva', icon: '🧠', color: 'violet',
    fields: ['Atención sostenida', 'Atención conjunta', 'Memoria de trabajo', 'Seguimiento de consignas', 'Flexibilidad cognitiva', 'Resolución de problemas', 'Reconocimiento emocional', 'Comprensión causa-consecuencia', 'Planificación', 'Organización', 'Control inhibitorio', 'Tolerancia al error'],
    objectives: [
      ['Observar tiempo de atención y respuesta ante consignas.', 'Identificar apoyos que facilitan el aprendizaje.', 'Registrar tolerancia al error y cambios de actividad.'],
      ['Mantener atención en una actividad breve con apoyo.', 'Responder a consignas simples y concretas.', 'Reconocer emociones básicas en imágenes o expresiones.'],
      ['Seguir secuencias simples de actividades.', 'Clasificar objetos por color, forma, tamaño o categoría.', 'Identificar causa y consecuencia en situaciones cotidianas.'],
      ['Mantener atención durante tareas estructuradas por más tiempo.', 'Resolver problemas simples con apoyo visual.', 'Aceptar cambios pequeños dentro de una actividad.'],
      ['Planificar pasos para completar una tarea.', 'Usar estrategias para manejar errores o frustración.', 'Aplicar habilidades cognitivas en contextos escolares y cotidianos.']
    ]
  },
  ocupacional: {
    title: 'Terapia ocupacional', icon: '✋', color: 'pink',
    fields: ['Perfil sensorial', 'Respuesta a sonidos', 'Respuesta a texturas', 'Respuesta a movimiento', 'Respuesta a luces', 'Búsqueda sensorial', 'Evitación sensorial', 'Motricidad fina', 'Coordinación óculo-manual', 'Uso de pinza', 'Alimentación', 'Vestido', 'Higiene', 'Juego funcional', 'Autonomía en rutinas'],
    objectives: [
      ['Observar respuesta sensorial y nivel de autonomía.', 'Identificar estímulos que regulan o desorganizan.', 'Registrar habilidades de motricidad fina y rutinas diarias.'],
      ['Tolerar estímulos sensoriales breves con apoyo.', 'Explorar materiales con diferentes texturas gradualmente.', 'Participar en actividades de motricidad fina con asistencia.'],
      ['Mejorar agarre, pinza y manipulación de objetos.', 'Seguir rutinas simples de autonomía con apoyo visual.', 'Participar en juegos funcionales estructurados.'],
      ['Realizar vestido, higiene o alimentación con menor apoyo.', 'Regularse mediante estrategias sensoriales previamente enseñadas.', 'Mejorar coordinación óculo-manual en tareas escolares o lúdicas.'],
      ['Completar rutinas de autonomía con supervisión mínima.', 'Adaptarse a estímulos sensoriales en contextos cotidianos.', 'Generalizar independencia en casa y colegio.']
    ]
  },
  fisica: {
    title: 'Terapia física', icon: '🏃', color: 'teal',
    fields: ['Control postural', 'Tono muscular', 'Equilibrio', 'Coordinación bilateral', 'Marcha', 'Saltos', 'Carrera', 'Escaleras', 'Fuerza', 'Resistencia', 'Motricidad gruesa', 'Lateralidad', 'Esquema corporal', 'Nivel de independencia motora'],
    objectives: [
      ['Observar control postural, equilibrio y desplazamiento.', 'Registrar apoyos físicos requeridos.', 'Identificar actividades motoras que evita.'],
      ['Mejorar control postural en actividades básicas.', 'Mantener equilibrio con apoyo físico o visual.', 'Participar en ejercicios motores simples con guía.'],
      ['Mejorar coordinación bilateral mediante actividades lúdicas.', 'Subir y bajar superficies bajas con apoyo.', 'Realizar desplazamientos motores simples con mayor seguridad.'],
      ['Mantener equilibrio dinámico durante juegos motores.', 'Mejorar fuerza y resistencia en actividades funcionales.', 'Coordinar movimientos de brazos y piernas en secuencias simples.'],
      ['Ejecutar circuitos motores con menor asistencia.', 'Participar en juegos físicos grupales con mayor coordinación.', 'Generalizar habilidades motoras en colegio, casa y espacios recreativos.']
    ]
  }
};

const sampleHistory = [
  { session: 'S1', regulacion: 3, participacion: 4, frustracion: 2 },
  { session: 'S2', regulacion: 4, participacion: 5, frustracion: 3 },
  { session: 'S3', regulacion: 5, participacion: 6, frustracion: 4 },
  { session: 'S4', regulacion: 6, participacion: 7, frustracion: 5 },
];

function scoreToLevel(scores) {
  const avg = Object.values(scores).reduce((a,b)=>a+Number(b||0),0) / Math.max(Object.values(scores).length,1);
  if (avg < 2) return 0;
  if (avg < 4) return 1;
  if (avg < 6) return 2;
  if (avg < 8) return 3;
  return 4;
}

function App(){
  const [selectedArea, setSelectedArea] = useState('conducta');
  const [patient, setPatient] = useState({ code: 'NK-001', age: '6 años', grade: 'Inicial / 1° grado', reason: 'Dificultades de regulación, comunicación funcional y adaptación a rutinas.', strengths: 'Interés por juegos visuales, buena respuesta a refuerzo positivo, curiosidad por actividades estructuradas.', needs: 'Anticipación, apoyos visuales, regulación emocional y comunicación funcional.' });
  const [scores, setScores] = useState({ independencia: 3, apoyo: 4, generalizacion: 2, consistencia: 4 });
  const [form, setForm] = useState({ objective: '', activity: '', observations: '', home: '', school: '', next: '' });
  const [fieldValues, setFieldValues] = useState({});
  const area = AREAS[selectedArea];
  const level = scoreToLevel(scores);
  const progress = Math.round((level/4)*100);
  const activeObjective = area.objectives[level][0];

  const report = useMemo(()=> generateReport({patient, area, level, activeObjective, form, fieldValues, scores}), [patient, area, level, activeObjective, form, fieldValues, scores]);

  function copyReport(){ navigator.clipboard?.writeText(report); alert('Informe copiado.'); }
  function downloadReport(){
    const blob = new Blob([report], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=`informe-${patient.code || 'paciente'}.txt`; a.click(); URL.revokeObjectURL(url);
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><Brain size={26}/></div><div><h1>NeuroKids</h1><p>Clinical Dashboard</p></div></div>
      <nav>
        {Object.entries(AREAS).map(([key,a])=><button key={key} className={`nav-btn ${selectedArea===key?'active':''}`} onClick={()=>setSelectedArea(key)}><span>{a.icon}</span>{a.title}</button>)}
      </nav>
      <div className="ethic-card"><AlertTriangle size={18}/><p>La IA genera borradores de apoyo. Todo debe ser revisado, editado y validado por el profesional responsable.</p></div>
    </aside>

    <main className="main">
      <section className="hero-card">
        <div><p className="eyebrow">Dashboard para consultorios infantiles</p><h2>Seguimiento por áreas, objetivos progresivos e informes editables.</h2><p>Diseñado para niños neurodiversos: formulario por área, nivel actual, objetivo activo, avance visual y borrador de informe.</p></div>
        <div className="hero-actions"><button onClick={copyReport}><Copy size={17}/> Copiar informe</button><button className="primary" onClick={downloadReport}><Download size={17}/> Descargar</button></div>
      </section>

      <section className="grid two">
        <Card title="Perfil del niño" icon={<UserRound/>}>
          <div className="form-grid">
            <Input label="Código / iniciales" value={patient.code} onChange={v=>setPatient({...patient, code:v})}/>
            <Input label="Edad" value={patient.age} onChange={v=>setPatient({...patient, age:v})}/>
            <Input label="Grado escolar" value={patient.grade} onChange={v=>setPatient({...patient, grade:v})}/>
            <Input label="Motivo de consulta" value={patient.reason} onChange={v=>setPatient({...patient, reason:v})} wide/>
            <Input label="Fortalezas" value={patient.strengths} onChange={v=>setPatient({...patient, strengths:v})} wide/>
            <Input label="Necesidades de apoyo" value={patient.needs} onChange={v=>setPatient({...patient, needs:v})} wide/>
          </div>
        </Card>
        <Card title="Nivel actual calculado" icon={<Activity/>}>
          <div className="level-box"><span className="area-emoji">{area.icon}</span><h3>{area.title}</h3><p>{LEVELS[level].name}</p><div className="progress"><div style={{width:`${progress}%`}}/></div><small>{progress}% de avance estimado en esta área</small></div>
          <div className="score-grid">
            <Range label="Independencia" value={scores.independencia} onChange={v=>setScores({...scores, independencia:v})}/>
            <Range label="Necesita menos apoyo" value={scores.apoyo} onChange={v=>setScores({...scores, apoyo:v})}/>
            <Range label="Generalización" value={scores.generalizacion} onChange={v=>setScores({...scores, generalizacion:v})}/>
            <Range label="Consistencia" value={scores.consistencia} onChange={v=>setScores({...scores, consistencia:v})}/>
          </div>
        </Card>
      </section>

      <section className="grid two">
        <Card title={`Formulario · ${area.title}`} icon={<ClipboardList/>}>
          <div className="field-list">
            {area.fields.map(f=><Input key={f} label={f} value={fieldValues[f]||''} onChange={v=>setFieldValues({...fieldValues, [f]:v})}/>) }
          </div>
        </Card>
        <Card title="Objetivos progresivos sugeridos" icon={<CheckCircle2/>}>
          <div className="objectives">
            {LEVELS.map(l=><div key={l.id} className={`objective-level ${l.id===level?'current':''}`}><h4>{l.name}</h4><p>{l.desc}</p><ul>{area.objectives[l.id].map(o=><li key={o}>{o}</li>)}</ul></div>)}
          </div>
        </Card>
      </section>

      <section className="grid two">
        <Card title="Registro de sesión" icon={<Sparkles/>}>
          <Input label="Objetivo trabajado hoy" value={form.objective} onChange={v=>setForm({...form, objective:v})}/>
          <Input label="Actividad realizada" value={form.activity} onChange={v=>setForm({...form, activity:v})}/>
          <Input label="Observaciones de sesión" value={form.observations} onChange={v=>setForm({...form, observations:v})} textarea/>
          <div className="mini-grid"><Input label="Recomendación para casa" value={form.home} onChange={v=>setForm({...form, home:v})}/><Input label="Recomendación para colegio" value={form.school} onChange={v=>setForm({...form, school:v})}/></div>
          <Input label="Próximo objetivo" value={form.next} onChange={v=>setForm({...form, next:v})}/>
        </Card>
        <Card title="Dashboard visual" icon={<BarChart3/>}>
          <div className="chart"><ResponsiveContainer width="100%" height={210}><LineChart data={sampleHistory}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="session"/><YAxis domain={[0,10]}/><Tooltip/><Line type="monotone" dataKey="regulacion" strokeWidth={3}/><Line type="monotone" dataKey="participacion" strokeWidth={3}/><Line type="monotone" dataKey="frustracion" strokeWidth={3}/></LineChart></ResponsiveContainer></div>
          <div className="chart"><ResponsiveContainer width="100%" height={170}><BarChart data={[{name:'Indep.', value:scores.independencia},{name:'Apoyo', value:scores.apoyo},{name:'Gener.', value:scores.generalizacion},{name:'Consist.', value:scores.consistencia}]}><XAxis dataKey="name"/><YAxis domain={[0,10]}/><Tooltip/><Bar dataKey="value" radius={[10,10,0,0]}/></BarChart></ResponsiveContainer></div>
        </Card>
      </section>

      <section className="grid one">
        <Card title="Informe automático editable" icon={<FileText/>}>
          <textarea className="report" value={report} readOnly />
          <div className="hero-actions bottom"><button onClick={copyReport}><Copy size={17}/> Copiar informe</button><button className="primary" onClick={downloadReport}><Download size={17}/> Descargar TXT</button></div>
        </Card>
      </section>
    </main>
  </div>
}

function generateReport({patient, area, level, activeObjective, form, fieldValues, scores}){
  const filled = Object.entries(fieldValues).filter(([_,v])=>String(v).trim()).map(([k,v])=>`- ${k}: ${v}`).join('
') || '- Sin datos específicos completados todavía.';
  return `INFORME TERAPÉUTICO EDITABLE · NEUROKIDS DASHBOARD

1. DATOS GENERALES
Código / iniciales: ${patient.code || 'No consignado'}
Edad: ${patient.age || 'No consignada'}
Grado escolar: ${patient.grade || 'No consignado'}
Motivo de consulta: ${patient.reason || 'No consignado'}

2. ÁREA TRABAJADA
Área: ${area.title}
Nivel actual estimado: ${LEVELS[level].name}
Descripción del nivel: ${LEVELS[level].desc}
Objetivo activo sugerido: ${form.objective || activeObjective}

3. INFORMACIÓN RELEVANTE DEL FORMULARIO
${filled}

4. OBSERVACIONES DE SESIÓN
Actividad realizada: ${form.activity || 'No consignada'}
Observaciones: ${form.observations || 'Pendiente de completar por el profesional.'}

5. INDICADORES DE AVANCE
Independencia: ${scores.independencia}/10
Reducción de apoyo requerido: ${scores.apoyo}/10
Generalización: ${scores.generalizacion}/10
Consistencia: ${scores.consistencia}/10

6. FORTALEZAS Y NECESIDADES
Fortalezas observadas: ${patient.strengths || 'No consignadas'}
Necesidades de apoyo: ${patient.needs || 'No consignadas'}

7. RECOMENDACIONES
Para casa: ${form.home || 'Mantener rutinas claras, anticipar cambios y reforzar positivamente los avances observados.'}
Para colegio: ${form.school || 'Usar instrucciones breves, apoyos visuales y tiempos de transición anticipados.'}

8. PRÓXIMOS PASOS
${form.next || area.objectives[Math.min(level+1,4)][0]}

9. NOTA ÉTICA
Este documento es un borrador generado a partir de la información ingresada por el profesional. Debe ser revisado, editado y validado antes de ser entregado. No sustituye evaluación clínica, diagnóstico, juicio profesional ni intervención terapéutica.`;
}

function Card({title, icon, children}){ return <section className="card"><div className="card-header"><div className="card-icon">{icon}</div><h3>{title}</h3></div>{children}</section> }
function Input({label, value, onChange, textarea, wide}){ return <label className={wide?'wide':''}><span>{label}</span>{textarea?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder="Escribe aquí..."/>:<input value={value} onChange={e=>onChange(e.target.value)} placeholder="Completar..."/>}</label> }
function Range({label, value, onChange}){ return <label className="range"><span>{label}: <b>{value}/10</b></span><input type="range" min="0" max="10" value={value} onChange={e=>onChange(Number(e.target.value))}/></label> }

createRoot(document.getElementById('root')).render(<App/>);
