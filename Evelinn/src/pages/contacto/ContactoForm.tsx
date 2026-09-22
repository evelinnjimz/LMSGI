import { useState } from "react";
import type { FormEvent } from "react";
import { MessageSquare, Send, Loader2, AlertCircle } from "lucide-react";

const ACCESS_KEY = "f3701353-7d54-495c-9e6b-7214b7478411";
const SUBJECTS = ["Oferta laboral", "Prácticas FCT", "Soporte técnico", "Proyecto / consulta"];

const CARD = "animate-rise rounded-3xl border border-hairline bg-surface/80 p-6 sm:p-7";
const INPUT =
  "w-full rounded-2xl border border-hairline bg-ink/60 px-4 py-3 text-sm text-fg outline-none transition-colors duration-200 placeholder:text-dim focus:border-pink/50 focus:ring-2 focus:ring-pink/15";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("access_key", ACCESS_KEY);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", form.subject || "Contacto desde Portafolio");
      formData.append("message", form.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus("error");
    }
  };

  return (
    <section className={CARD} style={{ ["--i" as string]: 2 }}>
      <div className="mb-6 flex items-center gap-2 text-pink">
        <MessageSquare size={18} />
        <h2 className="font-display text-2xl font-bold text-fg-strong">Escríbeme</h2>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center animate-in fade-in duration-500">
          <div className="grid size-14 place-items-center rounded-full bg-pink/15 text-pink mb-2">
            <Send size={24} className="ml-1" />
          </div>
          <p className="font-display text-xl font-bold text-fg-strong">¡Mensaje enviado!</p>
          <p className="text-sm text-muted">Te responderé lo antes posible.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-xs font-semibold text-pink hover:underline"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tu nombre"
            className={INPUT}
          />
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="tu@email.com"
            className={INPUT}
          />
          <select
            required
            name="subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={INPUT}
          >
            <option value="" disabled>Motivo del contacto</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s} className="bg-ink text-fg">
                {s}
              </option>
            ))}
          </select>
          <textarea
            required
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Cuéntame en qué puedo ayudarte..."
            className={`${INPUT} resize-none`}
          />

          {status === "error" && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <AlertCircle size={14} className="shrink-0" />
              <span>Ocurrió un error al enviar el correo. Por favor, intentalo de nuevo.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-pink-deep px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-pink-deep/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
                Enviar mensaje
              </>
            )}
          </button>
        </form>
      )}
    </section>
  );
}