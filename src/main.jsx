import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const AREAS = {
  conducta: {
    name: "Modificación de conducta",
    icon: "🧩",
    color: "#7c3aed",
    fields: [
      "Conducta objetivo",
      "Frecuencia",
      "Intensidad",
      "Duración",
      "Detonantes",
      "Función probable de la conducta",
      "Estrategias usadas",
      "Conducta alternativa a enseñar"
    ],
    objectives: {
      0: [
        "Observar línea base de la conducta.",
        "Identificar detonantes frecuentes.",
        "Registrar frecuencia, intensidad y duración."
      ],
      1: [
        "Reducir intensidad de la conducta con apoyo directo.",
        "Aceptar una instrucción simple con apoyo.",
        "Reconocer señales previas de desregulación."
      ],
      2: [
        "Permanecer en actividad estructurada por periodos breves.",
        "Esperar turnos con apoyo visual.",
        "Usar una conducta alternativa para pedir ayuda o pausa."
      ],
      3: [
        "Seguir instrucciones de dos pasos con menor apoyo.",
        "Tolerar pequeñas demoras.",
        "Usar estrategias de calma con guía del adulto."
      ],
      4: [
        "Autorregularse ante frustraciones leves.",
        "Generalizar conductas adaptativas en casa y colegio.",
        "Elegir una conducta alternativa adecuada."
      ]
    }
  },
  lenguaje: {
    name: "Terapia de lenguaje",
    icon: "💬",
    color: "#2563eb",
    fields: [
      "Tipo de comunicación actual",
      "Comprensión de instrucciones",
      "Expresión de necesidades",
      "Vocabulario funcional",
      "Respuesta al nombre",
      "Intención comunicativa",
      "Comunicación espontánea",
      "Turnos conversacionales"
    ],
    objectives: {
      0: [
        "Observar la forma actual de comunicación.",
        "Registrar si usa llanto, gesto, mirada, palabra o pictograma.",
        "Identificar apoyos comunicativos efectivos."
      ],
      1: [
        "Responder al nombre con apoyo.",
        "Imitar sonidos, gestos o movimientos simples.",
        "Comunicar necesidades mediante gesto, señalamiento o pictograma."
      ],
      2: [
        "Comprender instrucciones simples de un paso.",
        "Solicitar ayuda, descanso u objeto deseado.",
        "Aumentar vocabulario funcional."
      ],
      3: [
        "Seguir instrucciones de dos pasos.",
        "Usar frases cortas para expresar necesidades.",
        "Participar en turnos comunicativos breves."
      ],
      4: [
        "Mantener intercambios conversacionales simples.",
        "Expresar emociones, ideas y experiencias.",
        "Generalizar habilidades comunicativas en casa y colegio."
      ]
    }
  },
  cognitiva: {
    name: "Terapia cognitiva",
    icon: "🧠",
    color: "#0891b2",
    fields: [
      "Atención sostenida",
      "Atención conjunta",
      "Memoria de trabajo",
      "Seguimiento de consignas",
      "Flexibilidad cognitiva",
      "Resolución de problemas",
      "Reconocimiento emocional",
      "Tolerancia al error"
    ],
    objectives: {
      0: [
        "Observar nivel de atención y respuesta a consignas.",
        "Identificar estilo de aprendizaje.",
        "Registrar apoyos que facilitan la participación."
      ],
      1: [
        "Mantener atención en una actividad breve.",
        "Responder a consignas simples.",
        "Reconocer emociones básicas en imágenes."
      ],
      2: [
        "Seguir secuencias simples.",
        "Clasificar objetos por color, forma o categoría.",
        "Identificar causa y consecuencia."
      ],
      3: [
        "Mantener atención durante tareas estructuradas.",
        "Resolver problemas simples con apoyo visual.",
        "Aceptar cambios pequeños dentro de una actividad."
      ],
      4: [
        "Planificar pasos para completar una tarea.",
        "Usar estrategias ante errores o frustración.",
        "Aplicar habilidades cognitivas en contextos cotidianos."
      ]
    }
  },
  ocupacional: {
    name: "Terapia ocupacional",
    icon: "✋",
    color: "#db2777",
    fields: [
      "Perfil sensorial",
      "Respuesta a sonidos",
      "Respuesta a texturas",
      "Respuesta al movimiento",
      "Motricidad fina",
      "Coordinación óculo-manual",
      "Autonomía en rutinas",
      "Nivel de independencia"
    ],
    objectives: {
      0: [
        "Observar perfil sensorial y nivel de autonomía.",
        "Identificar estímulos que facilitan o dificultan la participación.",
        "Registrar tolerancia a materiales y rutinas."
      ],
      1: [
        "Tolerar estímulos sensoriales breves.",
        "Explorar materiales con diferentes texturas.",
        "Participar en actividades de motricidad fina con asistencia."
      ],
      2: [
        "Mejorar agarre, pinza y manipulación de objetos.",
        "Seguir rutinas simples con apoyo visual.",
        "Participar en juegos funcionales estructurados."
      ],
      3: [
        "Realizar vestido, higiene o alimentación con menor apoyo.",
        "Regularse mediante estrategias sensoriales enseñadas.",
        "Mejorar coordinación óculo-manual."
      ],
      4: [
        "Completar rutinas de autonomía con supervisión mínima.",
        "Adaptarse a estímulos sensoriales cotidianos.",
        "Generalizar independencia en casa y colegio."
      ]
    }
  },
  fisica: {
    name: "Terapia física",
    icon: "🏃",
    color: "#ea580c",
    fields: [
      "Control postural",
      "Tono muscular",
      "Equilibrio",
      "Coordinación bilateral",
      "Marcha",
      "Fuerza",
      "Resistencia",
      "Independencia motora"
    ],
    objectives: {
      0: [
        "Observar línea base motora.",
        "Identificar apoyos físicos requeridos.",
        "Registrar actividades motoras que evita o disfruta."
      ],
      1: [
        "Mejorar control postural en actividades básicas.",
        "Mantener equilibrio con apoyo.",
        "Participar en ejercicios motores simples con guía."
      ],
      2: [
        "Mejorar coordinación bilateral.",
        "Subir y bajar superficies bajas con apoyo.",
        "Realizar desplazamientos simples con mayor seguridad."
      ],
      3: [
        "Mantener equilibrio dinámico durante juegos motores.",
        "Mejorar fuerza y resistencia funcional.",
        "Coordinar movimientos en secuencias simples."
      ],
      4: [
        "Ejecutar circuitos motores con menor asistencia.",
        "Participar en juegos físicos grupales.",
        "Generalizar habilidades motoras en casa, colegio y espacios recreativos."
      ]
    }
  }
};

const LEVELS = {
  0: "Línea base",
  1: "Inicial",
  2: "Básico",
  3: "Intermedio",
  4: "Avanzado"
};

function App() {
  const [selectedArea, setSelectedArea] = useState("conducta");
  const [level, setLevel] = useState(1);

  const [child, setChild] = useState({
    name: "Niño/a 01",
    age: "6 años",
    grade: "Inicial",
    reason: "Dificultades de regulación, comunicación y adaptación escolar",
    diagnosis: "No especificado",
    strengths: "Interés por juegos visuales, buena respuesta a rutinas anticipadas",
    supportNeeds: "Apoyo en comunicación funcional, regulación emocional y tolerancia a cambios"
  });

  const [areaForm, setAreaForm] = useState({});
  const [session, setSession] = useState({
    date: "",
    objective: "",
    activities: "",
    participation: 5,
    regulation: 5,
    frustration: 5,
    observations: "",
    home: "",
    school: "",
    next: ""
  });

  const area = AREAS[selectedArea];

  const activeObjectives = useMemo(() => {
    return area.objectives[level] || [];
  }, [area, level]);

  const progress = Math.round(((Number(level) + 1) / 5) * 100);

  function updateChild(field, value) {
    setChild((prev) => ({ ...prev, [field]: value }));
  }

  function updateAreaForm(field, value) {
    setAreaForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateSession(field, value) {
    setSession((prev) => ({ ...prev, [field]: value }));
  }

  function generateReport() {
    const completedFields = area.fields
      .map((field) => `- ${field}: ${areaForm[field] || "No especificado"}`)
      .join("\n");

    return `
INFORME TERAPÉUTICO EDITABLE

Datos generales:
Paciente: ${child.name}
Edad: ${child.age}
Grado escolar: ${child.grade}
Motivo de consulta: ${child.reason}
Diagnóstico previo: ${child.diagnosis}

Área trabajada:
${area.name}

Nivel actual:
${LEVELS[level]}

Porcentaje estimado de avance:
${progress}%

Fortalezas observadas:
${child.strengths}

Necesidades de apoyo:
${child.supportNeeds}

Formulario del área:
${completedFields}

Objetivos sugeridos según el nivel actual:
${activeObjectives.map((obj) => `- ${obj}`).join("\n")}

Registro de sesión:
Fecha: ${session.date || "No especificada"}
Objetivo de sesión: ${session.objective || "No especificado"}
Actividades realizadas: ${session.activities || "No especificadas"}
Participación: ${session.participation}/10
Regulación: ${session.regulation}/10
Tolerancia a la frustración: ${session.frustration}/10

Observaciones clínicas:
${session.observations || "No especificadas"}

Recomendaciones para casa:
${session.home || "No especificadas"}

Recomendaciones para colegio:
${session.school || "No especificadas"}

Próximo objetivo:
${session.next || activeObjectives[0] || "No especificado"}

Nota ética:
Este informe es un borrador generado a partir de la información ingresada por el profesional. Debe ser revisado, editado y validado por el profesional responsable. No reemplaza evaluación clínica, diagnóstico ni juicio profesional.
`.trim();
  }

  const [report, setReport] = useState("");

  function handleGenerateReport() {
    setReport(generateReport());
  }

  function copyReport() {
    navigator.clipboard.writeText(report);
    alert("Informe copiado");
  }

  function downloadReport() {
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "informe-neurokids.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandIcon">NK</div>
          <div>
            <h1>NeuroKids</h1>
            <p>Clinical Dashboard</p>
          </div>
        </div>

        <p className="sideText">
          Formularios por área, objetivos progresivos e informes editables para
          niños neurodiversos.
        </p>

        <div className="areaMenu">
          {Object.entries(AREAS).map(([key, item]) => (
            <button
              key={key}
              className={selectedArea === key ? "areaBtn active" : "areaBtn"}
              onClick={() => {
                setSelectedArea(key);
                setAreaForm({});
                setReport("");
              }}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>

        <div className="ethicBox">
          <strong>Nota ética</strong>
          <p>
            La IA no diagnostica ni reemplaza al profesional. Solo organiza
            información y genera borradores editables.
          </p>
        </div>
      </aside>

      <section className="content">
        <header className="hero">
          <div>
            <span className="tag">IA para psicólogos</span>
            <h2>Dashboard terapéutico para niños neurodiversos</h2>
            <p>
              Registra áreas, selecciona nivel de avance y genera informes
              profesionales editables para padres, colegio o seguimiento clínico.
            </p>
          </div>

          <div className="heroCard">
            <span>Área activa</span>
            <strong style={{ color: area.color }}>{area.icon} {area.name}</strong>
            <p>Nivel: {LEVELS[level]}</p>
          </div>
        </header>

        <section className="grid two">
          <Card title="Perfil del niño" emoji="👦">
            <div className="formGrid">
              <Input label="Nombre o código" value={child.name} onChange={(v) => updateChild("name", v)} />
              <Input label="Edad" value={child.age} onChange={(v) => updateChild("age", v)} />
              <Input label="Grado escolar" value={child.grade} onChange={(v) => updateChild("grade", v)} />
              <Input label="Diagnóstico previo" value={child.diagnosis} onChange={(v) => updateChild("diagnosis", v)} />
            </div>

            <Textarea label="Motivo de consulta" value={child.reason} onChange={(v) => updateChild("reason", v)} />
            <Textarea label="Fortalezas" value={child.strengths} onChange={(v) => updateChild("strengths", v)} />
            <Textarea label="Necesidades de apoyo" value={child.supportNeeds} onChange={(v) => updateChild("supportNeeds", v)} />
          </Card>

          <Card title="Dashboard visual" emoji="📊">
            <div className="metric">
              <span>Nivel actual</span>
              <strong>{LEVELS[level]}</strong>
            </div>

            <div className="levelButtons">
              {[0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setLevel(num)}
                  className={Number(level) === num ? "level activeLevel" : "level"}
                >
                  {num} · {LEVELS[num]}
                </button>
              ))}
            </div>

            <div className="progressBox">
              <div className="progressInfo">
                <span>Avance estimado</span>
                <strong>{progress}%</strong>
              </div>
              <div className="progressTrack">
                <div className="progressFill" style={{ width: `${progress}%`, background: area.color }} />
              </div>
            </div>

            <div className="miniCharts">
              <Bar label="Participación" value={session.participation} />
              <Bar label="Regulación" value={session.regulation} />
              <Bar label="Tolerancia" value={session.frustration} />
            </div>
          </Card>
        </section>

        <section className="grid two">
          <Card title={`Formulario: ${area.name}`} emoji={area.icon}>
            <div className="formGrid">
              {area.fields.map((field) => (
                <Textarea
                  key={field}
                  label={field}
                  value={areaForm[field] || ""}
                  onChange={(v) => updateAreaForm(field, v)}
                />
              ))}
            </div>
          </Card>

          <Card title="Objetivos progresivos sugeridos" emoji="🎯">
            <p className="smallText">
              Los objetivos cambian según el nivel seleccionado.
            </p>

            <div className="objectiveList">
              {activeObjectives.map((obj, index) => (
                <div key={index} className="objective">
                  <span>{index + 1}</span>
                  <p>{obj}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid two">
          <Card title="Registro de sesión" emoji="📝">
            <div className="formGrid">
              <Input label="Fecha" value={session.date} onChange={(v) => updateSession("date", v)} />
              <Input label="Objetivo de sesión" value={session.objective} onChange={(v) => updateSession("objective", v)} />
            </div>

            <Textarea label="Actividades realizadas" value={session.activities} onChange={(v) => updateSession("activities", v)} />

            <div className="formGrid">
              <Range label="Participación" value={session.participation} onChange={(v) => updateSession("participation", v)} />
              <Range label="Regulación" value={session.regulation} onChange={(v) => updateSession("regulation", v)} />
              <Range label="Tolerancia a la frustración" value={session.frustration} onChange={(v) => updateSession("frustration", v)} />
            </div>

            <Textarea label="Observaciones clínicas" value={session.observations} onChange={(v) => updateSession("observations", v)} />
            <Textarea label="Recomendaciones para casa" value={session.home} onChange={(v) => updateSession("home", v)} />
            <Textarea label="Recomendaciones para colegio" value={session.school} onChange={(v) => updateSession("school", v)} />
            <Textarea label="Próximo objetivo" value={session.next} onChange={(v) => updateSession("next", v)} />
          </Card>

          <Card title="Informe automático editable" emoji="📄">
            <button className="primaryBtn" onClick={handleGenerateReport}>
              Generar informe
            </button>

            {report ? (
              <>
                <textarea
                  className="reportBox"
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                />

                <div className="actions">
                  <button onClick={copyReport}>Copiar informe</button>
                  <button onClick={downloadReport}>Descargar TXT</button>
                </div>
              </>
            ) : (
              <div className="emptyReport">
                Completa el formulario y presiona “Generar informe”.
              </div>
            )}
          </Card>
        </section>
      </section>
    </main>
  );
}

function Card({ title, emoji, children }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <span>{emoji}</span>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Range({ label, value, onChange }) {
  return (
    <label className="field">
      <span>{label}: {value}/10</span>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Bar({ label, value }) {
  return (
    <div className="barItem">
      <div className="barTop">
        <span>{label}</span>
        <strong>{value}/10</strong>
      </div>
      <div className="barTrack">
        <div className="barFill" style={{ width: `${value * 10}%` }} />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
