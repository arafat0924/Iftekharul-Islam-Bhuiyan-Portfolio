import { FormEvent, useMemo, useState } from 'react';
import { Plus, Trash2, Upload, Save, Image as ImageIcon, LogOut } from 'lucide-react';
import { getPortfolioContent, usePortfolioContent } from '../lib/content';
import type { Accent, PortfolioContent } from '../data/content';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

type SectionKey = keyof PortfolioContent;
type FieldType = "text" | "textarea" | "select" | "images" | "image" | "contact";

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
};

type SectionConfig = {
  key: SectionKey;
  title: string;
  fields: FieldConfig[];
};

const accentOptions: Array<{ value: Accent; label: string }> = [
  { value: "indigo", label: "Indigo" },
  { value: "emerald", label: "Emerald" },
  { value: "amber", label: "Amber" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "slate", label: "Slate" },
  { value: "yellow", label: "Yellow" },
];

const sections: SectionConfig[] = [
  {
    key: "education",
    title: "Education",
    fields: [
      { name: "institution", label: "Institution", type: "text", required: true },
      { name: "degree", label: "Degree", type: "text", required: true },
      { name: "location", label: "Location", type: "text" },
      { name: "note", label: "Note", type: "text" },
      { name: "metricLabel1", label: "Metric Label 1", type: "text", placeholder: "CGPA" },
      { name: "metricValue1", label: "Metric Value 1", type: "text", placeholder: "3.67" },
      { name: "metricLabel2", label: "Metric Label 2", type: "text", placeholder: "Credits Completed" },
      { name: "metricValue2", label: "Metric Value 2", type: "text", placeholder: "112" },
      { name: "accent", label: "Accent", type: "select", options: accentOptions },
    ],
  },
  {
    key: "academicAchievements",
    title: "Academic Achievements",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "event", label: "Event", type: "textarea", required: true },
      { name: "accent", label: "Accent", type: "select", options: accentOptions },
      { name: "images", label: "Images", type: "images" },
    ],
  },
  {
    key: "professionalAchievements",
    title: "Professional Achievements",
    fields: [
      { name: "role", label: "Role", type: "text", required: true },
      { name: "organization", label: "Organization", type: "text", required: true },
      { name: "period", label: "Period", type: "text" },
      { name: "description", label: "Description", type: "textarea", required: true },
      {
        name: "icon",
        label: "Icon",
        type: "select",
        options: [
          { value: "file", label: "File" },
          { value: "scale", label: "Scale" },
          { value: "users", label: "Users" },
          { value: "briefcase", label: "Briefcase" },
        ],
      },
      { name: "images", label: "Images", type: "images" },
    ],
  },
  {
    key: "fieldWork",
    title: "Field Work",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "period", label: "Period", type: "text" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "images", label: "Images", type: "images" },
    ],
  },
  {
    key: "extraCurricular",
    title: "Extra Curricular",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text", required: true },
      { name: "period", label: "Period", type: "text" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "images", label: "Images", type: "images" },
    ],
  },
  {
    key: "references",
    title: "References",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "department", label: "Department", type: "text", required: true },
      { name: "education", label: "Education", type: "text" },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "image", label: "Image", type: "image" },
    ],
  },
  {
    key: "gallery",
    title: "Gallery",
    fields: [
      { name: "alt", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "src", label: "Image", type: "image" },
    ],
  },
  {
    key: "contact",
    title: "Contact Details",
    fields: [
      { name: "content", label: "Contact Content", type: "contact" },
    ],
  },
];

const emptyForm: Record<string, string> = {};

function parseImageUrls(value = "") {
  return value
    .split(/[\n,]/)
    .map((url) => url.trim())
    .filter(Boolean);
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function uploadFiles(files: File[]) {
  const uploaded: string[] = [];

  for (const file of files) {
    const dataUrl = await fileToDataUrl(file);
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, dataUrl }),
    });

    if (!response.ok) {
      throw new Error(`Unable to upload ${file.name}`);
    }

    const data = await response.json();
    uploaded.push(data.url);
  }

  return uploaded;
}

function summarizeItem(section: SectionKey, item: Record<string, unknown>) {
  switch (section) {
    case "education":
      return {
        title: String(item.institution ?? ""),
        subtitle: String(item.degree ?? ""),
        images: [],
      };
    case "academicAchievements":
      return {
        title: String(item.title ?? ""),
        subtitle: String(item.event ?? ""),
        images: (item.images as string[]) ?? [],
      };
    case "professionalAchievements":
      return {
        title: String(item.role ?? ""),
        subtitle: String(item.organization ?? ""),
        images: (item.images as string[]) ?? [],
      };
    case "fieldWork":
      return {
        title: String(item.title ?? ""),
        subtitle: String(item.description ?? ""),
        images: (item.images as string[]) ?? [],
      };
    case "extraCurricular":
      return {
        title: String(item.title ?? ""),
        subtitle: String(item.subtitle ?? ""),
        images: (item.images as string[]) ?? [],
      };
    case "references":
      return {
        title: String(item.name ?? ""),
        subtitle: String(item.email ?? ""),
        images: item.image ? [String(item.image)] : [],
      };
    case "gallery":
      return {
        title: String(item.alt ?? ""),
        subtitle: String(item.category ?? ""),
        images: item.src ? [String(item.src)] : [],
      };
  }
}

function buildPayload(section: SectionKey, form: Record<string, string>, images: string[]) {
  if (section === "education") {
    const metrics = [
      form.metricLabel1 && form.metricValue1 ? { label: form.metricLabel1, value: form.metricValue1 } : null,
      form.metricLabel2 && form.metricValue2 ? { label: form.metricLabel2, value: form.metricValue2 } : null,
    ].filter(Boolean);

    return {
      institution: form.institution,
      degree: form.degree,
      location: form.location,
      note: form.note,
      accent: form.accent || "indigo",
      metrics,
    };
  }

  if (section === "academicAchievements") {
    return {
      title: form.title,
      event: form.event,
      accent: form.accent || "indigo",
      images,
    };
  }

  if (section === "professionalAchievements") {
    return {
      role: form.role,
      organization: form.organization,
      period: form.period,
      description: form.description,
      icon: form.icon || "file",
      images,
    };
  }

  if (section === "fieldWork") {
    return {
      title: form.title,
      period: form.period,
      description: form.description,
      images,
    };
  }

  if (section === "extraCurricular") {
    return {
      title: form.title,
      subtitle: form.subtitle,
      period: form.period,
      description: form.description,
      quote: form.quote,
      images,
    };
  }

  if (section === "references") {
    return {
      name: form.name,
      title: form.title,
      department: form.department,
      education: form.education,
      email: form.email,
      image: images[0] || form.image || "",
    };
  }

  return {
    alt: form.alt,
    category: form.category,
    src: images[0] || form.src || "",
  };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { content, setContent } = usePortfolioContent();
  const [activeKey, setActiveKey] = useState<SectionKey>("education");
  const [form, setForm] = useState<Record<string, string>>(emptyForm);
  const [files, setFiles] = useState<File[]>([]);
  const [contactForm, setContactForm] = useState({ intro: "", formspreeEndpoint: "" });
  const [detailForm, setDetailForm] = useState({ type: "email", label: "", value: "", href: "" });
  const [status, setStatus] = useState("");
  const activeSection = useMemo(() => sections.find((section) => section.key === activeKey) ?? sections[0], [activeKey]);

  const refresh = async () => {
    setContent(await getPortfolioContent());
  };

  const submitSection = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("Saving...");

    try {
      const imageField = activeSection.fields.find((field) => field.type === "images" || field.type === "image");
      const uploaded = imageField ? await uploadFiles(files) : [];
      const entered = imageField ? parseImageUrls(form[imageField.name]) : [];
      const payload = buildPayload(activeKey, form, [...entered, ...uploaded]);

      const response = await fetch(`/api/content/${activeKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Unable to save item");

      setForm(emptyForm);
      setFiles([]);
      await refresh();
      setStatus("Saved");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save");
    }
  };

  const removeItem = async (section: SectionKey, id: string) => {
    setStatus("Removing...");
    const response = await fetch(`/api/content/${section}/${id}`, { method: "DELETE" });

    if (response.ok) {
      await refresh();
      setStatus("Removed");
    } else {
      setStatus("Unable to remove item");
    }
  };

  const saveContactSettings = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("Saving contact...");

    const response = await fetch("/api/content/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intro: contactForm.intro || content.contact.intro,
        formspreeEndpoint: contactForm.formspreeEndpoint || content.contact.formspreeEndpoint,
      }),
    });

    if (response.ok) {
      setContactForm({ intro: "", formspreeEndpoint: "" });
      await refresh();
      setStatus("Contact saved");
    } else {
      setStatus("Unable to save contact");
    }
  };

  const addContactDetail = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("Saving contact detail...");

    const response = await fetch("/api/content/contact/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detailForm),
    });

    if (response.ok) {
      setDetailForm({ type: "email", label: "", value: "", href: "" });
      await refresh();
      setStatus("Contact detail saved");
    } else {
      setStatus("Unable to save contact detail");
    }
  };

  const removeContactDetail = async (id: string) => {
    setStatus("Removing contact detail...");
    const response = await fetch(`/api/content/contact/details/${id}`, { method: "DELETE" });

    if (response.ok) {
      await refresh();
      setStatus("Contact detail removed");
    } else {
      setStatus("Unable to remove contact detail");
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto pb-16">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-serif font-bold text-white mb-3 title-effect">Admin Dashboard</h1>
          <p className="text-slate-400">Manage portfolio content, images, gallery, references, and contact details.</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('isAdminAuthenticated');
            navigate('/login');
          }}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-700"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside className="bg-slate-900/70 border border-slate-700/60 rounded-2xl p-3 h-fit sticky top-28">
          <div className="flex flex-col gap-1">
            {sections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => {
                  setActiveKey(section.key);
                  setForm(emptyForm);
                  setFiles([]);
                }}
                className={cn(
                  "text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  activeKey === section.key
                    ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                    : "text-slate-300 hover:bg-slate-800"
                )}
              >
                {section.title}
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-6">
          <section className="bg-slate-900/70 border border-slate-700/60 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{activeSection.title}</h2>
                <p className="text-sm text-slate-400">
                  {activeKey === "contact" ? "Manage details" : `${content[activeKey].length} items`}
                </p>
              </div>
              {status && <span className="text-sm text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">{status}</span>}
            </div>

            {activeKey === "contact" ? (
              <div className="space-y-12">
                <section>
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Global Settings</h3>
                  <form onSubmit={saveContactSettings} className="grid grid-cols-1 gap-4 mb-4">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-300 mb-2">Contact Page Header Text</span>
                      <textarea
                        rows={3}
                        value={contactForm.intro}
                        onChange={(event) => setContactForm((current) => ({ ...current, intro: event.target.value }))}
                        placeholder={content.contact.intro}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 text-white outline-none focus:border-indigo-500 transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-300 mb-2">Formspree Endpoint (URL)</span>
                      <input
                        value={contactForm.formspreeEndpoint}
                        onChange={(event) => setContactForm((current) => ({ ...current, formspreeEndpoint: event.target.value }))}
                        placeholder={content.contact.formspreeEndpoint}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 text-white outline-none focus:border-indigo-500 transition-colors"
                      />
                    </label>
                    <button type="submit" className="w-fit inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      <Save className="w-4 h-4" />
                      Update Contact Settings
                    </button>
                  </form>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Individual Contact Items</h3>
                  <form onSubmit={addContactDetail} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-4 mb-8">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 ml-1">Type</label>
                      <select
                        value={detailForm.type}
                        onChange={(event) => setDetailForm((current) => ({ ...current, type: event.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 text-white outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="address">Address</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 ml-1">Label</label>
                      <input
                        required
                        value={detailForm.label}
                        onChange={(event) => setDetailForm((current) => ({ ...current, label: event.target.value }))}
                        placeholder="e.g. Work Email"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 text-white outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 ml-1">Value / Link</label>
                      <input
                        required
                        value={detailForm.value}
                        onChange={(event) => setDetailForm((current) => ({ ...current, value: event.target.value }))}
                        placeholder="e.g. name@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 text-white outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="flex items-end">
                      <button type="submit" className="w-full lg:w-fit inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <Plus className="w-4 h-4" />
                        Add Item
                      </button>
                    </div>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.contact.details.map((detail) => (
                      <div key={detail.id} className="group relative flex items-center justify-between p-5 rounded-2xl bg-slate-950/40 border border-slate-800/60 hover:border-indigo-500/30 transition-all">
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                              {detail.type}
                            </span>
                          </div>
                          <h4 className="text-white font-medium truncate">{detail.label}</h4>
                          <p className="text-slate-400 text-sm truncate">{detail.value}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeContactDetail(detail.id)}
                          className="text-slate-500 hover:text-red-400 p-2 transition-colors rounded-lg hover:bg-red-400/10"
                          title="Remove contact detail"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <>
                <form onSubmit={submitSection} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {activeSection.fields.map((field) => (
                    <div key={field.name} className={field.type === "textarea" || field.type === "images" || field.type === "image" ? "md:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-slate-300 mb-2 uppercase tracking-wider text-[11px] ml-1">{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          required={field.required}
                          rows={4}
                          value={form[field.name] ?? ""}
                          onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 text-white outline-none focus:border-indigo-500"
                          placeholder={field.placeholder}
                        />
                      ) : field.type === "select" ? (
                        <select
                          value={form[field.name] ?? field.options?.[0]?.value ?? ""}
                          onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 text-white outline-none focus:border-indigo-500"
                        >
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : field.type === "images" || field.type === "image" ? (
                        <div className="space-y-3">
                          <textarea
                            rows={3}
                            value={form[field.name] ?? ""}
                            onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 text-white outline-none focus:border-indigo-500"
                            placeholder={field.type === "image" ? "/image.jpg or https://..." : "/image-one.jpg, /image-two.jpg"}
                          />
                          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 cursor-pointer transition-colors">
                            <Upload className="w-4 h-4" />
                            <span>{files.length ? `${files.length} selected` : "Upload image"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple={field.type === "images"}
                              className="hidden"
                              onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                            />
                          </label>
                        </div>
                      ) : (
                        <input
                          required={field.required}
                          value={form[field.name] ?? ""}
                          onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 text-white outline-none focus:border-indigo-500"
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <button type="submit" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors">
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(content[activeKey] as Array<Record<string, unknown>>).map((item) => {
                    const summary = summarizeItem(activeKey, item);

                    return (
                      <div key={String(item.id)} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                            {summary.images[0] ? (
                              <img src={summary.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-slate-500" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-white truncate">{summary.title}</h3>
                            <p className="text-sm text-slate-400 line-clamp-2">{summary.subtitle}</p>
                            <button
                              type="button"
                              onClick={() => removeItem(activeKey, String(item.id))}
                              className="inline-flex items-center gap-2 mt-3 text-sm text-red-300 hover:text-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

